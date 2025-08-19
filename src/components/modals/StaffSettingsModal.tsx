import { useState } from "react";
import { X, Save, User, Mail, Phone, Shield, Clock, Building2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface StaffSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffId?: string;
  staffName?: string;
}

export const StaffSettingsModal = ({ 
  open, 
  onOpenChange, 
  staffId = "staff-001", 
  staffName = "Мария Иванова" 
}: StaffSettingsModalProps) => {
  const { toast } = useToast();
  
  const [staffData, setStaffData] = useState({
    id: staffId,
    name: staffName,
    email: "maria.ivanova@company.com",
    phone: "+7 (999) 123-45-67",
    role: "Старший специалист поддержки",
    level: "senior",
    department: ["Техническая поддержка"],
    permissions: ["view_tickets", "edit_tickets", "delete_tickets", "manage_clients"],
    workingHours: {
      start: "09:00",
      end: "18:00",
      timezone: "Europe/Moscow",
      weekdays: [1, 2, 3, 4, 5]
    },
    isActive: true,
    notifications: {
      email: true,
      sms: false,
      desktop: true
    }
  });

  const handleSave = () => {
    toast({
      title: "Настройки сотрудника обновлены ✅",
      description: "Изменения сохранены (демо функция)",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Заголовок */}
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {staffData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">Настройки сотрудника</h1>
            <p className="text-sm text-muted-foreground">{staffData.name}</p>
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
                <User className="h-5 w-5" />
                Основная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Полное имя</Label>
                  <Input
                    id="name"
                    value={staffData.name}
                    onChange={(e) => setStaffData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={staffData.email}
                    onChange={(e) => setStaffData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={staffData.phone}
                    onChange={(e) => setStaffData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Должность</Label>
                  <Input
                    id="role"
                    value={staffData.role}
                    onChange={(e) => setStaffData(prev => ({ ...prev, role: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Роль и права */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Роль и права доступа
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="level">Уровень</Label>
                <Select value={staffData.level} onValueChange={(value) => setStaffData(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="middle">Middle</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Права доступа</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {[
                    { id: 'view_tickets', label: 'Просмотр тикетов' },
                    { id: 'edit_tickets', label: 'Редактирование тикетов' },
                    { id: 'delete_tickets', label: 'Удаление тикетов' },
                    { id: 'manage_clients', label: 'Управление клиентами' },
                    { id: 'view_reports', label: 'Просмотр отчетов' },
                    { id: 'admin_access', label: 'Админ доступ' }
                  ].map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Switch
                        id={permission.id}
                        checked={staffData.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setStaffData(prev => ({
                              ...prev,
                              permissions: [...prev.permissions, permission.id]
                            }));
                          } else {
                            setStaffData(prev => ({
                              ...prev,
                              permissions: prev.permissions.filter(p => p !== permission.id)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={permission.id} className="text-sm">
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Департаменты */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Департаменты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  'Техническая поддержка',
                  'Продажи',
                  'Финансы',
                  'Маркетинг',
                  'Бухгалтерия',
                  'HR Отдел'
                ].map((dept) => (
                  <div key={dept} className="flex items-center space-x-2">
                    <input
                      type="checkbox" 
                      id={`dept-${dept}`}
                      checked={staffData.department.includes(dept)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setStaffData(prev => ({
                            ...prev,
                            department: [...prev.department, dept]
                          }));
                        } else {
                          setStaffData(prev => ({
                            ...prev,
                            department: prev.department.filter(d => d !== dept)
                          }));
                        }
                      }}
                      className="rounded border-input"
                    />
                    <label htmlFor={`dept-${dept}`} className="text-sm cursor-pointer">
                      {dept}
                    </label>
                  </div>
                ))}
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
                  <Label htmlFor="start-time">Начало работы</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={staffData.workingHours.start}
                    onChange={(e) => setStaffData(prev => ({
                      ...prev,
                      workingHours: { ...prev.workingHours, start: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="end-time">Конец работы</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={staffData.workingHours.end}
                    onChange={(e) => setStaffData(prev => ({
                      ...prev,
                      workingHours: { ...prev.workingHours, end: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Уведомления */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Уведомления
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email уведомления</Label>
                  <Switch
                    id="email-notifications"
                    checked={staffData.notifications.email}
                    onCheckedChange={(checked) => setStaffData(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications">SMS уведомления</Label>
                  <Switch
                    id="sms-notifications"
                    checked={staffData.notifications.sms}
                    onCheckedChange={(checked) => setStaffData(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, sms: checked }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="desktop-notifications">Desktop уведомления</Label>
                  <Switch
                    id="desktop-notifications"
                    checked={staffData.notifications.desktop}
                    onCheckedChange={(checked) => setStaffData(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, desktop: checked }
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffSettingsModal;