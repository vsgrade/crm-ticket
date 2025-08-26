import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Clock,
  Plus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Target,
  Timer,
  Calendar,
  Bell,
  BarChart3,
  Settings,
  Download,
  Mail,
  Smartphone,
  Users
} from "lucide-react";

const SLA = () => {
  const { toast } = useToast();
  const [showCreateRule, setShowCreateRule] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const slaRules = [
    {
      id: 1,
      name: "Критичная техподдержка",
      department: "Техподдержка",
      priority: "Критично",
      responseTime: 60, // минуты
      resolutionTime: 240, // минуты
      isActive: true,
      compliance: 95.2
    },
    {
      id: 2,
      name: "Продажи - VIP клиенты",
      department: "Продажи",
      priority: "Высокий",
      responseTime: 120,
      resolutionTime: 480,
      isActive: true,
      compliance: 87.6
    },
    {
      id: 3,
      name: "Общие вопросы",
      department: "Поддержка",
      priority: "Средний",
      responseTime: 240,
      resolutionTime: 1440,
      isActive: true,
      compliance: 92.1
    },
    {
      id: 4,
      name: "Бухгалтерия",
      department: "Бухгалтерия",
      priority: "Низкий",
      responseTime: 480,
      resolutionTime: 2880,
      isActive: false,
      compliance: 78.3
    }
  ];

  const slaMetrics = {
    totalTickets: 1247,
    onTime: 1089,
    late: 158,
    avgResponseTime: "2.3 часа",
    avgResolutionTime: "18.7 часа",
    compliance: 87.3
  };

  const notificationSettings = {
    email: {
      enabled: true,
      beforeBreach: [30, 60, 120], // минуты
      onBreach: true,
      reports: true
    },
    sms: {
      enabled: false,
      beforeBreach: [15, 30],
      onBreach: true
    },
    inApp: {
      enabled: true,
      beforeBreach: [15, 30, 60],
      onBreach: true
    }
  };

  const slaReports = {
    monthly: {
      compliance: 89.2,
      trend: 2.1,
      totalTickets: 3847,
      breaches: 416
    },
    weekly: {
      compliance: 91.5,
      trend: -1.3,
      totalTickets: 923,
      breaches: 78
    },
    daily: {
      compliance: 94.1,
      trend: 3.7,
      totalTickets: 187,
      breaches: 11
    }
  };

  const departmentStats = [
    { name: "Техподдержка", compliance: 95.2, tickets: 456, breaches: 22 },
    { name: "Продажи", compliance: 89.7, tickets: 289, breaches: 30 },
    { name: "Поддержка", compliance: 92.1, tickets: 378, breaches: 30 },
    { name: "Бухгалтерия", compliance: 78.3, tickets: 124, breaches: 27 }
  ];

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} мин`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours < 24) {
      return remainingMinutes > 0 ? `${hours}ч ${remainingMinutes}м` : `${hours} час${hours > 1 ? 'а' : ''}`;
    }
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}д ${remainingHours}ч` : `${days} дн${days > 1 ? 'я' : 'ь'}`;
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return "text-green-600";
    if (compliance >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const handleCreateRule = () => {
    toast({
      title: "SLA правило создано",
      description: "Новое правило успешно добавлено (демо режим)",
    });
    setShowCreateRule(false);
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Настройки уведомлений сохранены",
      description: "Система уведомлений настроена (демо режим)",
    });
    setShowNotificationSettings(false);
  };

  const handleExportReport = (period: string) => {
    toast({
      title: "Отчет экспортируется",
      description: `Отчет за ${period} период готовится к скачиванию (демо режим)`,
    });
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-none p-6 border-b border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                SLA Мониторинг
              </h1>
              <p className="text-muted-foreground">Управление уровнем обслуживания</p>
            </div>
            <Badge variant="outline" className="ml-auto">
              Демо данные
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showNotificationSettings} onOpenChange={setShowNotificationSettings}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Уведомления
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Настройки уведомлений SLA</DialogTitle>
                  <DialogDescription>
                    Настройте способы и время уведомлений о нарушениях SLA
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email уведомления</h4>
                        <p className="text-sm text-muted-foreground">Отправка на email агентов</p>
                      </div>
                      <Switch defaultChecked={notificationSettings.email.enabled} />
                    </div>
                    <div className="pl-4 space-y-2">
                      <Label className="text-sm">Предупреждения за (минут):</Label>
                      <div className="flex gap-2">
                        <Input defaultValue="30" className="w-20" />
                        <Input defaultValue="60" className="w-20" />
                        <Input defaultValue="120" className="w-20" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS уведомления</h4>
                        <p className="text-sm text-muted-foreground">Критичные уведомления по SMS</p>
                      </div>
                      <Switch defaultChecked={notificationSettings.sms.enabled} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Уведомления в системе</h4>
                        <p className="text-sm text-muted-foreground">Push-уведомления в интерфейсе</p>
                      </div>
                      <Switch defaultChecked={notificationSettings.inApp.enabled} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowNotificationSettings(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleSaveNotifications}>
                    Сохранить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showCreateRule} onOpenChange={setShowCreateRule}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Создать SLA правило
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Новое SLA правило</DialogTitle>
                  <DialogDescription>
                    Создайте правило для автоматического контроля времени обслуживания
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Название правила</Label>
                    <Input placeholder="Например: VIP поддержка" />
                  </div>
                  <div className="space-y-2">
                    <Label>Департамент</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите департамент" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Техподдержка</SelectItem>
                        <SelectItem value="sales">Продажи</SelectItem>
                        <SelectItem value="billing">Бухгалтерия</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Время ответа (мин)</Label>
                      <Input type="number" placeholder="60" />
                    </div>
                    <div className="space-y-2">
                      <Label>Время решения (мин)</Label>
                      <Input type="number" placeholder="240" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Приоритет</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите приоритет" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Низкий</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="high">Высокий</SelectItem>
                        <SelectItem value="critical">Критичный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowCreateRule(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleCreateRule}>
                    Создать правило
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Отчеты
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Правила
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Общая статистика */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Target className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Общее соблюдение SLA</p>
                      <p className="text-2xl font-bold">{slaMetrics.compliance}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">В срок</p>
                      <p className="text-2xl font-bold">{slaMetrics.onTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-500/10 rounded-lg">
                      <XCircle className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Просрочено</p>
                      <p className="text-2xl font-bold">{slaMetrics.late}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500/10 rounded-lg">
                      <Timer className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Среднее время решения</p>
                      <p className="text-2xl font-bold">{slaMetrics.avgResolutionTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Предупреждения */}
            <Card className="border-2 border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                  <AlertTriangle className="h-5 w-5" />
                  Предупреждения SLA
                </CardTitle>
                <CardDescription>Тикеты, требующие внимания</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "TK-2247", client: "ООО Рога и Копыта", timeLeft: "32 минуты", priority: "Критично" },
                    { id: "TK-2251", client: "Иванов И.И.", timeLeft: "1.2 часа", priority: "Высокий" },
                    { id: "TK-2234", client: "ООО Техносвязь", timeLeft: "2.7 часа", priority: "Средний" }
                  ].map((warning, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{warning.id}</Badge>
                        <div>
                          <p className="font-medium">{warning.client}</p>
                          <p className="text-sm text-muted-foreground">До нарушения SLA: {warning.timeLeft}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={warning.priority === "Критично" ? "destructive" : "default"}>
                          {warning.priority}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Открыть
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Отчеты по периодам */}
            <div className="grid gap-6 md:grid-cols-3">
              {Object.entries(slaReports).map(([period, data]) => (
                <Card key={period} className="border-2 hover:border-primary/20 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg capitalize">
                        {period === 'monthly' ? 'Месяц' : period === 'weekly' ? 'Неделя' : 'День'}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleExportReport(period)}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Соблюдение SLA</span>
                        <span className={`text-sm font-medium ${data.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {data.trend > 0 ? '+' : ''}{data.trend}%
                        </span>
                      </div>
                      <div className="text-2xl font-bold mb-1">{data.compliance}%</div>
                      <Progress value={data.compliance} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Тикетов</p>
                        <p className="font-semibold">{data.totalTickets}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Нарушений</p>
                        <p className="font-semibold text-red-600">{data.breaches}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Статистика по департаментам */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Статистика по департаментам
                </CardTitle>
                <CardDescription>Производительность SLA по отделам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentStats.map((dept, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{dept.name}</h3>
                        <div className="flex items-center gap-4 text-sm">
                          <span>Тикетов: {dept.tickets}</span>
                          <span className="text-red-600">Нарушений: {dept.breaches}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Соблюдение SLA</span>
                            <span className={`text-sm font-medium ${getComplianceColor(dept.compliance)}`}>
                              {dept.compliance}%
                            </span>
                          </div>
                          <Progress value={dept.compliance} className="h-2" />
                        </div>
                        <Button variant="outline" size="sm">
                          Детали
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            {/* SLA Правила */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      SLA Правила
                    </CardTitle>
                    <CardDescription>Настроенные правила уровня обслуживания</CardDescription>
                  </div>
                  <Badge variant="outline">{slaRules.length} правил</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {slaRules.map((rule) => (
                    <div key={rule.id} className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{rule.name}</h3>
                            <Badge variant="outline">{rule.department}</Badge>
                            <Badge variant={rule.priority === "Критично" ? "destructive" : rule.priority === "Высокий" ? "default" : "secondary"}>
                              {rule.priority}
                            </Badge>
                            {rule.isActive ? (
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Активно
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-gray-600 border-gray-600">
                                Неактивно
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-6 text-sm">
                            <div>
                              <p className="text-muted-foreground">Время ответа</p>
                              <p className="font-medium">{formatTime(rule.responseTime)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Время решения</p>
                              <p className="font-medium">{formatTime(rule.resolutionTime)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Соблюдение</p>
                              <p className={`font-medium ${getComplianceColor(rule.compliance)}`}>
                                {rule.compliance}%
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            Изменить
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SLA;