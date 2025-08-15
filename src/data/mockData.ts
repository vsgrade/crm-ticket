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
  }
];

export const mockTickets: Ticket[] = [
  {
    id: "TIC-2024-001",
    subject: "Проблема с авторизацией в системе",
    content: "Здравствуйте! Не могу войти в личный кабинет. Ошибка 'Неверный пароль', хотя пароль точно правильный.",
    status: "new",
    priority: "high",
    source: "telegram",
    clientId: "1",
    assignedTo: [],
    departments: ["support"],
    createdAt: new Date("2024-01-15T14:30:00"),
    updatedAt: new Date("2024-01-15T14:30:00"),
    lastReply: new Date("2024-01-15T14:30:00"),
    lastReplyBy: "client",
    slaStatus: "warning",
    slaDeadline: new Date("2024-01-15T16:30:00"),
    tags: ["авторизация", "пароль"],
    hasAttachments: false,
    internalNotes: [],
    messages: [
      {
        id: "1",
        content: "Здравствуйте! Не могу войти в личный кабинет. Ошибка 'Неверный пароль', хотя пароль точно правильный.",
        author: "client",
        timestamp: new Date("2024-01-15T14:30:00"),
        type: "text"
      }
    ]
  },
  {
    id: "TIC-2024-002", 
    subject: "Вопрос по тарифам",
    content: "Добрый день! Хотел бы узнать подробности о корпоративном тарифе. Какие возможности включены?",
    status: "in-progress",
    priority: "medium",
    source: "whatsapp",
    clientId: "2",
    assignedTo: ["1"],
    departments: ["sales"],
    createdAt: new Date("2024-01-15T12:15:00"),
    updatedAt: new Date("2024-01-15T13:45:00"),
    lastReply: new Date("2024-01-15T13:45:00"),
    lastReplyBy: "agent", 
    slaStatus: "good",
    slaDeadline: new Date("2024-01-16T12:15:00"),
    tags: ["тарифы", "корпоративный"],
    hasAttachments: true,
    internalNotes: [
      {
        id: "1",
        content: "Клиент интересуется корпоративным тарифом. Уже отправил презентацию.",
        author: "1",
        timestamp: new Date("2024-01-15T13:00:00")
      }
    ],
    messages: [
      {
        id: "1",
        content: "Добрый день! Хотел бы узнать подробности о корпоративном тарифе. Какие возможности включены?",
        author: "client",
        timestamp: new Date("2024-01-15T12:15:00"),
        type: "text"
      },
      {
        id: "2",
        content: "Здравствуйте! Спасибо за обращение. Отправляю вам презентацию с подробным описанием корпоративного тарифа.",
        author: "agent",
        authorId: "1",
        timestamp: new Date("2024-01-15T13:45:00"),
        type: "text",
        attachments: ["corporate_plan.pdf"]
      }
    ]
  }
];

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