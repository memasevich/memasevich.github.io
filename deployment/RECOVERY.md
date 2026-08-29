# Восстановление Memasevich с чистого VPS

Инструкция рассчитана на Ubuntu Server LTS и домен `memasevich.ru`. Значения `SERVER_IP`, email и имя SSH-ключа замените своими.

## 1. Новый сервер и DNS

1. Создать новый VPS Ubuntu Server LTS у провайдера.
2. На регистраторе включить 2FA и направить A/AAAA-записи домена на новый IP.
3. Не удалять старый VPS до проверки нового, если он ещё доступен.

## 2. Базовая система

```bash
ssh root@SERVER_IP
apt update && apt full-upgrade -y
apt install -y nginx git curl ufw fail2ban unattended-upgrades
adduser deploy
usermod -aG sudo deploy
```

Добавить публичный ключ в `/home/deploy/.ssh/authorized_keys`, проверить вход во втором терминале, затем применить hardening из `deployment/SECURITY.md`. Не отключать root/password authentication до проверки ключевого входа.

## 3. Сайт и Nginx

```bash
install -d -m 0755 /var/www/memasevich/releases
git clone https://github.com/memasevich/memasevich.ru.git /opt/memasevich
cd /opt/memasevich
npm ci
npm run build
```

Установить Node.js актуальной LTS-ветки из доверенного источника, если он отсутствует. Скопировать Nginx-конфиг, получить сертификат ACME, затем:

```bash
ln -s /etc/nginx/sites-available/memasevich.ru /etc/nginx/sites-enabled/memasevich.ru
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
certbot renew --dry-run
```

Для первого release использовать `deployment/deploy.sh` с пользователем `deploy`, а не root.

## 4. Проверка

```bash
ufw status verbose
ss -tulpn
curl -I http://memasevich.ru
curl -I https://memasevich.ru
curl -I https://memasevich.ru/.env
curl -I https://memasevich.ru/.git/config
```

Ожидается redirect с HTTP на HTTPS, успешный HTTPS-ответ и `403`/`404` для внутренних файлов. С внешней машины проверить только порты 22, 80 и 443. Не открывать 3000, 5432, 6379, 8080 или 9000 без отдельной причины и security review.

## 5. Если сломался релиз

```bash
cd /opt/memasevich
./deployment/rollback.sh
```

После rollback проверить главную страницу, `/en/`, HTTPS и логи `journalctl -u nginx -n 100 --no-pager`.

## 6. Если VPS потерян или взломан

С чистого устройства немедленно сменить пароль регистратора, GitHub, VPS, CDN и основной почты; отозвать SSH-ключи, deploy tokens, API keys и сертификаты, которые могли быть доступны серверу. Сохранить доступные логи отдельно, не подключать старый диск к production без анализа, развернуть новый VPS по шагам выше, задеплоить последний известный чистый commit и проверить целостность DNS, Git history, dependencies и release.
