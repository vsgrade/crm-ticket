import { Bell, Settings, Plus, Check, X, Clock, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Notifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "ticket",
      title: "Новый тикет #12345",
      message: "Создан новый тикет от клиента ООО 'Ромашка'",
      time: "2 минуты назад",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      type: "sla",
      title: "Нарушение SLA",
      message: "Тикет #12340 превысил время ответа",
      time: "15 минут назад",
      read: false,
      priority: "critical"
    },
    {
      id: 3,
      type: "system",
      title: "Обновление системы",
      message: "Запланировано техническое обслуживание на 02:00",
      time: "1 час назад",
      read: true,
      priority: "low"
    },
    {
      id: 4,
      type: "client",
      title: "Новый клиент",
      message: "Зарегистрирован новый клиент: Иван Петров",
      time: "2 часа назад",
      read: true,
      priority: "medium"
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ticket": return <AlertTriangle className="h-4 w-4" />;
      case "sla": return <Clock className="h-4 w-4" />;
      case "system": return <Settings className="h-4 w-4" />;
      case "client": return <Info className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
    toast({
      title: "Уведомление прочитано",
      description: "Уведомление помечено как прочитанное",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "Все уведомления прочитаны",
      description: "Все уведомления помечены как прочитанные",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Уведомления</h1>
            <p className="text-muted-foreground">
              Управление уведомлениями и оповещениями
              {unreadCount > 0 && ` • ${unreadCount} непрочитанных`}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Прочитать все
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Настройки
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{unreadCount}</div>
              <div className="text-sm text-muted-foreground">Непрочитанные</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-muted-foreground">За сегодня</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-muted-foreground">За неделю</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">Доставлено</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Все уведомления</TabsTrigger>
          <TabsTrigger value="unread">Непрочитанные</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Последние уведомления</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg space-y-2 ${
                        !notification.read ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(notification.type)}
                          <div className="flex-1">
                            <h4 className="font-semibold">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Непрочитанные уведомления</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.filter(n => !n.read).map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 border rounded-lg space-y-2 bg-muted/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(notification.type)}
                        <div className="flex-1">
                          <h4 className="font-semibold">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email уведомления</h4>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления на электронную почту
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push уведомления</h4>
                    <p className="text-sm text-muted-foreground">
                      Всплывающие уведомления в браузере
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS уведомления</h4>
                    <p className="text-sm text-muted-foreground">
                      Получать критические уведомления по SMS
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Уведомления о новых тикетах</h4>
                    <p className="text-sm text-muted-foreground">
                      Оповещения при создании новых тикетов
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Уведомления о нарушении SLA</h4>
                    <p className="text-sm text-muted-foreground">
                      Критические оповещения о превышении времени
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;