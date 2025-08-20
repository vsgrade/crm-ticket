import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Filter, 
  Save, 
  Trash2, 
  Calendar as CalendarIcon,
  Search,
  X,
  Plus
} from "lucide-react";
import { mockDepartments, mockEmployees } from "@/data/mockData";

export interface TicketFilter {
  id?: string;
  name?: string;
  status?: string[];
  priority?: string[];
  departments?: string[];
  assignedTo?: string[];
  source?: string[];
  slaStatus?: string[];
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  search?: string;
}

interface TicketFiltersProps {
  onFilterChange: (filter: TicketFilter) => void;
  currentFilter: TicketFilter;
}

const TicketFilters = ({ onFilterChange, currentFilter }: TicketFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [savedFilters, setSavedFilters] = useState<TicketFilter[]>([
    { id: "1", name: "Новые важные тикеты", status: ["new"], priority: ["high", "critical"] },
    { id: "2", name: "Просроченные SLA", slaStatus: ["critical"] },
    { id: "3", name: "Мои тикеты", assignedTo: ["current_user"] }
  ]);

  const statusOptions = [
    { value: "new", label: "Новый" },
    { value: "in-progress", label: "В работе" },
    { value: "resolved", label: "Решен" },
    { value: "closed", label: "Закрыт" }
  ];

  const priorityOptions = [
    { value: "low", label: "Низкий" },
    { value: "medium", label: "Средний" },
    { value: "high", label: "Высокий" },
    { value: "critical", label: "Критический" }
  ];

  const sourceOptions = [
    { value: "telegram", label: "Telegram" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "whatsapp-business", label: "WhatsApp Business" },
    { value: "vk", label: "VK" },
    { value: "sms", label: "SMS" },
    { value: "email", label: "Email" },
    { value: "android", label: "Android" }
  ];

  const slaStatusOptions = [
    { value: "good", label: "В норме" },
    { value: "warning", label: "Скоро истечет" },
    { value: "critical", label: "Просрочен" }
  ];

  const updateFilter = (key: keyof TicketFilter, value: any) => {
    const newFilter = { ...currentFilter, [key]: value };
    onFilterChange(newFilter);
  };

  const toggleArrayValue = (key: keyof TicketFilter, value: string) => {
    const currentArray = (currentFilter[key] as string[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearFilter = (key: keyof TicketFilter) => {
    const newFilter = { ...currentFilter };
    delete newFilter[key];
    onFilterChange(newFilter);
  };

  const saveFilter = () => {
    if (!filterName.trim()) return;
    
    const newFilter = {
      ...currentFilter,
      id: Date.now().toString(),
      name: filterName
    };
    
    setSavedFilters([...savedFilters, newFilter]);
    setFilterName("");
    setSaveDialogOpen(false);
  };

  const loadFilter = (filter: TicketFilter) => {
    const { id, name, ...filterData } = filter;
    onFilterChange(filterData);
  };

  const deleteFilter = (filterId: string) => {
    setSavedFilters(savedFilters.filter(f => f.id !== filterId));
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (currentFilter.status?.length) count++;
    if (currentFilter.priority?.length) count++;
    if (currentFilter.departments?.length) count++;
    if (currentFilter.assignedTo?.length) count++;
    if (currentFilter.source?.length) count++;
    if (currentFilter.slaStatus?.length) count++;
    if (currentFilter.dateRange?.from || currentFilter.dateRange?.to) count++;
    if (currentFilter.search) count++;
    return count;
  };

  return (
    <div className="space-y-4">
      {/* Поиск и кнопка фильтров */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Поиск тикетов..." 
            className="pl-10"
            value={currentFilter.search || ""}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
          {getActiveFiltersCount() > 0 && (
            <Badge className="ml-2 h-5 w-5 p-0 text-xs">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>
      </div>

      {/* Сохраненные фильтры */}
      <div className="flex gap-2 flex-wrap">
        {savedFilters.map((filter) => (
          <Badge 
            key={filter.id}
            variant="outline" 
            className="cursor-pointer hover:bg-accent"
            onClick={() => loadFilter(filter)}
          >
            {filter.name}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20"
              onClick={(e) => {
                e.stopPropagation();
                deleteFilter(filter.id!);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-accent"
          onClick={() => onFilterChange({ assignedTo: ["current_user"] })}
        >
          Мои тикеты
        </Badge>
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Сохранить фильтр
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Сохранить фильтр</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="filterName">Название фильтра</Label>
                <Input
                  id="filterName"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="Введите название..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={saveFilter} disabled={!filterName.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Активные фильтры */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex gap-2 flex-wrap">
          {currentFilter.status?.map((status) => (
            <Badge key={status} variant="secondary">
              Статус: {statusOptions.find(s => s.value === status)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => toggleArrayValue("status", status)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {currentFilter.priority?.map((priority) => (
            <Badge key={priority} variant="secondary">
              Приоритет: {priorityOptions.find(p => p.value === priority)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => toggleArrayValue("priority", priority)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {currentFilter.search && (
            <Badge variant="secondary">
              Поиск: "{currentFilter.search}"
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => clearFilter("search")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange({})}
          >
            Очистить все
          </Button>
        </div>
      )}

      {/* Панель фильтров */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Расширенные фильтры</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Статус */}
              <div>
                <Label>Статус</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {statusOptions.map((option) => (
                    <Badge
                      key={option.value}
                      variant={currentFilter.status?.includes(option.value) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayValue("status", option.value)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Приоритет */}
              <div>
                <Label>Приоритет</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {priorityOptions.map((option) => (
                    <Badge
                      key={option.value}
                      variant={currentFilter.priority?.includes(option.value) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayValue("priority", option.value)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Департамент */}
              <div>
                <Label>Департамент</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mockDepartments.map((dept) => (
                    <Badge
                      key={dept.id}
                      variant={currentFilter.departments?.includes(dept.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayValue("departments", dept.id)}
                    >
                      {dept.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Назначен */}
              <div>
                <Label>Назначен</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mockEmployees.map((employee) => (
                    <Badge
                      key={employee.id}
                      variant={currentFilter.assignedTo?.includes(employee.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayValue("assignedTo", employee.id)}
                    >
                      {employee.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Источник */}
              <div>
                <Label>Источник</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sourceOptions.map((option) => (
                    <Badge
                      key={option.value}
                      variant={currentFilter.source?.includes(option.value) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayValue("source", option.value)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* SLA статус */}
              <div>
                <Label>SLA статус</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {slaStatusOptions.map((option) => (
                    <Badge
                      key={option.value}
                      variant={currentFilter.slaStatus?.includes(option.value) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayValue("slaStatus", option.value)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TicketFilters;