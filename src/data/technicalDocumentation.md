# Техническое описание тикет-системы TicketPro Enterprise

## 📋 Обзор системы

TicketPro Enterprise - это масштабируемая многоканальная тикет-система с интеграцией мессенджеров, ИИ-помощником и расширенными возможностями управления.

## 🏗️ Архитектура системы

### Frontend
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui компоненты
- **Routing**: React Router v6
- **State Management**: TanStack Query для серверного состояния
- **Build Tool**: Vite

### Дизайн-система
- Темная тема с синими акцентами для премиального вида
- Семантические токены для всех цветов и стилей
- Градиенты и тени для создания глубины
- Адаптивный дизайн для всех устройств

### Backend (Планируется)
- **Framework**: Node.js + Express / NestJS
- **Database**: PostgreSQL с Redis для кэширования
- **Auth**: JWT + OAuth2
- **File Storage**: S3-совместимое хранилище
- **Queue**: Redis/BullMQ для обработки сообщений

## 📱 Интеграции мессенджеров

### Telegram
```typescript
// Webhook обработчик
app.post('/webhook/telegram/:botToken', async (req, res) => {
  const { message } = req.body;
  const ticket = await createOrUpdateTicket({
    source: 'telegram',
    clientId: message.from.id,
    content: message.text,
    chatId: message.chat.id
  });
  res.sendStatus(200);
});
```

### WhatsApp Business API
```typescript
// Meta Business API интеграция
const sendWhatsAppMessage = async (to: string, message: string) => {
  return await fetch(`https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      text: { body: message }
    })
  });
};
```

### WhatsApp через QR-код
```typescript
// Использование whatsapp-web.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('message', async message => {
  const ticket = await createOrUpdateTicket({
    source: 'whatsapp',
    clientId: message.from,
    content: message.body,
    hasAttachments: message.hasMedia
  });
});
```

## 🎫 Система тикетов

### Модель данных
```typescript
interface Ticket {
  id: string; // TIC-YYYY-NNN формат
  subject: string;
  content: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  source: MessengerType;
  clientId: string;
  assignedTo: string[];
  departments: string[];
  createdAt: Date;
  updatedAt: Date;
  lastReply: Date;
  lastReplyBy: 'client' | 'agent';
  slaStatus: 'good' | 'warning' | 'critical';
  slaDeadline: Date;
  tags: string[];
  messages: Message[];
  internalNotes: InternalNote[];
  attachments: Attachment[];
  customFields: Record<string, any>;
}
```

### Внутренняя переписка
```typescript
interface InternalNote {
  id: string;
  ticketId: string;
  authorId: string;
  content: string;
  timestamp: Date;
  isInternal: true;
  mentions?: string[]; // ID сотрудников
}
```

## ⏱️ SLA система

### Правила SLA
```typescript
interface SLARule {
  id: string;
  name: string;
  conditions: {
    priority?: Priority[];
    departments?: string[];
    source?: MessengerType[];
    clientSegment?: string[];
  };
  targets: {
    firstResponseTime: number; // минуты
    resolutionTime: number; // минуты
  };
  workingHours: WorkingHours;
  isActive: boolean;
}
```

### Расчет SLA
```typescript
const calculateSLAStatus = (ticket: Ticket, rule: SLARule): SLAStatus => {
  const now = new Date();
  const deadline = addBusinessTime(
    ticket.createdAt, 
    rule.targets.firstResponseTime,
    rule.workingHours
  );
  
  const timeLeft = deadline.getTime() - now.getTime();
  const totalTime = rule.targets.firstResponseTime * 60 * 1000;
  
  if (timeLeft < 0) return 'critical'; // Просрочен
  if (timeLeft < totalTime * 0.2) return 'warning'; // < 20% времени
  return 'good';
};
```

## 👥 Система прав доступа

### Модель прав
```typescript
interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  resource: string; // tickets, clients, staff, etc.
  action: string; // view, create, edit, delete
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
  isSystem: boolean;
}

interface Employee {
  id: string;
  roles: string[];
  permissions: string[]; // Дополнительные права
  departments: string[];
}
```

### Проверка прав
```typescript
const hasPermission = (
  employee: Employee, 
  resource: string, 
  action: string
): boolean => {
  const allPermissions = [
    ...employee.permissions,
    ...employee.roles.flatMap(roleId => 
      roles.find(r => r.id === roleId)?.permissions || []
    )
  ];
  
  return allPermissions.includes(`${resource}.${action}`);
};
```

## 📊 Продвинутая таблица

### Конфигурация колонок
```typescript
interface TableColumn {
  id: string;
  label: string;
  width?: number;
  visible: boolean;
  sortable: boolean;
  filterable: boolean;
  render?: (value: any, row: any) => ReactNode;
}

interface TableState {
  columns: TableColumn[];
  sortBy?: string;
  sortDirection: 'asc' | 'desc';
  filters: Record<string, any>;
  pageSize: number;
  currentPage: number;
}
```

### Сохранение настроек
```typescript
const saveTableState = (tableId: string, state: TableState) => {
  localStorage.setItem(`table_${tableId}`, JSON.stringify(state));
};

const loadTableState = (tableId: string): TableState | null => {
  const saved = localStorage.getItem(`table_${tableId}`);
  return saved ? JSON.parse(saved) : null;
};
```

## 🔍 Система фильтров

### Конфигурация фильтров
```typescript
interface Filter {
  id: string;
  name: string;
  type: 'select' | 'multiselect' | 'date' | 'daterange' | 'text';
  options?: FilterOption[];
  value: any;
}

interface SavedFilter {
  id: string;
  name: string;
  filters: Filter[];
  userId: string;
  isPublic: boolean;
  createdAt: Date;
}
```

### Применение фильтров
```typescript
const applyFilters = (tickets: Ticket[], filters: Filter[]): Ticket[] => {
  return tickets.filter(ticket => {
    return filters.every(filter => {
      switch (filter.type) {
        case 'select':
          return filter.value ? ticket[filter.id] === filter.value : true;
        case 'multiselect':
          return filter.value?.length ? 
            filter.value.includes(ticket[filter.id]) : true;
        case 'daterange':
          const [start, end] = filter.value || [];
          const ticketDate = ticket[filter.id];
          return start && end ? 
            ticketDate >= start && ticketDate <= end : true;
        default:
          return true;
      }
    });
  });
};
```

## 🧠 ИИ интеграция

### Анализ тикетов
```typescript
const analyzeTicket = async (content: string): Promise<TicketAnalysis> => {
  const response = await fetch('/api/ai/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  
  return response.json(); // { category, priority, sentiment, suggestedResponse }
};
```

### Предложение ответов
```typescript
const suggestResponse = async (
  ticketContent: string, 
  conversationHistory: Message[]
): Promise<string> => {
  const context = {
    ticket: ticketContent,
    history: conversationHistory.slice(-5), // Последние 5 сообщений
    knowledgeBase: await searchKnowledgeBase(ticketContent)
  };
  
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: SUPPORT_AGENT_PROMPT },
      { role: 'user', content: JSON.stringify(context) }
    ]
  });
  
  return response.data.choices[0].message.content;
};
```

## 📚 База знаний

### Структура данных
```typescript
interface KnowledgeCategory {
  id: string;
  name: string;
  parentId?: string;
  children: KnowledgeCategory[];
  articles: KnowledgeArticle[];
}

interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  tags: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  isPublished: boolean;
  attachments: Attachment[];
}
```

### Поиск
```typescript
const searchKnowledgeBase = async (query: string): Promise<SearchResult[]> => {
  // Full-text поиск с ранжированием
  const results = await db.query(`
    SELECT *, 
           ts_rank(search_vector, plainto_tsquery($1)) as rank
    FROM knowledge_articles 
    WHERE search_vector @@ plainto_tsquery($1)
    ORDER BY rank DESC
    LIMIT 10
  `, [query]);
  
  return results.rows;
};
```

## 🔗 REST API

### Эндпоинты тикетов
```typescript
// GET /api/tickets
// POST /api/tickets
// GET /api/tickets/:id
// PUT /api/tickets/:id
// DELETE /api/tickets/:id
// POST /api/tickets/:id/messages
// GET /api/tickets/:id/history

// Создание тикета
app.post('/api/tickets', async (req, res) => {
  const ticket = await createTicket({
    ...req.body,
    createdBy: req.user.id
  });
  
  // Применение SLA правил
  const slaRule = await findMatchingSLARule(ticket);
  if (slaRule) {
    ticket.slaDeadline = calculateSLADeadline(ticket, slaRule);
    await updateTicket(ticket.id, { slaDeadline: ticket.slaDeadline });
  }
  
  // ИИ анализ
  const analysis = await analyzeTicket(ticket.content);
  await updateTicket(ticket.id, {
    aiSuggestedCategory: analysis.category,
    aiSuggestedPriority: analysis.priority
  });
  
  res.json(ticket);
});
```

### Webhooks
```typescript
// Регистрация webhook
app.post('/api/webhooks', async (req, res) => {
  const webhook = await createWebhook({
    url: req.body.url,
    events: req.body.events, // ['ticket.created', 'ticket.updated']
    secret: generateSecret(),
    userId: req.user.id
  });
  
  res.json(webhook);
});

// Отправка webhook
const sendWebhook = async (event: string, data: any) => {
  const webhooks = await getActiveWebhooks(event);
  
  for (const webhook of webhooks) {
    const signature = createHMAC(webhook.secret, data);
    
    try {
      await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature,
          'X-Webhook-Event': event
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error(`Webhook failed: ${webhook.url}`, error);
    }
  }
};
```

## 📱 Мобильное приложение

### React Native структура
```
mobile/
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── services/
│   └── types/
├── android/
├── ios/
└── package.json
```

### Синхронизация данных
```typescript
// React Native
const syncTickets = async () => {
  const lastSync = await AsyncStorage.getItem('lastSync');
  const response = await api.get(`/tickets/sync?since=${lastSync}`);
  
  await SQLite.transaction(tx => {
    response.data.forEach(ticket => {
      tx.executeSql(
        'INSERT OR REPLACE INTO tickets VALUES (?, ?, ?, ?)',
        [ticket.id, ticket.subject, ticket.status, JSON.stringify(ticket)]
      );
    });
  });
  
  await AsyncStorage.setItem('lastSync', new Date().toISOString());
};
```

## 🔐 Безопасность

### Аутентификация
```typescript
// JWT токены
const generateTokens = (user: User) => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId: user.id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
};
```

### Rate Limiting
```typescript
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов
  message: 'Слишком много запросов, попробуйте позже'
});

app.use('/api/', rateLimiter);
```

## 📊 Мониторинг и метрики

### Ключевые метрики
- Время первого ответа (First Response Time)
- Время решения (Resolution Time)
- Соблюдение SLA (SLA Compliance)
- Загрузка агентов (Agent Workload)
- Удовлетворенность клиентов (CSAT)
- Количество эскалаций

### Экспорт отчетов
```typescript
const generateReport = async (params: ReportParams): Promise<Buffer> => {
  const data = await getReportData(params);
  
  if (params.format === 'excel') {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Отчет');
    
    // Добавление данных
    data.forEach(row => worksheet.addRow(row));
    
    return await workbook.xlsx.writeBuffer();
  }
  
  if (params.format === 'pdf') {
    const pdf = new PDFDocument();
    // Генерация PDF
    return pdf;
  }
};
```

## 🚀 Развертывание

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ticket-system
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ticket-system
  template:
    metadata:
      labels:
        app: ticket-system
    spec:
      containers:
      - name: ticket-system
        image: ticketpro:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
```

## 🔄 Интеграции

### Email (IMAP/SMTP)
```typescript
const imapClient = new IMAP({
  host: 'imap.gmail.com',
  port: 993,
  secure: true,
  auth: { user: EMAIL, pass: PASSWORD }
});

imapClient.on('mail', async (numNewMsgs) => {
  const messages = await fetchNewMessages();
  
  for (const message of messages) {
    await createTicket({
      source: 'email',
      subject: message.subject,
      content: message.text,
      clientEmail: message.from[0].address
    });
  }
});
```

### SMS
```typescript
const sendSMS = async (to: string, message: string) => {
  return await twilio.messages.create({
    body: message,
    from: TWILIO_PHONE_NUMBER,
    to
  });
};

app.post('/webhook/sms', (req, res) => {
  const { From, Body } = req.body;
  
  createTicket({
    source: 'sms',
    clientPhone: From,
    content: Body
  });
  
  res.sendStatus(200);
});
```

## 📈 Производительность

### Кэширование
```typescript
// Redis кэш
const getTickets = async (filters: any): Promise<Ticket[]> => {
  const cacheKey = `tickets:${JSON.stringify(filters)}`;
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const tickets = await db.query(buildQuery(filters));
  await redis.setex(cacheKey, 300, JSON.stringify(tickets)); // 5 минут
  
  return tickets;
};
```

### Пагинация
```typescript
const getTicketsPaginated = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  
  const [tickets, total] = await Promise.all([
    db.query('SELECT * FROM tickets ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]),
    db.query('SELECT COUNT(*) FROM tickets')
  ]);
  
  return {
    data: tickets.rows,
    pagination: {
      page,
      limit,
      total: parseInt(total.rows[0].count),
      pages: Math.ceil(total.rows[0].count / limit)
    }
  };
};
```

---

*Данный документ представляет техническое описание системы TicketPro Enterprise. Все примеры кода являются демонстрационными и требуют адаптации под конкретные требования проекта.*