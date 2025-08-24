import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, CheckCircle, AlertCircle, Coffee, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Schedule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const currentSchedule = {
    shift: "9:00 - 18:00",
    break: "13:00 - 14:00",
    workDays: ["Пн", "Вт", "Ср", "Чт", "Пт"],
    department: "Техническая поддержка"
  };

  const weekSchedule = [
    { 
      day: "Понедельник", 
      date: "22.01.2024", 
      start: "09:00", 
      end: "18:00", 
      break: "13:00-14:00",
      status: "scheduled",
      tasks: 3
    },
    { 
      day: "Вторник", 
      date: "23.01.2024", 
      start: "09:00", 
      end: "18:00", 
      break: "13:00-14:00",
      status: "current",
      tasks: 5
    },
    { 
      day: "Среда", 
      date: "24.01.2024", 
      start: "09:00", 
      end: "18:00", 
      break: "13:00-14:00",
      status: "scheduled",
      tasks: 2
    },
    { 
      day: "Четверг", 
      date: "25.01.2024", 
      start: "09:00", 
      end: "18:00", 
      break: "13:00-14:00",
      status: "scheduled",
      tasks: 4
    },
    { 
      day: "Пятница", 
      date: "26.01.2024", 
      start: "09:00", 
      end: "18:00", 
      break: "13:00-14:00",
      status: "scheduled",
      tasks: 1
    },
    { 
      day: "Суббота", 
      date: "27.01.2024", 
      start: "—", 
      end: "—", 
      break: "—",
      status: "weekend",
      tasks: 0
    },
    { 
      day: "Воскресенье", 
      date: "28.01.2024", 
      start: "—", 
      end: "—", 
      break: "—",
      status: "weekend",
      tasks: 0
    }
  ];

  const timeOffRequests = [
    {
      type: "Отпуск",
      dates: "15-29 марта 2024",
      days: 14,
      status: "approved",
      reason: "Ежегодный отпуск"
    },
    {
      type: "Больничный",
      dates: "10-12 января 2024",
      days: 3,
      status: "approved",
      reason: "ОРВИ"
    },
    {
      type: "Отгул",
      dates: "5 февраля 2024",
      days: 1,
      status: "pending",
      reason: "Личные дела"
    }
  ];

  const overtimeHistory = [
    {
      date: "20.01.2024",
      hours: 2,
      reason: "Критичный тикет",
      approved: true
    },
    {
      date: "15.01.2024", 
      hours: 1.5,
      reason: "Обновление системы",
      approved: true
    },
    {
      date: "10.01.2024",
      hours: 3,
      reason: "Аварийное обслуживание",
      approved: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <Badge variant="default">Сегодня</Badge>;
      case 'scheduled':
        return <Badge variant="outline">Запланировано</Badge>;
      case 'weekend':
        return <Badge variant="secondary">Выходной</Badge>;
      default:
        return <Badge variant="outline">—</Badge>;
    }
  };

  const getRequestStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default">Одобрено</Badge>;
      case 'pending':
        return <Badge variant="secondary">На рассмотрении</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Отклонено</Badge>;
      default:
        return <Badge variant="outline">—</Badge>;
    }
  };

  // Генерация календаря на месяц
  const generateMonthSchedule = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const monthSchedule = [];
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
                       "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    
    // Генерируем данные для каждого дня месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      monthSchedule.push({
        day,
        date: `${day}.${String(month + 1).padStart(2, '0')}.${year}`,
        dayOfWeek: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][dayOfWeek],
        start: isWeekend ? "—" : "09:00",
        end: isWeekend ? "—" : "18:00",
        break: isWeekend ? "—" : "13:00-14:00",
        status: isWeekend ? "weekend" : (day === 23 ? "current" : "scheduled"),
        hours: isWeekend ? 0 : 8,
        overtime: Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 0,
        tasks: isWeekend ? 0 : Math.floor(Math.random() * 6) + 1
      });
    }
    
    return { schedule: monthSchedule, monthName: monthNames[month], year };
  };

  const { schedule: monthSchedule, monthName, year } = generateMonthSchedule();

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getScheduleStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <Badge variant="default" className="text-xs">Сегодня</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="text-xs">Работа</Badge>;
      case 'weekend':
        return <Badge variant="secondary" className="text-xs">Выходной</Badge>;
      case 'vacation':
        return <Badge variant="destructive" className="text-xs">Отпуск</Badge>;
      case 'sick':
        return <Badge className="text-xs bg-orange-500">Больничный</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">—</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      <Tabs defaultValue="week" className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">График работы</h1>
              <p className="text-muted-foreground">Ваше расписание и учет рабочего времени</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TabsList>
              <TabsTrigger value="week">Неделя</TabsTrigger>
              <TabsTrigger value="month">Месяц</TabsTrigger>
            </TabsList>
            <Button>
              <Clock className="h-4 w-4 mr-2" />
              Запросить отгул
            </Button>
          </div>
        </div>

        <TabsContent value="week" className="space-y-6">
          {/* Текущий график */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{currentSchedule.shift}</div>
                    <div className="text-sm text-muted-foreground">Рабочее время</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-success/10 to-success/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-success/20 rounded-lg">
                    <Coffee className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{currentSchedule.break}</div>
                    <div className="text-sm text-muted-foreground">Обеденный перерыв</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-warning/20 rounded-lg">
                    <Calendar className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">5 дней</div>
                    <div className="text-sm text-muted-foreground">Рабочих дней</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-destructive/20 rounded-lg">
                    <Users className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{currentSchedule.department}</div>
                    <div className="text-sm text-muted-foreground">Департамент</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Расписание на неделю */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Расписание на неделю
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {weekSchedule.map((day, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    day.status === 'current' ? 'bg-primary/5 border-primary/20' : 
                    day.status === 'weekend' ? 'bg-muted/50' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{day.day}</div>
                        <div className="text-sm text-muted-foreground">{day.date}</div>
                      </div>
                      {getStatusBadge(day.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium">
                          {day.start} - {day.end}
                        </span>
                        {day.break !== "—" && (
                          <span className="text-muted-foreground ml-2">
                            (перерыв {day.break})
                          </span>
                        )}
                      </div>
                      {day.tasks > 0 && (
                        <Badge variant="outline">{day.tasks} задачи</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Заявки на отпуск/отгулы */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Заявки на отпуск
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {timeOffRequests.map((request, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{request.type}</div>
                      {getRequestStatusBadge(request.status)}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {request.dates} ({request.days} дн.)
                    </div>
                    <div className="text-sm">{request.reason}</div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  Подать новую заявку
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Переработки */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                История переработок
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {overtimeHistory.map((overtime, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{overtime.date}</div>
                      <div className="text-sm text-muted-foreground">{overtime.reason}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold">+{overtime.hours} ч</div>
                        {overtime.approved && (
                          <div className="text-sm text-success">К доплате</div>
                        )}
                      </div>
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Статистика за месяц */}
          <Card>
            <CardHeader>
              <CardTitle>Статистика за январь 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">168</div>
                  <div className="text-sm text-muted-foreground">Рабочих часов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">6.5</div>
                  <div className="text-sm text-muted-foreground">Переработок (ч)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Больничных дня</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-muted-foreground">Выполнение плана</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month" className="space-y-6">
          {/* Навигация по месяцам */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  График работы по месяцам
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-lg font-semibold px-4">
                    {monthName} {year}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">День</TableHead>
                      <TableHead className="w-20">Дата</TableHead>
                      <TableHead className="w-20">День нед.</TableHead>
                      <TableHead>Начало</TableHead>
                      <TableHead>Конец</TableHead>
                      <TableHead>Перерыв</TableHead>
                      <TableHead className="w-20">Часы</TableHead>
                      <TableHead className="w-20">Переработка</TableHead>
                      <TableHead className="w-20">Задачи</TableHead>
                      <TableHead className="w-32">Статус</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthSchedule.map((day) => (
                      <TableRow key={day.day} className={day.status === 'current' ? 'bg-primary/5' : ''}>
                        <TableCell className="font-medium">{day.day}</TableCell>
                        <TableCell>{day.date}</TableCell>
                        <TableCell>
                          <Badge variant={day.status === 'weekend' ? 'secondary' : 'outline'} className="text-xs">
                            {day.dayOfWeek}
                          </Badge>
                        </TableCell>
                        <TableCell>{day.start}</TableCell>
                        <TableCell>{day.end}</TableCell>
                        <TableCell>{day.break}</TableCell>
                        <TableCell>{day.hours > 0 ? `${day.hours}ч` : '—'}</TableCell>
                        <TableCell>
                          {day.overtime > 0 ? (
                            <span className="text-orange-600 font-medium">+{day.overtime}ч</span>
                          ) : '—'}
                        </TableCell>
                        <TableCell>
                          {day.tasks > 0 ? (
                            <Badge variant="outline" className="text-xs">{day.tasks}</Badge>
                          ) : '—'}
                        </TableCell>
                        <TableCell>{getScheduleStatusBadge(day.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Статистика за выбранный месяц */}
          <Card>
            <CardHeader>
              <CardTitle>Статистика за {monthName} {year}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {monthSchedule.reduce((sum, day) => sum + day.hours, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Рабочих часов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {monthSchedule.reduce((sum, day) => sum + day.overtime, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Переработок (ч)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {monthSchedule.filter(day => day.status === 'weekend').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Выходных дней</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {monthSchedule.reduce((sum, day) => sum + day.tasks, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Всего задач</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {Math.round((monthSchedule.filter(day => day.status !== 'weekend').length / monthSchedule.filter(day => day.status !== 'weekend').length) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Выполнение плана</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Schedule;