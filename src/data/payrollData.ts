export interface WorkType {
  id: string;
  name: string;
  unit: string;
  pricePerUnit: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PayrollSheetItem {
  id: string;
  workTypeId: string;
  quantity: number;
  pricePerUnit: number; // Зафиксированная цена на момент создания
  total: number;
}

export interface PayrollSheet {
  id: string;
  employeeId: string;
  employeeName: string;
  periodStart: Date;
  periodEnd: Date;
  items: PayrollSheetItem[];
  totalAmount: number;
  status: 'draft' | 'approved' | 'paid';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Демо данные для видов работ
export const mockWorkTypes: WorkType[] = [
  {
    id: "wt-1",
    name: "Принятый звонок",
    unit: "шт",
    pricePerUnit: 10,
    description: "Обработка входящего звонка клиента",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "wt-2",
    name: "Ночная смена",
    unit: "смена",
    pricePerUnit: 500,
    description: "Работа в ночное время (с 23:00 до 7:00)",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "wt-3",
    name: "Обработка заказа",
    unit: "шт",
    pricePerUnit: 25,
    description: "Полная обработка заказа клиента",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "wt-4",
    name: "Консультация",
    unit: "час",
    pricePerUnit: 150,
    description: "Консультация клиента по продукту/услуге",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "wt-5",
    name: "Выездное обслуживание",
    unit: "выезд",
    pricePerUnit: 800,
    description: "Выезд к клиенту для решения проблем",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  }
];

// Демо данные для платежек
export const mockPayrollSheets: PayrollSheet[] = [
  {
    id: "ps-1",
    employeeId: "emp-1",
    employeeName: "Иванов Иван Иванович",
    periodStart: new Date("2024-02-01"),
    periodEnd: new Date("2024-02-29"),
    items: [
      {
        id: "psi-1",
        workTypeId: "wt-1",
        quantity: 250,
        pricePerUnit: 10,
        total: 2500
      },
      {
        id: "psi-2",
        workTypeId: "wt-2",
        quantity: 8,
        pricePerUnit: 500,
        total: 4000
      },
      {
        id: "psi-3",
        workTypeId: "wt-3",
        quantity: 45,
        pricePerUnit: 25,
        total: 1125
      }
    ],
    totalAmount: 7625,
    status: "approved",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-02"),
    createdBy: "admin"
  },
  {
    id: "ps-2",
    employeeId: "emp-2",
    employeeName: "Петрова Анна Сергеевна",
    periodStart: new Date("2024-02-01"),
    periodEnd: new Date("2024-02-29"),
    items: [
      {
        id: "psi-4",
        workTypeId: "wt-1",
        quantity: 180,
        pricePerUnit: 10,
        total: 1800
      },
      {
        id: "psi-5",
        workTypeId: "wt-4",
        quantity: 32,
        pricePerUnit: 150,
        total: 4800
      }
    ],
    totalAmount: 6600,
    status: "draft",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
    createdBy: "admin"
  },
  {
    id: "ps-3",
    employeeId: "emp-3",
    employeeName: "Сидоров Петр Андреевич",
    periodStart: new Date("2024-02-01"),
    periodEnd: new Date("2024-02-29"),
    items: [
      {
        id: "psi-6",
        workTypeId: "wt-5",
        quantity: 12,
        pricePerUnit: 800,
        total: 9600
      },
      {
        id: "psi-7",
        workTypeId: "wt-1",
        quantity: 95,
        pricePerUnit: 10,
        total: 950
      }
    ],
    totalAmount: 10550,
    status: "paid",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-05"),
    createdBy: "admin"
  }
];