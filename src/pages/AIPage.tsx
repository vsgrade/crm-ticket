import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Bot,
  Brain,
  MessageSquare,
  Zap,
  Settings,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Key,
  Database,
  TrendingUp
} from "lucide-react";

const AIPage = () => {
  const { toast } = useToast();
  const [testMessage, setTestMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4");

  const aiModels = [
    {
      id: "gpt-4",
      name: "GPT-4",
      provider: "OpenAI",
      type: "Генерация текста",
      status: "active",
      accuracy: 95,
      speed: "2.3s",
      cost: "$0.03/1K токенов"
    },
    {
      id: "claude-3",
      name: "Claude-3",
      provider: "Anthropic", 
      type: "Анализ и генерация",
      status: "active",
      accuracy: 93,
      speed: "1.8s",
      cost: "$0.025/1K токенов"
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      provider: "Google",
      type: "Мультимодальный",
      status: "beta",
      accuracy: 91,
      speed: "1.5s", 
      cost: "$0.02/1K токенов"
    },
    {
      id: "llama-2",
      name: "LLaMA-2",
      provider: "Meta",
      type: "Открытая модель",
      status: "inactive",
      accuracy: 87,
      speed: "3.1s",
      cost: "Бесплатно"
    }
  ];

  const aiFeatures = [
    {
      id: "auto-reply",
      name: "Автоответы",
      description: "Автоматические ответы на часто задаваемые вопросы",
      enabled: true,
      usage: 87,
      accuracy: 94
    },
    {
      id: "sentiment",
      name: "Анализ тональности",
      description: "Определение эмоционального состояния клиента",
      enabled: true,
      usage: 76,
      accuracy: 91
    },
    {
      id: "classification",
      name: "Классификация тикетов",
      description: "Автоматическое определение категории и приоритета",
      enabled: true,
      usage: 92,
      accuracy: 96
    },
    {
      id: "smart-routing",
      name: "Умная маршрутизация",
      description: "Автоматическое назначение тикетов специалистам",
      enabled: false,
      usage: 0,
      accuracy: 0
    },
    {
      id: "knowledge-search",
      name: "Поиск в базе знаний",
      description: "Автоматический поиск релевантных статей",
      enabled: true,
      usage: 65,
      accuracy: 89
    }
  ];

  const aiStats = {
    totalProcessed: 15247,
    averageAccuracy: 93.2,
    averageResponseTime: "1.8s",
    successRate: 97.5,
    tokensUsed: "2.4M",
    costThisMonth: "$156.32"
  };

  const handleTestAI = async () => {
    if (!testMessage.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите сообщение для тестирования",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setAiResponse("");

    // Симуляция AI обработки
    setTimeout(() => {
      const responses = [
        "Спасибо за ваше обращение! По вашему вопросу рекомендую обратиться к статье 'Решение проблем с входом' в нашей базе знаний. Если это не поможет, создам тикет для технической поддержки.",
        "Понимаю ваше беспокойство. Ваш запрос классифицирован как 'Высокий приоритет'. Переадресую специалисту отдела продаж. Ожидаемое время ответа: 15 минут.",
        "Определяю позитивную тональность сообщения. Вопрос касается функциональности продукта. Рекомендую посмотреть обучающее видео в разделе 'Помощь' или записаться на персональную консультацию.",
        "Анализ показывает техническую проблему. Создаю тикет в отделе разработки. Приоритет: Средний. Примерное время решения: 2-3 рабочих дня."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      setIsProcessing(false);
      
      toast({
        title: "Анализ завершен",
        description: "AI обработал ваше сообщение"
      });
    }, 2000);
  };

  const toggleFeature = (featureId: string) => {
    toast({
      title: "Настройки обновлены",
      description: "Изменения функции AI сохранены"
    });
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-none p-6 border-b border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Искусственный интеллект
            </h1>
            <p className="text-muted-foreground">Умная автоматизация службы поддержки</p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            Статус: Активен
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-12">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Функции
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Модели
            </TabsTrigger>
            <TabsTrigger value="testing" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Тестирование
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Статистика */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-muted-foreground">Обработано</p>
                      <div className="text-2xl font-bold">{aiStats.totalProcessed.toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-muted-foreground">Точность</p>
                      <div className="text-2xl font-bold">{aiStats.averageAccuracy}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-muted-foreground">Время ответа</p>
                      <div className="text-2xl font-bold">{aiStats.averageResponseTime}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 text-purple-500" />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-muted-foreground">Успешность</p>
                      <div className="text-2xl font-bold">{aiStats.successRate}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Database className="h-4 w-4 text-orange-500" />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-muted-foreground">Токенов</p>
                      <div className="text-2xl font-bold">{aiStats.tokensUsed}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Key className="h-4 w-4 text-red-500" />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-muted-foreground">Расходы</p>
                      <div className="text-2xl font-bold">{aiStats.costThisMonth}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* График производительности */}
            <Card>
              <CardHeader>
                <CardTitle>Производительность AI за последние 7 дней</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded bg-muted/30">
                  <p className="text-muted-foreground">График производительности (демо)</p>
                </div>
              </CardContent>
            </Card>

            {/* Топ функций */}
            <Card>
              <CardHeader>
                <CardTitle>Наиболее используемые функции</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiFeatures.filter(f => f.enabled).sort((a, b) => b.usage - a.usage).map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{feature.name}</span>
                          <span className="text-sm text-muted-foreground">{feature.usage}%</span>
                        </div>
                        <Progress value={feature.usage} className="h-2" />
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-sm font-medium">{feature.accuracy}%</div>
                        <div className="text-xs text-muted-foreground">точность</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Функции искусственного интеллекта</CardTitle>
                <CardDescription>Управление AI возможностями системы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiFeatures.map((feature) => (
                    <Card key={feature.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{feature.name}</h3>
                            <Badge variant={feature.enabled ? "default" : "outline"}>
                              {feature.enabled ? "Активно" : "Отключено"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {feature.description}
                          </p>
                          {feature.enabled && (
                            <div className="flex gap-6 text-sm">
                              <div>
                                <span className="text-muted-foreground">Использование: </span>
                                <span className="font-medium">{feature.usage}%</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Точность: </span>
                                <span className="font-medium">{feature.accuracy}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Switch 
                            checked={feature.enabled}
                            onCheckedChange={() => toggleFeature(feature.id)}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Модели</CardTitle>
                <CardDescription>Управление языковыми моделями</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {aiModels.map((model) => (
                    <Card key={model.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{model.name}</h3>
                          <Badge variant={
                            model.status === "active" ? "default" :
                            model.status === "beta" ? "secondary" : "outline"
                          }>
                            {model.status === "active" ? "Активна" :
                             model.status === "beta" ? "Бета" : "Неактивна"}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Провайдер:</span>
                          <span>{model.provider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Тип:</span>
                          <span>{model.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Точность:</span>
                          <span>{model.accuracy}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Скорость:</span>
                          <span>{model.speed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Стоимость:</span>
                          <span>{model.cost}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          {model.status === "active" ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                          {model.status === "active" ? "Остановить" : "Запустить"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Тестирование AI</CardTitle>
                <CardDescription>Проверка работы искусственного интеллекта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="model-select">Выберите модель для тестирования</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {aiModels.filter(m => m.status === "active").map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} ({model.provider})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="test-input">Тестовое сообщение от клиента</Label>
                    <Textarea
                      id="test-input"
                      placeholder="Введите сообщение клиента для анализа AI..."
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                      className="mt-2 min-h-[100px]"
                    />
                  </div>

                  <Button 
                    onClick={handleTestAI} 
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                        Обработка...
                      </>
                    ) : (
                      <>
                        <Bot className="h-4 w-4 mr-2" />
                        Анализировать с помощью AI
                      </>
                    )}
                  </Button>
                </div>

                {(aiResponse || isProcessing) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Ответ AI</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <RotateCcw className="h-4 w-4 animate-spin" />
                          <span>AI анализирует сообщение...</span>
                        </div>
                      ) : (
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="whitespace-pre-wrap">{aiResponse}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Общие настройки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Основная модель</Label>
                    <Select defaultValue="gpt-4">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4 (OpenAI)</SelectItem>
                        <SelectItem value="claude-3">Claude-3 (Anthropic)</SelectItem>
                        <SelectItem value="gemini-pro">Gemini Pro (Google)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Температура модели</Label>
                    <Input type="number" min="0" max="1" step="0.1" defaultValue="0.7" />
                    <p className="text-xs text-muted-foreground">
                      Контролирует творческость ответов (0-1)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Максимум токенов</Label>
                    <Input type="number" defaultValue="1000" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Ключи</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>OpenAI API Key</Label>
                    <div className="flex gap-2">
                      <Input type="password" placeholder="sk-..." />
                      <Button variant="outline" size="icon">
                        <Key className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Anthropic API Key</Label>
                    <div className="flex gap-2">
                      <Input type="password" placeholder="sk-ant-..." />
                      <Button variant="outline" size="icon">
                        <Key className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Google API Key</Label>
                    <div className="flex gap-2">
                      <Input type="password" placeholder="AIza..." />
                      <Button variant="outline" size="icon">
                        <Key className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Обучение модели</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Загрузить данные для обучения
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Экспортировать модель
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Переобучить модель
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Мониторинг</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Логирование запросов</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Уведомления об ошибках</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Аналитика использования</Label>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIPage;