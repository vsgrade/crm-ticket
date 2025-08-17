import { Mail, Settings, Plus, CheckCircle, AlertCircle, Send, Inbox } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Email = () => {
  const emailAccounts = [
    {
      name: "Основная поддержка",
      email: "support@company.ru",
      provider: "Microsoft Exchange",
      status: "active",
      incoming: 2847,
      outgoing: 1234,
      deliveryRate: 98.5,
      spamRate: 2.1
    },
    {
      name: "Техническая поддержка",
      email: "tech@company.ru",
      provider: "Gmail Business",
      status: "active",
      incoming: 1567,
      outgoing: 892,
      deliveryRate: 97.8,
      spamRate: 1.8
    },
    {
      name: "Биллинг",
      email: "billing@company.ru",
      provider: "Yandex.Mail для домена",
      status: "warning",
      incoming: 892,
      outgoing: 567,
      deliveryRate: 94.2,
      spamRate: 4.7
    }
  ];

  const emailTemplates = [
    {
      name: "Приветствие нового клиента",
      subject: "Добро пожаловать в нашу службу поддержки!",
      usage: 847,
      lastUsed: "2 часа назад"
    },
    {
      name: "Запрос дополнительной информации",
      subject: "Требуется дополнительная информация по вашему запросу",
      usage: 234,
      lastUsed: "15 минут назад"
    },
    {
      name: "Уведомление о решении",
      subject: "Ваш вопрос был успешно решен",
      usage: 1523,
      lastUsed: "1 час назад"
    }
  ];

  const recentEmails = [
    {
      from: "client@example.com",
      subject: "Проблема с доступом к системе",
      time: "2 минуты назад",
      status: "unread",
      priority: "high"
    },
    {
      from: "user@domain.ru",
      subject: "Вопрос по биллингу",
      time: "15 минут назад",
      status: "read",
      priority: "medium"
    },
    {
      from: "info@partner.com",
      subject: "Запрос на интеграцию",
      time: "1 час назад",
      status: "replied",
      priority: "low"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Email интеграция</h1>
            <p className="text-muted-foreground">Настройка почтовых серверов и автоответов</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить аккаунт
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Inbox className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">5,306</div>
                <div className="text-sm text-muted-foreground">Входящих писем</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Send className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">2,693</div>
                <div className="text-sm text-muted-foreground">Отправлено писем</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">97.1%</div>
                <div className="text-sm text-muted-foreground">Доставляемость</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">2.9%</div>
                <div className="text-sm text-muted-foreground">В спам</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="accounts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="accounts">Аккаунты</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
          <TabsTrigger value="recent">Последние письма</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <CardTitle>Почтовые аккаунты</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {emailAccounts.map((account, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium">{account.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getStatusIcon(account.status)}
                          <span>{account.email}</span>
                          <Badge variant="outline">{account.provider}</Badge>
                        </div>
                      </div>
                    </div>
                    <Switch checked={account.status === 'active'} />
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-muted-foreground">Входящие</div>
                      <div className="font-medium">{account.incoming.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Исходящие</div>
                      <div className="font-medium">{account.outgoing.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Доставляемость</div>
                      <div className="font-medium">{account.deliveryRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">В спам</div>
                      <div className="font-medium">{account.spamRate}%</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Доставляемость</span>
                      <span>{account.deliveryRate}%</span>
                    </div>
                    <Progress value={account.deliveryRate} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3 mr-1" />
                      Настроить
                    </Button>
                    <Button size="sm" variant="outline">
                      Тестировать
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Email шаблоны</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Создать шаблон
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {emailTemplates.map((template, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{template.subject}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Использований: {template.usage}</span>
                        <span>Последний раз: {template.lastUsed}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Редактировать
                      </Button>
                      <Button size="sm" variant="outline">
                        Использовать
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Последние письма</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentEmails.map((email, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{email.from}</span>
                        <Badge variant={
                          email.priority === 'high' ? 'destructive' :
                          email.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {email.priority === 'high' ? 'Высокий' :
                           email.priority === 'medium' ? 'Средний' : 'Низкий'}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{email.subject}</p>
                      <span className="text-xs text-muted-foreground">{email.time}</span>
                    </div>
                    <Badge variant={
                      email.status === 'unread' ? 'destructive' :
                      email.status === 'read' ? 'secondary' : 'default'
                    }>
                      {email.status === 'unread' ? 'Новое' :
                       email.status === 'read' ? 'Прочитано' : 'Отвечено'}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Показать все письма
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Email;