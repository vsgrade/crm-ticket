import { Zap, Play, Pause, Settings, Plus, Clock, CheckCircle, AlertTriangle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Automation = () => {
  const { toast } = useToast();
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: "Автоназначение тикетов",
      description: "Автоматическое назначение тикетов на основе темы и департамента",
      trigger: "Новый тикет",
      action: "Назначить агента",
      status: "active",
      executions: 156,
      successRate: 94,
      lastRun: "2 минуты назад"
    },
    {
      id: 2,
      name: "Уведомления о просроченных SLA",
      description: "Отправка уведомлений при приближении к нарушению SLA",
      trigger: "Время SLA < 30 мин",
      action: "Отправить уведомление",
      status: "active",
      executions: 23,
      successRate: 100,
      lastRun: "15 минут назад"
    },
    {
      id: 3,
      name: "Автоответы в нерабочее время",
      description: "Автоматические ответы клиентам в нерабочее время",
      trigger: "Новое сообщение вне рабочих часов",
      action: "Отправить автоответ",
      status: "active",
      executions: 89,
      successRate: 98,
      lastRun: "1 час назад"
    },
    {
      id: 4,
      name: "Эскалация критических тикетов",
      description: "Автоматическая эскалация тикетов с высоким приоритетом",
      trigger: "Приоритет = Критический",
      action: "Эскалировать менеджеру",
      status: "paused",
      executions: 12,
      successRate: 92,
      lastRun: "2 дня назад"
    },
    {
      id: 5,
      name: "Закрытие решенных тикетов",
      description: "Автоматическое закрытие тикетов через 7 дней после решения",
      trigger: "Статус = Решен 7+ дней",
      action: "Закрыть тикет",
      status: "active",
      executions: 78,
      successRate: 89,
      lastRun: "6 часов назад"
    },
  ]);

  const templates = [
    {
      id: 1,
      name: "Назначение по теме",
      description: "Назначение агента на основе ключевых слов в теме тикета",
      category: "Распределение",
      uses: 45
    },
    {
      id: 2,
      name: "Уведомление о SLA",
      description: "Уведомление менеджера при приближении к нарушению SLA",
      category: "Уведомления",
      uses: 23
    },
    {
      id: 3,
      name: "Автоответ клиенту",
      description: "Отправка автоматического ответа клиенту",
      category: "Коммуникации",
      uses: 67
    },
    {
      id: 4,
      name: "Изменение приоритета",
      description: "Автоматическое изменение приоритета на основе условий",
      category: "Обработка",
      uses: 34
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "paused": return "secondary";
      case "error": return "destructive";
      default: return "outline";
    }
  };

  const toggleAutomation = (id: number) => {
    setAutomations(prev =>
      prev.map(automation =>
        automation.id === id
          ? {
              ...automation,
              status: automation.status === "active" ? "paused" : "active"
            }
          : automation
      )
    );
    toast({
      title: "Статус изменен",
      description: "Автоматизация успешно обновлена",
    });
  };

  const runAutomation = (id: number, name: string) => {
    toast({
      title: "Автоматизация запущена",
      description: `"${name}" выполняется...`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Автоматизация</h1>
            <p className="text-muted-foreground">
              Управление автоматическими процессами и правилами
            </p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Создать правило
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-muted-foreground">Активных правил</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">358</div>
              <div className="text-sm text-muted-foreground">Выполнений сегодня</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-muted-foreground">Успешность</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">2.3 сек</div>
              <div className="text-sm text-muted-foreground">Среднее время</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Правила</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
          <TabsTrigger value="logs">Логи</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <div className="space-y-4">
            {automations.map((automation) => (
              <Card key={automation.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{automation.name}</h3>
                        <Badge variant={getStatusColor(automation.status)}>
                          {automation.status === "active" ? "Активно" : "Приостановлено"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{automation.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Триггер: </span>
                          <span className="font-medium">{automation.trigger}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Действие: </span>
                          <span className="font-medium">{automation.action}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Выполнений: </span>
                          <span className="font-medium">{automation.executions}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Успешность: </span>
                          <span className="font-medium">{automation.successRate}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Последний запуск: </span>
                          <span className="font-medium">{automation.lastRun}</span>
                        </div>
                      </div>
                      <Progress value={automation.successRate} className="mt-2" />
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Switch
                        checked={automation.status === "active"}
                        onCheckedChange={() => toggleAutomation(automation.id)}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => runAutomation(automation.id, automation.name)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Использований: {template.uses}
                    </span>
                    <Button size="sm">
                      Использовать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Логи выполнения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <h4 className="font-medium">Автоназначение тикетов</h4>
                      <p className="text-sm text-muted-foreground">
                        Тикет #12345 назначен агенту Иван Петров
                      </p>
                      <span className="text-xs text-muted-foreground">2 минуты назад</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <h4 className="font-medium">Уведомления о просроченных SLA</h4>
                      <p className="text-sm text-muted-foreground">
                        Отправлено уведомление менеджеру о тикете #12340
                      </p>
                      <span className="text-xs text-muted-foreground">15 минут назад</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div className="flex-1">
                      <h4 className="font-medium">Автоответы в нерабочее время</h4>
                      <p className="text-sm text-muted-foreground">
                        Попытка отправить автоответ, но шаблон не найден
                      </p>
                      <span className="text-xs text-muted-foreground">1 час назад</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <h4 className="font-medium">Закрытие решенных тикетов</h4>
                      <p className="text-sm text-muted-foreground">
                        Автоматически закрыт тикет #12298 (решен 7 дней назад)
                      </p>
                      <span className="text-xs text-muted-foreground">6 часов назад</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Производительность правил</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automations.map((automation) => (
                    <div key={automation.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{automation.name}</span>
                        <span className="font-semibold">{automation.successRate}%</span>
                      </div>
                      <Progress value={automation.successRate} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика выполнений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automations.map((automation) => (
                    <div key={automation.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{automation.name}</span>
                        <span className="font-semibold">{automation.executions}</span>
                      </div>
                      <Progress value={(automation.executions / 200) * 100} />
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

export default Automation;