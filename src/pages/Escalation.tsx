import { AlertTriangle, Clock, Users, Settings, TrendingUp, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Escalation = () => {
  const escalationRules = [
    {
      name: "Критические ошибки",
      condition: "Приоритет = Критический",
      action: "Немедленно → Руководитель",
      timeLimit: "15 минут",
      status: "active",
      triggered: 12
    },
    {
      name: "Высокий приоритет",
      condition: "Приоритет = Высокий + 2 часа без ответа",
      action: "Старший специалист",
      timeLimit: "2 часа",
      status: "active",
      triggered: 34
    },
    {
      name: "Недовольные клиенты",
      condition: "Тональность = Негативная + VIP клиент",
      action: "Менеджер по работе с клиентами",
      timeLimit: "30 минут",
      status: "active",
      triggered: 8
    },
    {
      name: "Просроченные SLA",
      condition: "SLA нарушен > 1 часа",
      action: "Супервайзер + Уведомление",
      timeLimit: "1 час",
      status: "active",
      triggered: 23
    }
  ];

  const recentEscalations = [
    {
      ticketId: "T-2024-1234",
      client: "ООО Рога и Копыта",
      reason: "Критическая ошибка системы",
      escalatedTo: "Иван Петров",
      time: "5 минут назад",
      priority: "Критический"
    },
    {
      ticketId: "T-2024-1235",
      client: "Мария Сидорова",
      reason: "VIP клиент, негативная тональность",
      escalatedTo: "Анна Козлова",
      time: "15 минут назад",
      priority: "Высокий"
    },
    {
      ticketId: "T-2024-1236",
      client: "ИП Васильев",
      reason: "Нарушение SLA",
      escalatedTo: "Петр Смирнов",
      time: "32 минуты назад",
      priority: "Средний"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Эскалация</h1>
            <p className="text-muted-foreground">Автоматическая эскалация тикетов</p>
          </div>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Настроить правила
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">77</div>
                <div className="text-sm text-muted-foreground">Эскалаций сегодня</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Требуют внимания</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm text-muted-foreground">Успешно решены</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Активных правил</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Правила эскалации
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {escalationRules.map((rule, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{rule.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                      {rule.status === 'active' ? 'Активно' : 'Неактивно'}
                    </Badge>
                    <Badge variant="outline">{rule.triggered} раз</Badge>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div><strong>Условие:</strong> {rule.condition}</div>
                  <div><strong>Действие:</strong> {rule.action}</div>
                  <div><strong>Время:</strong> {rule.timeLimit}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUp className="h-5 w-5" />
              Недавние эскалации
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEscalations.map((escalation, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{escalation.ticketId}</Badge>
                      <Badge variant={
                        escalation.priority === 'Критический' ? 'destructive' :
                        escalation.priority === 'Высокий' ? 'default' : 'secondary'
                      }>
                        {escalation.priority}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{escalation.time}</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div><strong>Клиент:</strong> {escalation.client}</div>
                    <div><strong>Причина:</strong> {escalation.reason}</div>
                    <div><strong>Передано:</strong> {escalation.escalatedTo}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Статистика эскалаций</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Критические</span>
                <span>15%</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Высокий приоритет</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>SLA нарушения</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Escalation;