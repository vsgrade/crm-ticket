import { MessageSquare, Settings, Plus, CheckCircle, AlertCircle, Activity, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import CreateMessengerModal from "@/components/modals/CreateMessengerModal";
import IntegrationSettingsModal from "@/components/modals/IntegrationSettingsModal";

const Messengers = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const integrations = [
    {
      name: "WhatsApp Business",
      icon: "💬",
      status: "active",
      messages: 2847,
      successRate: 98.5,
      avgResponseTime: "2.3 мин",
      lastSync: "2 минуты назад"
    },
    {
      name: "Telegram Bot",
      icon: "📱",
      status: "active",
      messages: 1234,
      successRate: 96.2,
      avgResponseTime: "1.8 мин",
      lastSync: "5 минут назад"
    },
    {
      name: "Viber Business",
      icon: "💜",
      status: "warning",
      messages: 567,
      successRate: 89.3,
      avgResponseTime: "4.1 мин",
      lastSync: "1 час назад"
    },
    {
      name: "Facebook Messenger",
      icon: "📘",
      status: "active",
      messages: 892,
      successRate: 94.7,
      avgResponseTime: "3.2 мин",
      lastSync: "10 минут назад"
    },
    {
      name: "Instagram Direct",
      icon: "📷",
      status: "inactive",
      messages: 0,
      successRate: 0,
      avgResponseTime: "—",
      lastSync: "Не настроено"
    }
  ];

  const recentMessages = [
    {
      platform: "WhatsApp",
      client: "+7 (999) 123-45-67",
      message: "Здравствуйте! У меня проблема с заказом...",
      time: "2 минуты назад",
      status: "unread"
    },
    {
      platform: "Telegram",
      client: "@user_name",
      message: "Когда будет готов отчет?",
      time: "5 минут назад",
      status: "read"
    },
    {
      platform: "Viber",
      client: "Мария Иванова",
      message: "Спасибо за помощь!",
      time: "15 минут назад",
      status: "replied"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'inactive':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'inactive':
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleSettingsClick = (integration: any) => {
    setSelectedIntegration(integration);
    setSettingsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Мессенджеры</h1>
            <p className="text-muted-foreground">Интеграция с популярными мессенджерами</p>
          </div>
          <Badge variant="secondary">7 интеграций</Badge>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить интеграцию
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">5,540</div>
                <div className="text-sm text-muted-foreground">Сообщений сегодня</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">94.8%</div>
                <div className="text-sm text-muted-foreground">Успешная доставка</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Activity className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">2.8 мин</div>
                <div className="text-sm text-muted-foreground">Среднее время ответа</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Settings className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">4/5</div>
                <div className="text-sm text-muted-foreground">Активных интеграций</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Настроенные интеграции</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {integrations.map((integration, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{integration.icon}</span>
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getStatusIcon(integration.status)}
                        <span>
                          {integration.status === 'active' ? 'Активна' : 
                           integration.status === 'warning' ? 'Требует внимания' : 'Неактивна'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Switch checked={integration.status === 'active'} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Сообщений</div>
                    <div className="font-medium">{integration.messages.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Успешность</div>
                    <div className="font-medium">{integration.successRate}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Время ответа</div>
                    <div className="font-medium">{integration.avgResponseTime}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Синхронизация</div>
                    <div className="font-medium">{integration.lastSync}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Производительность</span>
                    <span>{integration.successRate}%</span>
                  </div>
                  <Progress value={integration.successRate} className="h-2" />
                </div>

                <div className="flex gap-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSettingsClick(integration)}
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    Настроить
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3 mr-1" />
                    Редактировать
                  </Button>
                  <Button size="sm" variant="outline">
                    Тестировать
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Удалить
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Последние сообщения</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMessages.map((message, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{message.platform}</Badge>
                    <span className="font-medium text-sm">{message.client}</span>
                  </div>
                  <Badge variant={
                    message.status === 'unread' ? 'destructive' :
                    message.status === 'read' ? 'secondary' : 'default'
                  }>
                    {message.status === 'unread' ? 'Новое' :
                     message.status === 'read' ? 'Прочитано' : 'Отвечено'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{message.message}</p>
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Показать все сообщения
            </Button>
          </CardContent>
        </Card>
      </div>

      <CreateMessengerModal 
        open={createModalOpen} 
        onOpenChange={setCreateModalOpen} 
      />

      <IntegrationSettingsModal
        open={settingsModalOpen}
        onOpenChange={setSettingsModalOpen}
        integration={selectedIntegration}
      />
    </div>
  );
};

export default Messengers;