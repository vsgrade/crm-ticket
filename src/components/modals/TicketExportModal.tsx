import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Download, FileText, FileSpreadsheet, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TicketExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTickets?: string[];
}

const TicketExportModal = ({ open, onOpenChange, selectedTickets = [] }: TicketExportModalProps) => {
  const { toast } = useToast();
  
  const [exportFormat, setExportFormat] = useState('excel');
  const [exportScope, setExportScope] = useState('selected');
  const [exportTemplate, setExportTemplate] = useState('full');
  
  const [includeFields, setIncludeFields] = useState({
    id: true,
    subject: true,
    content: true,
    client: true,
    status: true,
    priority: true,
    assignedTo: true,
    createdAt: true,
    updatedAt: true,
    tags: true,
    attachments: false,
    comments: true,
    slaStatus: true,
    customFields: true
  });

  const exportFormats = [
    {
      id: 'excel',
      name: 'Excel (XLSX)',
      icon: FileSpreadsheet,
      description: 'Подходит для анализа данных'
    },
    {
      id: 'csv',
      name: 'CSV',
      icon: FileText,
      description: 'Для импорта в другие системы'
    },
    {
      id: 'pdf',
      name: 'PDF',
      icon: FileImage,
      description: 'Для печати и архивирования'
    }
  ];

  const exportTemplates = [
    {
      id: 'full',
      name: 'Полный отчет',
      description: 'Включает все доступные поля'
    },
    {
      id: 'summary',
      name: 'Краткий отчет',
      description: 'Основная информация о тикетах'
    },
    {
      id: 'analysis',
      name: 'Аналитический отчет',
      description: 'Данные для анализа производительности'
    },
    {
      id: 'custom',
      name: 'Настраиваемый',
      description: 'Выберите поля для экспорта'
    }
  ];

  const handleFieldChange = (field: keyof typeof includeFields, checked: boolean) => {
    setIncludeFields({ ...includeFields, [field]: checked });
  };

  const handleExport = () => {
    const selectedFieldsCount = Object.values(includeFields).filter(Boolean).length;
    const scopeText = exportScope === 'selected' 
      ? `${selectedTickets.length} выбранных тикетов`
      : 'всех тикетов';
    
    toast({
      title: "Экспорт запущен",
      description: `Экспорт ${scopeText} в формат ${exportFormat.toUpperCase()} с ${selectedFieldsCount} полями`,
    });
    
    // Здесь была бы реальная логика экспорта
    setTimeout(() => {
      toast({
        title: "Экспорт завершен",
        description: "Файл готов к скачиванию",
      });
    }, 2000);
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Экспорт тикетов
          </DialogTitle>
          <DialogDescription>
            Настройте параметры экспорта для получения нужных данных
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Левая колонка */}
          <div className="space-y-6">
            {/* Область экспорта */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Область экспорта</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={exportScope} onValueChange={setExportScope}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="selected" id="selected" />
                    <Label htmlFor="selected">
                      Выбранные тикеты ({selectedTickets.length})
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="filtered" id="filtered" />
                    <Label htmlFor="filtered">
                      Тикеты с текущими фильтрами
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">
                      Все тикеты
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Формат экспорта */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Формат файла</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {exportFormats.map((format) => (
                  <div
                    key={format.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      exportFormat === format.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setExportFormat(format.id)}
                  >
                    <div className="flex items-center gap-3">
                      <format.icon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{format.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {format.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Шаблон экспорта */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Шаблон экспорта</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={exportTemplate} onValueChange={setExportTemplate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {exportTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div>
                          <div>{template.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {template.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Правая колонка - выбор полей */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Поля для экспорта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(includeFields).map(([field, checked]) => {
                  const fieldLabels: Record<string, string> = {
                    id: 'ID тикета',
                    subject: 'Тема',
                    content: 'Содержание',
                    client: 'Клиент',
                    status: 'Статус',
                    priority: 'Приоритет',
                    assignedTo: 'Назначен на',
                    createdAt: 'Дата создания',
                    updatedAt: 'Дата обновления',
                    tags: 'Теги',
                    attachments: 'Вложения',
                    comments: 'Комментарии',
                    slaStatus: 'Статус SLA',
                    customFields: 'Кастомные поля'
                  };

                  return (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox
                        id={field}
                        checked={checked}
                        onCheckedChange={(checked) => 
                          handleFieldChange(field as keyof typeof includeFields, checked as boolean)
                        }
                        disabled={exportTemplate !== 'custom'}
                      />
                      <Label 
                        htmlFor={field}
                        className={exportTemplate !== 'custom' ? 'text-muted-foreground' : ''}
                      >
                        {fieldLabels[field]}
                      </Label>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Предварительный просмотр */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Предварительный просмотр</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Формат: {exportFormats.find(f => f.id === exportFormat)?.name}</p>
                  <p>Тикетов: {exportScope === 'selected' ? selectedTickets.length : 'Все'}</p>
                  <p>Полей: {Object.values(includeFields).filter(Boolean).length}</p>
                  <p>Размер: ~{Math.max(1, Math.floor(Object.values(includeFields).filter(Boolean).length * 0.5))} МБ</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Экспортировать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketExportModal;