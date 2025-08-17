import { Archive as ArchiveIcon, Search, Download, Trash2, FileText, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Archive = () => {
  const archivedTickets = [
    {
      id: "T-2023-8765",
      client: "ООО Старый Клиент",
      subject: "Проблема с доступом к системе",
      category: "Техническая поддержка",
      priority: "Средний",
      closedDate: "15.12.2023",
      assignee: "Иван Петров",
      resolution: "Настроены права доступа",
      rating: 5
    },
    {
      id: "T-2023-8766",
      client: "Мария Старкова",
      subject: "Вопрос по биллингу",
      category: "Биллинг",
      priority: "Низкий",
      closedDate: "14.12.2023",
      assignee: "Анна Козлова",
      resolution: "Предоставлена детализация",
      rating: 4
    },
    {
      id: "T-2023-8767",
      client: "ИП Архивович",
      subject: "Запрос на интеграцию",
      category: "Интеграция",
      priority: "Высокий",
      closedDate: "13.12.2023",
      assignee: "Петр Смирнов",
      resolution: "Интеграция выполнена",
      rating: 5
    }
  ];

  const archivedClients = [
    {
      name: "ООО Закрытое Предприятие",
      email: "info@closed.ru",
      phone: "+7 (123) 456-78-90",
      totalTickets: 45,
      lastActivity: "01.11.2023",
      reason: "Прекращение сотрудничества"
    },
    {
      name: "Старый Клиент ИП",
      email: "old@client.ru",
      phone: "+7 (987) 654-32-10",
      totalTickets: 12,
      lastActivity: "15.10.2023",
      reason: "Неактивность > 6 месяцев"
    }
  ];

  const archivedStaff = [
    {
      name: "Василий Уволенный",
      email: "vasily@company.ru",
      position: "Старший специалист",
      department: "Техподдержка",
      dismissalDate: "30.11.2023",
      totalTickets: 892,
      avgRating: 4.7
    },
    {
      name: "Екатерина Переведенная",
      email: "ekaterina@company.ru",
      position: "Менеджер",
      department: "Продажи",
      dismissalDate: "15.11.2023",
      totalTickets: 234,
      avgRating: 4.5
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ArchiveIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Архив</h1>
            <p className="text-muted-foreground">Архивные данные и история</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Button variant="outline">
            <Trash2 className="h-4 w-4 mr-2" />
            Очистка
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">12,847</div>
                <div className="text-sm text-muted-foreground">Тикетов в архиве</div>
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
                <div className="text-2xl font-bold">187</div>
                <div className="text-sm text-muted-foreground">Клиентов в архиве</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">2.4 ГБ</div>
                <div className="text-sm text-muted-foreground">Размер архива</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <ArchiveIcon className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">18 мес</div>
                <div className="text-sm text-muted-foreground">Срок хранения</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Архивные данные</CardTitle>
            <Input placeholder="Поиск в архиве..." className="w-64" />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tickets" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tickets">Тикеты</TabsTrigger>
              <TabsTrigger value="clients">Клиенты</TabsTrigger>
              <TabsTrigger value="staff">Сотрудники</TabsTrigger>
            </TabsList>

            <TabsContent value="tickets">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Тикета</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Тема</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Приоритет</TableHead>
                    <TableHead>Дата закрытия</TableHead>
                    <TableHead>Исполнитель</TableHead>
                    <TableHead>Оценка</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archivedTickets.map((ticket, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{ticket.id}</TableCell>
                      <TableCell>{ticket.client}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{ticket.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={ticket.priority === 'Высокий' ? 'destructive' : 'secondary'}>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{ticket.closedDate}</TableCell>
                      <TableCell>{ticket.assignee}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{ticket.rating}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="clients">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Всего тикетов</TableHead>
                    <TableHead>Последняя активность</TableHead>
                    <TableHead>Причина архивации</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archivedClients.map((client, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.totalTickets}</TableCell>
                      <TableCell>{client.lastActivity}</TableCell>
                      <TableCell className="text-muted-foreground">{client.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="staff">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Имя</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Должность</TableHead>
                    <TableHead>Отдел</TableHead>
                    <TableHead>Дата увольнения</TableHead>
                    <TableHead>Всего тикетов</TableHead>
                    <TableHead>Средний рейтинг</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archivedStaff.map((staff, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.dismissalDate}</TableCell>
                      <TableCell>{staff.totalTickets}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{staff.avgRating}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Archive;