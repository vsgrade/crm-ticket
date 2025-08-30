// API типы для централизованного управления данными

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: any;
}

// Типы для фильтров тикетов
export interface TicketFilters {
  status?: string[];
  priority?: string[];
  departments?: string[];
  assignedTo?: string[];
  source?: string[];
  slaStatus?: string[];
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  search?: string;
}

// Типы для создания/обновления тикетов
export interface CreateTicketRequest {
  subject: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  source: 'telegram' | 'whatsapp' | 'whatsapp-business' | 'vk' | 'sms' | 'email' | 'android';
  clientId: string;
  assignedTo?: string[];
  departments?: string[];
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface UpdateTicketRequest {
  subject?: string;
  status?: 'new' | 'in-progress' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string[];
  departments?: string[];
  tags?: string[];
  customFields?: Record<string, any>;
}

// Типы для сообщений
export interface CreateMessageRequest {
  content: string;
  type: 'text' | 'image' | 'file';
  isInternal: boolean;
  attachments?: string[];
}

// Типы для клиентов
export interface CreateClientRequest {
  name: string;
  email?: string;
  phone?: string;
  messengerIds?: {
    telegram?: string;
    whatsapp?: string;
    vk?: string;
  };
  location?: string;
  company?: string;
  customFields?: Record<string, any>;
}

export interface UpdateClientRequest extends Partial<CreateClientRequest> {}

// Типы для сотрудников
export interface CreateEmployeeRequest {
  name: string;
  email: string;
  role: string;
  departments: string[];
  permissions: string[];
  customFields?: Record<string, any>;
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {}

// Типы для отделов
export interface CreateDepartmentRequest {
  name: string;
  description: string;
  employees: string[];
  workingHours: {
    start: string;
    end: string;
    timezone: string;
    weekdays: number[];
  };
  isActive: boolean;
}

export interface UpdateDepartmentRequest extends Partial<CreateDepartmentRequest> {}

// Типы для файлов
export interface FileUploadResponse {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
}

// Типы для аутентификации
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
    departments: string[];
  };
  expiresIn: number;
}

// Типы для статистики
export interface DashboardStats {
  totalTickets: number;
  newTickets: number;
  inProgressTickets: number;
  resolvedToday: number;
  avgResponseTime: string;
  slaCompliance: number;
  activeAgents: number;
  totalClients: number;
  ticketTrends?: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
}

// Типы для отчетов
export interface ReportGenerateRequest {
  type: string;
  period: {
    from: string;
    to: string;
  };
  filters?: Record<string, any>;
  format: 'pdf' | 'excel' | 'csv';
}