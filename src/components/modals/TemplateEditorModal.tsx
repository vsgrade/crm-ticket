import { useState } from "react";
import { X, Save, FileText, Eye, Code, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface TemplateEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: {
    id?: string;
    name: string;
    category: string;
    type: string;
    content: string;
  };
}

export const TemplateEditorModal = ({ 
  open, 
  onOpenChange, 
  template 
}: TemplateEditorModalProps) => {
  const { toast } = useToast();
  
  const [templateData, setTemplateData] = useState({
    name: template?.name || "",
    category: template?.category || "Общие",
    type: template?.type || "Стандартный",
    content: template?.content || "",
    variables: ["{{имя_клиента}}", "{{номер_заказа}}", "{{дата}}"]
  });

  const categories = ["Общие", "Приветствие", "Информация", "Эскалация", "Доставка", "Закрытие"];
  const types = ["Стандартный", "Автоответ", "Внутренний", "Решение"];

  const predefinedVariables = [
    "{{имя_клиента}}",
    "{{email_клиента}}",
    "{{номер_тикета}}",
    "{{тема_тикета}}",
    "{{статус_тикета}}",
    "{{приоритет}}",
    "{{дата_создания}}",
    "{{имя_агента}}",
    "{{отдел}}",
    "{{номер_заказа}}",
    "{{дата}}",
    "{{время}}"
  ];

  const handleSave = () => {
    if (!templateData.name || !templateData.content) {
      toast({
        title: "Ошибка",
        description: "Заполните название и содержание шаблона",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Шаблон сохранен ✅",
      description: `Шаблон "${templateData.name}" успешно сохранен`,
    });
    
    onOpenChange(false);
  };

  const insertVariable = (variable: string) => {
    setTemplateData(prev => ({
      ...prev,
      content: prev.content + " " + variable
    }));
  };

  const renderPreview = () => {
    let preview = templateData.content;
    predefinedVariables.forEach(variable => {
      const placeholder = variable.replace(/[{}]/g, '').replace(/_/g, ' ');
      preview = preview.replace(new RegExp(variable.replace(/[{}]/g, '\\{\\}'), 'g'), `[${placeholder}]`);
    });
    return preview;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <FileText className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-xl font-semibold">
              {template?.id ? 'Редактировать шаблон' : 'Создать шаблон'}
            </h1>
            <p className="text-sm text-muted-foreground">
              Создание готового ответа для быстрой отправки
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Сохранить
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-2">
            <X className="h-4 w-4" />
            Отмена
          </Button>
        </div>
      </div>

      <div className="p-6 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основные настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">Название шаблона</Label>
                  <Input
                    id="name"
                    placeholder="Например: Приветствие нового клиента"
                    value={templateData.name}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Select 
                    value={templateData.category} 
                    onValueChange={(value) => setTemplateData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Тип</Label>
                  <Select 
                    value={templateData.type} 
                    onValueChange={(value) => setTemplateData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Содержание шаблона</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="editor" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="editor" className="gap-2">
                        <Code className="h-4 w-4" />
                        Редактор
                      </TabsTrigger>
                      <TabsTrigger value="preview" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Предварительный просмотр
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="editor">
                      <Textarea
                        placeholder="Введите текст шаблона..."
                        value={templateData.content}
                        onChange={(e) => setTemplateData(prev => ({ ...prev, content: e.target.value }))}
                        className="min-h-[300px] resize-none"
                      />
                    </TabsContent>
                    
                    <TabsContent value="preview">
                      <div className="min-h-[300px] p-4 border border-border rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2 mb-4">
                          <MessageCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Предварительный просмотр
                          </span>
                        </div>
                        <div className="whitespace-pre-wrap text-sm">
                          {renderPreview() || "Введите текст шаблона для предварительного просмотра..."}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Переменные</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Нажмите на переменную, чтобы добавить её в шаблон
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {predefinedVariables.map((variable) => (
                      <Button
                        key={variable}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs"
                        onClick={() => insertVariable(variable)}
                      >
                        {variable}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditorModal;