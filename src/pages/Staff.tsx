import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowUpDown,
  Eye,
  UserCheck,
  Clock,
  Target,
  Zap,
  Circle,
  Building2,
  Shield
} from "lucide-react";
import { mockEmployees } from "@/data/mockData";

const Staff = () => {
  const getOnlineStatus = (isOnline: boolean, lastSeen: Date) => {
    if (isOnline) {
      return (
        <div className="flex items-center gap-2">
          <Circle className="h-2 w-2 text-success fill-success" />
          <span className="text-success text-sm">Онлайн</span>
        </div>
      );
    }
    
    const timeDiff = new Date().getTime() - lastSeen.getTime();
    const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
    
    return (
      <div className="flex items-center gap-2">
        <Circle className="h-2 w-2 text-muted-foreground fill-muted-foreground" />
        <span className="text-muted-foreground text-sm">
          {hoursAgo}ч назад
        </span>
      </div>
    );
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'senior':
        return <Badge className="bg-primary/20 text-primary">Senior</Badge>;
      case 'junior':
        return <Badge variant="secondary">Junior</Badge>;
      case 'middle':
        return <Badge variant="outline">Middle</Badge>;
      default:
        return <Badge variant="outline">Не указан</Badge>;
    }
  };

  const getPerformanceRating = (resolved: number, avgTime: number) => {
    if (resolved > 200 && avgTime < 20) return 'excellent';
    if (resolved > 100 && avgTime < 30) return 'good';
    if (resolved > 50) return 'average';
    return 'needs-improvement';
  };

  const getPerformanceBadge = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return <Badge className="bg-success/20 text-success">Отличная</Badge>;
      case 'good':
        return <Badge className="bg-primary/20 text-primary">Хорошая</Badge>;
      case 'average':
        return <Badge variant="secondary">Средняя</Badge>;
      default:
        return <Badge variant="outline">Требует внимания</Badge>;
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Заголовок */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Сотрудники</h1>
          <p className="text-muted-foreground">
            Управление командой поддержки и их производительностью • Демо данные
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Поиск сотрудников..." 
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button className="btn-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Добавить сотрудника
          </Button>
        </div>
      </div>

      {/* Статистика команды */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold">12</div>
                <div className="text-sm text-muted-foreground">Активных агентов</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <Circle className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-lg font-bold">8</div>
                <div className="text-sm text-muted-foreground">Онлайн сейчас</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-lg font-bold">21м</div>
                <div className="text-sm text-muted-foreground">Средний ответ</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/20">
                <Target className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="text-lg font-bold">94%</div>
                <div className="text-sm text-muted-foreground">Достижение KPI</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Таблица сотрудников */}
      <Card className="flex-1 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserCheck className="h-5 w-5" />
            Команда поддержки
            <Badge variant="secondary" className="ml-auto">
              {mockEmployees.length} из 12 сотрудников (демо данные)
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto h-[calc(100vh-400px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[250px]">
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      Сотрудник
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Роль & Уровень</TableHead>
                  <TableHead>Департаменты</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      Назначено
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      Решено
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Ср. время ответа</TableHead>
                  <TableHead>Производительность</TableHead>
                  <TableHead>Права</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEmployees.map((employee) => (
                  <TableRow key={employee.id} className="ticket-table-row">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{employee.role}</div>
                        {getLevelBadge(employee.customFields?.level)}
                        <div className="text-xs text-muted-foreground">
                          Опыт: {employee.customFields?.experience}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {employee.departments.map((dept) => (
                          <Badge key={dept} variant="outline" className="text-xs">
                            <Building2 className="h-3 w-3 mr-1" />
                            {dept === 'support' ? 'Поддержка' : 'Продажи'}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getOnlineStatus(employee.isOnline, employee.lastSeen)}
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="text-lg font-bold text-warning">
                          {employee.ticketsAssigned}
                        </div>
                        <div className="text-xs text-muted-foreground">тикетов</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="text-lg font-bold text-success">
                          {employee.ticketsResolved}
                        </div>
                        <div className="text-xs text-muted-foreground">решено</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{employee.avgResponseTime}м</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getPerformanceBadge(
                        getPerformanceRating(employee.ticketsResolved, employee.avgResponseTime)
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">{employee.permissions.length} прав</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Staff;