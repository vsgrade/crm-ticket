import { useState, useMemo, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  MessageSquare, 
  MessageCircle,
  Paperclip,
  Plus,
  User,
  Download,
  Settings,
  Filter,
  Archive,
  Flag,
  Calendar,
  Clock,
  UserPlus,
  Tag
} from "lucide-react";

// MOCK: Импорт моковых данных - заменить на API сервисы
// TODO: Удалить импорты mockData после полной интеграции с бэкендом
import { mockTickets, mockClients, mockEmployees, Ticket, Client, Employee } from "@/data/mockData";

// API SERVICES: Централизованные сервисы для работы с данными
// TODO: Все вызовы этих сервисов заменятся на реальные API запросы при подключении бэкенда
import { ticketsService } from "@/services/tickets";
import { clientsService } from "@/services/clients";
import { employeesService } from "@/services/employees";
import { storageService } from "@/services/storage";

// UI COMPONENTS: Импорт компонентов интерфейса
import CreateTicketModal from "@/components/modals/CreateTicketModal";
import TicketDetailModal from "@/components/modals/TicketDetailModal";
import FullPageTicketModal from "@/components/modals/FullPageTicketModal";
import TicketFilters, { TicketFilter } from "@/components/TicketFilters";
import TicketCustomFieldsModal from "@/components/modals/TicketCustomFieldsModal";
import TicketTagsModal from "@/components/modals/TicketTagsModal";
import TicketExportModal from "@/components/modals/TicketExportModal";
import InitiateConversationModal from "@/components/modals/InitiateConversationModal";
import ColumnSettings, { ColumnConfig } from "@/components/ColumnSettings";
import ResizableTableHeader from "@/components/ResizableTableHeader";

const Tickets = () => {
  // STATE MANAGEMENT: Состояние модальных окон и выбранных элементов
  // TODO: При интеграции с WebSocket добавить real-time обновления состояния
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketDetailOpen, setTicketDetailOpen] = useState(false);
  const [fullPageOpen, setFullPageOpen] = useState(false);
  const [customFieldsOpen, setCustomFieldsOpen] = useState(false);
  const [tagsModalOpen, setTagsModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [conversationModalOpen, setConversationModalOpen] = useState(false);
  
  // FILTERS & SEARCH: Состояние фильтров и поиска
  // TODO: При интеграции с бэкендом добавить сохранение фильтров на сервере
  const [filter, setFilter] = useState<TicketFilter>({});
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  
  // SORTING: Состояние сортировки таблицы
  // TODO: Сортировка будет выполняться на бэкенде через API параметры
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // DATA LOADING: Состояние загрузки данных
  // TODO: Эти состояния будут управляться API сервисами
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>(mockClients); // MOCK: Временно используем моки
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees); // MOCK: Временно используем моки
  
  // COLUMN CONFIGURATION: Настройки отображения колонок таблицы
  // TODO: Настройки колонок будут сохраняться в профиле пользователя на бэкенде
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: 'select', label: 'Выбор', visible: true, resizable: false, sortable: false },
    { id: 'id', label: 'ID', visible: true, resizable: true, sortable: true },
    { id: 'subject', label: 'Тема', visible: true, resizable: true, sortable: true },
    { id: 'client', label: 'Клиент', visible: true, resizable: true, sortable: true },
    { id: 'status', label: 'Статус', visible: true, resizable: true, sortable: true },
    { id: 'priority', label: 'Приоритет', visible: true, resizable: true, sortable: false },
    { id: 'source', label: 'Источник', visible: true, resizable: true, sortable: false },
    { id: 'created', label: 'Создан', visible: true, resizable: true, sortable: true },
    { id: 'lastReply', label: 'Последний ответ', visible: true, resizable: true, sortable: true },
    { id: 'lastReplyBy', label: 'Кем дан ответ', visible: true, resizable: true, sortable: false },
    { id: 'sla', label: 'SLA', visible: true, resizable: true, sortable: false },
    { id: 'assigned', label: 'Назначен', visible: true, resizable: true, sortable: false },
    { id: 'actions', label: 'Действия', visible: true, resizable: false, sortable: false }
  ]);

  // COLUMN WIDTHS: Ширина колонок (сохраняется в localStorage)
  // TODO: Синхронизировать с настройками пользователя на бэкенде
  const [columnWidths, setColumnWidths] = useState({
    select: 50,
    id: 120,
    subject: 300,
    client: 150,
    status: 120,
    priority: 120,
    source: 100,
    created: 120,
    lastReply: 150,
    lastReplyBy: 150,
    sla: 120,
    assigned: 150,
    actions: 100
  });

  // SCROLL SYNCHRONIZATION: Синхронизация горизонтального скролла
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const fixedScrollRef = useRef<HTMLDivElement>(null);
  
  const handleTableScroll = () => {
    const tableScroll = tableScrollRef.current;
    const fixedScroll = fixedScrollRef.current;
    if (!tableScroll || !fixedScroll) return;
    fixedScroll.scrollLeft = tableScroll.scrollLeft;
  };

  const handleFixedScroll = () => {
    const tableScroll = tableScrollRef.current;
    const fixedScroll = fixedScrollRef.current;
    if (!tableScroll || !fixedScroll) return;
    tableScroll.scrollLeft = fixedScroll.scrollLeft;
  };

  // DATA LOADING: Загрузка данных тикетов через API сервис
  // TODO: Заменить на реальные API вызовы при интеграции с бэкендом
  useEffect(() => {
    const loadTickets = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // API CALL: Получение тикетов с фильтрами
        // TODO: При интеграции с бэкендом этот вызов будет отправлен на GET /api/tickets
        const response = await ticketsService.getTickets(filter, 1, 100);
        
        if (response.success && response.data) {
          setTickets(response.data.items);
        } else {
          setError(response.error?.message || "Failed to load tickets");
        }
      } catch (err) {
        setError("Network error occurred");
        console.error("Error loading tickets:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTickets();
  }, [filter]); // Перезагрузка при изменении фильтров

  // CLIENTS & EMPLOYEES: Загрузка справочных данных
  // TODO: Эти данные будут кэшироваться и загружаться через API сервисы
  useEffect(() => {
    const loadReferenceData = async () => {
      try {
        // API CALL: Загрузка клиентов
        // TODO: GET /api/clients
        const clientsResponse = await clientsService.getClients({ limit: 1000 });
        if (clientsResponse.success && clientsResponse.data) {
          setClients(clientsResponse.data.items);
        }

        // API CALL: Загрузка сотрудников  
        // TODO: GET /api/employees
        const employeesResponse = await employeesService.getEmployees({ limit: 1000 });
        if (employeesResponse.success && employeesResponse.data) {
          setEmployees(employeesResponse.data.items);
        }
      } catch (err) {
        console.error("Error loading reference data:", err);
      }
    };

    loadReferenceData();
  }, []);

  // UTILITY FUNCTIONS: Вспомогательные функции для работы с данными
  // TODO: Эти функции можно вынести в отдельные утилиты или получать данные через API
  
  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || "Неизвестен";
  };

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee?.name || "Не назначен";
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'new': { label: 'Новый', class: 'status-new' },
      'in-progress': { label: 'В работе', class: 'status-in-progress' },
      'resolved': { label: 'Решен', class: 'status-resolved' },
      'closed': { label: 'Закрыт', class: 'status-closed' }
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Badge className={`status-badge ${statusInfo.class}`}>
        {statusInfo.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      'low': { label: 'Низкий', class: 'text-muted-foreground' },
      'medium': { label: 'Средний', class: 'text-warning' },
      'high': { label: 'Высокий', class: 'text-destructive' },
      'critical': { label: 'Критический', class: 'text-destructive font-bold' }
    };
    const priorityInfo = priorityMap[priority as keyof typeof priorityMap];
    return (
      <span className={priorityInfo.class}>
        <Flag className="h-3 w-3 inline mr-1" />
        {priorityInfo.label}
      </span>
    );
  };

  const getSourceIcon = (source: string) => {
    const sourceMap = {
      'telegram': '📱',
      'whatsapp': '💬',
      'whatsapp-business': '💼',
      'vk': '🔵',
      'sms': '📨',
      'email': '📧',
      'android': '📲'
    };
    return sourceMap[source as keyof typeof sourceMap] || '💬';
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      const remainingHours = hours % 24;
      return `${days}д ${remainingHours}ч назад`;
    }
    return `${hours}ч назад`;
  };

  const getSlaStatus = (slaStatus: string) => {
    const slaMap = {
      'good': { label: 'В норме', class: 'sla-good' },
      'warning': { label: 'Скоро истечет', class: 'sla-warning' },
      'critical': { label: 'Просрочен', class: 'sla-critical' }
    };
    const slaInfo = slaMap[slaStatus as keyof typeof slaMap];
    return (
      <span className={slaInfo.class}>
        <Clock className="h-3 w-3 inline mr-1" />
        {slaInfo.label}
      </span>
    );
  };

  // TABLE MANAGEMENT: Функции управления таблицей
  
  // COLUMN RESIZING: Изменение ширины колонок
  // TODO: Синхронизировать изменения с настройками пользователя на бэкенде
  const updateColumnWidth = (columnId: string, width: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [columnId]: width
    }));
    
    // STORAGE: Сохранение настроек в localStorage
    // TODO: Заменить на API вызов для сохранения настроек пользователя
    storageService.saveColumnSettings('tickets', { ...columnWidths, [columnId]: width });
  };

  // VISIBLE COLUMNS: Отфильтрованные видимые колонки
  const visibleColumns = columns.filter(col => col.visible);

  // DATA FILTERING & SORTING: Фильтрация и сортировка тикетов
  // TODO: При интеграции с бэкендом фильтрация и сортировка будут выполняться на сервере
  const filteredTickets = useMemo(() => {
    if (isLoading) return [];
    
    let filtered = [...tickets];

    // SEARCH FILTER: Поиск по тексту
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter((ticket) => {
        const matchesSearch = 
          ticket.id.toLowerCase().includes(searchLower) ||
          ticket.subject.toLowerCase().includes(searchLower) ||
          ticket.content.toLowerCase().includes(searchLower) ||
          getClientName(ticket.clientId).toLowerCase().includes(searchLower);
        return matchesSearch;
      });
    }

    // STATUS FILTER: Фильтр по статусам
    if (filter.status?.length) {
      filtered = filtered.filter((ticket) => filter.status!.includes(ticket.status));
    }

    // PRIORITY FILTER: Фильтр по приоритетам
    if (filter.priority?.length) {
      filtered = filtered.filter((ticket) => filter.priority!.includes(ticket.priority));
    }

    // DEPARTMENT FILTER: Фильтр по отделам
    if (filter.departments?.length) {
      filtered = filtered.filter((ticket) => 
        ticket.departments.some(dept => filter.departments!.includes(dept))
      );
    }

    // ASSIGNED FILTER: Фильтр по назначенным
    if (filter.assignedTo?.length) {
      filtered = filtered.filter((ticket) => {
        // Специальная обработка для "current_user"
        if (filter.assignedTo!.includes('current_user')) {
          // TODO: Получать ID текущего пользователя из контекста авторизации
          const currentUserId = storageService.getCurrentUser()?.id || '1';
          return ticket.assignedTo.includes(currentUserId);
        }
        return ticket.assignedTo.some(id => filter.assignedTo!.includes(id));
      });
    }

    // SOURCE FILTER: Фильтр по источникам
    if (filter.source?.length) {
      filtered = filtered.filter((ticket) => filter.source!.includes(ticket.source));
    }

    // SLA FILTER: Фильтр по SLA статусам
    if (filter.slaStatus?.length) {
      filtered = filtered.filter((ticket) => filter.slaStatus!.includes(ticket.slaStatus));
    }

    // DATE RANGE FILTER: Фильтр по дате создания
    if (filter.dateRange?.from) {
      filtered = filtered.filter((ticket) => 
        new Date(ticket.createdAt) >= filter.dateRange!.from!
      );
    }

    if (filter.dateRange?.to) {
      filtered = filtered.filter((ticket) => 
        new Date(ticket.createdAt) <= filter.dateRange!.to!
      );
    }

    // SORTING: Сортировка результатов
    // TODO: При интеграции с бэкендом сортировка будет выполняться через SQL ORDER BY
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortField) {
          case 'id':
            aValue = a.id;
            bValue = b.id;
            break;
          case 'subject':
            aValue = a.subject;
            bValue = b.subject;
            break;
          case 'client':
            aValue = getClientName(a.clientId);
            bValue = getClientName(b.clientId);
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
            break;
          case 'created':
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
          case 'lastReply':
            aValue = new Date(a.lastReply);
            bValue = new Date(b.lastReply);
            break;
          default:
            return 0;
        }

        if (sortDirection === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    return filtered;
  }, [tickets, filter, sortField, sortDirection, clients, employees, isLoading]);

  // EVENT HANDLERS: Обработчики событий пользовательского интерфейса
  
  // SORTING: Обработчик сортировки колонок
  // TODO: При интеграции с бэкендом параметры сортировки будут передаваться в API запрос
  const handleSort = (fieldId: string) => {
    if (sortField === fieldId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(fieldId);
      setSortDirection('asc');
    }
  };

  // SELECTION: Обработчики выбора тикетов
  const handleSelectTicket = (ticketId: string, checked: boolean) => {
    if (checked) {
      setSelectedTickets([...selectedTickets, ticketId]);
    } else {
      setSelectedTickets(selectedTickets.filter(id => id !== ticketId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTickets(filteredTickets.map(ticket => ticket.id));
    } else {
      setSelectedTickets([]);
    }
  };

  // BULK ACTIONS: Массовые действия с выбранными тикетами
  // TODO: Реализовать API endpoints для массовых операций
  const handleBulkAction = async (action: string) => {
    if (selectedTickets.length === 0) return;

    try {
      setIsLoading(true);
      
      switch (action) {
        case 'archive':
          // TODO: POST /api/tickets/bulk/archive
          console.log('Archiving tickets:', selectedTickets);
          break;
        case 'delete':
          // TODO: DELETE /api/tickets/bulk
          console.log('Deleting tickets:', selectedTickets);
          break;
        case 'assign':
          // TODO: POST /api/tickets/bulk/assign
          console.log('Assigning tickets:', selectedTickets);
          break;
        case 'priority':
          // TODO: POST /api/tickets/bulk/priority
          console.log('Changing priority:', selectedTickets);
          break;
      }
      
      // После успешного выполнения - перезагрузить данные
      // TODO: Вместо полной перезагрузки использовать optimistic updates
      
    } catch (error) {
      console.error('Bulk action error:', error);
      setError("Failed to perform bulk action");
    } finally {
      setIsLoading(false);
      setSelectedTickets([]);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* HEADER SECTION: Заголовок страницы с действиями */}
      {/* TODO: Добавить breadcrumbs навигацию при расширении приложения */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Тикеты
          </h1>
          <p className="text-muted-foreground mt-1">
            Управление обращениями клиентов
            {/* LOADING STATE: Индикатор загрузки */}
            {isLoading && <span className="ml-2">⏳ Загрузка...</span>}
            {/* ERROR STATE: Отображение ошибок */}
            {error && <span className="ml-2 text-destructive">❌ {error}</span>}
          </p>
        </div>
        
        {/* BULK ACTIONS: Массовые действия для выбранных тикетов */}
        {/* TODO: Расширить список массовых действий при необходимости */}
        <div className="flex gap-2">
          {selectedTickets.length > 0 && (
            <div className="flex gap-2 mr-4 p-2 bg-accent/50 rounded-lg">
              <span className="text-sm text-muted-foreground">
                Выбрано: {selectedTickets.length}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction('archive')}
                disabled={isLoading}
              >
                <Archive className="h-4 w-4 mr-2" />
                Архивировать
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction('delete')}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить
              </Button>
            </div>
          )}
          
          {/* EXPORT: Экспорт данных */}
          {/* TODO: Реализовать различные форматы экспорта через API */}
          <Button 
            variant="outline"
            onClick={() => setExportModalOpen(true)}
            disabled={isLoading}
          >
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          
          {/* CUSTOM FIELDS: Кастомные поля */}
          {/* TODO: Интегрировать с системой пользовательских полей */}
          <Button
            variant="outline"
            onClick={() => setCustomFieldsOpen(true)}
            disabled={selectedTickets.length !== 1}
          >
            <Settings className="h-4 w-4 mr-2" />
            Кастомные поля
          </Button>
          
          {/* TAGS: Управление тегами */}
          <Button
            variant="outline"
            onClick={() => setTagsModalOpen(true)}
            disabled={selectedTickets.length !== 1}
          >
            <Tag className="h-4 w-4 mr-2" />
            Теги
          </Button>
          
          {/* CONVERSATION: Инициация разговора с клиентом */}
          <Button
            variant="outline"
            onClick={() => setConversationModalOpen(true)}
            disabled={selectedTickets.length !== 1}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Написать клиенту
          </Button>
          
          {/* COLUMN SETTINGS: Настройки колонок */}
          <ColumnSettings 
            columns={columns}
            onColumnsChange={setColumns}
          />
          
          {/* CREATE TICKET: Создание нового тикета */}
          <CreateTicketModal />
        </div>
      </div>

      {/* FILTERS SECTION: Фильтры для поиска и отбора тикетов */}
      {/* TODO: Добавить сохраненные фильтры пользователя */}
      <TicketFilters 
        onFilterChange={setFilter}
        currentFilter={filter}
      />

      {/* TICKETS TABLE: Основная таблица с тикетами */}
      <Card className="flex-1 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5" />
            Список тикетов
            <Badge variant="secondary" className="ml-auto">
              {filteredTickets.length} тикетов
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 relative">
          <div className="relative h-[calc(100vh-400px)]">
            {/* TABLE CONTENT: Контент таблицы с вертикальной прокруткой */}
            <div className="h-[calc(100%-20px)] overflow-y-auto overflow-x-hidden">
              <div ref={tableScrollRef} onScroll={handleTableScroll} className="overflow-x-auto hide-scrollbar hide-inner-table-scroll">
                <Table style={{ minWidth: `${Object.values(columnWidths).reduce((a, b) => a + b, 0)}px` }}>
                  {/* TABLE HEADER: Заголовки колонок с возможностью сортировки и изменения размера */}
                  <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm">
                    <TableRow>
                      {visibleColumns.map((column) => {
                        if (column.id === 'select') {
                          return (
                            <ResizableTableHeader
                              key={column.id}
                              width={columnWidths[column.id]}
                              onResize={(width) => updateColumnWidth(column.id, width)}
                              resizable={column.resizable}
                            >
                              <Checkbox
                                checked={filteredTickets.length > 0 && selectedTickets.length === filteredTickets.length}
                                onCheckedChange={handleSelectAll}
                              />
                            </ResizableTableHeader>
                          );
                        }
                        
                        return (
                          <ResizableTableHeader
                            key={column.id}
                            width={columnWidths[column.id]}
                            onResize={(width) => updateColumnWidth(column.id, width)}
                            onSort={column.sortable ? () => handleSort(column.id) : undefined}
                            resizable={column.resizable}
                          >
                            {column.label}
                          </ResizableTableHeader>
                        );
                      })}
                    </TableRow>
                  </TableHeader>
                  
                  {/* TABLE BODY: Строки с данными тикетов */}
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id} className="ticket-table-row">
                        {visibleColumns.map((column) => {
                          // SELECTION COLUMN: Чекбокс для выбора
                          if (column.id === 'select') {
                            return (
                              <TableCell key={column.id} style={{ width: `${columnWidths[column.id]}px` }}>
                                <Checkbox
                                  checked={selectedTickets.includes(ticket.id)}
                                  onCheckedChange={(checked) => handleSelectTicket(ticket.id, checked as boolean)}
                                />
                              </TableCell>
                            );
                          }
                          
                          // ID COLUMN: ID тикета с возможностью открытия
                          if (column.id === 'id') {
                            return (
                              <TableCell key={column.id} className="font-mono text-sm" style={{ width: `${columnWidths[column.id]}px` }}>
                                <button 
                                  onClick={() => {
                                    setSelectedTicket(ticket.id);
                                    setFullPageOpen(true);
                                  }}
                                  className="hover:text-primary hover:underline cursor-pointer"
                                >
                                  {ticket.id}
                                </button>
                              </TableCell>
                            );
                          }
                          
                          // SUBJECT COLUMN: Тема тикета с превью контента и тегами
                          if (column.id === 'subject') {
                            return (
                              <TableCell key={column.id} style={{ width: `${columnWidths[column.id]}px` }}>
                                <div className="flex items-start gap-2">
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium truncate">
                                      {ticket.subject}
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate">
                                      {ticket.content.substring(0, 80)}...
                                    </div>
                                    <div className="flex gap-1 mt-1">
                                      {ticket.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs h-5">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  {ticket.hasAttachments && (
                                    <Paperclip className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-1" />
                                  )}
                                </div>
                              </TableCell>
                            );
                          }
                          
                          // CLIENT COLUMN: Информация о клиенте
                          if (column.id === 'client') {
                            return (
                              <TableCell key={column.id} style={{ width: `${columnWidths[column.id]}px` }}>
                                <div className="flex items-center gap-2">
                                  <User className="h-3 w-3 text-muted-foreground" />
                                  {getClientName(ticket.clientId)}
                                </div>
                              </TableCell>
                            );
                          }
                          
                          // STATUS COLUMN: Статус тикета
                          if (column.id === 'status') {
                            return (
                              <TableCell key={column.id} style={{ width: `${columnWidths[column.id]}px` }}>
                                {getStatusBadge(ticket.status)}
                              </TableCell>
                            );
                          }
                          
                          // PRIORITY COLUMN: Приоритет тикета
                          if (column.id === 'priority') {
                            return (
                              <TableCell key={column.id} style={{ width: `${columnWidths[column.id]}px` }}>
                                {getPriorityBadge(ticket.priority)}
                              </TableCell>
                            );
                          }
                          
                          // SOURCE COLUMN: Источник тикета
                          if (column.id === 'source') {
                            return (
                              <TableCell key={column.id} style={{ width: `${columnWidths[column.id]}px` }}>
                                <div className="flex items-center gap-1">
                                  <span className="text-lg">{getSourceIcon(ticket.source)}</span>
                                  <span className="text-xs capitalize">{ticket.source}</span>
                                </div>
                              </TableCell>
                            );
                          }
                          
                          // CREATED COLUMN: Дата создания
                          if (column.id === 'created') {
                            return (
                              <TableCell key={column.id} className="text-sm" style={{ width: `${columnWidths[column.id]}px` }}>
                                {getTimeAgo(ticket.createdAt)}
                              </TableCell>
                            );
                          }
                          
                          // LAST REPLY COLUMN: Последний ответ
                          if (column.id === 'lastReply') {
                            return (
                              <TableCell key={column.id} style={{ width: `${columnWidths[column.id]}px` }}>
                                <div className="text-sm">
                                  <div>{getTimeAgo(ticket.lastReply)}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {ticket.lastReplyBy === 'client' ? 'клиент' : 'агент'}
                                  </div>
                                </div>
                              </TableCell>
                            );
                          }
                          
                          // LAST REPLY BY COLUMN: Кем дан последний ответ
                          if (column.id === 'lastReplyBy') {
                            return (
                              <TableCell key={column.id} style={{ width: `${columnWidths[column.id]}px` }}>
                                <div className="text-sm">
                                  {ticket.lastReplyByName || 
                                    (ticket.lastReplyBy === 'client' ? getClientName(ticket.clientId) : 'Агент')}
                                </div>
                              </TableCell>
                            );
                          }
                          
                          // SLA COLUMN: SLA статус
                          if (column.id === 'sla') {
                            return (
                              <TableCell key={column.id} style={{ width: `${columnWidths[column.id]}px` }}>
                                {getSlaStatus(ticket.slaStatus)}
                              </TableCell>
                            );
                          }
                          
                          // ASSIGNED COLUMN: Назначенные сотрудники
                          if (column.id === 'assigned') {
                            return (
                              <TableCell key={column.id} style={{ width: `${columnWidths[column.id]}px` }}>
                                {ticket.assignedTo.length > 0 ? (
                                  <div className="text-sm">
                                    {getEmployeeName(ticket.assignedTo[0])}
                                    {ticket.assignedTo.length > 1 && (
                                      <div className="text-xs text-muted-foreground">
                                        +{ticket.assignedTo.length - 1} еще
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground text-sm">Не назначен</span>
                                )}
                              </TableCell>
                            );
                          }
                          
                          // ACTIONS COLUMN: Действия с тикетом
                          if (column.id === 'actions') {
                            return (
                              <TableCell key={column.id} style={{ width: `${columnWidths[column.id]}px` }}>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => {
                                    setSelectedTicket(ticket.id);
                                    setTicketDetailOpen(true);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            );
                          }
                          
                          return null;
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {/* FIXED HORIZONTAL SCROLLBAR: Фиксированная горизонтальная полоса прокрутки */}
            {/* TODO: Стилизовать scrollbar в соответствии с дизайн-системой */}
            <div 
              ref={fixedScrollRef}
              onScroll={handleFixedScroll}
              className="absolute bottom-0 left-0 right-0 h-5 overflow-x-auto overflow-y-hidden border-t bg-background/95 z-10"
            >
              <div style={{ width: `${Object.values(columnWidths).reduce((a, b) => a + b, 0)}px`, height: "1px" }} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MODALS SECTION: Модальные окна для различных действий */}
      {/* TODO: Добавить lazy loading для модальных окон */}
      
      {/* TICKET DETAIL: Просмотр деталей тикета */}
      <TicketDetailModal 
        open={ticketDetailOpen}
        onOpenChange={setTicketDetailOpen}
        ticketId={selectedTicket || undefined}
      />

      {/* FULL PAGE TICKET: Полноэкранный просмотр тикета */}
      <FullPageTicketModal 
        open={fullPageOpen}
        onOpenChange={setFullPageOpen}
        ticketId={selectedTicket || undefined}
      />

      {/* CUSTOM FIELDS: Управление кастомными полями */}
      <TicketCustomFieldsModal
        open={customFieldsOpen}
        onOpenChange={setCustomFieldsOpen}
        ticketId={selectedTickets.length === 1 ? selectedTickets[0] : undefined}
      />

      {/* TAGS: Управление тегами тикета */}
      <TicketTagsModal
        open={tagsModalOpen}
        onOpenChange={setTagsModalOpen}
        ticketId={selectedTicket || undefined}
      />

      {/* EXPORT: Экспорт данных тикетов */}
      <TicketExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        selectedTickets={selectedTickets}
      />

      {/* CONVERSATION: Инициация разговора с клиентом */}
      <InitiateConversationModal
        open={conversationModalOpen}
        onOpenChange={setConversationModalOpen}
        clientId={selectedTicket ? filteredTickets.find(t => t.id === selectedTicket)?.clientId : undefined}
      />
    </div>
  );
};

export default Tickets;