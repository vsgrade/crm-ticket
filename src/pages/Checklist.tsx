import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckSquare, 
  Clock, 
  XCircle, 
  AlertTriangle,
  Zap,
  Globe,
  Smartphone,
  Bot,
  BarChart3,
  FileText,
  MessageSquare
} from "lucide-react";

interface ChecklistItem {
  id: string;
  category: string;
  feature: string;
  status: 'completed' | 'in-progress' | 'not-started' | 'completed-demo';
  comment: string;
  priority: 'high' | 'medium' | 'low';
  estimatedHours?: number;
  dependencies?: string[];
}

const checklistData: ChecklistItem[] = [
  // Основные функции
  {
    id: '1',
    category: 'Интеграции мессенджеров',
    feature: 'Интеграция Telegram',
    status: 'completed-demo',
    comment: 'Реализована с демо данными, требует настройки бота',
    priority: 'high',
    estimatedHours: 8
  },
  {
    id: '2',
    category: 'Интеграции мессенджеров',
    feature: 'Интеграция WhatsApp Business',
    status: 'completed-demo',
    comment: 'API интеграция готова, нужен Business аккаунт',
    priority: 'high',
    estimatedHours: 12
  },
  {
    id: '3',
    category: 'Интеграции мессенджеров',
    feature: 'Интеграция WhatsApp (обычный через QR)',
    status: 'in-progress',
    comment: 'Разработка Web API интеграции',
    priority: 'high',
    estimatedHours: 16
  },
  {
    id: '4',
    category: 'Интеграции мессенджеров',
    feature: 'Интеграция ВКонтакте',
    status: 'completed-demo',
    comment: 'Callback API готов с заглушками',
    priority: 'medium',
    estimatedHours: 6
  },
  {
    id: '4.1',
    category: 'Интеграции мессенджеров',
    feature: 'Интеграция Яндекс мессенджер',
    status: 'not-started',
    comment: 'Подключение к Яндекс мессенджеру',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '4.2',
    category: 'Интеграции мессенджеров',
    feature: 'Интеграция MAX',
    status: 'not-started',
    comment: 'Интеграция с MAX мессенджером',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '4.3',
    category: 'Интеграции мессенджеров',
    feature: 'Telegram Business интеграция',
    status: 'not-started',
    comment: 'Интеграция с Telegram Business API',
    priority: 'medium',
    estimatedHours: 10
  },

  // Система тикетов
  {
    id: '5',
    category: 'Тикеты',
    feature: 'Создание и управление тикетами',
    status: 'completed-demo',
    comment: 'Полный CRUD с демо данными',
    priority: 'high',
    estimatedHours: 16
  },
  {
    id: '6',
    category: 'Тикеты',
    feature: 'Внутренняя переписка в тикетах',
    status: 'completed-demo',
    comment: 'Визуальное разделение сообщений реализовано',
    priority: 'high',
    estimatedHours: 8
  },
  {
    id: '7',
    category: 'Тикеты',
    feature: 'Отправка и просмотр изображений',
    status: 'completed-demo',
    comment: 'Загрузка и отображение с заглушками',
    priority: 'high',
    estimatedHours: 12
  },
  {
    id: '8',
    category: 'Тикеты',
    feature: 'Назначение нескольких сотрудников',
    status: 'completed-demo',
    comment: 'Multi-select интерфейс готов',
    priority: 'medium',
    estimatedHours: 4
  },
  {
    id: '8.1',
    category: 'Тикеты',
    feature: 'Индивидуальные поля тикетов',
    status: 'not-started',
    comment: 'Кастомные поля для расширения информации',
    priority: 'medium',
    estimatedHours: 16
  },
  {
    id: '8.2',
    category: 'Тикеты',
    feature: 'Теги для тикетов',
    status: 'not-started',
    comment: 'Система меток для категоризации',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '8.3',
    category: 'Тикеты',
    feature: 'Экспорт тикетов с шаблонами',
    status: 'not-started',
    comment: 'Настраиваемый экспорт данных',
    priority: 'low',
    estimatedHours: 12
  },
  {
    id: '8.4',
    category: 'Тикеты',
    feature: 'Инициация переписки с клиентом',
    status: 'not-started',
    comment: 'Возможность начать диалог с клиентом',
    priority: 'medium',
    estimatedHours: 6
  },
  {
    id: '8.5',
    category: 'Тикеты',
    feature: 'Упоминания пользователей (@user)',
    status: 'not-started',
    comment: 'Система уведомлений через @',
    priority: 'low',
    estimatedHours: 8
  },

  // SLA система
  {
    id: '9',
    category: 'SLA',
    feature: 'Создание правил SLA',
    status: 'completed-demo',
    comment: 'Конфигуратор правил с демо данными',
    priority: 'high',
    estimatedHours: 20
  },
  {
    id: '10',
    category: 'SLA',
    feature: 'Мониторинг и уведомления SLA',
    status: 'in-progress',
    comment: 'Базовый расчет готов, нужны уведомления',
    priority: 'high',
    estimatedHours: 16
  },
  {
    id: '11',
    category: 'SLA',
    feature: 'Отчетность по SLA',
    status: 'in-progress',
    comment: 'Статистика в разработке',
    priority: 'medium',
    estimatedHours: 12
  },

  // Система управления
  {
    id: '12',
    category: 'Управление',
    feature: 'Управление сотрудниками',
    status: 'completed-demo',
    comment: 'CRUD + права доступа с демо данными',
    priority: 'high',
    estimatedHours: 12
  },
  {
    id: '13',
    category: 'Управление',
    feature: 'Управление клиентами',
    status: 'completed-demo',
    comment: 'Профили клиентов с кастомными полями',
    priority: 'high',
    estimatedHours: 10
  },
  {
    id: '14',
    category: 'Управление',
    feature: 'Департаменты и настройки',
    status: 'completed-demo',
    comment: 'Конфигурация департаментов готова',
    priority: 'high',
    estimatedHours: 8
  },
  {
    id: '14.1',
    category: 'Управление',
    feature: 'Кабинет клиента',
    status: 'not-started',
    comment: 'Личный кабинет для клиентов',
    priority: 'medium',
    estimatedHours: 24
  },
  {
    id: '14.2',
    category: 'Управление',
    feature: 'Поля контактов и статусы сотрудников',
    status: 'not-started',
    comment: 'Расширенные профили и статусы',
    priority: 'low',
    estimatedHours: 12
  },

  // Фильтрация и поиск
  {
    id: '15',
    category: 'Интерфейс',
    feature: 'Таблица с сортировкой и фильтрами',
    status: 'completed-demo',
    comment: 'Продвинутая таблица с сохранением настроек',
    priority: 'high',
    estimatedHours: 24
  },
  {
    id: '16',
    category: 'Интерфейс',
    feature: 'Сохраняемые фильтры',
    status: 'in-progress',
    comment: 'Базовая логика готова, нужно сохранение в БД',
    priority: 'medium',
    estimatedHours: 8
  },

  // База знаний
  {
    id: '17',
    category: 'База знаний',
    feature: 'Структура категории → статьи',
    status: 'completed-demo',
    comment: 'Иерархическая структура с демо контентом',
    priority: 'medium',
    estimatedHours: 16
  },
  {
    id: '18',
    category: 'База знаний',
    feature: 'Поиск по статьям',
    status: 'completed-demo',
    comment: 'Full-text поиск с заглушками',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '19',
    category: 'База знаний',
    feature: 'ИИ предложения статей',
    status: 'in-progress',
    comment: 'Анализ контента и рекомендации',
    priority: 'low',
    estimatedHours: 20
  },
  {
    id: '19.1',
    category: 'База знаний',
    feature: 'Темы базы знаний',
    status: 'not-started',
    comment: 'Настройка визуального оформления',
    priority: 'low',
    estimatedHours: 8
  },
  {
    id: '19.2',
    category: 'База знаний',
    feature: 'Публичная база знаний',
    status: 'not-started',
    comment: 'Портал помощи для клиентов',
    priority: 'medium',
    estimatedHours: 20
  },

  // API и интеграции
  {
    id: '20',
    category: 'API',
    feature: 'REST API для всех функций',
    status: 'in-progress',
    comment: 'Основные эндпоинты в разработке',
    priority: 'high',
    estimatedHours: 40
  },
  {
    id: '21',
    category: 'API',
    feature: 'Документация API',
    status: 'in-progress',
    comment: 'OpenAPI спецификация',
    priority: 'high',
    estimatedHours: 16
  },
  {
    id: '22',
    category: 'API',
    feature: 'Webhook уведомления',
    status: 'not-started',
    comment: 'События системы для внешних интеграций',
    priority: 'medium',
    estimatedHours: 12
  },
  {
    id: '22.1',
    category: 'API',
    feature: 'Postman коллекция',
    status: 'not-started',
    comment: 'Готовые примеры запросов API',
    priority: 'low',
    estimatedHours: 4
  },
  {
    id: '22.2',
    category: 'API',
    feature: 'Выгрузка данных по API',
    status: 'not-started',
    comment: 'API для экспорта компаний и базы знаний',
    priority: 'medium',
    estimatedHours: 12
  },

  // ИИ функции
  {
    id: '23',
    category: 'ИИ',
    feature: 'Анализ и категоризация тикетов',
    status: 'completed-demo',
    comment: 'NLP анализ с демо предложениями',
    priority: 'medium',
    estimatedHours: 24
  },
  {
    id: '24',
    category: 'ИИ',
    feature: 'Автоматические ответы',
    status: 'in-progress',
    comment: 'Генерация ответов по шаблонам',
    priority: 'medium',
    estimatedHours: 16
  },
  {
    id: '25',
    category: 'ИИ',
    feature: 'Определение приоритета',
    status: 'completed-demo',
    comment: 'Автоматическая оценка важности',
    priority: 'low',
    estimatedHours: 8
  },
  {
    id: '25.1',
    category: 'ИИ',
    feature: 'AI-помощник (Суфлёр)',
    status: 'in-progress',
    comment: 'ИИ-анализ тикетов и предложение ответов',
    priority: 'high',
    estimatedHours: 32
  },
  {
    id: '25.2',
    category: 'ИИ',
    feature: 'AI чат-бот для клиентов',
    status: 'not-started',
    comment: 'Автоматические ответы клиентам',
    priority: 'medium',
    estimatedHours: 24
  },
  {
    id: '25.3',
    category: 'ИИ',
    feature: 'AI-бот от внешних провайдеров',
    status: 'not-started',
    comment: 'Интеграция с внешними AI сервисами',
    priority: 'low',
    estimatedHours: 16
  },

  // Дополнительные интеграции
  {
    id: '26',
    category: 'Интеграции',
    feature: 'SMS интеграция',
    status: 'in-progress',
    comment: 'API провайдеров SMS',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '27',
    category: 'Интеграции',
    feature: 'Email интеграция (IMAP/SMTP)',
    status: 'in-progress',
    comment: 'Почтовый клиент для тикетов',
    priority: 'high',
    estimatedHours: 20
  },
  {
    id: '28',
    category: 'Интеграции',
    feature: 'Android приложение',
    status: 'not-started',
    comment: 'Мобильное приложение для агентов',
    priority: 'low',
    estimatedHours: 80
  },
  {
    id: '28.1',
    category: 'Интеграции',
    feature: 'Gmail почта',
    status: 'not-started',
    comment: 'Специальная интеграция с Gmail',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '28.2',
    category: 'Интеграции',
    feature: 'Яндекс почта',
    status: 'not-started',
    comment: 'Интеграция с Яндекс почтой',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '28.3',
    category: 'Интеграции',
    feature: 'Mail.ru почта',
    status: 'not-started',
    comment: 'Интеграция с Mail.ru',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '28.4',
    category: 'Интеграции',
    feature: 'RocketData интеграция',
    status: 'not-started',
    comment: 'Интеграция с RocketData',
    priority: 'low',
    estimatedHours: 12
  },
  {
    id: '28.5',
    category: 'Интеграции',
    feature: 'IP-телефония',
    status: 'not-started',
    comment: 'Интеграция с телефонными системами',
    priority: 'medium',
    estimatedHours: 24
  },
  {
    id: '28.6',
    category: 'Интеграции',
    feature: 'LDAP/Active Directory',
    status: 'not-started',
    comment: 'Корпоративная аутентификация',
    priority: 'low',
    estimatedHours: 20
  },
  {
    id: '28.7',
    category: 'Интеграции',
    feature: 'Keycloak SSO (SAML)',
    status: 'not-started',
    comment: 'Единый вход через SAML',
    priority: 'low',
    estimatedHours: 16
  },
  {
    id: '28.8',
    category: 'Интеграции',
    feature: 'JWT единый вход',
    status: 'not-started',
    comment: 'JWT авторизация для внешних систем',
    priority: 'medium',
    estimatedHours: 12
  },

  // Система уведомлений
  {
    id: '29',
    category: 'Уведомления',
    feature: 'Push уведомления в браузере',
    status: 'completed-demo',
    comment: 'Web Push API реализован',
    priority: 'medium',
    estimatedHours: 6
  },
  {
    id: '30',
    category: 'Уведомления',
    feature: 'Email уведомления',
    status: 'in-progress',
    comment: 'Шаблоны писем и отправка',
    priority: 'medium',
    estimatedHours: 12
  },
  {
    id: '30.1',
    category: 'Уведомления',
    feature: 'Уведомления в WhatsApp',
    status: 'not-started',
    comment: 'Отправка уведомлений через WhatsApp',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '30.2',
    category: 'Уведомления',
    feature: 'Уведомления в Пачку',
    status: 'not-started',
    comment: 'Интеграция с мессенджером Пачка',
    priority: 'low',
    estimatedHours: 6
  },

  // Отчетность
  {
    id: '31',
    category: 'Отчеты',
    feature: 'Дашборд с метриками',
    status: 'completed-demo',
    comment: 'Визуализация KPI с демо данными',
    priority: 'high',
    estimatedHours: 16
  },
  {
    id: '32',
    category: 'Отчеты',
    feature: 'Экспорт в Excel/PDF',
    status: 'not-started',
    comment: 'Генерация отчетов в различных форматах',
    priority: 'low',
    estimatedHours: 12
  },
  {
    id: '32.1',
    category: 'Отчеты',
    feature: 'Конструктор отчётов',
    status: 'not-started',
    comment: 'Настраиваемые пользователем отчёты',
    priority: 'medium',
    estimatedHours: 20
  },
  {
    id: '32.2',
    category: 'Отчеты',
    feature: 'Отчёт по меткам',
    status: 'not-started',
    comment: 'Аналитика использования тегов',
    priority: 'low',
    estimatedHours: 8
  },
  {
    id: '32.3',
    category: 'Отчеты',
    feature: 'Эффективность сотрудников',
    status: 'not-started',
    comment: 'Метрики производительности агентов',
    priority: 'medium',
    estimatedHours: 16
  },
  {
    id: '32.4',
    category: 'Отчеты',
    feature: 'Глобальный аудит',
    status: 'not-started',
    comment: 'Полный журнал действий в системе',
    priority: 'medium',
    estimatedHours: 12
  },
  {
    id: '32.5',
    category: 'Отчеты',
    feature: 'CSAT опросники',
    status: 'not-started',
    comment: 'Расширенные опросы удовлетворённости',
    priority: 'medium',
    estimatedHours: 16
  },
  {
    id: '32.6',
    category: 'Отчеты',
    feature: 'Индекс удовлетворённости клиентов',
    status: 'not-started',
    comment: 'Система оценки качества обслуживания',
    priority: 'low',
    estimatedHours: 12
  },
  {
    id: '32.7',
    category: 'Отчеты',
    feature: 'Yandex Datalens интеграция',
    status: 'not-started',
    comment: 'Подключение к внешней аналитике',
    priority: 'low',
    estimatedHours: 8
  },
  {
    id: '32.8',
    category: 'Отчеты',
    feature: 'Отчёт по суфлёру (AI)',
    status: 'not-started',
    comment: 'Аналитика использования AI помощника',
    priority: 'low',
    estimatedHours: 6
  },

  // Омниканальность
  {
    id: '33.1',
    category: 'Омниканальность',
    feature: 'Онлайн-чат виджет',
    status: 'not-started',
    comment: 'Встраиваемый чат для сайтов',
    priority: 'high',
    estimatedHours: 24
  },
  {
    id: '33.2',
    category: 'Омниканальность',
    feature: 'Рабочее место оператора',
    status: 'not-started',
    comment: 'Единый интерфейс для всех каналов',
    priority: 'high',
    estimatedHours: 32
  },
  {
    id: '33.3',
    category: 'Омниканальность',
    feature: 'Кнопки быстрых действий',
    status: 'not-started',
    comment: 'Настраиваемые действия в интерфейсе',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '33.4',
    category: 'Омниканальность',
    feature: 'Отчёт по операторам',
    status: 'not-started',
    comment: 'Метрики работы в омниканальном режиме',
    priority: 'medium',
    estimatedHours: 12
  },
  {
    id: '33.5',
    category: 'Омниканальность',
    feature: 'Отчёт по каналам',
    status: 'not-started',
    comment: 'Аналитика эффективности каналов',
    priority: 'medium',
    estimatedHours: 12
  },

  // Автоматизация (Диспетчер)
  {
    id: '34.1',
    category: 'Автоматизация',
    feature: 'Диспетчер событий',
    status: 'not-started',
    comment: 'Система автоматических действий',
    priority: 'high',
    estimatedHours: 24
  },
  {
    id: '34.2',
    category: 'Автоматизация',
    feature: 'Чат-боты через диспетчера',
    status: 'not-started',
    comment: 'Создание ботов без программирования',
    priority: 'medium',
    estimatedHours: 20
  },
  {
    id: '34.3',
    category: 'Автоматизация',
    feature: 'Шаблоны уведомлений',
    status: 'not-started',
    comment: 'Настраиваемые шаблоны автоответов',
    priority: 'medium',
    estimatedHours: 12
  },
  {
    id: '34.4',
    category: 'Автоматизация',
    feature: 'Условная логика обработки',
    status: 'not-started',
    comment: 'Сложные правила автоматизации',
    priority: 'medium',
    estimatedHours: 16
  },
  {
    id: '34.5',
    category: 'Автоматизация',
    feature: 'Триггеры и правила',
    status: 'not-started',
    comment: 'Система событий и реакций',
    priority: 'medium',
    estimatedHours: 18
  },

  // Дополнительные функции
  {
    id: '35',
    category: 'Дополнительно',
    feature: 'Автосохранение черновиков',
    status: 'completed-demo',
    comment: 'LocalStorage сохранение',
    priority: 'low',
    estimatedHours: 4
  },
  {
    id: '36',
    category: 'Дополнительно',
    feature: 'История изменений тикета',
    status: 'completed-demo',
    comment: 'Audit log всех изменений',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '37',
    category: 'Дополнительно',
    feature: 'Мультиязычность',
    status: 'not-started',
    comment: 'i18n поддержка интерфейса',
    priority: 'low',
    estimatedHours: 20
  },
  {
    id: '38',
    category: 'Дополнительно',
    feature: 'Расписание работы департаментов',
    status: 'completed-demo',
    comment: 'График работы сотрудников',
    priority: 'medium',
    estimatedHours: 8
  },
  {
    id: '39',
    category: 'Дополнительно',
    feature: 'Система макросов',
    status: 'completed-demo',
    comment: 'Готовые шаблоны действий',
    priority: 'medium',
    estimatedHours: 6
  },
  {
    id: '40',
    category: 'Дополнительно',
    feature: 'Эскалация тикетов',
    status: 'completed-demo',
    comment: 'Автоматическая передача сложных вопросов',
    priority: 'high',
    estimatedHours: 12
  }
];

const Checklist = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckSquare className="h-4 w-4 text-success" />;
      case 'completed-demo':
        return <CheckSquare className="h-4 w-4 text-primary" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'not-started':
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/20 text-success">✅ Готово</Badge>;
      case 'completed-demo':
        return <Badge className="bg-primary/20 text-primary">🔧 Демо готово</Badge>;
      case 'in-progress':
        return <Badge className="bg-warning/20 text-warning">🔄 В разработке</Badge>;
      case 'not-started':
        return <Badge variant="outline">❌ Не начато</Badge>;
      default:
        return <Badge variant="destructive">⚠️ Проблема</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">Высокий</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-xs">Средний</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-xs">Низкий</Badge>;
      default:
        return null;
    }
  };

  // Статистика
  const totalItems = checklistData.length;
  const completedItems = checklistData.filter(item => item.status === 'completed').length;
  const completedDemoItems = checklistData.filter(item => item.status === 'completed-demo').length;
  const inProgressItems = checklistData.filter(item => item.status === 'in-progress').length;
  const notStartedItems = checklistData.filter(item => item.status === 'not-started').length;

  const completionPercentage = ((completedItems + completedDemoItems) / totalItems) * 100;

  // Группировка по категориям
  const groupedData = checklistData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Чеклист проекта</h1>
          <p className="text-muted-foreground">
            Статус реализации функционала тикет-системы
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Button className="btn-gradient" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Отчет
          </Button>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalItems}</div>
              <div className="text-sm text-muted-foreground">Всего функций</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-success/10 to-success/5">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{completedItems}</div>
              <div className="text-sm text-muted-foreground">Готово</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{completedDemoItems}</div>
              <div className="text-sm text-muted-foreground">Демо готово</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{inProgressItems}</div>
              <div className="text-sm text-muted-foreground">В работе</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-muted/10 to-muted/5">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">{notStartedItems}</div>
              <div className="text-sm text-muted-foreground">Не начато</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Прогресс */}
      <Card className="bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Общий прогресс
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Завершено (включая демо)</span>
              <span>{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="w-full" />
            <div className="text-xs text-muted-foreground">
              {completedItems + completedDemoItems} из {totalItems} функций реализовано
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Чеклист по категориям */}
      <div className="space-y-6">
        {Object.entries(groupedData).map(([category, items]) => {
          const categoryCompleted = items.filter(item => item.status === 'completed' || item.status === 'completed-demo').length;
          const categoryProgress = (categoryCompleted / items.length) * 100;

          return (
            <Card key={category} className="bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {category === 'Интеграции мессенджеров' && <MessageSquare className="h-5 w-5" />}
                    {category === 'Тикеты' && <CheckSquare className="h-5 w-5" />}
                    {category === 'ИИ' && <Bot className="h-5 w-5" />}
                    {category === 'API' && <Globe className="h-5 w-5" />}
                    {category === 'Интеграции' && <Zap className="h-5 w-5" />}
                    {category === 'Дополнительно' && <AlertTriangle className="h-5 w-5" />}
                    {!['Интеграции мессенджеров', 'Тикеты', 'ИИ', 'API', 'Интеграции', 'Дополнительно'].includes(category) && <FileText className="h-5 w-5" />}
                    {category}
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-sm font-medium">{Math.round(categoryProgress)}%</div>
                    <div className="text-xs text-muted-foreground">{categoryCompleted}/{items.length}</div>
                  </div>
                </div>
                <Progress value={categoryProgress} className="w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-accent/30 border border-border/50">
                      <div className="flex-shrink-0">
                        {getStatusIcon(item.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{item.feature}</span>
                          {getPriorityBadge(item.priority)}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.comment}</div>
                        {item.estimatedHours && (
                          <div className="text-xs text-muted-foreground mt-1">
                            ⏱️ Оценка: {item.estimatedHours}ч
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Checklist;