import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  User, 
  Calendar,
  Database,
  Settings,
  TestTube
} from 'lucide-react';
import ContactFieldsManager from '@/components/ContactFieldsManager';

const SystemFields = () => {
  const { toast } = useToast();
  const [dbSettings, setDbSettings] = useState({
    host: 'demo-postgres.example.com',
    port: '5432',
    database: 'ticketpro_db',
    username: 'admin',
    password: 'demo_password',
    maxConnections: 100,
    queryTimeout: 30,
    backupEnabled: true,
    backupTime: '03:00',
    backupRetention: 30
  });

  const handleTestConnection = () => {
    toast({
      title: "Тестирование подключения",
      description: "✅ Подключение к PostgreSQL успешно установлено (демо)",
    });
  };

  const handleSaveDbSettings = () => {
    toast({
      title: "Настройки базы данных сохранены",
      description: "Конфигурация PostgreSQL обновлена (демо режим)",
    });
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-none p-6 border-b border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Системные настройки
            </h1>
            <p className="text-muted-foreground">Управление полями контактов и базой данных</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            Демо данные
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto space-y-6">
        {/* Contact Fields Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Поля контактов
            </CardTitle>
            <CardDescription>Управление дополнительными полями для профилей клиентов</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactFieldsManager />
          </CardContent>
        </Card>

        {/* Database Configuration Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Конфигурация базы данных PostgreSQL
            </CardTitle>
            <CardDescription>Настройки подключения и параметры производительности</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Connection Settings */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Параметры подключения</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Хост сервера</Label>
                    <Input
                      value={dbSettings.host}
                      onChange={(e) => setDbSettings({...dbSettings, host: e.target.value})}
                      placeholder="localhost"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Порт</Label>
                      <Input
                        value={dbSettings.port}
                        onChange={(e) => setDbSettings({...dbSettings, port: e.target.value})}
                        placeholder="5432"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>База данных</Label>
                      <Input
                        value={dbSettings.database}
                        onChange={(e) => setDbSettings({...dbSettings, database: e.target.value})}
                        placeholder="database_name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Пользователь</Label>
                      <Input
                        value={dbSettings.username}
                        onChange={(e) => setDbSettings({...dbSettings, username: e.target.value})}
                        placeholder="username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Пароль</Label>
                      <Input
                        type="password"
                        value={dbSettings.password}
                        onChange={(e) => setDbSettings({...dbSettings, password: e.target.value})}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Settings */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Настройки производительности</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Максимальные подключения</Label>
                    <Input
                      type="number"
                      value={dbSettings.maxConnections}
                      onChange={(e) => setDbSettings({...dbSettings, maxConnections: parseInt(e.target.value)})}
                      min="10"
                      max="1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Timeout запроса (секунды)</Label>
                    <Input
                      type="number"
                      value={dbSettings.queryTimeout}
                      onChange={(e) => setDbSettings({...dbSettings, queryTimeout: parseInt(e.target.value)})}
                      min="5"
                      max="300"
                    />
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <h5 className="font-medium">Автоматические бэкапы</h5>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Включить бэкапы</Label>
                        <p className="text-sm text-muted-foreground">
                          Ежедневное резервное копирование
                        </p>
                      </div>
                      <Switch
                        checked={dbSettings.backupEnabled}
                        onCheckedChange={(checked) => setDbSettings({...dbSettings, backupEnabled: checked})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Время бэкапа</Label>
                      <Input
                        type="time"
                        value={dbSettings.backupTime}
                        onChange={(e) => setDbSettings({...dbSettings, backupTime: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Хранить бэкапы (дней)</Label>
                      <Input
                        type="number"
                        value={dbSettings.backupRetention}
                        onChange={(e) => setDbSettings({...dbSettings, backupRetention: parseInt(e.target.value)})}
                        min="1"
                        max="365"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleTestConnection} variant="outline" className="flex items-center gap-2">
                <TestTube className="h-4 w-4" />
                Тестировать подключение
              </Button>
              <Button onClick={handleSaveDbSettings} className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Сохранить настройки
              </Button>
            </div>

            {/* Connection Status */}
            <div className="p-4 bg-muted/50 rounded-lg border">
              <h5 className="font-medium mb-2">Статус подключения</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Статус:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Подключено</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Версия PostgreSQL:</span>
                  <div className="font-medium mt-1">15.4</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Пинг:</span>
                  <div className="font-medium mt-1">12ms</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Uptime:</span>
                  <div className="font-medium mt-1">99.8%</div>
                </div>
              </div>
            </div>
        </CardContent>
        </Card>

        {/* Database Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Статистика базы данных</CardTitle>
            <CardDescription>Информация об использовании и производительности (демо данные)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border">
                <div className="text-2xl font-bold text-primary">2.4 GB</div>
                <div className="text-sm text-muted-foreground">Размер БД</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">15,420</div>
                <div className="text-sm text-muted-foreground">Тикеты</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">3,250</div>
                <div className="text-sm text-muted-foreground">Клиенты</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-lg border">
                <div className="text-2xl font-bold text-orange-600">45</div>
                <div className="text-sm text-muted-foreground">Активных подключений</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemFields;