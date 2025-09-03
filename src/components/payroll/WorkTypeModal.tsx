import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkType } from "@/data/payrollData";

interface WorkTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workType?: WorkType;
  onSave: (workType: Omit<WorkType, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const unitOptions = [
  { value: "шт", label: "Штуки" },
  { value: "час", label: "Часы" },
  { value: "смена", label: "Смены" },
  { value: "выезд", label: "Выезды" },
  { value: "заказ", label: "Заказы" },
  { value: "клиент", label: "Клиенты" },
  { value: "проект", label: "Проекты" },
];

export const WorkTypeModal = ({ open, onOpenChange, workType, onSave }: WorkTypeModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    unit: "шт",
    pricePerUnit: 0,
    description: "",
    isActive: true,
  });

  useEffect(() => {
    if (workType) {
      setFormData({
        name: workType.name,
        unit: workType.unit,
        pricePerUnit: workType.pricePerUnit,
        description: workType.description || "",
        isActive: workType.isActive,
      });
    } else {
      setFormData({
        name: "",
        unit: "шт",
        pricePerUnit: 0,
        description: "",
        isActive: true,
      });
    }
  }, [workType, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {workType ? "Редактировать вид работы" : "Создать вид работы"}
          </DialogTitle>
          <DialogDescription>
            Укажите название, единицу измерения и стоимость за единицу работы
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Например: Принятый звонок"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unit">Единица измерения *</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Цена за единицу (₽) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerUnit}
                onChange={(e) => setFormData(prev => ({ ...prev, pricePerUnit: parseFloat(e.target.value) || 0 }))}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Краткое описание вида работы (необязательно)"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
            <Label htmlFor="active">Активен</Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit">
              {workType ? "Сохранить" : "Создать"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};