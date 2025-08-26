import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Plus, Search, User, Clock, AlertCircle } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  status: 'new' | 'in-progress' | 'waiting' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  created: string;
  lastUpdate: string;
  department: string;
  messages: number;
}

const ClientPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    department: '',
    priority: 'medium',
    description: ''
  });

  const mockTickets: Ticket[] = [
    {
      id: 'TK-2024-001',
      subject: 'Проблема с авторизацией',
      status: 'in-progress',
      priority: 'high',
      created: '2024-01-15',
      lastUpdate: '2024-01-16',
      department: 'Техническая поддержка',
      messages: 3
    },
    {
      id: 'TK-2024-002',
      subject: 'Вопрос по тарифному плану',
      status: 'resolved',
      priority: 'medium',
      created: '2024-01-10',
      lastUpdate: '2024-01-12',
      department: 'Продажи',
      messages: 5
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'new': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'waiting': 'bg-orange-100 text-orange-800',
      'resolved': 'bg-green-100 text-green-800'
    };
    
    const labels = {
      'new': 'Новый',
      'in-progress': 'В работе',
      'waiting': 'Ожидание',
      'resolved': 'Решен'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-blue-100 text-blue-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    
    const labels = {
      'low': 'Низкий',
      'medium': 'Средний',
      'high': 'Высокий',
      'critical': 'Критический'
    };

    return (
      <Badge className={variants[priority as keyof typeof variants]}>
        {labels[priority as keyof typeof labels]}
      </Badge>
    );
  };

  const handleCreateTicket = () => {
    console.log('Creating ticket:', newTicket);
    setIsCreateModalOpen(false);
    setNewTicket({ subject: '', department: '', priority: 'medium', description: '' });
  };

  const filteredTickets = mockTickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Личный кабинет</h1>
          <p className="text-muted-foreground">Управление вашими обращениями</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Создать обращение
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Новое обращение</DialogTitle>
              <DialogDescription>
                Опишите вашу проблему или вопрос
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Тема обращения</Label>
                <Input
                  id="subject"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="Краткое описание проблемы"
                />
              </div>
              <div>
                <Label htmlFor="department">Департамент</Label>
                <Select value={newTicket.department} onValueChange={(value) => setNewTicket({ ...newTicket, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите департамент" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Техническая поддержка</SelectItem>
                    <SelectItem value="sales">Продажи</SelectItem>
                    <SelectItem value="billing">Биллинг</SelectItem>
                    <SelectItem value="general">Общие вопросы</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Приоритет</Label>
                <Select value={newTicket.priority} onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}>
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
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Подробное описание проблемы"
                  rows={4}
                />
              </div>
              <Button onClick={handleCreateTicket} className="w-full">
                Создать обращение
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">Мои обращения</TabsTrigger>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="knowledge">База знаний</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по обращениям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                    </div>
                  </div>
                  <CardDescription>
                    Обращение #{ticket.id} • {ticket.department}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Создано: {ticket.created}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{ticket.messages} сообщений</span>
                      </div>
                    </div>
                    <span>Обновлено: {ticket.lastUpdate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Информация о профиле</CardTitle>
              <CardDescription>Ваши контактные данные и настройки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Имя</Label>
                  <Input value="Иван Петров" readOnly />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value="ivan.petrov@example.com" readOnly />
                </div>
                <div>
                  <Label>Телефон</Label>
                  <Input value="+7 (999) 123-45-67" readOnly />
                </div>
                <div>
                  <Label>Компания</Label>
                  <Input value="ООО Ромашка" readOnly />
                </div>
              </div>
              <Button variant="outline">Редактировать профиль</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>База знаний</CardTitle>
              <CardDescription>Часто задаваемые вопросы и инструкции</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Как создать обращение?</h4>
                  <p className="text-sm text-muted-foreground">
                    Нажмите кнопку "Создать обращение" и заполните форму с описанием проблемы.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Как отследить статус обращения?</h4>
                  <p className="text-sm text-muted-foreground">
                    Все ваши обращения отображаются на вкладке "Мои обращения" с актуальным статусом.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Время ответа на обращения</h4>
                  <p className="text-sm text-muted-foreground">
                    Мы отвечаем на обращения в течение 24 часов в рабочие дни.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientPortal;