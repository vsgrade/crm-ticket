import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Plus,
  Save, 
  BarChart3, 
  PieChart,
  LineChart,
  Filter,
  Download,
  Calendar as CalendarIcon,
  Target,
  Users,
  MessageSquare,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ReportConfig {
  id?: string;
  name: string;
  description: string;
  type: 'overview' | 'tickets' | 'staff' | 'sla' | 'custom';
  chartType: 'bar' | 'line' | 'pie' | 'table';
  metrics: string[];
  filters: {
    dateRange: { from: Date; to: Date };
    departments: string[];
    statuses: string[];
    priorities: string[];
  };
  groupBy: string;
  sortBy: string;
  exportFormats: string[];
}

interface ReportBuilderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report?: ReportConfig | null;
  onSave: (report: ReportConfig) => void;
}

const ReportBuilderModal: React.FC<ReportBuilderModalProps> = ({
  open,
  onOpenChange,
  report,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ReportConfig>({
    name: '',
    description: '',
    type: 'custom',
    chartType: 'bar',
    metrics: [],
    filters: {
      dateRange: { from: new Date(), to: new Date() },
      departments: [],
      statuses: [],
      priorities: []
    },
    groupBy: 'day',
    sortBy: 'date',
    exportFormats: ['excel']
  });

  const availableMetrics = [
    { id: 'total_tickets', name: 'Общее количество тикетов', icon: MessageSquare },
    { id: 'resolved_tickets', name: 'Решенные тикеты', icon: Target },
    { id: 'avg_resolution_time', name: 'Среднее время решения', icon: Clock },
    { id: 'sla_compliance', name: 'Соблюдение SLA', icon: TrendingUp },
    { id: 'customer_satisfaction', name: 'Удовлетворенность клиентов', icon: Users },
    { id: 'staff_productivity', name: 'Производительность сотрудников', icon: BarChart3 },
    { id: 'response_time', name: 'Время первого ответа', icon: Clock },
    { id: 'escalation_rate', name: 'Процент эскалаций', icon: TrendingUp }
  ];

  const departments = [
    { id: 'support', name: 'Техподдержка' },
    { id: 'sales', name: 'Продажи' },
    { id: 'billing', name: 'Бухгалтерия' },
    { id: 'hr', name: 'HR' }
  ];

  const statuses = [
    { id: 'open', name: 'Открыт' },
    { id: 'in_progress', name: 'В работе' },
    { id: 'resolved', name: 'Решен' },
    { id: 'closed', name: 'Закрыт' }
  ];

  const priorities = [
    { id: 'low', name: 'Низкий' },
    { id: 'medium', name: 'Средний' },
    { id: 'high', name: 'Высокий' },
    { id: 'urgent', name: 'Критический' }
  ];

  const handleMetricToggle = (metricId: string) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter(m => m !== metricId)
        : [...prev.metrics, metricId]
    }));
  };

  const handleFilterToggle = (filterType: keyof typeof formData.filters, value: string) => {
    if (filterType === 'dateRange') return;
    
    setFormData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: (prev.filters[filterType] as string[]).includes(value)
          ? (prev.filters[filterType] as string[]).filter(v => v !== value)
          : [...(prev.filters[filterType] as string[]), value]
      }
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Ошибка",
        description: "Название отчета обязательно",
        variant: "destructive"
      });
      return;
    }

    if (formData.metrics.length === 0) {
      toast({
        title: "Ошибка",
        description: "Выберите хотя бы одну метрику",
        variant: "destructive"
      });
      return;
    }

    const reportToSave: ReportConfig = {
      ...formData,
      id: formData.id || Date.now().toString()
    };

    onSave(reportToSave);
    
    toast({
      title: "Отчет сохранен",
      description: `Настраиваемый отчет "${formData.name}" создан`,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Конструктор отчетов
          </DialogTitle>
          <DialogDescription>
            Создайте настраиваемый отчет с нужными метриками и фильтрами
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Основное</TabsTrigger>
            <TabsTrigger value="metrics">Метрики</TabsTrigger>
            <TabsTrigger value="filters">Фильтры</TabsTrigger>
            <TabsTrigger value="display">Отображение</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Название отчета</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Мой настраиваемый отчет"
                />
              </div>
              <div>
                <Label htmlFor="type">Тип отчета</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Обзорный</SelectItem>
                    <SelectItem value="tickets">По тикетам</SelectItem>
                    <SelectItem value="staff">По сотрудникам</SelectItem>
                    <SelectItem value="sla">SLA отчет</SelectItem>
                    <SelectItem value="custom">Настраиваемый</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Краткое описание отчета"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Тип диаграммы</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { value: 'bar', label: 'Столбчатая', icon: BarChart3 },
                    { value: 'line', label: 'Линейная', icon: LineChart },
                    { value: 'pie', label: 'Круговая', icon: PieChart },
                    { value: 'table', label: 'Таблица', icon: Filter }
                  ].map((chart) => {
                    const Icon = chart.icon;
                    return (
                      <Button
                        key={chart.value}
                        variant={formData.chartType === chart.value ? 'default' : 'outline'}
                        onClick={() => setFormData(prev => ({ ...prev, chartType: chart.value as any }))}
                        className="h-16 flex flex-col gap-1"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs">{chart.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <Label>Форматы экспорта</Label>
                <div className="space-y-2 mt-2">
                  {['excel', 'csv', 'pdf', 'json'].map((format) => (
                    <div key={format} className="flex items-center space-x-2">
                      <Checkbox
                        id={format}
                        checked={formData.exportFormats.includes(format)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData(prev => ({ ...prev, exportFormats: [...prev.exportFormats, format] }));
                          } else {
                            setFormData(prev => ({ ...prev, exportFormats: prev.exportFormats.filter(f => f !== format) }));
                          }
                        }}
                      />
                      <Label htmlFor={format} className="text-sm">
                        {format.toUpperCase()}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div>
              <Label>Выберите метрики для отображения</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {availableMetrics.map((metric) => {
                  const Icon = metric.icon;
                  const isSelected = formData.metrics.includes(metric.id);
                  return (
                    <Card 
                      key={metric.id} 
                      className={`cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}
                      onClick={() => handleMetricToggle(metric.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => {}}
                          />
                          <Icon className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium text-sm">{metric.name}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="mt-3">
                <Badge variant="outline">
                  Выбрано метрик: {formData.metrics.length}
                </Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="filters" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Период отчета</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {format(formData.filters.dateRange.from, "dd.MM.yyyy", { locale: ru })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={formData.filters.dateRange.from}
                        onSelect={(date) => date && setFormData(prev => ({
                          ...prev,
                          filters: { ...prev.filters, dateRange: { ...prev.filters.dateRange, from: date } }
                        }))}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {format(formData.filters.dateRange.to, "dd.MM.yyyy", { locale: ru })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={formData.filters.dateRange.to}
                        onSelect={(date) => date && setFormData(prev => ({
                          ...prev,
                          filters: { ...prev.filters, dateRange: { ...prev.filters.dateRange, to: date } }
                        }))}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label>Департаменты</Label>
                <div className="space-y-2 mt-2">
                  {departments.map((dept) => (
                    <div key={dept.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dept-${dept.id}`}
                        checked={formData.filters.departments.includes(dept.id)}
                        onCheckedChange={() => handleFilterToggle('departments', dept.id)}
                      />
                      <Label htmlFor={`dept-${dept.id}`} className="text-sm">{dept.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Статусы тикетов</Label>
                <div className="space-y-2 mt-2">
                  {statuses.map((status) => (
                    <div key={status.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status.id}`}
                        checked={formData.filters.statuses.includes(status.id)}
                        onCheckedChange={() => handleFilterToggle('statuses', status.id)}
                      />
                      <Label htmlFor={`status-${status.id}`} className="text-sm">{status.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Приоритеты</Label>
                <div className="space-y-2 mt-2">
                  {priorities.map((priority) => (
                    <div key={priority.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`priority-${priority.id}`}
                        checked={formData.filters.priorities.includes(priority.id)}
                        onCheckedChange={() => handleFilterToggle('priorities', priority.id)}
                      />
                      <Label htmlFor={`priority-${priority.id}`} className="text-sm">{priority.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="display" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Группировка данных</Label>
                <Select value={formData.groupBy} onValueChange={(value) => setFormData(prev => ({ ...prev, groupBy: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hour">По часам</SelectItem>
                    <SelectItem value="day">По дням</SelectItem>
                    <SelectItem value="week">По неделям</SelectItem>
                    <SelectItem value="month">По месяцам</SelectItem>
                    <SelectItem value="department">По департаментам</SelectItem>
                    <SelectItem value="status">По статусам</SelectItem>
                    <SelectItem value="priority">По приоритетам</SelectItem>
                    <SelectItem value="staff">По сотрудникам</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Сортировка</Label>
                <Select value={formData.sortBy} onValueChange={(value) => setFormData(prev => ({ ...prev, sortBy: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">По дате</SelectItem>
                    <SelectItem value="count">По количеству</SelectItem>
                    <SelectItem value="time">По времени</SelectItem>
                    <SelectItem value="name">По названию</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Предпросмотр отчета</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{formData.name || 'Название отчета'}</h3>
                    <p className="text-sm text-muted-foreground">{formData.description || 'Описание отчета'}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Тип: {formData.type}</Badge>
                    <Badge variant="outline">График: {formData.chartType}</Badge>
                    <Badge variant="outline">Метрик: {formData.metrics.length}</Badge>
                  </div>

                  <div className="text-sm">
                    <div className="font-medium">Выбранные метрики:</div>
                    <div className="text-muted-foreground">
                      {formData.metrics.length > 0 
                        ? formData.metrics.map(m => availableMetrics.find(am => am.id === m)?.name).join(', ')
                        : 'Метрики не выбраны'
                      }
                    </div>
                  </div>

                  <div className="text-sm">
                    <div className="font-medium">Активные фильтры:</div>
                    <div className="text-muted-foreground">
                      Департаменты: {formData.filters.departments.length > 0 ? formData.filters.departments.length : 'Все'} • 
                      Статусы: {formData.filters.statuses.length > 0 ? formData.filters.statuses.length : 'Все'} • 
                      Приоритеты: {formData.filters.priorities.length > 0 ? formData.filters.priorities.length : 'Все'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Сохранить отчет
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportBuilderModal;