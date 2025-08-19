import { Bot, MessageSquare, Zap, Settings, BarChart3, Brain, Plus, Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const AI = () => {
  const [newModelName, setNewModelName] = useState("");
  const [newModelType, setNewModelType] = useState("");
  const [newModelProvider, setNewModelProvider] = useState("");
  const [aiModels, setAiModels] = useState([
    { id: 1, name: "GPT-4", type: "text-generation", provider: "OpenAI", status: "active", accuracy: "95%" },
    { id: 2, name: "Claude-3", type: "text-generation", provider: "Anthropic", status: "active", accuracy: "93%" },
    { id: 3, name: "Llama-2", type: "text-generation", provider: "Meta", status: "inactive", accuracy: "87%" },
    { id: 4, name: "BERT", type: "text-classification", provider: "Google", status: "active", accuracy: "91%" },
  ]);
  const aiFeatures = [
    {
      title: "Автоответы",
      description: "ИИ автоматически отвечает на часто задаваемые вопросы",
      status: "active",
      usage: "87%"
    },
    {
      title: "Классификация тикетов",
      description: "Автоматическое определение категории и приоритета",
      status: "active",
      usage: "94%"
    },
    {
      title: "Анализ тональности",
      description: "Определение эмоционального состояния клиента",
      status: "beta",
      usage: "76%"
    },
    {
      title: "Умные предложения",
      description: "Предложения решений на основе истории",
      status: "inactive",
      usage: "0%"
    }
  ];

  const recentSuggestions = [
    "Клиент спрашивает о возврате. Предложить инструкцию по возврату.",
    "Технический вопрос о настройке. Переадресовать в тех. поддержку.",
    "Жалоба на качество. Предложить компенсацию.",
    "Вопрос о доставке. Предоставить трек-номер."
  ];

  const handleAddModel = () => {
    if (newModelName && newModelType && newModelProvider) {
      const newModel = {
        id: aiModels.length + 1,
        name: newModelName,
        type: newModelType,
        provider: newModelProvider,
        status: "inactive",
        accuracy: "N/A"
      };
      setAiModels([...aiModels, newModel]);
      setNewModelName("");
      setNewModelType("");
      setNewModelProvider("");
    }
  };

  const handleDeleteModel = (id: number) => {
    setAiModels(aiModels.filter(model => model.id !== id));
  };

  const toggleModelStatus = (id: number) => {
    setAiModels(aiModels.map(model => 
      model.id === id 
        ? { ...model, status: model.status === 'active' ? 'inactive' : 'active' }
        : model
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Bot className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">ИИ Помощник</h1>
          <p className="text-muted-foreground">Умная автоматизация для службы поддержки</p>
        </div>
        <Badge variant="secondary" className="ml-auto">Бета</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Активные функции ИИ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{feature.title}</h3>
                      <Badge 
                        variant={feature.status === 'active' ? 'default' : feature.status === 'beta' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {feature.status === 'active' ? 'Активно' : feature.status === 'beta' ? 'Бета' : 'Неактивно'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Использование: {feature.usage}
                    </div>
                  </div>
                  <Switch checked={feature.status !== 'inactive'} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Тестирование ИИ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="test-message">Тестовое сообщение от клиента</Label>
                <Textarea 
                  id="test-message"
                  placeholder="Введите сообщение клиента для тестирования ИИ..."
                  className="mt-2"
                />
              </div>
              <Button className="w-full">
                <Bot className="h-4 w-4 mr-2" />
                Получить ответ ИИ
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Статистика ИИ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2,847</div>
                <div className="text-sm text-muted-foreground">Обработано тикетов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">94.2%</div>
                <div className="text-sm text-muted-foreground">Точность ответов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">1.8 сек</div>
                <div className="text-sm text-muted-foreground">Среднее время ответа</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Умные предложения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-accent/30 rounded-lg">
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                ИИ Модели
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Добавление новой модели */}
              <div className="space-y-2 p-3 border rounded-lg bg-accent/20">
                <h4 className="font-medium text-sm">Добавить модель</h4>
                <div className="space-y-2">
                  <Input
                    placeholder="Название модели"
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                  />
                  <Select value={newModelType} onValueChange={setNewModelType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Тип модели" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text-generation">Генерация текста</SelectItem>
                      <SelectItem value="text-classification">Классификация</SelectItem>
                      <SelectItem value="sentiment-analysis">Анализ тональности</SelectItem>
                      <SelectItem value="translation">Перевод</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Провайдер (OpenAI, Google, etc.)"
                    value={newModelProvider}
                    onChange={(e) => setNewModelProvider(e.target.value)}
                  />
                  <Button onClick={handleAddModel} size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить модель
                  </Button>
                </div>
              </div>

              {/* Список моделей */}
              <div className="space-y-2">
                {aiModels.map((model) => (
                  <div key={model.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{model.name}</span>
                        <Badge variant={model.status === 'active' ? 'default' : 'outline'} className="text-xs">
                          {model.status === 'active' ? 'Активна' : 'Неактивна'}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {model.provider} • {model.type} • {model.accuracy}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleModelStatus(model.id)}
                      >
                        <Zap className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteModel(model.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Настройки ИИ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Обучить модель
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Импорт данных
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Настройки API
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AI;