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
  AlertTriangle
} from "lucide-react";

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
          <TabsList className="grid w-full grid-cols-6 h-12">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              Общие
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Безопасность
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Интеграции
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              База данных
            </TabsTrigger>
            <TabsTrigger value="sla" className="flex items-center gap-2">
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Подключение к базе данных MySQL
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mysql-host">Хост</Label>
                      <Input
                        id="mysql-host"
                        placeholder="localhost или IP адрес"
                        defaultValue="localhost"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mysql-port">Порт</Label>
                      <Input
                        id="mysql-port"
                        placeholder="3306"
                        defaultValue="3306"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mysql-database">База данных</Label>
                      <Input
                        id="mysql-database"
                        placeholder="Название базы данных"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mysql-username">Имя пользователя</Label>
                      <Input
                        id="mysql-username"
                        placeholder="root"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mysql-password">Пароль</Label>
                      <Input
                        id="mysql-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mysql-charset">Кодировка</Label>
                      <Select defaultValue="utf8mb4">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utf8mb4">UTF8MB4</SelectItem>
                          <SelectItem value="utf8">UTF8</SelectItem>
                          <SelectItem value="latin1">Latin1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mysql-ssl">SSL соединение</Label>
                        <p className="text-sm text-muted-foreground">
                          Использовать защищенное SSL соединение
                        </p>
                      </div>
                      <Switch id="mysql-ssl" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mysql-pool">Пул соединений</Label>
                        <p className="text-sm text-muted-foreground">
                          Максимальное количество одновременных соединений
                        </p>
                      </div>
                      <Input
                        id="mysql-pool"
                        className="w-20"
                        placeholder="10"
                        defaultValue="10"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mysql-timeout">Timeout</Label>
                        <p className="text-sm text-muted-foreground">
                          Время ожидания соединения (секунды)
                        </p>
                      </div>
                      <Input
                        id="mysql-timeout"
                        className="w-20"
                        placeholder="30"
                        defaultValue="30"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Тестировать соединение
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Сохранить настройки
                    </Button>
                  </div>

                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-sm text-warning-foreground">
                      <strong>Демо режим:</strong> Настройки MySQL сохраняются только локально и не влияют на реальную работу системы.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
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

          <TabsContent value="database" className="space-y-6">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  База данных и хранение
                </CardTitle>
                <CardDescription>Управление данными системы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">247.3 ГБ</div>
                    <p className="text-sm text-muted-foreground">Общий размер БД</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">15.2 ГБ</div>
                    <p className="text-sm text-muted-foreground">Файлы и медиа</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">89%</div>
                    <p className="text-sm text-muted-foreground">Использование</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-medium">Операции обслуживания</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Оптимизация БД
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Очистка старых логов
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Архивация тикетов
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Резервное копирование
                    </Button>
                  </div>
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
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Активные SLA правила</h4>
                    <Button variant="outline" size="sm">Создать правило</Button>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Техподдержка - Критично", response: "1 час", resolution: "4 часа" },
                      { name: "Продажи - Стандарт", response: "2 часа", resolution: "24 часа" },
                      { name: "Общие вопросы", response: "4 часа", resolution: "72 часа" }
                    ].map((rule, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{rule.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Ответ: {rule.response} • Решение: {rule.resolution}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Изменить</Button>
                        </div>
                      </div>
                    ))}
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