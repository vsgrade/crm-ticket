import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Bell, 
  Globe, 
  Camera,
  Key,
  Clock,
  Languages,
  Briefcase,
  Settings as SettingsIcon,
  Eye,
  EyeOff,
  Save,
  Upload
} from "lucide-react";

const ProfileSettings = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    // Основная информация
    firstName: "Иван",
    lastName: "Петров", 
    email: "ivan.petrov@company.com",
    phone: "+7 (999) 123-45-67",
    position: "Старший оператор поддержки",
    department: "Техподдержка",
    employeeId: "EMP-2024-001",
    birthDate: "1990-05-15",
    hireDate: "2023-01-15",
    
    // Адрес
    country: "Россия",
    city: "Москва",
    address: "ул. Тверская, д. 1, кв. 10",
    postalCode: "101000",
    
    // Настройки уведомлений
    emailNotifications: true,
    smsNotifications: false,
    desktopNotifications: true,
    soundAlerts: true,
    notifyNewTickets: true,
    notifyAssignedTickets: true,
    notifySlaAlerts: true,
    notifySystemUpdates: false,
    
    // Рабочие настройки
    timezone: "Europe/Moscow",
    language: "ru",
    dateFormat: "dd.MM.yyyy",
    timeFormat: "24h",
    theme: "system",
    
    // Безопасность
    twoFactorEnabled: false,
    lastPasswordChange: "2024-01-15",
    sessionTimeout: 30,
    
    // Рабочий график
    workingHours: {
      monday: { start: "09:00", end: "18:00", enabled: true },
      tuesday: { start: "09:00", end: "18:00", enabled: true },
      wednesday: { start: "09:00", end: "18:00", enabled: true },
      thursday: { start: "09:00", end: "18:00", enabled: true },
      friday: { start: "09:00", end: "18:00", enabled: true },
      saturday: { start: "", end: "", enabled: false },
      sunday: { start: "", end: "", enabled: false }
    },
    
    // О себе
    bio: "Опытный специалист технической поддержки с 3+ годами опыта в решении сложных технических вопросов.",
    skills: "Техподдержка, CRM, Тикет-системы, Клиентский сервис",
    emergencyContact: {
      name: "Мария Петрова",
      phone: "+7 (999) 987-65-43",
      relation: "Супруга"
    }
  });

  const handleSave = () => {
    toast({
      title: "Профиль обновлен",
      description: "Настройки профиля успешно сохранены (демо режим)",
    });
  };

  const handleAvatarUpload = () => {
    toast({
      title: "Фото профиля",
      description: "Загрузка фото в демо режиме недоступна",
    });
  };

  const handlePasswordChange = () => {
    toast({
      title: "Смена пароля",
      description: "В демо режиме смена пароля недоступна",
    });
  };

  const weekDays = [
    { key: 'monday', name: 'Понедельник' },
    { key: 'tuesday', name: 'Вторник' },
    { key: 'wednesday', name: 'Среда' },
    { key: 'thursday', name: 'Четверг' },
    { key: 'friday', name: 'Пятница' },
    { key: 'saturday', name: 'Суббота' },
    { key: 'sunday', name: 'Воскресенье' }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-none p-6 border-b border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Настройки профиля
            </h1>
            <p className="text-muted-foreground">Управление личными данными и предпочтениями</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            Демо данные
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 h-12 gap-1">
            <TabsTrigger value="personal" className="flex items-center gap-2 text-xs">
              <User className="h-4 w-4" />
              Личные данные
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 text-xs">
              <Bell className="h-4 w-4" />
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="work" className="flex items-center gap-2 text-xs">
              <Clock className="h-4 w-4" />
              График работы
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 text-xs">
              <Shield className="h-4 w-4" />
              Безопасность
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2 text-xs">
              <SettingsIcon className="h-4 w-4" />
              Предпочтения
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2 text-xs">
              <Briefcase className="h-4 w-4" />
              О себе
            </TabsTrigger>
          </TabsList>

          {/* Личные данные */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Основная информация
                  </CardTitle>
                  <CardDescription>Ваши основные данные</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Аватар */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-lg bg-gradient-to-br from-primary to-primary-glow text-white">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
                        <Camera className="h-4 w-4 mr-2" />
                        Изменить фото
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, PNG до 5MB</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Дата рождения</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={profile.birthDate}
                      onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-2 hover:border-primary/20 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Рабочая информация
                    </CardTitle>
                    <CardDescription>Должность и отдел</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Должность</Label>
                      <Input value={profile.position} readOnly className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label>Отдел</Label>
                      <Input value={profile.department} readOnly className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label>ID сотрудника</Label>
                      <Input value={profile.employeeId} readOnly className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label>Дата найма</Label>
                      <Input value={profile.hireDate} readOnly className="bg-muted" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-primary/20 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Адрес
                    </CardTitle>
                    <CardDescription>Место проживания</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Страна</Label>
                        <Input
                          id="country"
                          value={profile.country}
                          onChange={(e) => setProfile({...profile, country: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Город</Label>
                        <Input
                          id="city"
                          value={profile.city}
                          onChange={(e) => setProfile({...profile, city: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Адрес</Label>
                      <Input
                        id="address"
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Почтовый индекс</Label>
                      <Input
                        id="postalCode"
                        value={profile.postalCode}
                        onChange={(e) => setProfile({...profile, postalCode: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Уведомления */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Способы уведомлений
                  </CardTitle>
                  <CardDescription>Как вы хотите получать уведомления</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email уведомления</Label>
                      <p className="text-sm text-muted-foreground">
                        Получать уведомления на email
                      </p>
                    </div>
                    <Switch
                      checked={profile.emailNotifications}
                      onCheckedChange={(checked) => setProfile({...profile, emailNotifications: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS уведомления</Label>
                      <p className="text-sm text-muted-foreground">
                        Получать уведомления по SMS
                      </p>
                    </div>
                    <Switch
                      checked={profile.smsNotifications}
                      onCheckedChange={(checked) => setProfile({...profile, smsNotifications: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Браузерные уведомления</Label>
                      <p className="text-sm text-muted-foreground">
                        Push-уведомления в браузере
                      </p>
                    </div>
                    <Switch
                      checked={profile.desktopNotifications}
                      onCheckedChange={(checked) => setProfile({...profile, desktopNotifications: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Звуковые оповещения</Label>
                      <p className="text-sm text-muted-foreground">
                        Воспроизводить звук при уведомлениях
                      </p>
                    </div>
                    <Switch
                      checked={profile.soundAlerts}
                      onCheckedChange={(checked) => setProfile({...profile, soundAlerts: checked})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle>Типы уведомлений</CardTitle>
                  <CardDescription>О чем вы хотите получать уведомления</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Новые тикеты</Label>
                      <p className="text-sm text-muted-foreground">
                        Уведомления о создании новых тикетов
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifyNewTickets}
                      onCheckedChange={(checked) => setProfile({...profile, notifyNewTickets: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Назначенные тикеты</Label>
                      <p className="text-sm text-muted-foreground">
                        Когда вам назначают тикет
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifyAssignedTickets}
                      onCheckedChange={(checked) => setProfile({...profile, notifyAssignedTickets: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Нарушения SLA</Label>
                      <p className="text-sm text-muted-foreground">
                        Предупреждения о превышении времени
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifySlaAlerts}
                      onCheckedChange={(checked) => setProfile({...profile, notifySlaAlerts: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Системные обновления</Label>
                      <p className="text-sm text-muted-foreground">
                        Уведомления об обновлениях системы
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifySystemUpdates}
                      onCheckedChange={(checked) => setProfile({...profile, notifySystemUpdates: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* График работы */}
          <TabsContent value="work" className="space-y-6">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Рабочий график
                </CardTitle>
                <CardDescription>Настройка рабочих часов по дням недели</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {weekDays.map((day) => (
                  <div key={day.key} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex items-center gap-3 min-w-32">
                      <Switch
                        checked={profile.workingHours[day.key].enabled}
                        onCheckedChange={(checked) => setProfile({
                          ...profile,
                          workingHours: {
                            ...profile.workingHours,
                            [day.key]: { ...profile.workingHours[day.key], enabled: checked }
                          }
                        })}
                      />
                      <Label className="font-medium">{day.name}</Label>
                    </div>
                    {profile.workingHours[day.key].enabled && (
                      <div className="flex items-center gap-2 flex-1">
                        <Label className="text-sm">с</Label>
                        <Input
                          type="time"
                          value={profile.workingHours[day.key].start}
                          onChange={(e) => setProfile({
                            ...profile,
                            workingHours: {
                              ...profile.workingHours,
                              [day.key]: { ...profile.workingHours[day.key], start: e.target.value }
                            }
                          })}
                          className="w-32"
                        />
                        <Label className="text-sm">до</Label>
                        <Input
                          type="time"
                          value={profile.workingHours[day.key].end}
                          onChange={(e) => setProfile({
                            ...profile,
                            workingHours: {
                              ...profile.workingHours,
                              [day.key]: { ...profile.workingHours[day.key], end: e.target.value }
                            }
                          })}
                          className="w-32"
                        />
                      </div>
                    )}
                    {!profile.workingHours[day.key].enabled && (
                      <div className="flex-1 text-sm text-muted-foreground">Выходной день</div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Безопасность */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Пароль и доступ
                  </CardTitle>
                  <CardDescription>Управление паролем и доступом</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Текущий пароль</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value="••••••••••"
                        readOnly
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button onClick={handlePasswordChange} className="w-full">
                    Изменить пароль
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Последнее изменение: {profile.lastPasswordChange}
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Двухфакторная аутентификация</Label>
                      <p className="text-sm text-muted-foreground">
                        Дополнительная защита аккаунта
                      </p>
                    </div>
                    <Switch
                      checked={profile.twoFactorEnabled}
                      onCheckedChange={(checked) => setProfile({...profile, twoFactorEnabled: checked})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Сессии
                  </CardTitle>
                  <CardDescription>Управление активными сессиями</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Таймаут сессии (минуты)</Label>
                    <Select 
                      value={profile.sessionTimeout.toString()} 
                      onValueChange={(value) => setProfile({...profile, sessionTimeout: parseInt(value)})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 минут</SelectItem>
                        <SelectItem value="30">30 минут</SelectItem>
                        <SelectItem value="60">1 час</SelectItem>
                        <SelectItem value="120">2 часа</SelectItem>
                        <SelectItem value="480">8 часов</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <Label>Активные сессии</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg bg-accent/50">
                        <div>
                          <p className="font-medium">Текущий браузер</p>
                          <p className="text-sm text-muted-foreground">Chrome на Windows • Москва</p>
                        </div>
                        <Badge variant="default">Активна</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Мобильное приложение</p>
                          <p className="text-sm text-muted-foreground">iOS • 2 часа назад</p>
                        </div>
                        <Button variant="outline" size="sm">Завершить</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Предпочтения */}
          <TabsContent value="preferences" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Локализация
                  </CardTitle>
                  <CardDescription>Язык и региональные настройки</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Язык интерфейса</Label>
                    <Select value={profile.language} onValueChange={(value) => setProfile({...profile, language: value})}>
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
                  <div className="space-y-2">
                    <Label>Часовой пояс</Label>
                    <Select value={profile.timezone} onValueChange={(value) => setProfile({...profile, timezone: value})}>
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
                    <Label>Формат даты</Label>
                    <Select value={profile.dateFormat} onValueChange={(value) => setProfile({...profile, dateFormat: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd.MM.yyyy">дд.мм.гггг</SelectItem>
                        <SelectItem value="MM/dd/yyyy">мм/дд/гггг</SelectItem>
                        <SelectItem value="yyyy-MM-dd">гггг-мм-дд</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Формат времени</Label>
                    <Select value={profile.timeFormat} onValueChange={(value) => setProfile({...profile, timeFormat: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24-часовой</SelectItem>
                        <SelectItem value="12h">12-часовой (AM/PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle>Контакт для экстренных случаев</CardTitle>
                  <CardDescription>Кому звонить в случае необходимости</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Имя контакта</Label>
                    <Input
                      id="emergencyName"
                      value={profile.emergencyContact.name}
                      onChange={(e) => setProfile({
                        ...profile,
                        emergencyContact: { ...profile.emergencyContact, name: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Телефон</Label>
                    <Input
                      id="emergencyPhone"
                      value={profile.emergencyContact.phone}
                      onChange={(e) => setProfile({
                        ...profile,
                        emergencyContact: { ...profile.emergencyContact, phone: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyRelation">Отношение</Label>
                    <Input
                      id="emergencyRelation"
                      value={profile.emergencyContact.relation}
                      onChange={(e) => setProfile({
                        ...profile,
                        emergencyContact: { ...profile.emergencyContact, relation: e.target.value }
                      })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* О себе */}
          <TabsContent value="about" className="space-y-6">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Дополнительная информация
                </CardTitle>
                <CardDescription>Расскажите о себе и своих навыках</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">О себе</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={4}
                    placeholder="Расскажите о своем опыте и интересах..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Навыки и компетенции</Label>
                  <Textarea
                    id="skills"
                    value={profile.skills}
                    onChange={(e) => setProfile({...profile, skills: e.target.value})}
                    rows={3}
                    placeholder="Перечислите ваши профессиональные навыки..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Кнопка сохранения */}
        <div className="flex justify-end pt-6">
          <Button onClick={handleSave} className="min-w-32">
            <Save className="h-4 w-4 mr-2" />
            Сохранить изменения
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;