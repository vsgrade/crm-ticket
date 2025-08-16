import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import {
  BarChart3,
  Download,
  Filter,
  TrendingUp,
  Users,
  Clock,
  MessageSquare,
  Target,
  Calendar
} from "lucide-react";

const Reports = () => {
  const [dateRange, setDateRange] = useState<any>(null);
  const [department, setDepartment] = useState("all");

  // Данные для графиков (демо)
  const ticketsByDay = [
    { date: "01.01", created: 45, resolved: 42, pending: 3 },
    { date: "02.01", created: 52, resolved: 38, pending: 17 },
    { date: "03.01", created: 38, resolved: 45, pending: 10 },
    { date: "04.01", created: 67, resolved: 53, pending: 24 },
    { date: "05.01", created: 41, resolved: 49, pending: 16 },
    { date: "06.01", created: 29, resolved: 35, pending: 10 },
    { date: "07.01", created: 33, resolved: 31, pending: 12 }
  ];

  const ticketsByDepartment = [
    { name: "Техподдержка", value: 456, color: "#8884d8" },
    { name: "Продажи", value: 234, color: "#82ca9d" },
    { name: "Бухгалтерия", value: 123, color: "#ffc658" },
    { name: "HR", value: 89, color: "#ff7300" },
    { name: "Общие", value: 167, color: "#00ff00" }
  ];

  const slaCompliance = [
    { date: "01.01", compliance: 92 },
    { date: "02.01", compliance: 87 },
    { date: "03.01", compliance: 95 },
    { date: "04.01", compliance: 88 },
    { date: "05.01", compliance: 93 },
    { date: "06.01", compliance: 96 },
    { date: "07.01", compliance: 91 }
  ];

  const staffPerformance = [
    { name: "Иванов И.И.", tickets: 89, avgTime: 2.3, satisfaction: 4.8 },
    { name: "Петрова М.С.", tickets: 76, avgTime: 1.9, satisfaction: 4.9 },
    { name: "Сидоров А.В.", tickets: 92, avgTime: 3.1, satisfaction: 4.6 },
    { name: "Козлова Е.Н.", tickets: 67, avgTime: 2.7, satisfaction: 4.7 },
    { name: "Морозов Д.К.", tickets: 81, avgTime: 2.1, satisfaction: 4.8 }
  ];

  const exportReport = (format: string) => {
    console.log(`Экспорт отчета в формате ${format} - демо функция`);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-none p-6 border-b border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Отчеты и аналитика
              </h1>
              <p className="text-muted-foreground">Детальная статистика работы системы</p>
            </div>
            <Badge variant="outline" className="ml-auto">
              Демо данные
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Фильтры
            </Button>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все департаменты</SelectItem>
                <SelectItem value="support">Техподдержка</SelectItem>
                <SelectItem value="sales">Продажи</SelectItem>
                <SelectItem value="billing">Бухгалтерия</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Экспорт
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-12">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Тикеты
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Сотрудники
            </TabsTrigger>
            <TabsTrigger value="sla" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              SLA
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Настраиваемые
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Основные метрики */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Всего тикетов</p>
                      <p className="text-2xl font-bold">1,247</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +12% за месяц
                      </p>
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
                      <p className="text-sm text-muted-foreground">Среднее время решения</p>
                      <p className="text-2xl font-bold">4.2ч</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        -8% улучшение
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-lg">
                      <Target className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Соблюдение SLA</p>
                      <p className="text-2xl font-bold">92.1%</p>
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 rotate-180" />
                        -2.3% снижение
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <Users className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Удовлетворенность</p>
                      <p className="text-2xl font-bold">4.7/5</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +0.2 улучшение
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Графики */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Тикеты по дням</CardTitle>
                  <CardDescription>Динамика создания и решения тикетов</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ticketsByDay}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="created" fill="#8884d8" name="Создано" />
                      <Bar dataKey="resolved" fill="#82ca9d" name="Решено" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Распределение по департаментам</CardTitle>
                  <CardDescription>Количество тикетов по департаментам</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ticketsByDepartment}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ticketsByDepartment.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Анализ тикетов</CardTitle>
                <CardDescription>Подробная статистика по тикетам</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={ticketsByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="created" fill="#8884d8" name="Создано" />
                    <Bar dataKey="resolved" fill="#82ca9d" name="Решено" />
                    <Bar dataKey="pending" fill="#ffc658" name="В работе" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Производительность сотрудников</CardTitle>
                <CardDescription>Статистика работы операторов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staffPerformance.map((staff, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold">{staff.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {staff.tickets} тикетов • {staff.avgTime}ч среднее время
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Оценка клиентов</p>
                            <p className="font-semibold text-yellow-600">{staff.satisfaction}/5.0</p>
                          </div>
                          <Badge variant={staff.satisfaction >= 4.8 ? "default" : staff.satisfaction >= 4.5 ? "secondary" : "destructive"}>
                            {staff.satisfaction >= 4.8 ? "Отлично" : staff.satisfaction >= 4.5 ? "Хорошо" : "Требует внимания"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sla" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Соблюдение SLA</CardTitle>
                <CardDescription>Динамика соблюдения уровня обслуживания</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={slaCompliance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="compliance" 
                      stroke="#8884d8" 
                      strokeWidth={3}
                      name="Соблюдение SLA (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Настраиваемые отчеты</CardTitle>
                <CardDescription>Создайте собственные отчеты с нужными метриками</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Конструктор отчетов</h3>
                  <p className="text-muted-foreground mb-4">
                    Функция находится в разработке
                  </p>
                  <Button variant="outline">
                    Запросить демо
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;