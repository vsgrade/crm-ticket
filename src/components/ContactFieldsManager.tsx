import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Phone, Mail, MapPin, Building, User, Calendar } from 'lucide-react';

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

  const [contactFields, setContactFields] = useState<ContactField[]>([
    { id: '1', name: 'Имя', type: 'text', required: true, icon: User, category: 'personal' },
    { id: '2', name: 'Email', type: 'email', required: true, icon: Mail, category: 'personal' },
    { id: '3', name: 'Телефон', type: 'phone', required: false, icon: Phone, category: 'personal' },
    { id: '4', name: 'Адрес', type: 'textarea', required: false, icon: MapPin, category: 'personal' },
    { id: '5', name: 'Компания', type: 'text', required: false, icon: Building, category: 'company' },
    { id: '6', name: 'Должность', type: 'text', required: false, icon: User, category: 'company' },
    { id: '7', name: 'Дата рождения', type: 'date', required: false, icon: Calendar, category: 'personal' }
  ]);

  const [staffStatuses, setStaffStatuses] = useState<StaffStatus[]>([
    { id: '1', name: 'Онлайн', color: '#10b981', description: 'Доступен для работы', isActive: true },
    { id: '2', name: 'Занят', color: '#f59e0b', description: 'Работает с клиентом', isActive: true },
    { id: '3', name: 'Отошел', color: '#6b7280', description: 'Временно недоступен', isActive: true },
    { id: '4', name: 'Обед', color: '#ef4444', description: 'На обеденном перерыве', isActive: true },
    { id: '5', name: 'Оффлайн', color: '#374151', description: 'Не на рабочем месте', isActive: false }
  ]);

  const handleSaveField = () => {
    if (editingField) {
      setContactFields(contactFields.map(field => 
        field.id === editingField.id 
          ? { ...editingField, ...newField, id: editingField.id, icon: editingField.icon }
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
    setContactFields(contactFields.filter(field => field.id !== id));
  };

  const handleDeleteStatus = (id: string) => {
    setStaffStatuses(staffStatuses.filter(status => status.id !== id));
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

  return (
    <div className="space-y-6">
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
                    const IconComponent = field.icon;
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
    </div>
  );
};

export default ContactFieldsManager;