import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Building2,
  Users,
  Settings,
  Zap,
  MessageSquare,
  Globe,
  Mail,
  Phone,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";
import { mockDepartments } from "@/data/mockData";
import { DepartmentSettingsModal } from "@/components/modals/DepartmentSettingsModal";
import IntegrationSettingsModal from "@/components/modals/IntegrationSettingsModal";
import { useState } from "react";

const Departments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<{ id: string; name: string } | null>(null);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [integrationSettingsOpen, setIntegrationSettingsOpen] = useState(false);
  const getIntegrationIcon = (type: string) => {
    const iconMap = {
      'telegram': '📱',
      'whatsapp': '💬',
      'email': '📧',
      'sms': '📨',
      'vk': '🔵'
    };
    return iconMap[type as keyof typeof iconMap] || '🔌';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-success/20 text-success">
            <CheckCircle className="h-3 w-3 mr-1" />
            Активна
          </Badge>
        );
      case 'warning':
        return (
          <Badge className="bg-warning/20 text-warning">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Предупреждение
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Ошибка
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Неизвестно
          </Badge>
        );
    }
  };

  const handleIntegrationSettings = (integration: any, departmentName: string) => {
    setSelectedIntegration({
      ...integration,
      departmentName
    });
    setIntegrationSettingsOpen(true);
  };

  const getWorkingHours = (hours: any) => {
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const workingDays = hours.weekdays.map((day: number) => days[day - 1]).join(', ');
    return `${workingDays} ${hours.start}-${hours.end} (${hours.timezone})`;
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Заголовок */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Департаменты</h1>
          <p className="text-muted-foreground">
            Управление подразделениями и их интеграциями • Демо данные
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Поиск департаментов..." 
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button className="btn-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Создать департамент
          </Button>
        </div>
      </div>

      {/* Статистика департаментов */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold">6</div>
                <div className="text-sm text-muted-foreground">Департаментов</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <Zap className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-lg font-bold">14</div>
                <div className="text-sm text-muted-foreground">Интеграций</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Users className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-lg font-bold">23</div>
                <div className="text-sm text-muted-foreground">Сотрудников</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/20">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="text-lg font-bold">2</div>
                <div className="text-sm text-muted-foreground">Требуют внимания</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Таблица департаментов */}
      <Card className="flex-1 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5" />
            Список департаментов
            <Badge variant="secondary" className="ml-auto">
              {mockDepartments.length} департаментов (демо данные)
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto h-[calc(100vh-400px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[200px]">
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      Название
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-[250px]">Описание</TableHead>
                  <TableHead>Сотрудники</TableHead>
                  <TableHead>Интеграции</TableHead>
                  <TableHead>Рабочие часы</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDepartments.map((dept) => (
                  <TableRow key={dept.id} className="ticket-table-row">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div className="cursor-pointer" onClick={() => setSelectedDepartment({ id: dept.id, name: dept.name })}>
                          <div className="font-medium hover:text-primary transition-colors">{dept.name}</div>
                          <div className="text-xs text-muted-foreground">ID: {dept.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{dept.description}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{dept.employees.length}</span>
                        <span className="text-sm text-muted-foreground">сотрудников</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Zap className="h-3 w-3 text-muted-foreground" />
                          <span>{dept.integrations.length} интеграций</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {dept.integrations.slice(0, 3).map((integration, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center gap-1 text-xs cursor-pointer hover:bg-accent/50 p-1 rounded"
                              onClick={() => handleIntegrationSettings(integration, dept.name)}
                            >
                              <span>{getIntegrationIcon(integration.type)}</span>
                              <span>{integration.name}</span>
                              {getStatusBadge(integration.status)}
                            </div>
                          ))}
                          {dept.integrations.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{dept.integrations.length - 3} еще
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        {getWorkingHours(dept.workingHours)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {dept.isActive ? (
                        <Badge className="bg-success/20 text-success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Активен
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          Неактивен
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Дополнительные демо департаменты */}
                <TableRow className="ticket-table-row">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-warning/20">
                        <Building2 className="h-4 w-4 text-warning" />
                      </div>
                      <div className="cursor-pointer" onClick={() => setSelectedDepartment({ id: 'billing', name: 'Бухгалтерия' })}>
                        <div className="font-medium hover:text-primary transition-colors">Бухгалтерия</div>
                        <div className="text-xs text-muted-foreground">ID: billing</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">Обработка вопросов по оплате и финансам</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">3</span>
                      <span className="text-sm text-muted-foreground">сотрудников</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Zap className="h-3 w-3 text-muted-foreground" />
                        <span>2 интеграции</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <div 
                          className="flex items-center gap-1 text-xs cursor-pointer hover:bg-accent/50 p-1 rounded"
                          onClick={() => handleIntegrationSettings({ 
                            id: 'email-billing', 
                            name: 'Email', 
                            type: 'email', 
                            status: 'active' 
                          }, 'Бухгалтерия')}
                        >
                          <span>📧</span>
                          <span>Email</span>
                          {getStatusBadge('active')}
                        </div>
                        <div 
                          className="flex items-center gap-1 text-xs cursor-pointer hover:bg-accent/50 p-1 rounded"
                          onClick={() => handleIntegrationSettings({ 
                            id: 'telegram-billing', 
                            name: 'Telegram', 
                            type: 'telegram', 
                            status: 'warning' 
                          }, 'Бухгалтерия')}
                        >
                          <span>📱</span>
                          <span>Telegram</span>
                          {getStatusBadge('warning')}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      Пн-Пт 09:00-18:00 (Europe/Moscow)
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success/20 text-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Активен
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow className="ticket-table-row">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-destructive/20">
                        <Building2 className="h-4 w-4 text-destructive" />
                      </div>
                      <div className="cursor-pointer" onClick={() => setSelectedDepartment({ id: 'hr', name: 'HR Отдел' })}>
                        <div className="font-medium hover:text-primary transition-colors">HR Отдел</div>
                        <div className="text-xs text-muted-foreground">ID: hr</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">Вопросы персонала и трудоустройства</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">2</span>
                      <span className="text-sm text-muted-foreground">сотрудников</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Zap className="h-3 w-3 text-muted-foreground" />
                        <span>1 интеграция</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <div 
                          className="flex items-center gap-1 text-xs cursor-pointer hover:bg-accent/50 p-1 rounded"
                          onClick={() => handleIntegrationSettings({ 
                            id: 'email-hr', 
                            name: 'Email', 
                            type: 'email', 
                            status: 'error' 
                          }, 'HR Отдел')}
                        >
                          <span>📧</span>
                          <span>Email</span>
                          {getStatusBadge('error')}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      Пн-Пт 10:00-19:00 (Europe/Moscow)
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success/20 text-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Активен
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Модал настроек департамента */}
      <DepartmentSettingsModal
        open={!!selectedDepartment}
        onOpenChange={(open) => !open && setSelectedDepartment(null)}
        departmentId={selectedDepartment?.id}
        departmentName={selectedDepartment?.name}
      />

      {/* Модал настроек интеграции департамента */}
      <IntegrationSettingsModal
        open={integrationSettingsOpen}
        onOpenChange={setIntegrationSettingsOpen}
        integration={selectedIntegration ? {
          ...selectedIntegration,
          name: `${selectedIntegration.name} (${selectedIntegration.departmentName})`
        } : null}
      />
    </div>
  );
};

export default Departments;