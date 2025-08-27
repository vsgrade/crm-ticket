import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Globe, 
  Database, 
  Mail, 
  Users, 
  Clock,
  AlertTriangle,
  DollarSign,
  Calendar,
  MessageCircle,
  Plus
} from "lucide-react";

import SavedFiltersManager from "@/components/SavedFiltersManager";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    companyName: "TicketPro Enterprise",
    timezone: "Europe/Moscow",
    language: "ru",
    autoAssignment: true,
    emailNotifications: true,
    pushNotifications: true,
    slaWarnings: true,
    defaultPriority: "medium",
    sessionTimeout: 30,
    maxFileSize: 10
  });

  const handleSave = () => {
    toast({
      title: "Настройки сохранены",
      description: "Все изменения применены успешно (демо режим)",
    });
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-none p-6 border-b border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <SettingsIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Настройки системы
            </h1>
            <p className="text-muted-foreground">Управление конфигурацией TicketPro</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            Демо данные
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-9 h-12 gap-1">
            <TabsTrigger value="general" className="flex items-center gap-2 text-xs">
              <SettingsIcon className="h-4 w-4" />
              Общие
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 text-xs">
              <Shield className="h-4 w-4" />
              Безопасность
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 text-xs">
              <Bell className="h-4 w-4" />
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2 text-xs">
              <Globe className="h-4 w-4" />
              Интеграции
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2 text-xs">
              <Database className="h-4 w-4" />
              База данных
            </TabsTrigger>
            <TabsTrigger value="salary" className="flex items-center gap-2 text-xs">
              <DollarSign className="h-4 w-4" />
              Зарплата
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2 text-xs">
              <Calendar className="h-4 w-4" />
              График
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2 text-xs">
              <MessageCircle className="h-4 w-4" />
              Чат
            </TabsTrigger>
            <TabsTrigger value="sla" className="flex items-center gap-2 text-xs">
              <Clock className="h-4 w-4" />
              SLA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    Основные настройки
                  </CardTitle>
                  <CardDescription>Базовая конфигурация системы</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Название компании</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Часовой пояс</Label>
                    <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Moscow">Москва (UTC+3)</SelectItem>
                        <SelectItem value="Europe/Kiev">Киев (UTC+2)</SelectItem>
                        <SelectItem value="Asia/Almaty">Алматы (UTC+6)</SelectItem>
                        <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Язык интерфейса</Label>
                    <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ua">Українська</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Тикеты и назначения
                  </CardTitle>
                  <CardDescription>Настройки обработки тикетов</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Автоматическое назначение</Label>
                      <p className="text-sm text-muted-foreground">
                        Автоматически назначать тикеты свободным операторам
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoAssignment}
                      onCheckedChange={(checked) => setSettings({...settings, autoAssignment: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Приоритет по умолчанию</Label>
                    <Select value={settings.defaultPriority} onValueChange={(value) => setSettings({...settings, defaultPriority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Низкий</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="high">Высокий</SelectItem>
                        <SelectItem value="urgent">Срочный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Максимальный размер файла (МБ)</Label>
                    <Input
                      type="number"
                      value={settings.maxFileSize}
                      onChange={(e) => setSettings({...settings, maxFileSize: parseInt(e.target.value)})}
                      min="1"
                      max="100"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="filters">
            <SavedFiltersManager />
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    PostgreSQL подключение
                  </CardTitle>
                  <CardDescription>Настройки подключения к базе данных</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Хост</Label>
                    <Input
                      placeholder="localhost"
                      defaultValue="demo-postgres.example.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Порт</Label>
                      <Input
                        placeholder="5432"
                        defaultValue="5432"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>База данных</Label>
                      <Input
                        placeholder="database_name"
                        defaultValue="ticketpro_db"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Пользователь</Label>
                      <Input
                        placeholder="username"
                        defaultValue="admin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Пароль</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        defaultValue="demo_password"
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => toast({
                        title: "Тестирование подключения",
                        description: "✅ Подключение успешно установлено (демо)",
                      })}
                    >
                      Тестировать подключение
                    </Button>
                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                      <strong>Статус:</strong> Подключено (демо режим)
                      <br />
                      <strong>Версия PostgreSQL:</strong> 15.4
                      <br />
                      <strong>Пинг:</strong> 12ms
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Настройки базы данных
                  </CardTitle>
                  <CardDescription>Параметры производительности и бэкапов</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Максимальные подключения</Label>
                    <Input
                      type="number"
                      defaultValue="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Timeout запроса (сек)</Label>
                    <Input
                      type="number"
                      defaultValue="30"
                    />
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="font-medium">Автоматические бэкапы</h4>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Включить бэкапы</Label>
                        <p className="text-sm text-muted-foreground">
                          Ежедневное резервное копирование
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Время бэкапа</Label>
                      <Input
                        type="time"
                        defaultValue="03:00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Хранить бэкапы (дней)</Label>
                      <Input
                        type="number"
                        defaultValue="30"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle>Статистика базы данных</CardTitle>
                <CardDescription>Информация об использовании (демо данные)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">2.4 GB</div>
                    <div className="text-sm text-muted-foreground">Размер БД</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">15,420</div>
                    <div className="text-sm text-muted-foreground">Тикеты</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">3,250</div>
                    <div className="text-sm text-muted-foreground">Клиенты</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">99.8%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Безопасность и доступ
                </CardTitle>
                <CardDescription>Настройки безопасности системы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Таймаут сессии (минуты)</Label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                    min="5"
                    max="480"
                  />
                  <p className="text-sm text-muted-foreground">
                    Автоматический выход после периода неактивности
                  </p>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-medium">Политики паролей</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span>Минимальная длина: 8 символов</span>
                      <Badge variant="outline">Активно</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span>Обязательные заглавные буквы</span>
                      <Badge variant="outline">Активно</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span>Обязательные цифры</span>
                      <Badge variant="outline">Активно</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span>Срок действия: 90 дней</span>
                      <Badge variant="outline">Активно</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Уведомления
                </CardTitle>
                <CardDescription>Настройка системы уведомлений</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email уведомления</Label>
                    <p className="text-sm text-muted-foreground">
                      Отправлять уведомления на email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push уведомления</Label>
                    <p className="text-sm text-muted-foreground">
                      Браузерные push-уведомления
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Предупреждения SLA</Label>
                    <p className="text-sm text-muted-foreground">
                      Уведомления о нарушении SLA
                    </p>
                  </div>
                  <Switch
                    checked={settings.slaWarnings}
                    onCheckedChange={(checked) => setSettings({...settings, slaWarnings: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle>Статус интеграций</CardTitle>
                  <CardDescription>Текущее состояние подключений</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Telegram Bot", status: "active", count: 3 },
                    { name: "WhatsApp Business", status: "active", count: 2 },
                    { name: "WhatsApp QR", status: "warning", count: 1 },
                    { name: "VK API", status: "active", count: 1 },
                    { name: "Email SMTP", status: "error", count: 0 },
                    { name: "SMS Gateway", status: "active", count: 1 }
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          integration.status === 'active' ? 'bg-green-500' :
                          integration.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className="font-medium">{integration.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{integration.count} подключений</Badge>
                        <Button variant="ghost" size="sm">Настроить</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Мониторинг
                  </CardTitle>
                  <CardDescription>Автоматическая проверка интеграций</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Интервал проверки (минуты)</Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 минута</SelectItem>
                        <SelectItem value="5">5 минут</SelectItem>
                        <SelectItem value="15">15 минут</SelectItem>
                        <SelectItem value="30">30 минут</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Последняя проверка</Label>
                    <p className="text-sm text-muted-foreground">2 минуты назад - Все системы работают</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Запустить проверку сейчас
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="salary" className="space-y-6">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Настройки зарплат
                </CardTitle>
                <CardDescription>Управление системой оплаты труда</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Базовая ставка (руб/час)</Label>
                    <Input type="number" defaultValue="500" />
                  </div>
                  <div className="space-y-2">
                    <Label>Премия за качество (%)</Label>
                    <Input type="number" defaultValue="15" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Валюта</Label>
                  <Select defaultValue="rub">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rub">Российский рубль (₽)</SelectItem>
                      <SelectItem value="usd">Доллар США ($)</SelectItem>
                      <SelectItem value="eur">Евро (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Автоматический расчет</Label>
                    <p className="text-sm text-muted-foreground">
                      Рассчитывать зарплату на основе закрытых тикетов
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>День выплаты зарплаты</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 28}, (_, i) => (
                        <SelectItem key={i+1} value={(i+1).toString()}>
                          {i+1} число каждого месяца
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  График работы
                </CardTitle>
                <CardDescription>Настройки рабочего времени и смен</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Типовой график работы</Label>
                  <Select defaultValue="8h5d">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8h5d">8 часов, 5 дней в неделю</SelectItem>
                      <SelectItem value="12h3d">12 часов, 3 дня в неделю</SelectItem>
                      <SelectItem value="flexible">Гибкий график</SelectItem>
                      <SelectItem value="shift">Сменный график</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Начало рабочего дня</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Окончание рабочего дня</Label>
                    <Input type="time" defaultValue="18:00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Обеденный перерыв (минуты)</Label>
                  <Input type="number" placeholder="60" min="30" max="120" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Корпоративный чат
                </CardTitle>
                <CardDescription>Настройки внутренней системы общения</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>История сообщений</Label>
                    <p className="text-sm text-muted-foreground">
                      Сохранять историю переписки
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Период хранения истории (дни)</Label>
                  <Input type="number" placeholder="365" min="30" max="9999" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Файловые вложения</Label>
                    <p className="text-sm text-muted-foreground">
                      Разрешить отправку файлов
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Максимальный размер файла (МБ)</Label>
                  <Input type="number" placeholder="25" min="1" max="100" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sla" className="space-y-6">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  SLA конфигурация
                </CardTitle>
                <CardDescription>Настройка правил уровня обслуживания</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Глобальные настройки SLA</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Рабочие часы (начало)</Label>
                      <Input type="time" defaultValue="09:00" />
                    </div>
                    <div className="space-y-2">
                      <Label>Рабочие часы (окончание)</Label>
                      <Input type="time" defaultValue="18:00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Рабочие дни</Label>
                    <Select defaultValue="weekdays">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekdays">Пн-Пт</SelectItem>
                        <SelectItem value="everyday">Каждый день</SelectItem>
                        <SelectItem value="custom">Настроить</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6">
          <Button onClick={handleSave} className="min-w-32">
            Сохранить настройки
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;