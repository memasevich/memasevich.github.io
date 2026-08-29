# Безопасность production

Этот документ — рабочая инструкция для статического сайта Memasevich. Цель — минимальная поверхность атаки и предсказуемое восстановление, а не обещание абсолютной безопасности.

## Архитектура

`Internet → (опционально CDN/WAF) → Nginx → статический build`

Публично нужны только `22/tcp`, `80/tcp` и `443/tcp`. Node.js не должен постоянно слушать Internet. PostgreSQL, Redis, PHP, админка и публичный API не устанавливаются до появления реальной потребности.

## Первый доступ к Ubuntu VPS

Создать отдельного администратора и проверить второй SSH-сеанс до отключения паролей:

```bash
sudo adduser deploy
sudo usermod -aG sudo deploy
sudo install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
sudoedit /home/deploy/.ssh/authorized_keys
sudo chmod 600 /home/deploy/.ssh/authorized_keys
sudo chown -R deploy:deploy /home/deploy/.ssh
```

В `/etc/ssh/sshd_config.d/99-memasevich-hardening.conf`:

```text
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
AllowUsers deploy
```

Сначала открыть второй терминал и проверить `ssh deploy@SERVER_IP`. Только после успешной проверки выполнить `sudo sshd -t && sudo systemctl reload ssh`.

## Firewall и защита SSH

```bash
sudo apt update && sudo apt install -y nginx ufw fail2ban unattended-upgrades
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo systemctl enable --now fail2ban
sudo systemctl enable --now unattended-upgrades
```

Не считать перенос SSH на случайный порт защитой. Основные меры — ключи, запрет root, firewall, Fail2ban и обновления. Проверить `sudo fail2ban-client status sshd`; не применять чрезмерно агрессивные ban-настройки без второго рабочего доступа.

## Nginx и HTTPS

Скопировать `deployment/nginx/memasevich.conf` в `/etc/nginx/sites-available/`, включить symlink, затем выполнить `sudo nginx -t`. Сертификат получить через Certbot или другой ACME-клиент. После настройки проверить продление: `sudo certbot renew --dry-run`.

Конфигурация запрещает dot-файлы, secrets, backup-файлы, source maps и directory listing, а также добавляет CSP, `nosniff`, Referrer-Policy и Permissions-Policy. HSTS начинается с короткого `max-age`; `includeSubDomains` и `preload` нельзя добавлять, пока не проверены все поддомены.

## Dependencies и CI

- Хранить `package-lock.json` и ставить зависимости через `npm ci`.
- Перед релизом запускать `npm audit`; не запускать `npm audit fix --force` вслепую.
- CI выдавать минимальные permissions; secrets хранить только в Secret Storage.
- Не выводить secrets в логи и не исполнять непроверенный пользовательский input как shell-команду.
- Проверять историю Git. Если secret когда-либо попал в репозиторий, удалить файл недостаточно — credential нужно немедленно отозвать и заменить.

## Deployment и rollback

`deployment/deploy.sh` собирает проект, проверяет `index.html`, загружает новый release, атомарно переключает `current`, проверяет `nginx -t` и HTTPS. Он хранит пять последних release. `deployment/rollback.sh` возвращает предыдущий release без повторной сборки.

Nginx должен читать production build, но не иметь права менять исходный код. Не использовать `chmod 777`; не запускать deployment от root.

## Доступы и DNS

Для регистратора домена, GitHub, VPS, CDN и основной почты использовать разные пароли, 2FA и, где возможно, passkeys/security keys. Recovery codes хранить не на VPS. DNSSEC включать только после проверки корректной DNS-конфигурации.

## Наблюдение и восстановление

Использовать внешний uptime monitor для HTTPS, HTTP status и срока сертификата. Настроить logrotate и хранить не более 3–5 успешных release. Git — источник кода, но не единственная backup strategy: сохранять Nginx/deployment config и off-site копию, а перед серьёзными изменениями делать snapshot VPS.

При обнаружении компрометации изолировать сервер, сохранить логи, отозвать ключи и токены, сменить доступы с чистого устройства, восстановить известный чистый release и проверить DNS/сертификат. Подробный порядок — в `deployment/RECOVERY.md`.
