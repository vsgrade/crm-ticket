// Демо данные для тикет-системы

export interface Ticket {
  id: string;
  subject: string;
  content: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  source: 'telegram' | 'whatsapp' | 'whatsapp-business' | 'vk' | 'sms' | 'email' | 'android';
  clientId: string;
  assignedTo: string[];
  departments: string[];
  createdAt: Date;
  updatedAt: Date;
  lastReply: Date;
  lastReplyBy: 'client' | 'agent';
  lastReplyByName?: string; // Имя того, кто дал последний ответ
  slaStatus: 'good' | 'warning' | 'critical';
  slaDeadline: Date;
  tags: string[];
  hasAttachments: boolean;
  internalNotes: any[];
  messages: any[];
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  messengerIds: {
    telegram?: string;
    whatsapp?: string;
    vk?: string;
  };
  ticketsCount: number;
  lastTicketDate: Date;
  location?: string;
  company?: string;
  customFields: Record<string, any>;
  rating?: number;
  totalSpent?: number;
  registrationDate: Date;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  departments: string[];
  isOnline: boolean;
  lastSeen: Date;
  ticketsAssigned: number;
  ticketsResolved: number;
  avgResponseTime: number;
  permissions: string[];
  customFields: Record<string, any>;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  employees: string[];
  integrations: any[];
  workingHours: {
    start: string;
    end: string;
    timezone: string;
    weekdays: number[];
  };
  slaRules: any[];
  isActive: boolean;
}

// Демо данные
export const mockClients: Client[] = [
  {
    id: "1",
    name: "Анна Петрова",
    email: "anna@example.com",
    phone: "+7 999 123-45-67",
    messengerIds: { telegram: "@anna_p", whatsapp: "+7999123456" },
    ticketsCount: 15,
    lastTicketDate: new Date("2024-01-15T10:30:00"),
    location: "Москва",
    company: "ООО Технологии",
    customFields: { vip: true, segment: "enterprise" },
    rating: 4.8,
    totalSpent: 125000,
    registrationDate: new Date("2023-06-15")
  },
  {
    id: "2", 
    name: "Иван Сидоров",
    email: "ivan@company.ru",
    phone: "+7 912 876-54-32",
    messengerIds: { telegram: "@ivan_s", vk: "ivan.sidorov" },
    ticketsCount: 8,
    lastTicketDate: new Date("2024-01-14T15:45:00"),
    location: "СПб",
    company: "ИП Сидоров",
    customFields: { segment: "smb" },
    rating: 4.2,
    totalSpent: 45000,
    registrationDate: new Date("2023-09-12")
  }
];

export const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Мария Иванова",
    email: "maria@company.com",
    role: "Старший агент поддержки", 
    departments: ["support", "sales"],
    isOnline: true,
    lastSeen: new Date(),
    ticketsAssigned: 47,
    ticketsResolved: 234,
    avgResponseTime: 15,
    permissions: ["tickets.view", "tickets.edit", "kb.create"],
    customFields: { experience: "3 года", level: "senior" }
  },
  {
    id: "2",
    name: "Алексей Петров",
    email: "alex@company.com", 
    role: "Агент поддержки",
    departments: ["support"],
    isOnline: false,
    lastSeen: new Date("2024-01-15T17:30:00"),
    ticketsAssigned: 23,
    ticketsResolved: 156,
    avgResponseTime: 28,
    permissions: ["tickets.view", "tickets.edit"],
    customFields: { experience: "1 год", level: "junior" }
  }
];

export const mockDepartments: Department[] = [
  {
    id: "support",
    name: "Техническая поддержка",
    description: "Решение технических вопросов клиентов",
    employees: ["1", "2"],
    integrations: [
      { type: "telegram", name: "Support Bot", status: "active" },
      { type: "whatsapp", name: "WhatsApp Business", status: "active" },
      { type: "email", name: "support@company.com", status: "active" }
    ],
    workingHours: {
      start: "09:00",
      end: "18:00", 
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    slaRules: [],
    isActive: true
  },
  {
    id: "sales",
    name: "Отдел продаж",
    description: "Консультации по продуктам и услугам",
    employees: ["1"],
    integrations: [
      { type: "telegram", name: "Sales Bot", status: "active" },
      { type: "whatsapp", name: "Sales WhatsApp", status: "warning" }
    ],
    workingHours: {
      start: "10:00",
      end: "19:00",
      timezone: "Europe/Moscow", 
      weekdays: [1, 2, 3, 4, 5]
    },
    slaRules: [],
    isActive: true
  },
  {
    id: "billing",
    name: "Биллинг и оплата",
    description: "Вопросы по счетам и платежам",
    employees: ["1", "2"],
    integrations: [
      { type: "email", name: "billing@company.com", status: "active" }
    ],
    workingHours: {
      start: "09:00",
      end: "18:00",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    slaRules: [],
    isActive: true
  },
  {
    id: "hr",
    name: "Отдел кадров",
    description: "Работа с персоналом",
    employees: ["2"],
    integrations: [],
    workingHours: {
      start: "09:00",
      end: "18:00",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    slaRules: [],
    isActive: true
  },
  {
    id: "marketing",
    name: "Маркетинг",
    description: "Реклама и продвижение",
    employees: ["1"],
    integrations: [
      { type: "telegram", name: "Marketing Bot", status: "active" }
    ],
    workingHours: {
      start: "10:00",
      end: "19:00",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    slaRules: [],
    isActive: true
  },
  {
    id: "development",
    name: "Разработка",
    description: "Техническое развитие продукта",
    employees: ["2"],
    integrations: [],
    workingHours: {
      start: "10:00",
      end: "19:00",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    slaRules: [],
    isActive: true
  },
  {
    id: "legal",
    name: "Юридический отдел",
    description: "Правовые вопросы",
    employees: ["1"],
    integrations: [
      { type: "email", name: "legal@company.com", status: "active" }
    ],
    workingHours: {
      start: "09:00",
      end: "18:00",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    slaRules: [],
    isActive: true
  },
  {
    id: "security",
    name: "Безопасность",
    description: "Информационная безопасность",
    employees: ["2"],
    integrations: [],
    workingHours: {
      start: "00:00",
      end: "23:59",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5, 6, 7]
    },
    slaRules: [],
    isActive: true
  },
  {
    id: "analytics",
    name: "Аналитика",
    description: "Анализ данных и отчетность",
    employees: ["1"],
    integrations: [],
    workingHours: {
      start: "09:00",
      end: "18:00",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    slaRules: [],
    isActive: true
  },
  {
    id: "operations",
    name: "Операционный отдел",
    description: "Операционная деятельность",
    employees: ["1", "2"],
    integrations: [
      { type: "telegram", name: "Operations Bot", status: "active" }
    ],
    workingHours: {
      start: "09:00",
      end: "18:00",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    slaRules: [],
    isActive: true
  },
  {
    id: "quality",
    name: "Контроль качества",
    description: "Обеспечение качества услуг",
    employees: ["1"],
    integrations: [],
    workingHours: {
      start: "09:00",
      end: "18:00",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    slaRules: [],
    isActive: true
  },
  {
    id: "procurement",
    name: "Закупки",
    description: "Снабжение и закупки",
    employees: ["2"],
    integrations: [
      { type: "email", name: "procurement@company.com", status: "active" }
    ],
    workingHours: {
      start: "09:00",
      end: "18:00",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    slaRules: [],
    isActive: true
  }
];

const generateMockTickets = (): Ticket[] => {
  const tickets: Ticket[] = [];
  const subjects = [
    "Проблема с авторизацией в системе", "Вопрос по тарифам", "Ошибка при оплате", "Не работает интеграция",
    "Проблема с доступом к API", "Вопрос по функционалу", "Ошибка в отчетах", "Проблема с уведомлениями",
    "Технические неполадки", "Вопрос по настройкам", "Проблема с синхронизацией", "Ошибка загрузки файлов",
    "Проблема с производительностью", "Вопрос по безопасности", "Ошибка в базе данных", "Проблема с мобильным приложением",
    "Вопрос по интеграции", "Проблема с резервными копиями", "Ошибка в системе уведомлений", "Проблема с сертификатами",
    "Вопрос по лицензированию", "Проблема с балансом", "Ошибка импорта данных", "Проблема с экспортом отчетов",
    "Вопрос по настройке webhook", "Проблема с двухфакторной аутентификацией", "Ошибка в системе логирования"
  ];
  
  const contents = [
    "Добрый день! Возникла проблема с системой, не могу разобраться самостоятельно.",
    "Здравствуйте! Нужна помощь с настройкой, подскажите пожалуйста.",
    "Привет! Столкнулся с ошибкой, помогите решить.",
    "Доброе утро! Есть вопрос по функционалу системы.", 
    "Здравствуйте! Нужна консультация по использованию сервиса.",
    "Добрый вечер! Помогите разобраться с настройками.",
    "Привет! Возникли сложности, нужна техническая поддержка."
  ];

  const statuses: Array<'new' | 'in-progress' | 'resolved' | 'closed'> = ['new', 'in-progress', 'resolved', 'closed'];
  const priorities: Array<'low' | 'medium' | 'high' | 'critical'> = ['low', 'medium', 'high', 'critical'];
  const sources: Array<'telegram' | 'whatsapp' | 'whatsapp-business' | 'vk' | 'sms' | 'email' | 'android'> = 
    ['telegram', 'whatsapp', 'whatsapp-business', 'vk', 'sms', 'email', 'android'];
  const slaStatuses: Array<'good' | 'warning' | 'critical'> = ['good', 'warning', 'critical'];

  for (let i = 1; i <= 82; i++) {
    const createdDate = new Date(2024, 0, Math.floor(Math.random() * 15) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    const lastReplyDate = new Date(createdDate.getTime() + Math.random() * 24 * 60 * 60 * 1000);
    
    tickets.push({
      id: `TIC-2024-${String(i).padStart(3, '0')}`,
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      content: contents[Math.floor(Math.random() * contents.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      clientId: Math.random() > 0.5 ? "1" : "2",
      assignedTo: Math.random() > 0.3 ? [Math.random() > 0.5 ? "1" : "2"] : [],
      departments: [["support", "sales", "billing", "hr", "marketing"][Math.floor(Math.random() * 5)]],
      createdAt: createdDate,
      updatedAt: lastReplyDate,
      lastReply: lastReplyDate,
      lastReplyBy: Math.random() > 0.5 ? 'client' : 'agent',
      slaStatus: slaStatuses[Math.floor(Math.random() * slaStatuses.length)],
      slaDeadline: new Date(createdDate.getTime() + 4 * 60 * 60 * 1000),
      tags: [`тег${Math.floor(Math.random() * 10) + 1}`, `категория${Math.floor(Math.random() * 5) + 1}`],
      hasAttachments: Math.random() > 0.7,
      internalNotes: [],
      messages: [
        {
          id: "1",
          content: contents[Math.floor(Math.random() * contents.length)],
          author: "client",
          timestamp: createdDate,
          type: "text"
        }
      ]
    });
  }

  return tickets;
};

export const mockTickets: Ticket[] = generateMockTickets();

// Статистика для дашборда
export const mockStats = {
  totalTickets: 324,
  newTickets: 47,
  inProgressTickets: 156,
  resolvedToday: 23,
  avgResponseTime: "1ч 23м",
  slaCompliance: 94.2,
  activeAgents: 12,
  totalClients: 1247
};