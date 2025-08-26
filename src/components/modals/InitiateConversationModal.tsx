import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Phone, Mail, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InitiateConversationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId?: string;
}

const InitiateConversationModal = ({ open, onOpenChange, clientId }: InitiateConversationModalProps) => {
  const { toast } = useToast();
  
  const [selectedChannel, setSelectedChannel] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('medium');

  // Демо данные клиента
  const clientData = {
    id: clientId || '1',
    name: 'Александр Иванов',
    company: 'ООО "Технологии"',
    email: 'alex.ivanov@tech.com',
    phone: '+7 (999) 123-45-67',
    availableChannels: [
      { id: 'telegram', name: 'Telegram', icon: '📱', status: 'online' },
      { id: 'whatsapp', name: 'WhatsApp', icon: '💬', status: 'online' },
      { id: 'email', name: 'Email', icon: '📧', status: 'available' },
      { id: 'sms', name: 'SMS', icon: '📨', status: 'available' },
      { id: 'phone', name: 'Телефон', icon: '📞', status: 'available' }
    ]
  };

  const messageTemplates = [
    {
      id: 'greeting',
      name: 'Приветствие',
      content: 'Здравствуйте! Меня зовут {agent_name}, я специалист службы поддержки. Готов помочь вам решить любые вопросы.'
    },
    {
      id: 'follow_up',
      name: 'Уточнение',
      content: 'Добрый день! Хотел бы уточнить текущий статус вашего обращения и узнать, есть ли дополнительные вопросы.'
    },
    {
      id: 'update',
      name: 'Обновление',
      content: 'Здравствуйте! Хочу проинформировать вас об изменениях в вашем заказе/обращении.'
    },
    {
      id: 'survey',
      name: 'Опрос',
      content: 'Добрый день! Не могли бы вы оценить качество нашего обслуживания? Ваше мнение очень важно для нас.'
    }
  ];

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
  };

  const handleTemplateSelect = (templateContent: string) => {
    setMessage(templateContent.replace('{agent_name}', 'Анна Сидорова'));
  };

  const handleSend = () => {
    if (!selectedChannel || !subject || !message) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    const channelName = clientData.availableChannels.find(c => c.id === selectedChannel)?.name;
    
    toast({
      title: "Сообщение отправлено",
      description: `Сообщение отправлено клиенту через ${channelName}`,
    });
    
    // Создать новый тикет из инициированной переписки
    setTimeout(() => {
      toast({
        title: "Тикет создан",
        description: "Новый тикет создан на основе отправленного сообщения",
      });
    }, 1500);
    
    onOpenChange(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'default';
      case 'available':
        return 'secondary';
      case 'offline':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Инициировать переписку с клиентом
          </DialogTitle>
          <DialogDescription>
            Начните диалог с клиентом через доступные каналы связи
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Левая колонка - информация о клиенте и канале */}
          <div className="space-y-6">
            {/* Информация о клиенте */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Клиент</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-medium">{clientData.name}</div>
                  <div className="text-sm text-muted-foreground">{clientData.company}</div>
                  <div className="text-sm">{clientData.email}</div>
                  <div className="text-sm">{clientData.phone}</div>
                </div>
              </CardContent>
            </Card>

            {/* Выбор канала связи */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Канал связи</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {clientData.availableChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedChannel === channel.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleChannelSelect(channel.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{channel.icon}</span>
                        <div>
                          <div className="font-medium">{channel.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {channel.status === 'online' ? 'В сети' : 
                             channel.status === 'available' ? 'Доступен' : 'Не в сети'}
                          </div>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(channel.status)}>
                        {channel.status === 'online' ? 'Онлайн' : 
                         channel.status === 'available' ? 'Доступен' : 'Офлайн'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Шаблоны сообщений */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Шаблоны сообщений</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {messageTemplates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleTemplateSelect(template.content)}
                  >
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {template.content.substring(0, 60)}...
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Правая колонка - форма сообщения */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Новое сообщение</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subject">Тема *</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Введите тему сообщения"
                  />
                </div>

                <div>
                  <Label htmlFor="priority">Приоритет</Label>
                  <Select value={priority} onValueChange={setPriority}>
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
                  <Label htmlFor="message">Сообщение *</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Введите текст сообщения..."
                    rows={6}
                  />
                </div>

                {selectedChannel && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm">
                      <div className="font-medium mb-1">Предварительный просмотр:</div>
                      <div className="text-muted-foreground">
                        Канал: {clientData.availableChannels.find(c => c.id === selectedChannel)?.name}
                      </div>
                      <div className="text-muted-foreground">
                        Тема: {subject || 'Не указана'}
                      </div>
                      <div className="text-muted-foreground">
                        Символов: {message.length}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSend} disabled={!selectedChannel || !subject || !message}>
            <Send className="h-4 w-4 mr-2" />
            Отправить сообщение
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InitiateConversationModal;