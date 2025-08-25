import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Brain, 
  Zap, 
  TrendingUp,
  MessageSquare,
  Target,
  Clock,
  Users
} from "lucide-react";
import AIAssistant from "@/components/AIAssistant";

const AIAssistantPage = () => {
  const [selectedTicket, setSelectedTicket] = useState("all");

  // Демо данные тикетов для анализа
  const tickets = [
    {
      id: "TIC-2024-001",
      subject: "Проблема с авторизацией в системе",
      content: "Здравствуйте! Не могу войти в личный кабинет. Ошибка 'Неверный пароль', хотя пароль точно правильный.",
      status: "in-progress",
      priority: "high"
    },
    {
      id: "TIC-2024-002", 
      subject: "Интеграция с Telegram не работает",
      content: "Бот не отвечает на сообщения, webhook возвращает ошибку 500. Настройки вроде правильные.",
      status: "new",
      priority: "critical"
    },
    {
      id: "TIC-2024-003",
      subject: "Вопрос по тарифам",
      content: "Хочу перейти на более дорогой тариф, где это можно сделать?",
      status: "new", 
      priority: "low"
    }
  ];

  const aiStats = [
    {
      icon: MessageSquare,
      label: "Обработано тикетов",
      value: "142",
      change: "+23%",
      period: "за неделю"
    },
    {
      icon: Target,
      label: "Точность предложений",
      value: "89%",
      change: "+5%",
      period: "за месяц"
    },
    {
      icon: Clock,
      label: "Сэкономлено времени",
      value: "24ч",
      change: "+12%",
      period: "за неделю"
    },
    {
      icon: Users,
      label: "Довольных агентов",
      value: "18/20",
      change: "+2",
      period: "используют ИИ"
    }
  ];

  const selectedTicketData = tickets.find(t => t.id === selectedTicket) || tickets[0];

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Суфлёр</h1>
            <p className="text-muted-foreground">
              Умный помощник для анализа и обработки тикетов
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Brain className="h-4 w-4 mr-2" />
            Настройки ИИ
          </Button>
          <Button className="btn-gradient">
            <Zap className="h-4 w-4 mr-2" />
            Обучить модель
          </Button>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-success" />
                    <span className="text-xs text-success">{stat.change}</span>
                    <span className="text-xs text-muted-foreground">{stat.period}</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-primary/20">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="live-analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="live-analysis">Анализ тикетов</TabsTrigger>
          <TabsTrigger value="training">Обучение</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        <TabsContent value="live-analysis" className="space-y-6">
          {/* Выбор тикета для анализа */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Выберите тикет для анализа
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center">
                <Select value={selectedTicket} onValueChange={setSelectedTicket}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Выберите тикет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Анализ без конкретного тикета</SelectItem>
                    {tickets.map(ticket => (
                      <SelectItem key={ticket.id} value={ticket.id}>
                        {ticket.id} - {ticket.subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedTicket !== "all" && selectedTicketData && (
                  <div className="flex gap-2">
                    <Badge variant={selectedTicketData.priority === "critical" ? "destructive" : "secondary"}>
                      {selectedTicketData.priority}
                    </Badge>
                    <Badge variant="outline">
                      {selectedTicketData.status}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant компонент */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <AIAssistant 
                ticketId={selectedTicket !== "all" ? selectedTicketData?.id : undefined}
                ticketContent={selectedTicket !== "all" ? selectedTicketData?.content : undefined}
                onSuggestionApply={(suggestion) => {
                  console.log("Applied suggestion:", suggestion);
                }}
              />
            </div>
            
            {/* Боковая панель с дополнительной информацией */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Активные задачи ИИ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Анализ настроения</span>
                    <Badge variant="secondary" className="text-xs">В процессе</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Генерация ответа</span>
                    <Badge className="bg-success/20 text-success text-xs">Готово</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Категоризация</span>
                    <Badge className="bg-success/20 text-success text-xs">Готово</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Рекомендации системы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="font-medium text-primary mb-1">
                      🎯 Оптимизация производительности
                    </div>
                    <div className="text-muted-foreground">
                      Рекомендуем включить автоматическую категоризацию для повышения скорости обработки
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="font-medium text-warning mb-1">
                      📚 Обновление базы знаний
                    </div>
                    <div className="text-muted-foreground">
                      Добавьте больше примеров для улучшения качества предложений
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="font-medium text-success mb-1">
                      ✅ Отличная работа!
                    </div>
                    <div className="text-muted-foreground">
                      Точность предложений выросла на 15% за последнюю неделю
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Обучение AI модели</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Bot className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Раздел в разработке</h3>
                <p className="text-muted-foreground">
                  Здесь будут инструменты для обучения и настройки AI модели
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Настройки AI помощника</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Раздел в разработке</h3>
                <p className="text-muted-foreground">
                  Здесь будут настройки поведения и параметров AI
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistantPage;