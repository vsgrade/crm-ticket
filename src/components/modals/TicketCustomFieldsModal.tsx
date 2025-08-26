import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox';
  required: boolean;
  options?: string[];
  value?: any;
}

interface TicketCustomFieldsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId?: string;
}

const TicketCustomFieldsModal = ({ open, onOpenChange, ticketId }: TicketCustomFieldsModalProps) => {
  const { toast } = useToast();
  
  // Демо кастомные поля
  const [customFields, setCustomFields] = useState<CustomField[]>([
    {
      id: '1',
      name: 'Версия продукта',
      type: 'select',
      required: true,
      options: ['v1.0', 'v1.1', 'v2.0', 'v2.1'],
      value: 'v2.0'
    },
    {
      id: '2',
      name: 'Приоритет бизнеса',
      type: 'select',
      required: false,
      options: ['Низкий', 'Средний', 'Высокий', 'Критический'],
      value: 'Средний'
    },
    {
      id: '3',
      name: 'Затраченное время (часы)',
      type: 'number',
      required: false,
      value: 2.5
    },
    {
      id: '4',
      name: 'Детали ошибки',
      type: 'textarea',
      required: false,
      value: 'Подробное описание проблемы...'
    },
    {
      id: '5',
      name: 'Решение найдено',
      type: 'checkbox',
      required: false,
      value: true
    }
  ]);

  const [newField, setNewField] = useState<Partial<CustomField>>({
    name: '',
    type: 'text',
    required: false,
    options: []
  });

  const handleAddField = () => {
    if (!newField.name) return;
    
    const field: CustomField = {
      id: Date.now().toString(),
      name: newField.name,
      type: newField.type || 'text',
      required: newField.required || false,
      options: newField.options || []
    };
    
    setCustomFields([...customFields, field]);
    setNewField({ name: '', type: 'text', required: false, options: [] });
    
    toast({
      title: "Поле добавлено",
      description: `Кастомное поле "${field.name}" успешно создано`,
    });
  };

  const handleRemoveField = (fieldId: string) => {
    setCustomFields(customFields.filter(f => f.id !== fieldId));
    toast({
      title: "Поле удалено",
      description: "Кастомное поле было удалено",
    });
  };

  const handleUpdateFieldValue = (fieldId: string, value: any) => {
    setCustomFields(customFields.map(field => 
      field.id === fieldId ? { ...field, value } : field
    ));
  };

  const renderFieldInput = (field: CustomField) => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={field.value || ''}
            onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
            placeholder={`Введите ${field.name.toLowerCase()}`}
          />
        );
      case 'textarea':
        return (
          <Textarea
            value={field.value || ''}
            onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
            placeholder={`Введите ${field.name.toLowerCase()}`}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={field.value || ''}
            onChange={(e) => handleUpdateFieldValue(field.id, Number(e.target.value))}
            placeholder={`Введите ${field.name.toLowerCase()}`}
          />
        );
      case 'select':
        return (
          <Select
            value={field.value || ''}
            onValueChange={(value) => handleUpdateFieldValue(field.id, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Выберите ${field.name.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={field.value || false}
              onCheckedChange={(checked) => handleUpdateFieldValue(field.id, checked)}
            />
            <Label>{field.value ? 'Да' : 'Нет'}</Label>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSave = () => {
    toast({
      title: "Поля сохранены",
      description: "Кастомные поля тикета успешно обновлены",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Кастомные поля тикета
          </DialogTitle>
          <DialogDescription>
            Управление дополнительными полями для расширения информации о тикете
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Существующие поля */}
          <div className="space-y-4">
            <h3 className="font-semibold">Текущие поля</h3>
            
            {customFields.map((field) => (
              <Card key={field.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {field.name}
                      {field.required && <span className="text-destructive">*</span>}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive"
                      onClick={() => handleRemoveField(field.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {renderFieldInput(field)}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Добавление нового поля */}
          <div className="space-y-4">
            <h3 className="font-semibold">Добавить новое поле</h3>
            
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label>Название поля</Label>
                  <Input
                    value={newField.name || ''}
                    onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                    placeholder="Например: Номер версии"
                  />
                </div>

                <div>
                  <Label>Тип поля</Label>
                  <Select
                    value={newField.type || 'text'}
                    onValueChange={(value) => setNewField({ ...newField, type: value as CustomField['type'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Текст</SelectItem>
                      <SelectItem value="textarea">Многострочный текст</SelectItem>
                      <SelectItem value="number">Число</SelectItem>
                      <SelectItem value="select">Список</SelectItem>
                      <SelectItem value="checkbox">Флажок</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newField.type === 'select' && (
                  <div>
                    <Label>Варианты (через запятую)</Label>
                    <Input
                      placeholder="Вариант 1, Вариант 2, Вариант 3"
                      onChange={(e) => setNewField({ 
                        ...newField, 
                        options: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newField.required || false}
                    onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                  />
                  <Label>Обязательное поле</Label>
                </div>

                <Button onClick={handleAddField} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить поле
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSave}>
            Сохранить изменения
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketCustomFieldsModal;