import { Calendar as CalendarIcon, Plus, Clock, Users, MapPin, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Calendar = () => {
  const events = [
    {
      id: 1,
      title: "Встреча с клиентом ООО Рога и Копыта",
      type: "meeting",
      time: "10:00 - 11:00",
      date: "Сегодня",
      attendees: ["Иван Петров", "Анна Козлова"],
      location: "Переговорная 1",
      priority: "high"
    },
    {
      id: 2,
      title: "Еженедельный планерный митинг",
      type: "standup",
      time: "14:00 - 14:30",
      date: "Сегодня",
      attendees: ["Вся команда"],
      location: "Zoom",
      priority: "medium"
    },
    {
      id: 3,
      title: "Обучение новых сотрудников",
      type: "training",
      time: "15:30 - 17:00",
      date: "Завтра",
      attendees: ["HR", "Новички"],
      location: "Конференц-зал",
      priority: "medium"
    },
    {
      id: 4,
      title: "Демо новой функциональности",
      type: "demo",
      time: "11:00 - 12:00",
      date: "Завтра",
      attendees: ["Команда разработки", "QA"],
      location: "Онлайн",
      priority: "low"
    }
  ];

  const upcomingDeadlines = [
    {
      task: "Ответить клиенту по тикету T-2024-1234",
      deadline: "Через 2 часа",
      priority: "critical",
      assignee: "Иван Петров"
    },
    {
      task: "Подготовить отчет по SLA",
      deadline: "Завтра в 18:00",
      priority: "high",
      assignee: "Анна Козлова"
    },
    {
      task: "Обновить базу знаний",
      deadline: "Через 3 дня",
      priority: "medium",
      assignee: "Петр Смирнов"
    }
  ];

  const workSchedule = [
    { day: "Понедельник", shift: "09:00 - 18:00", coverage: "Полная команда" },
    { day: "Вторник", shift: "09:00 - 18:00", coverage: "Полная команда" },
    { day: "Среда", shift: "09:00 - 18:00", coverage: "Полная команда" },
    { day: "Четверг", shift: "09:00 - 18:00", coverage: "Полная команда" },
    { day: "Пятница", shift: "09:00 - 17:00", coverage: "Полная команда" },
    { day: "Суббота", shift: "10:00 - 16:00", coverage: "Дежурная смена" },
    { day: "Воскресенье", shift: "Выходной", coverage: "Только критические" }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'training':
        return <Clock className="h-4 w-4" />;
      case 'demo':
        return <Video className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Календарь</h1>
            <p className="text-muted-foreground">Планирование и расписание работы</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Создать событие
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">События сегодня</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Просроченных задач</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Сотрудников на смене</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Video className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-muted-foreground">Онлайн встреч</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ближайшие события</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{event.title}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            <span>{event.attendees.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant={getPriorityColor(event.priority)}>
                      {event.priority === 'high' ? 'Высокий' : 
                       event.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Дедлайны
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{deadline.task}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {deadline.assignee}
                      </span>
                      <Badge variant={getPriorityColor(deadline.priority)} className="text-xs">
                        {deadline.deadline}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Рабочее расписание
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="week" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="week">Неделя</TabsTrigger>
                  <TabsTrigger value="today">Сегодня</TabsTrigger>
                </TabsList>
                <TabsContent value="week" className="space-y-2">
                  {workSchedule.map((schedule, index) => (
                    <div key={index} className="p-2 border rounded text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{schedule.day}</span>
                        <span className="text-muted-foreground">{schedule.shift}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {schedule.coverage}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="today" className="space-y-2">
                  <div className="p-3 border rounded">
                    <div className="text-center">
                      <div className="text-lg font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Сотрудников на смене</div>
                    </div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-500">95%</div>
                      <div className="text-sm text-muted-foreground">Покрытие смены</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;