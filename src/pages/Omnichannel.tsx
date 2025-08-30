import { MessageSquare, Phone, Mail, Users, Settings, Plus, BarChart3, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Omnichannel = () => {
  const channelData = [
    { name: "Пн", email: 45, phone: 23, chat: 67, telegram: 34 },
    { name: "Вт", email: 52, phone: 28, chat: 73, telegram: 41 },
    { name: "Ср", email: 38, phone: 31, chat: 59, telegram: 38 },
    { name: "Чт", email: 61, phone: 19, chat: 82, telegram: 45 },
    { name: "Пт", email: 47, phone: 25, chat: 71, telegram: 39 },
    { name: "Сб", email: 33, phone: 15, chat: 48, telegram: 28 },
    { name: "Вс", email: 29, phone: 12, chat: 41, telegram: 22 },
  ];

  const channels = [
    {
      id: 1,
      name: "Email",
      icon: <Mail className="h-6 w-6" />,
      status: "active",
      messages: 147,
      responseTime: "2.5 ч",
      satisfaction: 94,
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Телефон",
      icon: <Phone className="h-6 w-6" />,
      status: "active",
      messages: 89,
      responseTime: "30 сек",
      satisfaction: 96,
      color: "bg-green-500"
    },
    {
      id: 3,
      name: "Веб-чат",
      icon: <MessageSquare className="h-6 w-6" />,
      status: "active",
      messages: 203,
      responseTime: "1.2 мин",
      satisfaction: 92,
      color: "bg-purple-500"
    },
    {
      id: 4,
      name: "Telegram",
      icon: <Users className="h-6 w-6" />,
      status: "active",
      messages: 156,
      responseTime: "45 сек",
      satisfaction: 91,
      color: "bg-cyan-500"
    },
    {
      id: 5,
      name: "WhatsApp",
      icon: <MessageSquare className="h-6 w-6" />,
      status: "pending",
      messages: 0,
      responseTime: "-",
      satisfaction: 0,
      color: "bg-gray-500"
    },
    {
      id: 6,
      name: "VK",
      icon: <Users className="h-6 w-6" />,
      status: "inactive",
      messages: 0,
      responseTime: "-",
      satisfaction: 0,
      color: "bg-gray-500"
    },
  ];

  const conversations = [
    {
      id: 1,
      client: "Анна Иванова",
      channel: "Email",
      subject: "Проблема с заказом #12345",
      status: "open",
      lastMessage: "Добрый день! У меня возникла проблема...",
      time: "2 мин назад",
      priority: "high"
    },
    {
      id: 2,
      client: "Дмитрий Петров",
      channel: "Веб-чат",
      subject: "Консультация по услугам",
      status: "pending",
      lastMessage: "Здравствуйте, можете рассказать...",
      time: "5 мин назад",
      priority: "medium"
    },
    {
      id: 3,
      client: "+7 999 123-45-67",
      channel: "Телефон",
      subject: "Входящий звонок",
      status: "answered",
      lastMessage: "Звонок завершен",
      time: "12 мин назад",
      priority: "low"
    },
    {
      id: 4,
      client: "@user_telegram",
      channel: "Telegram",
      subject: "Вопрос по оплате",
      status: "open",
      lastMessage: "Скажите пожалуйста, как оплатить...",
      time: "18 мин назад",
      priority: "medium"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "pending": return "secondary";
      case "inactive": return "outline";
      default: return "outline";
    }
  };

  const getConversationStatusColor = (status: string) => {
    switch (status) {
      case "open": return "destructive";
      case "pending": return "secondary";
      case "answered": return "default";
      default: return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Омниканальность</h1>
            <p className="text-muted-foreground">
              Единое управление всеми каналами связи
            </p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить канал
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">595</div>
              <div className="text-sm text-muted-foreground">Всего сообщений</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm text-muted-foreground">Активных каналов</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">1.8 мин</div>
              <div className="text-sm text-muted-foreground">Среднее время ответа</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">93%</div>
              <div className="text-sm text-muted-foreground">Удовлетворенность</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="channels">Каналы</TabsTrigger>
          <TabsTrigger value="conversations">Диалоги</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Активность по каналам</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={channelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="email" stroke="#3b82f6" name="Email" />
                    <Line type="monotone" dataKey="phone" stroke="#10b981" name="Телефон" />
                    <Line type="monotone" dataKey="chat" stroke="#8b5cf6" name="Веб-чат" />
                    <Line type="monotone" dataKey="telegram" stroke="#06b6d4" name="Telegram" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Распределение по каналам</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={channelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="email" fill="#3b82f6" name="Email" />
                    <Bar dataKey="phone" fill="#10b981" name="Телефон" />
                    <Bar dataKey="chat" fill="#8b5cf6" name="Веб-чат" />
                    <Bar dataKey="telegram" fill="#06b6d4" name="Telegram" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {channels.map((channel) => (
              <Card key={channel.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${channel.color} text-white`}>
                        {channel.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{channel.name}</CardTitle>
                        <Badge variant={getStatusColor(channel.status)}>
                          {channel.status === "active" ? "Активен" : 
                           channel.status === "pending" ? "Настройка" : "Неактивен"}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Сообщений</div>
                      <div className="font-semibold">{channel.messages}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Время ответа</div>
                      <div className="font-semibold">{channel.responseTime}</div>
                    </div>
                  </div>
                  {channel.satisfaction > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Удовлетворенность</span>
                        <span className="font-semibold">{channel.satisfaction}%</span>
                      </div>
                      <Progress value={channel.satisfaction} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Активные диалоги</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{conversation.client}</h4>
                          <Badge variant="outline">{conversation.channel}</Badge>
                          <Badge variant={getConversationStatusColor(conversation.status)}>
                            {conversation.status === "open" ? "Открыт" :
                             conversation.status === "pending" ? "Ожидает" : "Завершен"}
                          </Badge>
                        </div>
                        <p className="font-medium">{conversation.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {conversation.lastMessage}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {conversation.time}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Ответить
                        </Button>
                        <Button size="sm">
                          Открыть
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Время ответа по каналам</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channels.filter(c => c.status === 'active').map((channel) => (
                    <div key={channel.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{channel.name}</span>
                        <span className="font-semibold">{channel.responseTime}</span>
                      </div>
                      <Progress value={channel.satisfaction} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Удовлетворенность клиентов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channels.filter(c => c.status === 'active').map((channel) => (
                    <div key={channel.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{channel.name}</span>
                        <span className="font-semibold">{channel.satisfaction}%</span>
                      </div>
                      <Progress value={channel.satisfaction} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Omnichannel;