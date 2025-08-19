import { useState } from "react";
import { Plus, Zap, Settings, Check, X, Globe, MessageSquare, Mail, Phone, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AddIntegration = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [integrationName, setIntegrationName] = useState("");
  const [integrationDescription, setIntegrationDescription] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");

  const integrationCategories = [
    {
      id: "messaging",
      title: "Мессенджеры",
      icon: MessageSquare,
      integrations: [
        {
          name: "Telegram Bot",
          description: "Интеграция с Telegram для автоматических ответов",
          icon: "📱",
          fields: ["Bot Token", "Webhook URL"]
        },
        {
          name: "WhatsApp Business",
          description: "Подключение WhatsApp Business API",
          icon: "💬",
          fields: ["Phone Number ID", "Access Token"]
        },
        {
          name: "VK Сообщества",
          description: "Интеграция с VK для сообщества",
          icon: "🔵",
          fields: ["Community Token", "Secret Key"]
        }
      ]
    },
    {
      id: "email",
      title: "Email",
      icon: Mail,
      integrations: [
        {
          name: "Gmail API",
          description: "Интеграция с Gmail для обработки писем",
          icon: "📧",
          fields: ["Client ID", "Client Secret"]
        },
        {
          name: "Outlook 365",
          description: "Подключение к Microsoft Outlook",
          icon: "📨",
          fields: ["Tenant ID", "Application ID"]
        }
      ]
    },
    {
      id: "sms",
      title: "SMS",
      icon: Phone,
      integrations: [
        {
          name: "SMS.ru",
          description: "Отправка SMS через SMS.ru",
          icon: "📲",
          fields: ["API ID", "Login", "Password"]
        },
        {
          name: "Twilio SMS",
          description: "SMS через Twilio API",
          icon: "📱",
          fields: ["Account SID", "Auth Token"]
        }
      ]
    },
    {
      id: "crm",
      title: "CRM системы",
      icon: Globe,
      integrations: [
        {
          name: "AmoCRM",
          description: "Синхронизация с AmoCRM",
          icon: "🔗",
          fields: ["Domain", "Client ID", "Client Secret"]
        },
        {
          name: "Битрикс24",
          description: "Интеграция с Битрикс24",
          icon: "🏢",
          fields: ["Portal URL", "Access Token"]
        }
      ]
    },
    {
      id: "ai",
      title: "ИИ сервисы",
      icon: Bot,
      integrations: [
        {
          name: "OpenAI GPT",
          description: "Подключение OpenAI для умных ответов",
          icon: "🤖",
          fields: ["API Key", "Organization ID"]
        },
        {
          name: "Yandex GPT",
          description: "Интеграция с Yandex GPT",
          icon: "🧠",
          fields: ["API Key", "Folder ID"]
        }
      ]
    }
  ];

  const [activeIntegrations, setActiveIntegrations] = useState([
    { name: "Telegram Bot", status: "active", category: "messaging" },
    { name: "Gmail API", status: "active", category: "email" },
    { name: "SMS.ru", status: "warning", category: "sms" },
    { name: "OpenAI GPT", status: "active", category: "ai" }
  ]);

  const handleAddIntegration = () => {
    if (integrationName) {
      const newIntegration = {
        name: integrationName,
        status: "active",
        category: selectedCategory
      };
      setActiveIntegrations([...activeIntegrations, newIntegration]);
      
      toast({
        title: "Интеграция добавлена ✅",
        description: `${integrationName} успешно подключена (демо функция)`,
      });

      // Сброс формы
      setIntegrationName("");
      setIntegrationDescription("");
      setApiKey("");
      setWebhookUrl("");
      setSelectedCategory("");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/20 text-success"><Check className="h-3 w-3 mr-1" />Активна</Badge>;
      case 'warning':
        return <Badge className="bg-warning/20 text-warning">⚠️ Требует внимания</Badge>;
      case 'error':
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Ошибка</Badge>;
      default:
        return <Badge variant="outline">Неактивна</Badge>;
    }
  };

  const selectedCategoryData = integrationCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Управление интеграциями</h1>
            <p className="text-muted-foreground">Подключение внешних сервисов и API</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список категорий */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Категории интеграций</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {integrationCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.title}
                    <Badge variant="secondary" className="ml-auto">
                      {category.integrations.length}
                    </Badge>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Активные интеграции */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Активные интеграции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {activeIntegrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm font-medium">{integration.name}</span>
                    {getStatusBadge(integration.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Список интеграций в выбранной категории */}
        <div className="space-y-4">
          {selectedCategoryData ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <selectedCategoryData.icon className="h-5 w-5" />
                  {selectedCategoryData.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedCategoryData.integrations.map((integration, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-accent/20 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{integration.icon}</span>
                        <div>
                          <h3 className="font-medium">{integration.name}</h3>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        Поля: {integration.fields.join(", ")}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setIntegrationName(integration.name)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Подключить
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Выберите категорию интеграций</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Форма добавления интеграции */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Добавить интеграцию
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="integration-name">Название интеграции</Label>
                <Input
                  id="integration-name"
                  value={integrationName}
                  onChange={(e) => setIntegrationName(e.target.value)}
                  placeholder="Например: Telegram Bot"
                />
              </div>

              <div>
                <Label htmlFor="integration-category">Категория</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {integrationCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="integration-description">Описание</Label>
                <Textarea
                  id="integration-description"
                  value={integrationDescription}
                  onChange={(e) => setIntegrationDescription(e.target.value)}
                  placeholder="Краткое описание интеграции..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="api-key">API ключ</Label>
                <Input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Введите API ключ"
                />
              </div>

              <div>
                <Label htmlFor="webhook-url">Webhook URL (опционально)</Label>
                <Input
                  id="webhook-url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://example.com/webhook"
                />
              </div>

              <Button 
                onClick={handleAddIntegration}
                className="w-full"
                disabled={!integrationName || !selectedCategory}
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить интеграцию
              </Button>
            </CardContent>
          </Card>

          {/* Статистика */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Всего интеграций</span>
                <span className="font-bold">{activeIntegrations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Активных</span>
                <span className="font-bold text-success">
                  {activeIntegrations.filter(i => i.status === 'active').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Требуют внимания</span>
                <span className="font-bold text-warning">
                  {activeIntegrations.filter(i => i.status === 'warning').length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddIntegration;