# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/60928d64-0ec6-4512-8130-8d3c8a00a6ae

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/60928d64-0ec6-4512-8130-8d3c8a00a6ae) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Настройка app.js для развертывания

При развертывании на сервере через aaPanel или другие хостинг-панели, возможно потребуется настроить файл `app.js`:

### Изменение порта

По умолчанию сервер запускается на порту 3000. Если ваш Nginx настроен на другой порт, измените:

```javascript
const PORT = process.env.PORT || 3002; // Замените 3002 на нужный порт
```

### Путь к статическим файлам

Если проект находится в другой директории, обновите пути в `app.js`:

**По умолчанию (dist в той же папке, что и app.js):**
```javascript
app.use(
  express.static(path.join(__dirname, 'dist'), {
    maxAge: '1y',
    etag: false,
  })
);
```

**Пример: если dist находится в подпапке build:**
```javascript
app.use(
  express.static(path.join(__dirname, 'build'), {
    maxAge: '1y',
    etag: false,
  })
);
```

**Пример: если dist находится на уровень выше:**
```javascript
app.use(
  express.static(path.join(__dirname, '../dist'), {
    maxAge: '1y',
    etag: false,
  })
);
```

**Пример: абсолютный путь:**
```javascript
app.use(
  express.static('/www/wwwroot/node-project/crm-ticket/crm-ticket-main/dist', {
    maxAge: '1y',
    etag: false,
  })
);
```

Также обновите путь в функции для обработки React Router:
```javascript
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Измените 'dist' на ваш путь
});
```

### Переменные окружения

Для продакшен-среды рекомендуется установить:

```bash
export NODE_ENV=production
export PORT=3002
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/60928d64-0ec6-4512-8130-8d3c8a00a6ae) and click on Share -> Publish.

**Для развертывания на собственном сервере** см. `AAPANEL_DEPLOYMENT.md` для подробных инструкций.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
