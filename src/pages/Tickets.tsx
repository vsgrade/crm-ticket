import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowUpDown,
  Eye,
  MessageSquare,
  Clock,
  User,
  Building2,
  Flag,
  Paperclip
} from "lucide-react";
import { mockTickets, mockClients, mockEmployees } from "@/data/mockData";
import CreateTicketModal from "@/components/modals/CreateTicketModal";
import TicketDetailModal from "@/components/modals/TicketDetailModal";

const Tickets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketDetailOpen, setTicketDetailOpen] = useState(false);
  
  const getClientName = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    return client?.name || "Неизвестен";
  };

  const getEmployeeName = (employeeId: string) => {
    const employee = mockEmployees.find(e => e.id === employeeId);
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

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Заголовок и фильтры */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Тикеты</h1>
          <p className="text-muted-foreground">
            Управление обращениями клиентов • Демо данные
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Поиск тикетов..." 
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <CreateTicketModal />
        </div>
      </div>

      {/* Быстрые фильтры */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        <Badge variant="default" className="cursor-pointer">
          Все (324)
        </Badge>
        <Badge variant="outline" className="cursor-pointer">
          Новые (47)
        </Badge>
        <Badge variant="outline" className="cursor-pointer">
          В работе (156)
        </Badge>
        <Badge variant="outline" className="cursor-pointer">
          Просроченные SLA (12)
        </Badge>
        <Badge variant="outline" className="cursor-pointer">
          Мои тикеты (23)
        </Badge>
      </div>

      {/* Таблица тикетов */}
      <Card className="flex-1 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5" />
            Список тикетов
            <Badge variant="secondary" className="ml-auto">
              {mockTickets.length} из 324 тикетов (демо)
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto h-[calc(100vh-300px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[120px]">
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      ID
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[300px]">
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      Тема
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      Клиент
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      Статус
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Приоритет</TableHead>
                  <TableHead>Источник</TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      Создан
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Последний ответ</TableHead>
                  <TableHead>SLA</TableHead>
                  <TableHead>Назначен</TableHead>
                  <TableHead className="w-[100px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTickets.map((ticket) => (
                  <TableRow key={ticket.id} className="ticket-table-row">
                    <TableCell className="font-mono text-sm">
                      {ticket.id}
                    </TableCell>
                    <TableCell>
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
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        {getClientName(ticket.clientId)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(ticket.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(ticket.priority)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{getSourceIcon(ticket.source)}</span>
                        <span className="text-xs capitalize">{ticket.source}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {getTimeAgo(ticket.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{getTimeAgo(ticket.lastReply)}</div>
                        <div className="text-xs text-muted-foreground">
                          {ticket.lastReplyBy === 'client' ? 'клиент' : 'агент'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getSlaStatus(ticket.slaStatus)}
                    </TableCell>
                    <TableCell>
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
                    <TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Модальное окно детализации тикета */}
      <TicketDetailModal 
        open={ticketDetailOpen}
        onOpenChange={setTicketDetailOpen}
        ticketId={selectedTicket || undefined}
      />
    </div>
  );
};

export default Tickets;