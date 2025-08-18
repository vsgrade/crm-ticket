import { useState } from "react";
import { X, Save, MessageSquare, User, Clock, Paperclip, Eye, Send, Flag, Tag, Settings, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FullPageTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId?: string;
}

interface Message {
  id: string;
  content: string;
  author: 'client' | 'agent';
  authorName: string;
  timestamp: Date;
  isInternal?: boolean;
}

export const FullPageTicketModal = ({ open, onOpenChange, ticketId = "TIC-2024-001" }: FullPageTicketModalProps) => {
  const [message, setMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Данные тикета (редактируемые)
  const [ticketData, setTicketData] = useState({
    id: ticketId,
    subject: "Проблема с авторизацией в системе",
    status: "in-progress",
    priority: "high",
    source: "telegram",
    client: "Анна Петрова",
    assignedTo: ["Мария Иванова"],
    department: "Техническая поддержка",
    createdAt: new Date("2024-01-15T14:30:00"),
    slaStatus: "warning",
    tags: ["авторизация", "пароль", "безопасность"]
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Здравствуйте! Не могу войти в личный кабинет. Ошибка 'Неверный пароль', хотя пароль точно правильный.",
      author: "client",
      authorName: "Анна Петрова",
      timestamp: new Date("2024-01-15T14:30:00"),
    },
    {
      id: "2",
      content: "Здравствуйте, Анна! Спасибо за обращение. Проверяю вашу учетную запись.",
      author: "agent",
      authorName: "Мария Иванова",
      timestamp: new Date("2024-01-15T14:35:00"),
    },
    {
      id: "3",
      content: "Клиент использует старый пароль. Нужно обновить данные в системе.",
      author: "agent",
      authorName: "Мария Иванова",
      timestamp: new Date("2024-01-15T14:36:00"),
      isInternal: true,
    },
    {
      id: "4",
      content: "Анна, я сбросил ваш пароль. Новый временный пароль отправлен на вашу почту. Пожалуйста, смените его после входа.",
      author: "agent",
      authorName: "Мария Иванова",
      timestamp: new Date("2024-01-15T14:40:00"),
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      author: "agent",
      authorName: "Мария Иванова",
      timestamp: new Date(),
      isInternal: isInternal
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    toast({
      title: isInternal ? "Внутренняя заметка добавлена 📝" : "Сообщение отправлено 📤",
      description: isInternal ? "Заметка видна только сотрудникам" : "Сообщение отправлено клиенту (демо функция)",
    });
  };

  const handleSave = () => {
    toast({
      title: "Тикет обновлен ✅",
      description: "Изменения сохранены (демо функция)",
    });
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
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">{ticketData.id}</span>
            {getStatusBadge(ticketData.status)}
          </div>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Input
            value={ticketData.subject}
            onChange={(e) => setTicketData(prev => ({ ...prev, subject: e.target.value }))}
            className="text-lg font-medium border-none shadow-none p-0 h-auto bg-transparent focus-visible:ring-0"
            placeholder="Тема тикета..."
          />
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
        {/* Левая панель - информация о тикете */}
        <div className="w-80 border-r border-border bg-card/30 p-6 space-y-6 overflow-y-auto">
          {/* Основная информация */}
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Статус</label>
              <Select value={ticketData.status} onValueChange={(value) => setTicketData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Новый</SelectItem>
                  <SelectItem value="in-progress">В работе</SelectItem>
                  <SelectItem value="resolved">Решен</SelectItem>
                  <SelectItem value="closed">Закрыт</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Приоритет</label>
              <Select value={ticketData.priority} onValueChange={(value) => setTicketData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Низкий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="high">Высокий</SelectItem>
                  <SelectItem value="critical">Критический</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Клиент</label>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={ticketData.client}
                  onChange={(e) => setTicketData(prev => ({ ...prev, client: e.target.value }))}
                  className="border-none shadow-none p-0 h-auto bg-transparent focus-visible:ring-0"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Источник</label>
              <Select value={ticketData.source} onValueChange={(value) => setTicketData(prev => ({ ...prev, source: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telegram">📱 Telegram</SelectItem>
                  <SelectItem value="whatsapp">💬 WhatsApp</SelectItem>
                  <SelectItem value="email">📧 Email</SelectItem>
                  <SelectItem value="sms">📨 SMS</SelectItem>
                  <SelectItem value="vk">🔵 VK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Назначен</label>
              <Select value={ticketData.assignedTo[0]} onValueChange={(value) => setTicketData(prev => ({ ...prev, assignedTo: [value] }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Мария Иванова">Мария Иванова</SelectItem>
                  <SelectItem value="Петр Сидоров">Петр Сидоров</SelectItem>
                  <SelectItem value="Анна Козлова">Анна Козлова</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Департамент</label>
              <Select value={ticketData.department} onValueChange={(value) => setTicketData(prev => ({ ...prev, department: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Техническая поддержка">Техническая поддержка</SelectItem>
                  <SelectItem value="Продажи">Продажи</SelectItem>
                  <SelectItem value="Финансы">Финансы</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Создан</label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{ticketData.createdAt.toLocaleString('ru-RU')}</span>
              </div>
            </div>
          </div>

          {/* Теги */}
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Теги</label>
            <div className="flex flex-wrap gap-1">
              {ticketData.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Действия */}
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              История изменений
            </Button>
          </div>
        </div>

        {/* Правая панель - переписка */}
        <div className="flex-1 flex flex-col">
          {/* Заголовок переписки */}
          <div className="p-4 border-b border-border bg-card/30">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Переписка по тикету</h3>
              <Badge variant="secondary">Демо переписка</Badge>
            </div>
          </div>

          {/* Сообщения */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.author === 'agent' ? 'justify-end' : 'justify-start'}`}>
                  {msg.author === 'client' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {msg.authorName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[70%] space-y-1`}>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{msg.authorName}</span>
                      <span>{msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                      {msg.isInternal && (
                        <Badge variant="secondary" className="text-xs h-4">
                          Внутренняя
                        </Badge>
                      )}
                    </div>
                    <div 
                      className={`p-3 rounded-lg text-sm ${
                        msg.isInternal 
                          ? 'bg-warning/20 border border-warning/30 text-warning-foreground' 
                          : msg.author === 'client' 
                          ? 'bg-accent text-accent-foreground' 
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>

                  {msg.author === 'agent' && !msg.isInternal && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-success/20 text-success">
                        {msg.authorName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Форма ответа */}
          <div className="p-4 border-t border-border bg-card/30">
            <div className="space-y-3">
              {/* Переключатель режима */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={!isInternal ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsInternal(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Ответ клиенту
                </Button>
                <Button
                  type="button"
                  variant={isInternal ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsInternal(true)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Внутренняя заметка
                </Button>
              </div>

              {/* Поле ввода */}
              <div className="flex gap-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isInternal ? "Внутренняя заметка (видна только сотрудникам)..." : "Введите ответ клиенту..."}
                  className={`flex-1 min-h-[60px] resize-none ${
                    isInternal ? 'border-warning/50 focus:border-warning' : ''
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={isInternal ? "bg-warning hover:bg-warning/90" : ""}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageTicketModal;