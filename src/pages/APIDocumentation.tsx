import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Globe,
  Copy,
  Key,
  Book,
  Code,
  Zap,
  Shield,
  Database,
  MessageSquare
} from "lucide-react";

const APIDocumentation = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("sk_live_1234567890abcdef...");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано",
      description: "Код скопирован в буфер обмена",
    });
  };

  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/tickets",
      description: "Получить список тикетов",
      params: ["page", "limit", "status", "department"]
    },
    {
      method: "POST",
      path: "/api/v1/tickets",
      description: "Создать новый тикет",
      params: ["title", "description", "priority", "department_id"]
    },
    {
      method: "GET",
      path: "/api/v1/tickets/{id}",
      description: "Получить тикет по ID",
      params: ["include_messages"]
    },
    {
      method: "PUT",
      path: "/api/v1/tickets/{id}",
      description: "Обновить тикет",
      params: ["status", "priority", "assigned_to"]
    },
    {
      method: "POST",
      path: "/api/v1/tickets/{id}/messages",
      description: "Добавить сообщение в тикет",
      params: ["message", "is_internal", "attachments"]
    },
    {
      method: "GET",
      path: "/api/v1/clients",
      description: "Получить список клиентов",
      params: ["search", "page", "limit"]
    },
    {
      method: "POST",
      path: "/api/v1/clients",
      description: "Создать клиента",
      params: ["name", "email", "phone", "custom_fields"]
    },
    {
      method: "GET",
      path: "/api/v1/staff",
      description: "Получить список сотрудников",
      params: ["department", "role", "active"]
    },
    {
      method: "GET",
      path: "/api/v1/departments",
      description: "Получить список департаментов",
      params: ["include_staff", "include_integrations"]
    },
    {
      method: "POST",
      path: "/api/v1/webhooks",
      description: "Создать webhook",
      params: ["url", "events", "secret"]
    }
  ];

  const examples = {
    createTicket: `curl -X POST https://api.ticketpro.com/v1/tickets \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Проблема с входом в систему",
    "description": "Пользователь не может войти в аккаунт",
    "priority": "high",
    "department_id": 1,
    "client_email": "user@example.com"
  }'`,
    
    getTickets: `curl -X GET "https://api.ticketpro.com/v1/tickets?status=open&department=support" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    
    webhook: `{
  "event": "ticket.created",
  "timestamp": "2024-01-16T10:30:00Z",
  "data": {
    "ticket": {
      "id": 12345,
      "title": "Новый тикет",
      "status": "open",
      "priority": "medium",
      "client": {
        "id": 789,
        "name": "Иван Иванов",
        "email": "ivan@example.com"
      }
    }
  }
}`
  };

  const responseExample = `{
  "success": true,
  "data": {
    "id": 12345,
    "title": "Проблема с входом в систему",
    "description": "Пользователь не может войти в аккаунт",
    "status": "open",
    "priority": "high",
    "created_at": "2024-01-16T10:30:00Z",
    "updated_at": "2024-01-16T10:30:00Z",
    "department": {
      "id": 1,
      "name": "Техподдержка"
    },
    "client": {
      "id": 789,
      "name": "Иван Иванов",
      "email": "ivan@example.com"
    },
    "assigned_to": null,
    "sla": {
      "response_time": 120,
      "resolution_time": 480,
      "status": "within_sla"
    }
  },
  "meta": {
    "rate_limit": {
      "limit": 1000,
      "remaining": 999,
      "reset": 1642334400
    }
  }
}`;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-none p-6 border-b border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              API Документация
            </h1>
            <p className="text-muted-foreground">Полное руководство по REST API TicketPro</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            v1.0
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 h-12">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="auth" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Авторизация
            </TabsTrigger>
            <TabsTrigger value="endpoints" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Эндпоинты
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Примеры
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Webhooks
            </TabsTrigger>
            <TabsTrigger value="sdk" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              SDK
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Добро пожаловать в TicketPro API</CardTitle>
                <CardDescription>
                  REST API для интеграции с системой управления тикетами
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Базовый URL</h3>
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                    https://api.ticketpro.com/v1
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Формат данных</h3>
                  <p className="text-muted-foreground">
                    API использует JSON для всех запросов и ответов. Убедитесь, что устанавливаете заголовок <code>Content-Type: application/json</code> для всех POST/PUT запросов.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Ограничения</h3>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Лимит запросов</p>
                      <p className="text-sm text-muted-foreground">1000 запросов/час</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Размер запроса</p>
                      <p className="text-sm text-muted-foreground">Максимум 10MB</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Таймаут</p>
                      <p className="text-sm text-muted-foreground">30 секунд</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Коды ошибок</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <Badge variant="outline">200</Badge>
                      <span>Успешный запрос</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <Badge variant="destructive">400</Badge>
                      <span>Неверный запрос</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <Badge variant="destructive">401</Badge>
                      <span>Неавторизован</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <Badge variant="destructive">403</Badge>
                      <span>Доступ запрещен</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <Badge variant="destructive">404</Badge>
                      <span>Ресурс не найден</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <Badge variant="destructive">429</Badge>
                      <span>Превышен лимит запросов</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded">
                      <Badge variant="destructive">500</Badge>
                      <span>Внутренняя ошибка сервера</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auth" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Авторизация
                </CardTitle>
                <CardDescription>Настройка доступа к API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">API Ключ</h3>
                  <div className="flex gap-2">
                    <Input value={apiKey} readOnly className="font-mono" />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => copyToClipboard(apiKey)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Демо ключ для тестирования. В продакшене используйте настоящий API ключ.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Использование в запросах</h3>
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                    <div className="mb-2">Authorization: Bearer YOUR_API_KEY</div>
                    <div className="text-muted-foreground"># или</div>
                    <div>X-API-Key: YOUR_API_KEY</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Пример cURL</h3>
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                    curl -H "Authorization: Bearer YOUR_API_KEY" \<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;https://api.ticketpro.com/v1/tickets
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Управление ключами</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Создать новый API ключ
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Отозвать текущий ключ
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Посмотреть статистику использования
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Доступные эндпоинты</CardTitle>
                <CardDescription>Полный список API методов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={
                          endpoint.method === "GET" ? "secondary" :
                          endpoint.method === "POST" ? "default" :
                          endpoint.method === "PUT" ? "outline" : "destructive"
                        }>
                          {endpoint.method}
                        </Badge>
                        <code className="font-mono text-sm">{endpoint.path}</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {endpoint.description}
                      </p>
                      <div className="flex gap-1 flex-wrap">
                        {endpoint.params.map((param, paramIndex) => (
                          <Badge key={paramIndex} variant="outline" className="text-xs">
                            {param}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <div className="grid gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Создание тикета</CardTitle>
                  <CardDescription>POST /api/v1/tickets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Запрос</h4>
                      <div className="relative">
                        <pre className="p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                          {examples.createTicket}
                        </pre>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(examples.createTicket)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Ответ</h4>
                      <div className="relative">
                        <pre className="p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                          {responseExample}
                        </pre>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(responseExample)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Получение списка тикетов</CardTitle>
                  <CardDescription>GET /api/v1/tickets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                      {examples.getTickets}
                    </pre>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(examples.getTickets)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Webhooks
                </CardTitle>
                <CardDescription>Получение уведомлений о событиях в реальном времени</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Доступные события</h3>
                  <div className="grid gap-2 md:grid-cols-2">
                    {[
                      "ticket.created",
                      "ticket.updated", 
                      "ticket.closed",
                      "ticket.assigned",
                      "message.created",
                      "client.created",
                      "sla.violated",
                      "integration.failed"
                    ].map((event, index) => (
                      <div key={index} className="p-2 border rounded text-sm font-mono">
                        {event}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Пример payload</h3>
                  <div className="relative">
                    <pre className="p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                      {examples.webhook}
                    </pre>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(examples.webhook)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Безопасность</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Все webhook запросы подписываются секретным ключом. Проверяйте подпись в заголовке <code>X-Webhook-Signature</code>.
                  </p>
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                    X-Webhook-Signature: sha256=abc123...
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sdk" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>SDK и библиотеки</CardTitle>
                <CardDescription>Готовые решения для разных языков программирования</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">JavaScript/Node.js</h3>
                    <div className="p-2 bg-muted rounded font-mono text-sm mb-2">
                      npm install ticketpro-sdk
                    </div>
                    <Button variant="outline" size="sm">
                      Документация
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Python</h3>
                    <div className="p-2 bg-muted rounded font-mono text-sm mb-2">
                      pip install ticketpro-python
                    </div>
                    <Button variant="outline" size="sm">
                      Документация
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">PHP</h3>
                    <div className="p-2 bg-muted rounded font-mono text-sm mb-2">
                      composer require ticketpro/sdk
                    </div>
                    <Button variant="outline" size="sm">
                      Документация
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">C#/.NET</h3>
                    <div className="p-2 bg-muted rounded font-mono text-sm mb-2">
                      Install-Package TicketPro.SDK
                    </div>
                    <Button variant="outline" size="sm">
                      Документация
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Пример использования (JavaScript)</h3>
                  <div className="relative">
                    <pre className="p-3 bg-muted rounded-lg text-sm overflow-x-auto">
{`import TicketPro from 'ticketpro-sdk';

const client = new TicketPro({
  apiKey: 'your-api-key'
});

// Создать тикет
const ticket = await client.tickets.create({
  title: 'Проблема с входом',
  description: 'Описание проблемы',
  priority: 'high'
});

// Получить список тикетов  
const tickets = await client.tickets.list({
  status: 'open',
  department: 'support'
});`}
                    </pre>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`import TicketPro from 'ticketpro-sdk';

const client = new TicketPro({
  apiKey: 'your-api-key'
});

// Создать тикет
const ticket = await client.tickets.create({
  title: 'Проблема с входом',
  description: 'Описание проблемы',
  priority: 'high'
});

// Получить список тикетов  
const tickets = await client.tickets.list({
  status: 'open',
  department: 'support'
});`)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default APIDocumentation;