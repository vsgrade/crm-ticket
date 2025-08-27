import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Search, Filter, Star, Clock, User, Tag } from 'lucide-react';

interface SavedFilter {
  id: string;
  name: string;
  description: string;
  filters: {
    status?: string[];
    priority?: string[];
    department?: string[];
    assignee?: string[];
    dateRange?: {
      start: string;
      end: string;
    };
    tags?: string[];
    customFields?: Record<string, any>;
  };
  isPublic: boolean;
  isFavorite: boolean;
  createdBy: string;
  createdAt: string;
  usageCount: number;
}

const SavedFiltersManager = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingFilter, setEditingFilter] = useState<SavedFilter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [newFilter, setNewFilter] = useState({
    name: '',
    description: '',
    filters: {
      status: [] as string[],
      priority: [] as string[],
      department: [] as string[],
      assignee: [] as string[],
      dateRange: { start: '', end: '' },
      tags: [] as string[],
      customFields: {} as Record<string, any>
    },
    isPublic: false,
    isFavorite: false
  });

  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([
    {
      id: '1',
      name: 'Высокоприоритетные тикеты',
      description: 'Тикеты с высоким и критическим приоритетом',
      filters: {
        priority: ['high', 'critical'],
        status: ['new', 'in-progress']
      },
      isPublic: true,
      isFavorite: true,
      createdBy: 'Анна Иванова',
      createdAt: '2024-01-15',
      usageCount: 45
    },
    {
      id: '2',
      name: 'Мои открытые тикеты',
      description: 'Тикеты, назначенные на меня и не закрытые',
      filters: {
        assignee: ['current-user'],
        status: ['new', 'in-progress', 'waiting']
      },
      isPublic: false,
      isFavorite: true,
      createdBy: 'Михаил Петров',
      createdAt: '2024-01-10',
      usageCount: 120
    },
    {
      id: '3',
      name: 'Технические проблемы',
      description: 'Тикеты технической поддержки за последнюю неделю',
      filters: {
        department: ['technical-support'],
        dateRange: { start: '2024-01-15', end: '2024-01-22' },
        tags: ['bug', 'technical']
      },
      isPublic: true,
      isFavorite: false,
      createdBy: 'Елена Сидорова',
      createdAt: '2024-01-12',
      usageCount: 28
    }
  ]);

  const statusOptions = [
    { value: 'new', label: 'Новый' },
    { value: 'in-progress', label: 'В работе' },
    { value: 'waiting', label: 'Ожидание' },
    { value: 'resolved', label: 'Решен' },
    { value: 'closed', label: 'Закрыт' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Низкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'high', label: 'Высокий' },
    { value: 'critical', label: 'Критический' }
  ];

  const departmentOptions = [
    { value: 'technical-support', label: 'Техническая поддержка' },
    { value: 'sales', label: 'Продажи' },
    { value: 'billing', label: 'Биллинг' },
    { value: 'general', label: 'Общие вопросы' }
  ];

  const handleSaveFilter = () => {
    if (editingFilter) {
      setSavedFilters(savedFilters.map(filter => 
        filter.id === editingFilter.id 
          ? { 
              ...editingFilter, 
              ...newFilter,
              createdAt: editingFilter.createdAt,
              createdBy: editingFilter.createdBy,
              usageCount: editingFilter.usageCount
            }
          : filter
      ));
      setEditingFilter(null);
    } else {
      const newId = Date.now().toString();
      setSavedFilters([...savedFilters, {
        ...newFilter,
        id: newId,
        createdBy: 'Текущий пользователь',
        createdAt: new Date().toISOString().split('T')[0],
        usageCount: 0
      }]);
    }
    setIsCreateModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewFilter({
      name: '',
      description: '',
      filters: {
        status: [],
        priority: [],
        department: [],
        assignee: [],
        dateRange: { start: '', end: '' },
        tags: [],
        customFields: {}
      },
      isPublic: false,
      isFavorite: false
    });
  };

  const handleEditFilter = (filter: SavedFilter) => {
    setEditingFilter(filter);
    setNewFilter({
      name: filter.name,
      description: filter.description,
      filters: {
        status: filter.filters.status ?? [],
        priority: filter.filters.priority ?? [],
        department: filter.filters.department ?? [],
        assignee: filter.filters.assignee ?? [],
        dateRange: {
          start: filter.filters.dateRange?.start ?? '',
          end: filter.filters.dateRange?.end ?? ''
        },
        tags: filter.filters.tags ?? [],
        customFields: filter.filters.customFields ?? {}
      },
      isPublic: filter.isPublic,
      isFavorite: filter.isFavorite
    });
    setIsCreateModalOpen(true);
  };

  const handleDeleteFilter = (id: string) => {
    setSavedFilters(savedFilters.filter(filter => filter.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setSavedFilters(savedFilters.map(filter => 
      filter.id === id 
        ? { ...filter, isFavorite: !filter.isFavorite }
        : filter
    ));
  };

  const handleApplyFilter = (filter: SavedFilter) => {
    // Increment usage count
    setSavedFilters(savedFilters.map(f => 
      f.id === filter.id 
        ? { ...f, usageCount: f.usageCount + 1 }
        : f
    ));
    
    console.log('Applying filter:', filter);
    // Here you would apply the filter to your tickets table
  };

  const filteredFilters = savedFilters.filter(filter =>
    filter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    filter.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilterSummary = (filters: SavedFilter['filters']) => {
    const parts = [];
    
    if (filters.status?.length) {
      parts.push(`Статус: ${filters.status.length} выбрано`);
    }
    if (filters.priority?.length) {
      parts.push(`Приоритет: ${filters.priority.length} выбрано`);
    }
    if (filters.department?.length) {
      parts.push(`Департамент: ${filters.department.length} выбрано`);
    }
    if (filters.dateRange?.start && filters.dateRange?.end) {
      parts.push(`Период: ${filters.dateRange.start} - ${filters.dateRange.end}`);
    }
    if (filters.tags?.length) {
      parts.push(`Теги: ${filters.tags.length} выбрано`);
    }
    
    return parts.join(', ') || 'Без фильтров';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Сохраненные фильтры</h2>
          <p className="text-muted-foreground">Управление предустановленными фильтрами для тикетов</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Создать фильтр
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingFilter ? 'Редактировать фильтр' : 'Новый сохраненный фильтр'}
              </DialogTitle>
              <DialogDescription>
                Настройте критерии фильтрации для быстрого поиска тикетов
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Название фильтра</Label>
                  <Input
                    value={newFilter.name}
                    onChange={(e) => setNewFilter({ ...newFilter, name: e.target.value })}
                    placeholder="Например: Срочные задачи"
                  />
                </div>
                <div>
                  <Label>Описание</Label>
                  <Input
                    value={newFilter.description}
                    onChange={(e) => setNewFilter({ ...newFilter, description: e.target.value })}
                    placeholder="Краткое описание фильтра"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Критерии фильтрации</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Статус</Label>
                    <div className="space-y-2 mt-2">
                      {statusOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`status-${option.value}`}
                            checked={newFilter.filters.status.includes(option.value)}
                            onChange={(e) => {
                              const status = newFilter.filters.status;
                              if (e.target.checked) {
                                setNewFilter({
                                  ...newFilter,
                                  filters: { ...newFilter.filters, status: [...status, option.value] }
                                });
                              } else {
                                setNewFilter({
                                  ...newFilter,
                                  filters: { ...newFilter.filters, status: status.filter(s => s !== option.value) }
                                });
                              }
                            }}
                          />
                          <Label htmlFor={`status-${option.value}`}>{option.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Приоритет</Label>
                    <div className="space-y-2 mt-2">
                      {priorityOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`priority-${option.value}`}
                            checked={newFilter.filters.priority.includes(option.value)}
                            onChange={(e) => {
                              const priority = newFilter.filters.priority;
                              if (e.target.checked) {
                                setNewFilter({
                                  ...newFilter,
                                  filters: { ...newFilter.filters, priority: [...priority, option.value] }
                                });
                              } else {
                                setNewFilter({
                                  ...newFilter,
                                  filters: { ...newFilter.filters, priority: priority.filter(p => p !== option.value) }
                                });
                              }
                            }}
                          />
                          <Label htmlFor={`priority-${option.value}`}>{option.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Департамент</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {departmentOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`dept-${option.value}`}
                          checked={newFilter.filters.department.includes(option.value)}
                          onChange={(e) => {
                            const department = newFilter.filters.department;
                            if (e.target.checked) {
                              setNewFilter({
                                ...newFilter,
                                filters: { ...newFilter.filters, department: [...department, option.value] }
                              });
                            } else {
                              setNewFilter({
                                ...newFilter,
                                filters: { ...newFilter.filters, department: department.filter(d => d !== option.value) }
                              });
                            }
                          }}
                        />
                        <Label htmlFor={`dept-${option.value}`}>{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Дата начала</Label>
                    <Input
                      type="date"
                      value={newFilter.filters.dateRange.start}
                      onChange={(e) => setNewFilter({
                        ...newFilter,
                        filters: { 
                          ...newFilter.filters, 
                          dateRange: { ...newFilter.filters.dateRange, start: e.target.value }
                        }
                      })}
                    />
                  </div>
                  <div>
                    <Label>Дата окончания</Label>
                    <Input
                      type="date"
                      value={newFilter.filters.dateRange.end}
                      onChange={(e) => setNewFilter({
                        ...newFilter,
                        filters: { 
                          ...newFilter.filters, 
                          dateRange: { ...newFilter.filters.dateRange, end: e.target.value }
                        }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Теги (через запятую)</Label>
                  <Input
                    value={newFilter.filters.tags.join(', ')}
                    onChange={(e) => setNewFilter({
                      ...newFilter,
                      filters: { 
                        ...newFilter.filters, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                      }
                    })}
                    placeholder="bug, urgent, customer"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPublic"
                    checked={newFilter.isPublic}
                    onCheckedChange={(checked) => setNewFilter({ ...newFilter, isPublic: checked })}
                  />
                  <Label htmlFor="isPublic">Публичный фильтр (доступен всем пользователям)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFavorite"
                    checked={newFilter.isFavorite}
                    onCheckedChange={(checked) => setNewFilter({ ...newFilter, isFavorite: checked })}
                  />
                  <Label htmlFor="isFavorite">Добавить в избранное</Label>
                </div>
              </div>

              <Button onClick={handleSaveFilter} className="w-full">
                {editingFilter ? 'Сохранить изменения' : 'Создать фильтр'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Поиск фильтров</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию или описанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredFilters.map((filter) => (
          <Card key={filter.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{filter.name}</CardTitle>
                    {filter.isFavorite && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                    {filter.isPublic && (
                      <Badge variant="secondary">Публичный</Badge>
                    )}
                  </div>
                  <CardDescription>{filter.description}</CardDescription>
                  <div className="text-sm text-muted-foreground">
                    {getFilterSummary(filter.filters)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleFavorite(filter.id)}
                  >
                    <Star className={`h-4 w-4 ${filter.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEditFilter(filter)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteFilter(filter.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{filter.createdBy}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{filter.createdAt}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Filter className="h-4 w-4" />
                    <span>Использован {filter.usageCount} раз</span>
                  </div>
                </div>
                <Button onClick={() => handleApplyFilter(filter)}>
                  Применить фильтр
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFilters.length === 0 && (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Фильтры не найдены</h3>
          <p className="text-muted-foreground">
            {searchQuery 
              ? 'Попробуйте изменить поисковый запрос'
              : 'Создайте ваш первый сохраненный фильтр'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedFiltersManager;