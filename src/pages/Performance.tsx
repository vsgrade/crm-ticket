import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Target,
  TrendingUp,
  Clock,
  Star,
  Users,
  MessageSquare,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const Performance = () => {
  const teamStats = [
    {
      name: "Иванов Иван",
      role: "Ведущий специалист",
      ticketsResolved: 156,
      avgResponseTime: "1.2ч",
      satisfaction: 4.9,
      slaCompliance: 98,
      efficiency: 92,
      trend: "up"
    },
    {
      name: "Петрова Мария",
      role: "Специалист поддержки",
      ticketsResolved: 134,
      avgResponseTime: "1.8ч",
      satisfaction: 4.7,
      slaCompliance: 94,
      efficiency: 89,
      trend: "up"
    },
    {
      name: "Сидоров Алексей",
      role: "Младший специалист",
      ticketsResolved: 98,
      avgResponseTime: "2.4ч",
      satisfaction: 4.5,
      slaCompliance: 87,
      efficiency: 76,
      trend: "down"
    },
    {
      name: "Козлова Елена",
      role: "Специалист поддержки",
      ticketsResolved: 142,
      avgResponseTime: "1.5ч",
      satisfaction: 4.8,
      slaCompliance: 96,
      efficiency: 88,
      trend: "stable"
    }
  ];

  const departmentStats = [
    {
      name: "Техподдержка",
      totalTickets: 456,
      resolved: 423,
      avgTime: "2.1ч",
      satisfaction: 4.6,
      staff: 8
    },
    {
      name: "Продажи",
      totalTickets: 234,
      resolved: 228,
      avgTime: "1.8ч",
      satisfaction: 4.8,
      staff: 5
    },
    {
      name: "Бухгалтерия",
      totalTickets: 123,
      resolved: 119,
      avgTime: "3.2ч",
      satisfaction: 4.4,
      staff: 3
    }
  ];

  const getPerformanceColor = (value: number, type: string) => {
    if (type === "satisfaction") {
      if (value >= 4.8) return "text-green-600";
      if (value >= 4.5) return "text-yellow-600";
      return "text-red-600";
    }
    if (value >= 90) return "text-green-600";
    if (value >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-none p-6 border-b border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Производительность
            </h1>
            <p className="text-muted-foreground">Анализ эффективности команды</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            Демо данные
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto space-y-6">
        {/* Общие метрики */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Активных операторов</p>
                  <p className="text-2xl font-bold">16</p>
                  <p className="text-xs text-green-600">+2 за месяц</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Среднее время ответа</p>
                  <p className="text-2xl font-bold">1.8ч</p>
                  <p className="text-xs text-green-600">-15% улучшение</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Средняя оценка</p>
                  <p className="text-2xl font-bold">4.7</p>
                  <p className="text-xs text-green-600">+0.3 улучшение</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Эффективность команды</p>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-yellow-600">-2% снижение</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Производительность сотрудников */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Производительность сотрудников
                </CardTitle>
                <CardDescription>Индивидуальные метрики операторов</CardDescription>
              </div>
              <Button variant="outline">Экспорт отчета</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamStats.map((member, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{member.ticketsResolved}</p>
                        <p className="text-xs text-muted-foreground">Тикетов решено</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold">{member.avgResponseTime}</p>
                        <p className="text-xs text-muted-foreground">Среднее время</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-lg font-semibold ${getPerformanceColor(member.satisfaction, "satisfaction")}`}>
                          {member.satisfaction}/5
                        </p>
                        <p className="text-xs text-muted-foreground">Оценка клиентов</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-lg font-semibold ${getPerformanceColor(member.slaCompliance, "sla")}`}>
                          {member.slaCompliance}%
                        </p>
                        <p className="text-xs text-muted-foreground">SLA</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-2">
                          <p className={`text-lg font-semibold ${getPerformanceColor(member.efficiency, "efficiency")}`}>
                            {member.efficiency}%
                          </p>
                          {getTrendIcon(member.trend)}
                        </div>
                        <p className="text-xs text-muted-foreground">Эффективность</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Общая производительность</span>
                      <span className="text-sm font-medium">{member.efficiency}%</span>
                    </div>
                    <Progress value={member.efficiency} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Производительность департаментов */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Производительность департаментов
            </CardTitle>
            <CardDescription>Сравнительный анализ по отделам</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {departmentStats.map((dept, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{dept.name}</h3>
                    <Badge variant="outline">{dept.staff} сотрудников</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Всего тикетов</span>
                      <span className="font-medium">{dept.totalTickets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Решено</span>
                      <span className="font-medium text-green-600">{dept.resolved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Среднее время</span>
                      <span className="font-medium">{dept.avgTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Удовлетворенность</span>
                      <span className={`font-medium ${getPerformanceColor(dept.satisfaction, "satisfaction")}`}>
                        {dept.satisfaction}/5
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Эффективность</span>
                        <span className="text-sm font-medium">
                          {Math.round((dept.resolved / dept.totalTickets) * 100)}%
                        </span>
                      </div>
                      <Progress value={(dept.resolved / dept.totalTickets) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Рекомендации */}
        <Card className="border-2 border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="h-5 w-5" />
              Рекомендации по улучшению
            </CardTitle>
            <CardDescription>Автоматические рекомендации на основе анализа данных</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-background border rounded-lg">
                <h4 className="font-medium">Обучение для Сидорова А.В.</h4>
                <p className="text-sm text-muted-foreground">
                  Рекомендуется дополнительное обучение по работе с клиентами для повышения оценок удовлетворенности
                </p>
              </div>
              <div className="p-3 bg-background border rounded-lg">
                <h4 className="font-medium">Оптимизация департамента бухгалтерии</h4>
                <p className="text-sm text-muted-foreground">
                  Среднее время решения превышает норму. Рекомендуется пересмотр процессов и добавление специалиста
                </p>
              </div>
              <div className="p-3 bg-background border rounded-lg">
                <h4 className="font-medium">Поощрение лучших сотрудников</h4>
                <p className="text-sm text-muted-foreground">
                  Иванов И.И. и Петрова М.С. показывают отличные результаты и заслуживают поощрения
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Performance;