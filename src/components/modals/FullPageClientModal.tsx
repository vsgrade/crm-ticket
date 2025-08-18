import { useState } from "react";
import { X, Save, User, Mail, Phone, Building2, MapPin, Star, MessageSquare, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FullPageClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId?: string;
}

export const FullPageClientModal = ({ open, onOpenChange, clientId = "CL-001" }: FullPageClientModalProps) => {
  const { toast } = useToast();

  // Данные клиента (редактируемые)
  const [clientData, setClientData] = useState({
    id: clientId,
    name: "Анна Петрова",
    email: "anna.petrova@example.com",
    phone: "+7 (999) 123-45-67",
    company: "ООО Рога и Копыта",
    position: "Менеджер по закупкам",
    location: "Москва",
    segment: "enterprise",
    rating: 4.5,
    notes: "VIP клиент. Особое внимание к запросам. Предпочитает общение по телефону.",
    tags: ["VIP", "Корпоративный", "Постоянный"],
    messengerIds: {
      telegram: "@anna_petrova",
      whatsapp: "+7 (999) 123-45-67",
      vk: "anna.petrova"
    },
    createdAt: new Date("2023-03-15"),
    lastActivity: new Date("2024-01-15"),
    totalSpent: 150000,
    ticketsCount: 23
  });

  // Демо данные тикетов клиента
  const clientTickets = [
    {
      id: "TIC-2024-001",
      subject: "Проблема с авторизацией",
      status: "resolved",
      priority: "high",
      createdAt: new Date("2024-01-15"),
      resolvedAt: new Date("2024-01-15")
    },
    {
      id: "TIC-2024-002", 
      subject: "Вопрос по тарифам",
      status: "closed",
      priority: "medium",
      createdAt: new Date("2024-01-10"),
      resolvedAt: new Date("2024-01-11")
    },
    {
      id: "TIC-2024-003",
      subject: "Запрос на интеграцию",
      status: "in-progress",
      priority: "high",
      createdAt: new Date("2024-01-08"),
      resolvedAt: null
    }
  ];

  const handleSave = () => {
    toast({
      title: "Клиент обновлен ✅",
      description: "Изменения сохранены (демо функция)",
    });
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-warning fill-warning' : 'text-muted-foreground'}`} 
      />
    ));
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'new': { label: 'Новый', class: 'bg-blue-500/20 text-blue-700' },
      'in-progress': { label: 'В работе', class: 'bg-yellow-500/20 text-yellow-700' },
      'resolved': { label: 'Решен', class: 'bg-green-500/20 text-green-700' },
      'closed': { label: 'Закрыт', class: 'bg-gray-500/20 text-gray-700' }
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Badge className={statusInfo.class}>
        {statusInfo.label}
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Заголовок */}
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {clientData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <Input
                value={clientData.name}
                onChange={(e) => setClientData(prev => ({ ...prev, name: e.target.value }))}
                className="text-xl font-semibold border-none shadow-none p-0 h-auto bg-transparent focus-visible:ring-0"
                placeholder="Имя клиента..."
              />
              <div className="text-sm text-muted-foreground">{clientData.company}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Сохранить
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-2">
            <X className="h-4 w-4" />
            Закрыть
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Левая панель - основная информация */}
        <div className="w-96 border-r border-border bg-card/30 p-6 space-y-6 overflow-y-auto">
          {/* Контактная информация */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Контактная информация</h3>
            
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Email</label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={clientData.email}
                  onChange={(e) => setClientData(prev => ({ ...prev, email: e.target.value }))}
                  type="email"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Телефон</label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={clientData.phone}
                  onChange={(e) => setClientData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Компания</label>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={clientData.company}
                  onChange={(e) => setClientData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Название компании"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Должность</label>
              <Input
                value={clientData.position}
                onChange={(e) => setClientData(prev => ({ ...prev, position: e.target.value }))}
                placeholder="Должность"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Город</label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={clientData.location}
                  onChange={(e) => setClientData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Город"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Сегмент и рейтинг */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Классификация</h3>
            
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Сегмент</label>
              <Select value={clientData.segment} onValueChange={(value) => setClientData(prev => ({ ...prev, segment: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Базовый</SelectItem>
                  <SelectItem value="smb">SMB</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Рейтинг</label>
              <div className="flex items-center gap-2">
                {getRatingStars(clientData.rating)}
                <span className="text-sm font-medium">{clientData.rating}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Мессенджеры */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Мессенджеры</h3>
            
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Telegram</label>
              <Input
                value={clientData.messengerIds.telegram}
                onChange={(e) => setClientData(prev => ({ 
                  ...prev, 
                  messengerIds: { ...prev.messengerIds, telegram: e.target.value }
                }))}
                placeholder="@username"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">WhatsApp</label>
              <Input
                value={clientData.messengerIds.whatsapp}
                onChange={(e) => setClientData(prev => ({ 
                  ...prev, 
                  messengerIds: { ...prev.messengerIds, whatsapp: e.target.value }
                }))}
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">VK</label>
              <Input
                value={clientData.messengerIds.vk}
                onChange={(e) => setClientData(prev => ({ 
                  ...prev, 
                  messengerIds: { ...prev.messengerIds, vk: e.target.value }
                }))}
                placeholder="username"
              />
            </div>
          </div>

          <Separator />

          {/* Теги */}
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Теги</label>
            <div className="flex flex-wrap gap-1">
              {clientData.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Заметки */}
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Заметки</label>
            <Textarea
              value={clientData.notes}
              onChange={(e) => setClientData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Дополнительная информация о клиенте..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Правая панель - статистика и тикеты */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{clientData.ticketsCount}</div>
                    <div className="text-sm text-muted-foreground">Тикетов</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/20">
                    <Calendar className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">
                      {Math.floor((new Date().getTime() - clientData.createdAt.getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-sm text-muted-foreground">Дней с нами</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/20">
                    <Building2 className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{clientData.totalSpent.toLocaleString()}₽</div>
                    <div className="text-sm text-muted-foreground">Потрачено</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/20">
                    <Star className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{clientData.rating}</div>
                    <div className="text-sm text-muted-foreground">Рейтинг</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* История тикетов */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                История тикетов
                <Badge variant="secondary" className="ml-auto">
                  {clientTickets.length} тикетов (демо)
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Тема</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Приоритет</TableHead>
                    <TableHead>Создан</TableHead>
                    <TableHead>Решен</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="cursor-pointer hover:bg-accent/50">
                      <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                      <TableCell className="font-medium">{ticket.subject}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>
                        <span className={getPriorityColor(ticket.priority)}>
                          {ticket.priority === 'high' ? 'Высокий' : 
                           ticket.priority === 'medium' ? 'Средний' : 
                           ticket.priority === 'low' ? 'Низкий' : 'Критический'}
                        </span>
                      </TableCell>
                      <TableCell>{ticket.createdAt.toLocaleDateString('ru-RU')}</TableCell>
                      <TableCell>
                        {ticket.resolvedAt ? ticket.resolvedAt.toLocaleDateString('ru-RU') : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FullPageClientModal;