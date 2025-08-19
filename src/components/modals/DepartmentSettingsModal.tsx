import { useState } from "react";
import { X, Save, Building2, Users, Clock, Zap, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DepartmentSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId?: string;
  departmentName?: string;
}

export const DepartmentSettingsModal = ({ 
  open, 
  onOpenChange, 
  departmentId = "dept-001", 
  departmentName = "Техническая поддержка" 
}: DepartmentSettingsModalProps) => {
  const { toast } = useToast();
  
  const [deptData, setDeptData] = useState({
    id: departmentId,
    name: departmentName,
    description: "Обработка технических вопросов и проблем пользователей",
    isActive: true,
    maxTicketsPerAgent: 10,
    autoAssignment: true,
    workingHours: {
      start: "09:00",
      end: "18:00",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    slaSettings: {
      responseTime: 30, // минуты
      resolutionTime: 240, // минуты
      escalationTime: 480 // минуты
    },
    integrations: [
      { name: 'Telegram Bot', type: 'telegram', status: 'active', config: {} },
      { name: 'Email Support', type: 'email', status: 'active', config: {} },
      { name: 'WhatsApp Business', type: 'whatsapp', status: 'warning', config: {} }
    ],
    emailTemplates: {
      welcome: "Здравствуйте! Мы получили ваше обращение.",
      resolved: "Ваш вопрос решен. Спасибо за обращение!",
      escalation: "Ваше обращение передано старшему специалисту."
    }
  });

  const handleSave = () => {
    toast({
      title: "Настройки департамента обновлены ✅",
      description: "Изменения сохранены (демо функция)",
    });
  };

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
        return <Badge className="bg-success/20 text-success">Активна</Badge>;
      case 'warning':
        return <Badge className="bg-warning/20 text-warning">Предупреждение</Badge>;
      case 'error':
        return <Badge variant="destructive">Ошибка</Badge>;
      default:
        return <Badge variant="outline">Неактивна</Badge>;
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Заголовок */}
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-primary/20">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Настройки департамента</h1>
            <p className="text-sm text-muted-foreground">{deptData.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Сохранить
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-2">
            <X className="h-4 w-4" />
            Закрыть
          </Button>
        </div>
      </div>

      <div className="p-6 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Основная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dept-name">Название департамента</Label>
                  <Input
                    id="dept-name"
                    value={deptData.name}
                    onChange={(e) => setDeptData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="dept-active"
                    checked={deptData.isActive}
                    onCheckedChange={(checked) => setDeptData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="dept-active">Активный департамент</Label>
                </div>
              </div>
              <div>
                <Label htmlFor="dept-description">Описание</Label>
                <Textarea
                  id="dept-description"
                  value={deptData.description}
                  onChange={(e) => setDeptData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Настройки работы */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Настройки работы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max-tickets">Максимум тикетов на агента</Label>
                  <Input
                    id="max-tickets"
                    type="number"
                    value={deptData.maxTicketsPerAgent}
                    onChange={(e) => setDeptData(prev => ({
                      ...prev,
                      maxTicketsPerAgent: parseInt(e.target.value) || 10
                    }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-assignment"
                    checked={deptData.autoAssignment}
                    onCheckedChange={(checked) => setDeptData(prev => ({ ...prev, autoAssignment: checked }))}
                  />
                  <Label htmlFor="auto-assignment">Автоназначение</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Рабочие часы */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Рабочие часы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="work-start">Начало работы</Label>
                  <Input
                    id="work-start"
                    type="time"
                    value={deptData.workingHours.start}
                    onChange={(e) => setDeptData(prev => ({
                      ...prev,
                      workingHours: { ...prev.workingHours, start: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="work-end">Конец работы</Label>
                  <Input
                    id="work-end"
                    type="time"
                    value={deptData.workingHours.end}
                    onChange={(e) => setDeptData(prev => ({
                      ...prev,
                      workingHours: { ...prev.workingHours, end: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="timezone">Часовой пояс</Label>
                <Select 
                  value={deptData.workingHours.timezone} 
                  onValueChange={(value) => setDeptData(prev => ({
                    ...prev,
                    workingHours: { ...prev.workingHours, timezone: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Moscow">Europe/Moscow</SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                    <SelectItem value="America/New_York">America/New_York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* SLA настройки */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                SLA настройки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="response-time">Время ответа (мин)</Label>
                  <Input
                    id="response-time"
                    type="number"
                    value={deptData.slaSettings.responseTime}
                    onChange={(e) => setDeptData(prev => ({
                      ...prev,
                      slaSettings: { 
                        ...prev.slaSettings, 
                        responseTime: parseInt(e.target.value) || 30 
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="resolution-time">Время решения (мин)</Label>
                  <Input
                    id="resolution-time"
                    type="number"
                    value={deptData.slaSettings.resolutionTime}
                    onChange={(e) => setDeptData(prev => ({
                      ...prev,
                      slaSettings: { 
                        ...prev.slaSettings, 
                        resolutionTime: parseInt(e.target.value) || 240 
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="escalation-time">Время эскалации (мин)</Label>
                  <Input
                    id="escalation-time"
                    type="number"
                    value={deptData.slaSettings.escalationTime}
                    onChange={(e) => setDeptData(prev => ({
                      ...prev,
                      slaSettings: { 
                        ...prev.slaSettings, 
                        escalationTime: parseInt(e.target.value) || 480 
                      }
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Интеграции */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Интеграции
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить интеграцию
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deptData.integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getIntegrationIcon(integration.type)}</span>
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-muted-foreground">{integration.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(integration.status)}
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Шаблоны email */}
          <Card>
            <CardHeader>
              <CardTitle>Email шаблоны</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="welcome-template">Приветственное сообщение</Label>
                <Textarea
                  id="welcome-template"
                  value={deptData.emailTemplates.welcome}
                  onChange={(e) => setDeptData(prev => ({
                    ...prev,
                    emailTemplates: { ...prev.emailTemplates, welcome: e.target.value }
                  }))}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="resolved-template">Сообщение о решении</Label>
                <Textarea
                  id="resolved-template"
                  value={deptData.emailTemplates.resolved}
                  onChange={(e) => setDeptData(prev => ({
                    ...prev,
                    emailTemplates: { ...prev.emailTemplates, resolved: e.target.value }
                  }))}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="escalation-template">Сообщение об эскалации</Label>
                <Textarea
                  id="escalation-template"
                  value={deptData.emailTemplates.escalation}
                  onChange={(e) => setDeptData(prev => ({
                    ...prev,
                    emailTemplates: { ...prev.emailTemplates, escalation: e.target.value }
                  }))}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DepartmentSettingsModal;