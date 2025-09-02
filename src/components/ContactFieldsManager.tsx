import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Phone, Mail, MapPin, Building, User, Calendar, Settings, Download, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'phone' | 'date' | 'select' | 'textarea';
  required: boolean;
  options?: string[];
  icon: any;
  category: 'personal' | 'company' | 'custom';
}

interface StaffStatus {
  id: string;
  name: string;
  color: string;
  description: string;
  isActive: boolean;
}

const ContactFieldsManager = () => {
  const { toast } = useToast();
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<ContactField | null>(null);
  const [editingStatus, setEditingStatus] = useState<StaffStatus | null>(null);

  const [newField, setNewField] = useState({
    name: '',
    type: 'text',
    required: false,
    options: [''],
    category: 'custom'
  });

  const [newStatus, setNewStatus] = useState({
    name: '',
    color: '#10b981',
    description: '',
    isActive: true
  });

  const [contactFields, setContactFields] = useState<ContactField[]>([]);

  const [staffStatuses, setStaffStatuses] = useState<StaffStatus[]>([]);

  // Загрузка данных из localStorage
  useEffect(() => {
    const savedFields = localStorage.getItem('contactFields');
    const savedStatuses = localStorage.getItem('staffStatuses');
    
    if (savedFields) {
      setContactFields(JSON.parse(savedFields));
    } else {
      const defaultFields: ContactField[] = [
        { id: '1', name: 'Имя', type: 'text', required: true, icon: User, category: 'personal' },
        { id: '2', name: 'Email', type: 'email', required: true, icon: Mail, category: 'personal' },
        { id: '3', name: 'Телефон', type: 'phone', required: false, icon: Phone, category: 'personal' },
        { id: '4', name: 'Адрес', type: 'textarea', required: false, icon: MapPin, category: 'personal' },
        { id: '5', name: 'Компания', type: 'text', required: false, icon: Building, category: 'company' },
        { id: '6', name: 'Должность', type: 'text', required: false, icon: User, category: 'company' },
        { id: '7', name: 'Дата рождения', type: 'date', required: false, icon: Calendar, category: 'personal' }
      ];
      setContactFields(defaultFields);
      localStorage.setItem('contactFields', JSON.stringify(defaultFields));
    }
    
    if (savedStatuses) {
      setStaffStatuses(JSON.parse(savedStatuses));
    } else {
      const defaultStatuses: StaffStatus[] = [
        { id: '1', name: 'Онлайн', color: '#10b981', description: 'Доступен для работы', isActive: true },
        { id: '2', name: 'Занят', color: '#f59e0b', description: 'Работает с клиентом', isActive: true },
        { id: '3', name: 'Отошел', color: '#6b7280', description: 'Временно недоступен', isActive: true },
        { id: '4', name: 'Обед', color: '#ef4444', description: 'На обеденном перерыве', isActive: true },
        { id: '5', name: 'Оффлайн', color: '#374151', description: 'Не на рабочем месте', isActive: false }
      ];
      setStaffStatuses(defaultStatuses);
      localStorage.setItem('staffStatuses', JSON.stringify(defaultStatuses));
    }
  }, []);

  const handleSaveField = () => {
    if (editingField) {
      setContactFields(contactFields.map(field => 
        field.id === editingField.id 
          ? {
              ...editingField,
              ...newField,
              id: editingField.id,
              icon: editingField.icon,
              type: newField.type as ContactField['type'],
              category: newField.category as ContactField['category'],
              options: newField.type === 'select' ? (newField.options ?? []) : undefined,
            }
          : field
      ));
      setEditingField(null);
    } else {
      const newId = Date.now().toString();
      setContactFields([...contactFields, {
        ...newField,
        id: newId,
        icon: User,
        type: newField.type as ContactField['type'],
        category: newField.category as ContactField['category']
      }]);
    }
    setIsFieldModalOpen(false);
    setNewField({ name: '', type: 'text', required: false, options: [''], category: 'custom' });
    localStorage.setItem('contactFields', JSON.stringify(editingField ? contactFields.map(field => 
      field.id === editingField.id 
        ? {
            ...editingField,
            ...newField,
            id: editingField.id,
            icon: editingField.icon,
            type: newField.type as ContactField['type'],
            category: newField.category as ContactField['category'],
            options: newField.type === 'select' ? (newField.options ?? []) : undefined,
          }
        : field
    ) : [...contactFields, {
      ...newField,
      id: Date.now().toString(),
      icon: User,
      type: newField.type as ContactField['type'],
      category: newField.category as ContactField['category']
    }]));
    
    toast({
      title: editingField ? "Поле обновлено" : "Поле создано",
      description: `Поле "${newField.name}" ${editingField ? 'обновлено' : 'добавлено'} в систему`,
    });
  };

  const handleSaveStatus = () => {
    if (editingStatus) {
      setStaffStatuses(staffStatuses.map(status => 
        status.id === editingStatus.id 
          ? { ...editingStatus, ...newStatus }
          : status
      ));
      setEditingStatus(null);
    } else {
      const newId = Date.now().toString();
      setStaffStatuses([...staffStatuses, { ...newStatus, id: newId }]);
    }
    setIsStatusModalOpen(false);
    setNewStatus({ name: '', color: '#10b981', description: '', isActive: true });
    localStorage.setItem('staffStatuses', JSON.stringify(editingStatus ? staffStatuses.map(status => 
      status.id === editingStatus.id 
        ? { ...editingStatus, ...newStatus }
        : status
    ) : [...staffStatuses, { ...newStatus, id: Date.now().toString() }]));
    
    toast({
      title: editingStatus ? "Статус обновлен" : "Статус создан",
      description: `Статус "${newStatus.name}" ${editingStatus ? 'обновлен' : 'добавлен'} в систему`,
    });
  };

  const handleEditField = (field: ContactField) => {
    setEditingField(field);
    setNewField({
      name: field.name,
      type: field.type,
      required: field.required,
      options: field.options || [''],
      category: field.category
    });
    setIsFieldModalOpen(true);
  };

  const handleEditStatus = (status: StaffStatus) => {
    setEditingStatus(status);
    setNewStatus({
      name: status.name,
      color: status.color,
      description: status.description,
      isActive: status.isActive
    });
    setIsStatusModalOpen(true);
  };

  const handleDeleteField = (id: string) => {
    const updated = contactFields.filter(field => field.id !== id);
    setContactFields(updated);
    localStorage.setItem('contactFields', JSON.stringify(updated));
    
    toast({
      title: "Поле удалено",
      description: "Поле контакта удалено из системы",
    });
  };

  const handleDeleteStatus = (id: string) => {
    const updated = staffStatuses.filter(status => status.id !== id);
    setStaffStatuses(updated);
    localStorage.setItem('staffStatuses', JSON.stringify(updated));
    
    toast({
      title: "Статус удален",
      description: "Статус сотрудника удален из системы",
    });
  };

  const exportSettings = () => {
    const settings = {
      contactFields,
      staffStatuses,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'system-fields-settings.json';
    a.click();
    
    toast({
      title: "Настройки экспортированы",
      description: "Файл с настройками полей сохранен",
    });
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string);
        if (settings.contactFields) {
          setContactFields(settings.contactFields);
          localStorage.setItem('contactFields', JSON.stringify(settings.contactFields));
        }
        if (settings.staffStatuses) {
          setStaffStatuses(settings.staffStatuses);
          localStorage.setItem('staffStatuses', JSON.stringify(settings.staffStatuses));
        }
        
        toast({
          title: "Настройки импортированы",
          description: "Системные поля обновлены из файла",
        });
      } catch (error) {
        toast({
          title: "Ошибка импорта",
          description: "Некорректный формат файла",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const groupedFields = contactFields.reduce((acc, field) => {
    if (!acc[field.category]) acc[field.category] = [];
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, ContactField[]>);

  const categoryNames = {
    'personal': 'Личные данные',
    'company': 'Корпоративные данные',
    'custom': 'Дополнительные поля'
  };

  // Fallback icon resolver to avoid rendering errors when icon from storage is missing
  const getIconByType = (type: ContactField['type']) => {
    switch (type) {
      case 'email':
        return Mail;
      case 'phone':
        return Phone;
      case 'date':
        return Calendar;
      case 'textarea':
        return MapPin;
      case 'select':
        return Settings;
      case 'text':
      default:
        return User;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Settings Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Управление системными полями
              </CardTitle>
              <CardDescription>Импорт/экспорт настроек и управление полями</CardDescription>
            </div>
            <div className="flex gap-2">
              <input
                type="file"
                accept=".json"
                onChange={importSettings}
                className="hidden"
                id="import-settings"
              />
              <Button variant="outline" asChild>
                <label htmlFor="import-settings" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Импорт
                </label>
              </Button>
              <Button variant="outline" onClick={exportSettings}>
                <Download className="h-4 w-4 mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="fields" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fields">Поля контактов</TabsTrigger>
          <TabsTrigger value="statuses">Статусы сотрудников</TabsTrigger>
        </TabsList>

        <TabsContent value="fields">
          {/* Contact Fields Section */}
          <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Поля контактов</CardTitle>
              <CardDescription>Управление полями для профилей клиентов</CardDescription>
            </div>
            <Dialog open={isFieldModalOpen} onOpenChange={setIsFieldModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить поле
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingField ? 'Редактировать поле' : 'Новое поле контакта'}
                  </DialogTitle>
                  <DialogDescription>
                    Настройте поле для сбора информации о клиентах
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Название поля</Label>
                    <Input
                      value={newField.name}
                      onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                      placeholder="Например: Отчество"
                    />
                  </div>
                  <div>
                    <Label>Тип поля</Label>
                    <Select value={newField.type} onValueChange={(value) => setNewField({ ...newField, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Текст</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Телефон</SelectItem>
                        <SelectItem value="date">Дата</SelectItem>
                        <SelectItem value="textarea">Многострочный текст</SelectItem>
                        <SelectItem value="select">Выпадающий список</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Категория</Label>
                    <Select value={newField.category} onValueChange={(value) => setNewField({ ...newField, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Личные данные</SelectItem>
                        <SelectItem value="company">Корпоративные данные</SelectItem>
                        <SelectItem value="custom">Дополнительные поля</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="required"
                      checked={newField.required}
                      onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                    />
                    <Label htmlFor="required">Обязательное поле</Label>
                  </div>
                  {newField.type === 'select' && (
                    <div>
                      <Label>Варианты выбора (по одному в строке)</Label>
                      <textarea
                        className="w-full p-2 border rounded-md"
                        rows={4}
                        value={newField.options.join('\n')}
                        onChange={(e) => setNewField({ 
                          ...newField, 
                          options: e.target.value.split('\n').filter(opt => opt.trim()) 
                        })}
                        placeholder="Вариант 1&#10;Вариант 2&#10;Вариант 3"
                      />
                    </div>
                  )}
                  <Button onClick={handleSaveField} className="w-full">
                    {editingField ? 'Сохранить изменения' : 'Создать поле'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(groupedFields).map(([category, fields]) => (
              <div key={category}>
                <h4 className="font-medium mb-3">{categoryNames[category as keyof typeof categoryNames]}</h4>
                <div className="space-y-2">
                  {fields.map((field) => {
                    const IconComponent = typeof field.icon === 'function' ? field.icon : getIconByType(field.type);
                    return (
                      <div key={field.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{field.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Тип: {field.type}
                              {field.required && <Badge variant="secondary" className="ml-2">Обязательное</Badge>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditField(field)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {field.category === 'custom' && (
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteField(field.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>
        </TabsContent>

        <TabsContent value="statuses">
          {/* Staff Statuses Section */}
          <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Статусы сотрудников</CardTitle>
              <CardDescription>Управление статусами доступности сотрудников</CardDescription>
            </div>
            <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить статус
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingStatus ? 'Редактировать статус' : 'Новый статус сотрудника'}
                  </DialogTitle>
                  <DialogDescription>
                    Настройте статус для отображения доступности сотрудника
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Название статуса</Label>
                    <Input
                      value={newStatus.name}
                      onChange={(e) => setNewStatus({ ...newStatus, name: e.target.value })}
                      placeholder="Например: На совещании"
                    />
                  </div>
                  <div>
                    <Label>Цвет статуса</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={newStatus.color}
                        onChange={(e) => setNewStatus({ ...newStatus, color: e.target.value })}
                        className="w-12 h-10 border rounded"
                      />
                      <Input
                        value={newStatus.color}
                        onChange={(e) => setNewStatus({ ...newStatus, color: e.target.value })}
                        placeholder="#10b981"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Описание</Label>
                    <Input
                      value={newStatus.description}
                      onChange={(e) => setNewStatus({ ...newStatus, description: e.target.value })}
                      placeholder="Краткое описание статуса"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={newStatus.isActive}
                      onCheckedChange={(checked) => setNewStatus({ ...newStatus, isActive: checked })}
                    />
                    <Label htmlFor="isActive">Доступен для работы</Label>
                  </div>
                  <Button onClick={handleSaveStatus} className="w-full">
                    {editingStatus ? 'Сохранить изменения' : 'Создать статус'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {staffStatuses.map((status) => (
              <div key={status.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                  <div>
                    <div className="font-medium">{status.name}</div>
                    <div className="text-sm text-muted-foreground">{status.description}</div>
                  </div>
                  {status.isActive && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Активный
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditStatus(status)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteStatus(status.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactFieldsManager;