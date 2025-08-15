import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Ticket, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  BarChart3,
  Calendar,
  Target,
  Zap,
  Globe
} from "lucide-react";
import { mockStats } from "@/data/mockData";

const Dashboard = () => {
  const quickStats = [
    {
      title: "Всего тикетов",
      value: mockStats.totalTickets,
      change: "+12%",
      icon: Ticket,
      color: "text-primary"
    },
    {
      title: "Новые тикеты", 
      value: mockStats.newTickets,
      change: "+5",
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      title: "В работе",
      value: mockStats.inProgressTickets,
      change: "-3",
      icon: Clock,
      color: "text-status-in-progress"
    },
    {
      title: "Решено сегодня",
      value: mockStats.resolvedToday,
      change: "+8",
      icon: CheckCircle,
      color: "text-success"
    }
  ];

  const performanceMetrics = [
    {
      title: "Среднее время ответа",
      value: mockStats.avgResponseTime,
      target: "< 2ч",
      status: "good",
      icon: Clock
    },
    {
      title: "Соблюдение SLA",
      value: `${mockStats.slaCompliance}%`,
      target: "> 90%",
      status: "good", 
      icon: Target
    },
    {
      title: "Активные агенты",
      value: mockStats.activeAgents,
      target: "15",
      status: "warning",
      icon: Users
    },
    {
      title: "Всего клиентов",
      value: mockStats.totalClients.toLocaleString(),
      target: "1500",
      status: "good",
      icon: Users
    }
  ];

  const recentActivity = [
    "🔄 Тикет TIC-2024-001 переведен в статус 'В работе'",
    "✅ Тикет TIC-2024-045 успешно решен",
    "📧 Новое обращение через email от client@company.com",
    "🤖 ИИ предложил автоответ для тикета TIC-2024-067",
    "⚠️ SLA нарушен для тикета TIC-2024-023"
  ];

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Дашборд</h1>
          <p className="text-muted-foreground">
            Обзор системы тикетов • Демо данные
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Сегодня
          </Button>
          <Button className="btn-gradient" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Отчеты
          </Button>
        </div>
      </div>

      {/* Быстрая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className={`p-3 rounded-lg bg-accent/50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Метрики производительности */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Метрики производительности
              <Badge variant="secondary" className="ml-auto">Демо данные</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="p-4 rounded-lg bg-accent/30 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <metric.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{metric.title}</span>
                    </div>
                    <Badge 
                      variant={metric.status === 'good' ? 'default' : 'secondary'}
                      className={metric.status === 'good' ? 'bg-success/20 text-success' : ''}
                    >
                      {metric.status === 'good' ? '✓' : '⚠'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{metric.value}</span>
                    <span className="text-sm text-muted-foreground">цель: {metric.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Быстрые действия */}
        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Быстрые действия
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Ticket className="h-4 w-4 mr-2" />
              Создать тикет
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Добавить клиента
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Настроить интеграцию
            </Button>
            <Button className="w-full justify-start btn-gradient">
              <Globe className="h-4 w-4 mr-2" />
              API Документация
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Активность в реальном времени */}
      <Card className="bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Активность в реальном времени
            <Badge variant="secondary" className="ml-auto">Демо активность</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-accent/30 border border-border/50">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm">{activity}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {index + 1} мин назад
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;