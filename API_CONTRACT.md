# API Contract для Ticket Management System

## Общие положения

**Base URL:** `https://api.yourcompany.com/v1`

**Аутентификация:** JWT Bearer токен в заголовке `Authorization: Bearer <token>`

**Формат данных:** JSON

**Кодировка:** UTF-8

---

## 🔐 Аутентификация

### POST /auth/login
Вход в систему

**Запрос:**
```json
{
  "email": "user@company.com",
  "password": "password123"
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "1",
      "name": "Мария Иванова",
      "email": "maria@company.com",
      "role": "Старший агент поддержки",
      "permissions": ["tickets.view", "tickets.edit", "kb.create"],
      "departments": ["support", "sales"]
    },
    "expiresIn": 86400
  }
}
```

### POST /auth/logout
Выход из системы

**Запрос:** Только Authorization заголовок
**Ответ:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /auth/me
Получение информации о текущем пользователе

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Мария Иванова",
    "email": "maria@company.com",
    "role": "Старший агент поддержки",
    "departments": ["support", "sales"],
    "permissions": ["tickets.view", "tickets.edit", "kb.create"],
    "isOnline": true,
    "lastSeen": "2024-01-15T10:30:00Z"
  }
}
```

---

## 🎫 Тикеты

### GET /tickets
Получение списка тикетов

**Query параметры:**
- `page` (int): номер страницы (по умолчанию 1)
- `limit` (int): количество на странице (по умолчанию 50)
- `status` (string[]): фильтр по статусам
- `priority` (string[]): фильтр по приоритетам
- `assignedTo` (string[]): фильтр по исполнителям
- `departments` (string[]): фильтр по отделам
- `source` (string[]): фильтр по источникам
- `slaStatus` (string[]): фильтр по SLA статусам
- `search` (string): поиск по тексту
- `dateFrom` (ISO string): фильтр от даты
- `dateTo` (ISO string): фильтр до даты
- `sortBy` (string): поле сортировки
- `sortOrder` (string): направление (asc/desc)

**Ответ:**
```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": "TIC-2024-001",
        "subject": "Проблема с авторизацией в системе",
        "content": "Добрый день! Возникла проблема с системой...",
        "status": "new",
        "priority": "high",
        "source": "telegram",
        "clientId": "1",
        "assignedTo": ["1"],
        "departments": ["support"],
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T11:45:00Z",
        "lastReply": "2024-01-15T11:45:00Z",
        "lastReplyBy": "client",
        "lastReplyByName": "Анна Петрова",
        "slaStatus": "good",
        "slaDeadline": "2024-01-15T14:30:00Z",
        "tags": ["авторизация", "критично"],
        "hasAttachments": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 324,
      "totalPages": 7
    }
  }
}
```

### GET /tickets/{id}
Получение конкретного тикета с полной информацией

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": "TIC-2024-001",
    "subject": "Проблема с авторизацией в системе",
    "content": "Добрый день! Возникла проблема с системой...",
    "status": "new",
    "priority": "high",
    "source": "telegram",
    "client": {
      "id": "1",
      "name": "Анна Петрова",
      "email": "anna@example.com",
      "phone": "+7 999 123-45-67"
    },
    "assignedTo": [
      {
        "id": "1",
        "name": "Мария Иванова",
        "email": "maria@company.com"
      }
    ],
    "departments": ["support"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:45:00Z",
    "lastReply": "2024-01-15T11:45:00Z",
    "lastReplyBy": "client",
    "slaStatus": "good",
    "slaDeadline": "2024-01-15T14:30:00Z",
    "tags": ["авторизация", "критично"],
    "hasAttachments": false,
    "messages": [
      {
        "id": "1",
        "content": "Добрый день! Возникла проблема с системой...",
        "author": "client",
        "authorName": "Анна Петрова",
        "timestamp": "2024-01-15T10:30:00Z",
        "type": "text",
        "attachments": []
      }
    ],
    "internalNotes": [
      {
        "id": "1",
        "content": "Проверить логи авторизации",
        "authorId": "1",
        "authorName": "Мария Иванова",
        "timestamp": "2024-01-15T11:00:00Z"
      }
    ],
    "customFields": {},
    "history": [
      {
        "id": "1",
        "action": "created",
        "field": null,
        "oldValue": null,
        "newValue": null,
        "authorId": "system",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### POST /tickets
Создание нового тикета

**Запрос:**
```json
{
  "subject": "Новая проблема",
  "content": "Описание проблемы...",
  "priority": "medium",
  "source": "email",
  "clientId": "1",
  "assignedTo": ["1"],
  "departments": ["support"],
  "tags": ["новый", "проблема"],
  "customFields": {}
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": "TIC-2024-325",
    "subject": "Новая проблема",
    "status": "new",
    "createdAt": "2024-01-15T12:00:00Z"
  }
}
```

### PUT /tickets/{id}
Обновление тикета

**Запрос:**
```json
{
  "subject": "Обновленная тема",
  "status": "in-progress",
  "priority": "high",
  "assignedTo": ["1", "2"],
  "departments": ["support"],
  "tags": ["обновлено", "высокий приоритет"],
  "customFields": {
    "urgency": "critical"
  }
}
```

### DELETE /tickets/{id}
Удаление тикета

### POST /tickets/{id}/messages
Добавление сообщения в тикет

**Запрос:**
```json
{
  "content": "Ответ на тикет...",
  "type": "text",
  "isInternal": false,
  "attachments": ["file1.pdf", "file2.jpg"]
}
```

### POST /tickets/{id}/notes
Добавление внутренней заметки

**Запрос:**
```json
{
  "content": "Внутренняя заметка для команды"
}
```

### POST /tickets/{id}/assign
Назначение тикета

**Запрос:**
```json
{
  "assignedTo": ["1", "2"],
  "departments": ["support", "billing"]
}
```

### GET /tickets/stats
Статистика по тикетам

**Query параметры:**
- `period` (string): период (today, week, month, year)
- `departments` (string[]): фильтр по отделам

**Ответ:**
```json
{
  "success": true,
  "data": {
    "totalTickets": 324,
    "newTickets": 47,
    "inProgressTickets": 156,
    "resolvedTickets": 98,
    "closedTickets": 23,
    "avgResponseTime": 83,
    "slaCompliance": 94.2,
    "ticketsByStatus": {
      "new": 47,
      "in-progress": 156,
      "resolved": 98,
      "closed": 23
    },
    "ticketsByPriority": {
      "low": 89,
      "medium": 145,
      "high": 67,
      "critical": 23
    },
    "ticketsBySource": {
      "telegram": 89,
      "whatsapp": 67,
      "email": 98,
      "android": 45,
      "sms": 25
    }
  }
}
```

---

## 👥 Клиенты

### GET /clients
Получение списка клиентов

**Query параметры:**
- `page`, `limit`: пагинация
- `search`: поиск по имени, email, телефону
- `segment`: фильтр по сегменту
- `sortBy`, `sortOrder`: сортировка

**Ответ:**
```json
{
  "success": true,
  "data": {
    "clients": [
      {
        "id": "1",
        "name": "Анна Петрова",
        "email": "anna@example.com",
        "phone": "+7 999 123-45-67",
        "messengerIds": {
          "telegram": "@anna_p",
          "whatsapp": "+7999123456"
        },
        "ticketsCount": 15,
        "lastTicketDate": "2024-01-15T10:30:00Z",
        "location": "Москва",
        "company": "ООО Технологии",
        "customFields": {
          "vip": true,
          "segment": "enterprise"
        },
        "rating": 4.8,
        "totalSpent": 125000,
        "registrationDate": "2023-06-15T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 1247,
      "totalPages": 25
    }
  }
}
```

### GET /clients/{id}
Получение конкретного клиента

### POST /clients
Создание нового клиента

**Запрос:**
```json
{
  "name": "Новый Клиент",
  "email": "client@example.com",
  "phone": "+7 999 888-77-66",
  "messengerIds": {
    "telegram": "@new_client"
  },
  "location": "Москва",
  "company": "ООО Новая компания",
  "customFields": {
    "segment": "smb"
  }
}
```

### PUT /clients/{id}
Обновление клиента

### DELETE /clients/{id}
Удаление клиента

### GET /clients/{id}/tickets
Получение тикетов клиента

---

## 👨‍💼 Сотрудники

### GET /employees
Получение списка сотрудников

**Ответ:**
```json
{
  "success": true,
  "data": {
    "employees": [
      {
        "id": "1",
        "name": "Мария Иванова",
        "email": "maria@company.com",
        "role": "Старший агент поддержки",
        "departments": ["support", "sales"],
        "isOnline": true,
        "lastSeen": "2024-01-15T12:00:00Z",
        "ticketsAssigned": 47,
        "ticketsResolved": 234,
        "avgResponseTime": 15,
        "permissions": ["tickets.view", "tickets.edit", "kb.create"],
        "customFields": {
          "experience": "3 года",
          "level": "senior"
        }
      }
    ]
  }
}
```

### GET /employees/{id}
Получение конкретного сотрудника

### POST /employees
Создание нового сотрудника

### PUT /employees/{id}
Обновление сотрудника

### DELETE /employees/{id}
Удаление сотрудника

### GET /employees/{id}/stats
Статистика сотрудника

---

## 🏢 Отделы

### GET /departments
Получение списка отделов

**Ответ:**
```json
{
  "success": true,
  "data": {
    "departments": [
      {
        "id": "support",
        "name": "Техническая поддержка",
        "description": "Решение технических вопросов клиентов",
        "employees": ["1", "2"],
        "integrations": [
          {
            "type": "telegram",
            "name": "Support Bot",
            "status": "active"
          }
        ],
        "workingHours": {
          "start": "09:00",
          "end": "18:00",
          "timezone": "Europe/Moscow",
          "weekdays": [1, 2, 3, 4, 5]
        },
        "slaRules": [],
        "isActive": true
      }
    ]
  }
}
```

### GET /departments/{id}
Получение конкретного отдела

### POST /departments
Создание нового отдела

### PUT /departments/{id}
Обновление отдела

### DELETE /departments/{id}
Удаление отдела

---

## 📊 Отчеты

### GET /reports/dashboard
Данные для дашборда

**Ответ:**
```json
{
  "success": true,
  "data": {
    "totalTickets": 324,
    "newTickets": 47,
    "inProgressTickets": 156,
    "resolvedToday": 23,
    "avgResponseTime": "1ч 23м",
    "slaCompliance": 94.2,
    "activeAgents": 12,
    "totalClients": 1247,
    "ticketTrends": {
      "labels": ["Пн", "Вт", "Ср", "Чт", "Пт"],
      "datasets": [
        {
          "label": "Новые тикеты",
          "data": [12, 19, 15, 25, 22]
        }
      ]
    }
  }
}
```

### POST /reports/generate
Генерация отчета

**Запрос:**
```json
{
  "type": "tickets_summary",
  "period": {
    "from": "2024-01-01T00:00:00Z",
    "to": "2024-01-31T23:59:59Z"
  },
  "filters": {
    "departments": ["support"],
    "status": ["resolved", "closed"]
  },
  "format": "pdf"
}
```

### GET /reports/{id}/download
Скачивание сгенерированного отчета

---

## 📋 База знаний

### GET /knowledge-base/articles
Получение статей базы знаний

### GET /knowledge-base/articles/{id}
Получение конкретной статьи

### POST /knowledge-base/articles
Создание новой статьи

**Запрос:**
```json
{
  "title": "Как настроить интеграцию",
  "content": "Пошаговая инструкция...",
  "category": "integrations",
  "tags": ["настройка", "интеграция"],
  "isPublic": true,
  "isDraft": false
}
```

### PUT /knowledge-base/articles/{id}
Обновление статьи

### DELETE /knowledge-base/articles/{id}
Удаление статьи

### GET /knowledge-base/categories
Получение категорий

---

## 🔗 Интеграции

### GET /integrations
Получение списка интеграций

**Ответ:**
```json
{
  "success": true,
  "data": {
    "integrations": [
      {
        "id": "telegram-bot",
        "type": "telegram",
        "name": "Support Telegram Bot",
        "status": "active",
        "settings": {
          "botToken": "***masked***",
          "webhook": "https://api.company.com/webhooks/telegram"
        },
        "stats": {
          "messagesReceived": 1234,
          "ticketsCreated": 89
        }
      }
    ]
  }
}
```

### GET /integrations/{id}
Получение конкретной интеграции

### POST /integrations
Создание новой интеграции

### PUT /integrations/{id}
Обновление интеграции

### DELETE /integrations/{id}
Удаление интеграции

### POST /integrations/{id}/test
Тестирование интеграции

---

## 🔧 Настройки системы

### GET /settings
Получение настроек системы

**Ответ:**
```json
{
  "success": true,
  "data": {
    "general": {
      "companyName": "ООО Компания",
      "supportEmail": "support@company.com",
      "timezone": "Europe/Moscow"
    },
    "tickets": {
      "autoAssignment": true,
      "defaultPriority": "medium",
      "slaRules": [
        {
          "priority": "critical",
          "responseTime": 1,
          "resolutionTime": 4
        }
      ]
    },
    "notifications": {
      "emailEnabled": true,
      "smsEnabled": false,
      "pushEnabled": true
    }
  }
}
```

### PUT /settings
Обновление настроек

### GET /settings/custom-fields
Получение пользовательских полей

### POST /settings/custom-fields
Создание пользовательского поля

---

## 🔄 Автоматизация

### GET /automations
Получение списка автоматизаций

### POST /automations
Создание новой автоматизации

**Запрос:**
```json
{
  "name": "Автоназначение тикетов",
  "trigger": {
    "type": "ticket_created",
    "conditions": [
      {
        "field": "source",
        "operator": "equals",
        "value": "telegram"
      }
    ]
  },
  "actions": [
    {
      "type": "assign_to_department",
      "department": "support"
    }
  ],
  "isActive": true
}
```

### PUT /automations/{id}
Обновление автоматизации

### DELETE /automations/{id}
Удаление автоматизации

---

## 📎 Файлы и приложения

### POST /files/upload
Загрузка файла

**Запрос:** multipart/form-data
- `file`: файл
- `type`: тип (attachment, avatar, document)
- `ticketId`: ID тикета (опционально)

**Ответ:**
```json
{
  "success": true,
  "data": {
    "id": "file_123",
    "filename": "document.pdf",
    "url": "https://files.company.com/attachments/document.pdf",
    "size": 1024000,
    "mimeType": "application/pdf"
  }
}
```

### GET /files/{id}
Получение файла

### DELETE /files/{id}
Удаление файла

---

## 🌐 Публичные эндпоинты (без аутентификации)

### GET /public/knowledge-base
Публичная база знаний

### POST /public/tickets
Создание тикета из внешней формы

**Запрос:**
```json
{
  "name": "Имя клиента",
  "email": "client@example.com",
  "subject": "Тема обращения",
  "message": "Сообщение",
  "source": "website"
}
```

---

## 📡 WebHooks

### POST /webhooks/telegram
WebHook для Telegram

### POST /webhooks/whatsapp
WebHook для WhatsApp

### POST /webhooks/email
WebHook для Email

---

## 🔍 Поиск

### GET /search
Глобальный поиск

**Query параметры:**
- `q` (string): поисковый запрос
- `type` (string[]): типы для поиска (tickets, clients, articles)
- `limit` (int): лимит результатов

**Ответ:**
```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": "TIC-2024-001",
        "subject": "Проблема с авторизацией",
        "snippet": "...проблема с <mark>авторизацией</mark> в системе..."
      }
    ],
    "clients": [
      {
        "id": "1",
        "name": "Анна Петрова",
        "email": "anna@example.com"
      }
    ],
    "articles": []
  }
}
```

---

## ❌ Коды ошибок

### Стандартные HTTP коды:
- `200` - Успешно
- `201` - Создано
- `400` - Неверный запрос
- `401` - Не авторизован
- `403` - Доступ запрещен
- `404` - Не найдено
- `422` - Ошибка валидации
- `500` - Внутренняя ошибка сервера

### Формат ошибки:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Данные не прошли валидацию",
    "details": [
      {
        "field": "email",
        "message": "Некорректный email адрес"
      }
    ]
  }
}
```

### Пользовательские коды ошибок:
- `VALIDATION_ERROR` - Ошибка валидации
- `TICKET_NOT_FOUND` - Тикет не найден
- `ACCESS_DENIED` - Доступ запрещен
- `SLA_VIOLATION` - Нарушение SLA
- `INTEGRATION_ERROR` - Ошибка интеграции
- `RATE_LIMIT_EXCEEDED` - Превышен лимит запросов

---

## 🔐 Права доступа

### Роли:
- `admin` - Полный доступ
- `manager` - Управление отделом
- `agent` - Работа с тикетами
- `viewer` - Только просмотр

### Разрешения:
- `tickets.view` - Просмотр тикетов
- `tickets.edit` - Редактирование тикетов
- `tickets.delete` - Удаление тикетов
- `clients.view` - Просмотр клиентов
- `clients.edit` - Редактирование клиентов
- `employees.manage` - Управление сотрудниками
- `departments.manage` - Управление отделами
- `settings.view` - Просмотр настроек
- `settings.edit` - Редактирование настроек
- `reports.view` - Просмотр отчетов
- `kb.view` - Просмотр базы знаний
- `kb.create` - Создание статей
- `kb.edit` - Редактирование статей

---

## 📝 Примечания для разработки бэкенда

### Требования к производительности:
- Время ответа API: < 200ms для простых запросов, < 1s для сложных
- Поддержка до 1000 одновременных пользователей
- Кэширование часто запрашиваемых данных

### Безопасность:
- HTTPS обязательно
- JWT токены с коротким временем жизни
- Rate limiting: 1000 запросов в час на пользователя
- Валидация всех входящих данных
- Логирование всех действий пользователей

### База данных:
- PostgreSQL рекомендуется
- Индексы на часто используемые поля (created_at, status, assigned_to)
- Архивирование старых тикетов
- Backup каждые 6 часов

### Мониторинг:
- Логирование всех API запросов
- Метрики производительности
- Алерты при ошибках
- Health check эндпоинт: `GET /health`

### WebSockets:
- Реальное время обновления для тикетов
- Уведомления о новых сообщениях
- Статус онлайн сотрудников

Этот контракт служит основой для разработки бэкенда и интеграции с фронтенд приложением.