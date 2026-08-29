# Security checklist

## Перед первым запуском

- [ ] Production — статический build; Node.js не слушает публичный порт.
- [ ] Вход по SSH-ключу проверен во втором сеансе; `PermitRootLogin no` и `PasswordAuthentication no` включены после проверки.
- [ ] Есть отдельный пользователь `deploy`; deployment не запускается постоянно от root.
- [ ] UFW запрещает входящие по умолчанию и разрешает только 22/80/443.
- [ ] Fail2ban и security updates включены.
- [ ] Nginx проходит `sudo nginx -t`, `autoindex off`, dot-файлы и secrets недоступны.
- [ ] HTTP перенаправляет на HTTPS; `certbot renew --dry-run` проходит.
- [ ] Security headers и CSP проверены; HSTS не содержит неподтверждённых `includeSubDomains`/`preload`.
- [ ] В репозитории нет secrets, `.env`, private keys и случайных source maps.
- [ ] Есть lockfile; `npm ci`, `npm run build` и `npm audit` выполнены.
- [ ] Настроены off-site backup конфигурации и snapshot VPS перед изменениями.

## После первого запуска

- [ ] Внешний monitor видит HTTPS, правильный status и сертификат.
- [ ] `curl -I https://memasevich.ru/.env` и `/.git/config` не возвращают содержимое.
- [ ] Снаружи доступны только необходимые порты.
- [ ] Проверены `/`, `/en/`, мобильный layout, canonical и hreflang.
- [ ] Проверен тестовый release и `deployment/rollback.sh`.
- [ ] Логи ротируются и не заполняют диск.

## Ежемесячно

- [ ] Проверены `apt list --upgradable`, `ufw status`, Fail2ban и свободное место.
- [ ] Обновлены зависимости после оценки изменений; критичные/высокие уязвимости рассмотрены.
- [ ] Проверено автоматическое продление сертификата.
- [ ] Сохранена актуальная off-site копия конфигураций; удалены старые release старше политики хранения.
- [ ] Проверены 2FA, passkeys и recovery codes для регистратора, GitHub, VPS, CDN и почты.

## Перед большим обновлением

- [ ] Создан snapshot VPS и зафиксирован commit.
- [ ] Проверены `npm ci`, `npm run build`, `npm audit` и размер build.
- [ ] Подготовлен rollback и понятен текущий `readlink -f /var/www/memasevich/current`.
- [ ] Обновление сначала проверено в отдельном окружении.
- [ ] После релиза проверены HTTPS, headers, CSP, `/en/`, logs и disk usage.

## При инциденте

- [ ] Зафиксированы время, симптомы, IP/URL и доступные логи.
- [ ] Скомпрометированный сервер изолирован, но логи сохранены.
- [ ] Отозваны SSH-ключи, deploy tokens, API keys и сертификаты.
- [ ] Проверены Git history, DNS, CDN, аккаунты регистратора и CI.
- [ ] Сайт восстановлен из известного чистого release или с чистого VPS.

## После взлома / компрометации

- [ ] Все секреты заменены, а не только удалены из файлов.
- [ ] Проверены пользователи, cron/systemd timers, SSH authorized_keys, Nginx и firewall.
- [ ] Проверены зависимости и pipeline.
- [ ] Включён внешний мониторинг и зафиксирован план дальнейшего наблюдения.
- [ ] Документированы причина, затронутые данные, исправления и дата повторного review.
