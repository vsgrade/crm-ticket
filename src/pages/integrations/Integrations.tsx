import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Zap,
  Settings,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink
} from "lucide-react";

const Integrations = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const integrationCategories = [
    { id: "all", name: "Все", count: 12 },
    { id: "messengers", name: "Мессенджеры", count: 4, icon: MessageSquare },
    { id: "email", name: "Email", count: 3, icon: Mail },
    { id: "phone", name: "Телефония", count: 2, icon: Phone },
    { id: "social", name: "Соц. сети", count: 2, icon: Globe },
    { id: "automation", name: "Автоматизация", count: 1, icon: Zap }
  ];

  const integrations = [
    {
      id: 1,
      name: "WhatsApp Business",
      category: "messengers",
      description: "Интеграция с WhatsApp Business API",
      status: "active",
      connected: true,
      icon: MessageSquare,
      usage: 85,
      lastActivity: "2 мин назад",
      settings: { autoReply: true, businessHours: true }
    },
    {
      id: 2,
      name: "Telegram Bot",
      category: "messengers", 
      description: "Автоматизированный бот для Telegram",
      status: "active",
      connected: true,
      icon: MessageSquare,
      usage: 67,
      lastActivity: "5 мин назад",
      settings: { autoReply: false, businessHours: true }
    },
    {
      id: 3,
      name: "Gmail API",
      category: "email",
      description: "Интеграция с Gmail для обработки писем",
      status: "warning",
      connected: true,
      icon: Mail,
      usage: 42,
      lastActivity: "1 час назад",
      settings: { autoReply: true, businessHours: false }
    },
    {
      id: 4,
      name: "Facebook Messenger",
      category: "messengers",
      description: "Обработка сообщений через Facebook",
      status: "inactive",
      connected: false,
      icon: MessageSquare,
      usage: 0,
      lastActivity: "Не активен",
      settings: { autoReply: false, businessHours: false }
    },
    {
      id: 5,
      name: "Zapier",
      category: "automation",
      description: "Автоматизация через Zapier webhook",
      status: "active",
      connected: true,
      icon: Zap,
      usage: 23,
      lastActivity: "30 мин назад",
      settings: { autoReply: false, businessHours: true }
    },
    {
      id: 6,
      name: "VoIP System",
      category: "phone",
      description: "Интеграция с телефонной системой",
      status: "active",
      connected: true,
      icon: Phone,
      usage: 91,
      lastActivity: "Сейчас",
      settings: { autoReply: true, businessHours: true }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "warning": return "destructive";
      case "inactive": return "outline";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "warning": return <AlertCircle className="h-4 w-4" />;
      case "inactive": return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleIntegration = (id: number) => {
    toast({
      title: "Настройки обновлены",
      description: "Изменения интеграции сохранены",
    });
  };

  const handleTestIntegration = (name: string) => {
    toast({
      title: "Тестирование запущено",
      description: `Проверка подключения к ${name}...`,
    });
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-none p-6 border-b border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Интеграции
              </h1>
              <p className="text-muted-foreground">Управление внешними подключениями</p>
            </div>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Добавить интеграцию
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="active">Активные</TabsTrigger>
            <TabsTrigger value="marketplace">Магазин</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Статистика */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-muted-foreground">Активные</p>
                      <div className="text-2xl font-bold">
                        {integrations.filter(i => i.status === "active").length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-muted-foreground">Предупреждения</p>
                      <div className="text-2xl font-bold">
                        {integrations.filter(i => i.status === "warning").length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-muted-foreground">Неактивные</p>
                      <div className="text-2xl font-bold">
                        {integrations.filter(i => i.status === "inactive").length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-muted-foreground">Всего</p>
                      <div className="text-2xl font-bold">{integrations.length}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Фильтры */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск интеграций..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {integrationCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.icon && <category.icon className="h-4 w-4 mr-1" />}
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>
            </div>

            {/* Список интеграций */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="border-2 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <integration.icon className="h-5 w-5" />
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                      </div>
                      <Badge variant={getStatusColor(integration.status)}>
                        {getStatusIcon(integration.status)}
                        <span className="ml-1">
                          {integration.status === "active" ? "Активно" :
                           integration.status === "warning" ? "Предупреждение" : "Неактивно"}
                        </span>
                      </Badge>
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Использование</span>
                        <span>{integration.usage}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${integration.usage}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Последняя активность: {integration.lastActivity}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleTestIntegration(integration.name)}>
                          Тест
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                      <Switch 
                        checked={integration.connected}
                        onCheckedChange={() => handleToggleIntegration(integration.id)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Активные интеграции</CardTitle>
                <CardDescription>Управление подключенными сервисами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.filter(i => i.status === "active").map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <integration.icon className="h-5 w-5" />
                        <div>
                          <h3 className="font-medium">{integration.name}</h3>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">{integration.usage}% загрузка</div>
                          <div className="text-xs text-muted-foreground">{integration.lastActivity}</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Магазин интеграций</CardTitle>
                <CardDescription>Доступные интеграции для подключения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { name: "Slack", category: "messengers", description: "Уведомления в Slack", popular: true },
                    { name: "Discord", category: "messengers", description: "Интеграция с Discord", popular: false },
                    { name: "Microsoft Teams", category: "messengers", description: "Командная работа", popular: true },
                    { name: "Outlook", category: "email", description: "Email интеграция", popular: false },
                    { name: "Viber Business", category: "messengers", description: "Бизнес мессенджер", popular: false },
                    { name: "API Webhook", category: "automation", description: "Пользовательские webhooks", popular: true }
                  ].map((item, index) => (
                    <Card key={index} className="border-2 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          {item.popular && <Badge variant="secondary">Популярно</Badge>}
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Подключить
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Глобальные настройки</CardTitle>
                <CardDescription>Общие параметры для всех интеграций</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-retry">Автоматические повторы</Label>
                      <p className="text-sm text-muted-foreground">
                        Повторять неудачные запросы автоматически
                      </p>
                    </div>
                    <Switch id="auto-retry" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications">Уведомления об ошибках</Label>
                      <p className="text-sm text-muted-foreground">
                        Получать уведомления при сбоях интеграций
                      </p>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeout">Таймаут соединения (секунды)</Label>
                    <Input id="timeout" type="number" defaultValue="30" className="w-32" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">Лимит запросов в минуту</Label>
                    <Input id="rate-limit" type="number" defaultValue="100" className="w-32" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button>Сохранить настройки</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Integrations;