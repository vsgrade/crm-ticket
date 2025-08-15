import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  MessageSquare, 
  User, 
  Clock, 
  Paperclip, 
  Eye,
  FileText,
  Users,
  Tag,
  Flag,
  Settings
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TicketDetailModalProps {
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

export const TicketDetailModal = ({ open, onOpenChange, ticketId = "TIC-2024-001" }: TicketDetailModalProps) => {
  const [message, setMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const { toast } = useToast();

  // Демо данные для тикета
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

  const ticketData = {
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
  };

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getSourceIcon = (source: string) => {
    const sourceMap = {
      'telegram': '📱',
      'whatsapp': '💬',
      'whatsapp-business': '💼',
      'vk': '🔵',
      'sms': '📨',
      'email': '📧'
    };
    return sourceMap[source as keyof typeof sourceMap] || '💬';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <div className="flex h-[80vh]">
          {/* Левая панель - информация о тикете */}
          <div className="w-80 border-r border-border bg-card/30 p-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="h-5 w-5 text-primary" />
                {ticketData.id}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Статус и приоритет */}
              <div className="flex flex-col gap-2">
                {getStatusBadge(ticketData.status)}
                <div className="flex items-center gap-2">
                  <Flag className={`h-4 w-4 ${getPriorityColor(ticketData.priority)}`} />
                  <span className="text-sm font-medium">Высокий приоритет</span>
                </div>
              </div>

              {/* Основная информация */}
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Тема</div>
                  <div className="text-sm font-medium">{ticketData.subject}</div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Клиент</div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{ticketData.client}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Источник</div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getSourceIcon(ticketData.source)}</span>
                    <span className="text-sm capitalize">{ticketData.source}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Назначен</div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{ticketData.assignedTo.join(', ')}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Департамент</div>
                  <div className="text-sm">{ticketData.department}</div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Создан</div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{ticketData.createdAt.toLocaleString('ru-RU')}</span>
                  </div>
                </div>
              </div>

              {/* Теги */}
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Теги</div>
                <div className="flex flex-wrap gap-1">
                  {ticketData.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Действия */}
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Редактировать тикет
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  История изменений
                </Button>
              </div>
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
                      className={isInternal ? "bg-warning hover:bg-warning/90" : "btn-gradient"}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailModal;