import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Settings,
  Eye,
  Lock,
  CheckCircle
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
}

const RoleManager = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Администратор',
      description: 'Полный доступ ко всем функциям системы',
      permissions: ['all'],
      userCount: 2
    },
    {
      id: '2',
      name: 'Менеджер',
      description: 'Управление тикетами и клиентами',
      permissions: ['tickets.view', 'tickets.edit', 'clients.view', 'clients.edit'],
      userCount: 5
    },
    {
      id: '3',
      name: 'Оператор',
      description: 'Просмотр и базовое редактирование тикетов',
      permissions: ['tickets.view', 'tickets.edit'],
      userCount: 12
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const permissions: Permission[] = [
    { id: 'tickets.view', name: 'Просмотр тикетов', category: 'Тикеты', description: 'Просмотр списка тикетов' },
    { id: 'tickets.edit', name: 'Редактирование тикетов', category: 'Тикеты', description: 'Создание и изменение тикетов' },
    { id: 'tickets.delete', name: 'Удаление тикетов', category: 'Тикеты', description: 'Удаление тикетов' },
    { id: 'clients.view', name: 'Просмотр клиентов', category: 'Клиенты', description: 'Просмотр базы клиентов' },
    { id: 'clients.edit', name: 'Редактирование клиентов', category: 'Клиенты', description: 'Создание и изменение клиентов' },
    { id: 'reports.view', name: 'Просмотр отчетов', category: 'Отчеты', description: 'Доступ к аналитике и отчетам' },
    { id: 'settings.manage', name: 'Управление настройками', category: 'Система', description: 'Изменение системных настроек' },
    { id: 'users.manage', name: 'Управление пользователями', category: 'Система', description: 'Управление пользователями и ролями' }
  ];

  const handleCreateRole = () => {
    if (newRole.name.trim()) {
      const role: Role = {
        id: Date.now().toString(),
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions,
        userCount: 0
      };
      setRoles([...roles, role]);
      setNewRole({ name: '', description: '', permissions: [] });
      setShowCreateForm(false);
    }
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setNewRole(prev => ({
        ...prev,
        permissions: [...prev.permissions, permissionId]
      }));
    } else {
      setNewRole(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p !== permissionId)
      }));
    }
  };

  const deleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const permissionsByCategory = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Роли пользователей</h3>
          <p className="text-sm text-muted-foreground">Управление ролями и правами доступа</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Создать роль
        </Button>
      </div>

      {/* Create Role Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Создание новой роли
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roleName">Название роли</Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Введите название роли"
                />
              </div>
              <div>
                <Label htmlFor="roleDescription">Описание</Label>
                <Textarea
                  id="roleDescription"
                  value={newRole.description}
                  onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Описание роли"
                />
              </div>
            </div>

            <div>
              <Label>Права доступа</Label>
              <div className="mt-2 space-y-4">
                {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
                  <div key={category}>
                    <h4 className="font-medium text-sm mb-2">{category}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={newRole.permissions.includes(permission.id)}
                            onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                          />
                          <Label 
                            htmlFor={permission.id} 
                            className="text-sm font-normal cursor-pointer"
                            title={permission.description}
                          >
                            {permission.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Отмена
              </Button>
              <Button onClick={handleCreateRole}>
                Создать роль
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Roles */}
      <div className="grid gap-4">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">{role.name}</h4>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {role.userCount}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.includes('all') ? (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Все права
                      </Badge>
                    ) : (
                      role.permissions.map((permissionId) => {
                        const permission = permissions.find(p => p.id === permissionId);
                        return permission ? (
                          <Badge key={permissionId} variant="outline">
                            {permission.name}
                          </Badge>
                        ) : null;
                      })
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteRole(role.id)}
                    disabled={role.name === 'Администратор'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleManager;
