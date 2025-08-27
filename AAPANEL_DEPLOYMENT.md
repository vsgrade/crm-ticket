# Развертывание TicketPro Enterprise через aaPanel

Данная инструкция поможет вам развернуть React приложение TicketPro Enterprise на сервере с использованием панели управления aaPanel.

## Предварительные требования

- Сервер с установленной aaPanel
- Node.js версии 18 или выше
- Git
- Доступ к панели управления aaPanel

## Шаг 1: Подготовка сервера

### 1.1 Установка Node.js через aaPanel

1. Войдите в панель управления aaPanel
2. Перейдите в раздел **"App Store"** или **"Магазин приложений"**
3. Найдите и установите **Node.js Manager**
4. После установки перейдите в **Node.js Manager**
5. Установите Node.js версии 18.x или новее

### 1.2 Установка PM2 (Process Manager)

1. В Node.js Manager найдите раздел **"Modules"**
2. Установите **PM2** для управления процессами Node.js

## Шаг 2: Создание сайта в aaPanel

### 2.1 Добавление нового сайта

1. В главном меню aaPanel выберите **"Website"**
2. Нажмите **"Add site"**
3. Заполните форму:
   - **Domain**: ваш домен (например, ticketpro.example.com)
   - **Document Root**: `/www/wwwroot/ticketpro`
   - **PHP Version**: Выберите **"Pure static"** или **"Other"**
4. Нажмите **"Submit"**

### 2.2 Настройка SSL (рекомендуется)

1. В списке сайтов найдите ваш домен
2. Нажмите **"SSL"**
3. Выберите **"Let's Encrypt"** для бесплатного SSL
4. Следуйте инструкциям для получения сертификата

## Шаг 3: Загрузка исходного кода

### 3.1 Клонирование репозитория

1. Откройте **"Terminal"** в aaPanel
2. Перейдите в директорию сайта:
   ```bash
   cd /www/wwwroot/ticketpro
   ```
3. Клонируйте репозиторий:
   ```bash
   git clone <YOUR_GIT_URL> .
   ```
   или загрузите файлы через **File Manager** в aaPanel

### 3.2 Установка зависимостей

В терминале выполните:
```bash
npm install
```

## Шаг 4: Настройка переменных окружения

### 4.1 Создание файла .env

1. В File Manager создайте файл `.env` в корне проекта
2. Добавьте необходимые переменные:
   ```env
   VITE_APP_TITLE=TicketPro Enterprise
   VITE_APP_ENV=production
   ```

## Шаг 5: Сборка проекта

### 5.1 Создание production сборки

В терминале выполните:
```bash
npm run build
```

Это создаст папку `dist` с оптимизированными файлами для production.

## Шаг 6: Настройка веб-сервера

### 6.1 Для Nginx (рекомендуется)

1. В aaPanel перейдите в **"Website"**
2. Найдите ваш сайт и нажмите **"Config"**
3. Выберите **"Site directory binding"**
4. Установите **Document Root** в `/www/wwwroot/ticketpro/dist`
5. В разделе **"Conf"** замените содержимое на полную конфигурацию:

```nginx
server
{
    listen 80;
    listen 443 ssl;
    server_name your-domain.com;  # Замените на ваш домен
    index index.html;
    root /www/wwwroot/ticketpro/dist;  # Путь к собранному проекту
    
    #SSL-START SSL related configuration
    ssl_certificate    /www/server/panel/vhost/cert/your-domain/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/your-domain/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    error_page 497 https://$host$request_uri;
    #SSL-END
    
    # Основная конфигурация для React SPA
    location / {
        try_files $uri $uri/ /index.html;
        
        # Заголовки безопасности
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }
    
    # Кеширование статических ресурсов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Запрет доступа к служебным файлам
    location ~ ^/(\.user\.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README\.md|package\.json|package-lock\.json|\.env|node_modules) {
        return 404;
    }
    
    # Настройки для Let's Encrypt
    location /.well-known/ {
        root /www/wwwroot/ticketpro/dist;
    }
    
    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        text/json
        application/javascript
        application/xml+rss
        application/json
        application/xml
        image/svg+xml;
    
    access_log /www/wwwlogs/your-domain.log;
    error_log /www/wwwlogs/your-domain.error.log;
}
```

**Важные замены в конфигурации:**
- `your-domain.com` → ваш реальный домен
- `/www/server/panel/vhost/cert/your-domain/` → путь к вашему SSL сертификату
- `/www/wwwroot/ticketpro/dist` → путь к собранному проекту

### 6.2 Для Apache

Создайте файл `.htaccess` в папке `dist`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Кеширование
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## Шаг 7: Автоматизация развертывания

### 7.1 Создание скрипта развертывания

Создайте файл `deploy.sh`:
```bash
#!/bin/bash
cd /www/wwwroot/ticketpro
git pull origin main
npm install
npm run build
echo "Deployment completed successfully!"
```

### 7.2 Настройка webhook (опционально)

1. В aaPanel перейдите в **"Cron"**
2. Создайте задание для автоматического развертывания
3. Или настройте webhook в вашем Git репозитории

## Шаг 8: Мониторинг и логи

### 8.1 Просмотр логов

1. В aaPanel перейдите в **"Logs"**
2. Выберите логи Nginx/Apache для отслеживания ошибок
3. Используйте **"Terminal"** для просмотра системных логов

### 8.2 Мониторинг производительности

1. В разделе **"Monitor"** отслеживайте:
   - Использование CPU
   - Использование памяти
   - Дисковое пространство
   - Сетевой трафик

## Шаг 9: Настройка безопасности

### 9.1 Firewall

1. В aaPanel перейдите в **"Security"**
2. Настройте правила фаервола:
   - Разрешите порты 80 и 443
   - Ограничьте доступ к административным портам

### 9.2 Backup

1. Настройте автоматическое резервное копирование в разделе **"Backup"**
2. Рекомендуется делать backup:
   - Файлов сайта
   - Конфигурации веб-сервера
   - Базы данных (если используется)

## Поиск и решение проблем

### Частые проблемы

1. **404 ошибки при переходе по URL**: Проверьте настройку rewrite правил
2. **Белый экран**: Проверьте консоль браузера на наличие ошибок JavaScript
3. **Медленная загрузка**: Убедитесь, что включено gzip сжатие
4. **Ошибки сборки**: Проверьте версию Node.js и наличие всех зависимостей

### Полезные команды

```bash
# Проверка статуса процессов
pm2 status

# Просмотр логов
pm2 logs

# Перезапуск приложения
pm2 restart all

# Проверка использования портов
netstat -tlnp
```

## Заключение

После выполнения всех шагов ваше приложение TicketPro Enterprise будет доступно по указанному домену. Убедитесь в правильности настройки SSL сертификата и регулярно обновляйте приложение через Git.

Для получения дополнительной помощи обратитесь к документации aaPanel или свяжитесь с технической поддержкой.