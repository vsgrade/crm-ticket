import { useState } from "react";
import { X, Save, Zap, Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface MacroEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  macro?: {
    id?: string;
    name: string;
    trigger: string;
    category: string;
    actions: string[];
  };
}

export const MacroEditorModal = ({ 
  open, 
  onOpenChange, 
  macro 
}: MacroEditorModalProps) => {
  const { toast } = useToast();
  
  const [macroData, setMacroData] = useState({
    name: macro?.name || "",
    trigger: macro?.trigger || "",
    category: macro?.category || "Общие",
    actions: macro?.actions || [""]
  });

  const actionTypes = [
    "Отправить шаблон",
    "Установить статус",
    "Изменить приоритет",
    "Переназначить тикет",
    "Добавить тег",
    "Уведомить менеджера",
    "Обновить поле",
    "Закрыть тикет",
    "Отправить email",
    "Создать задачу"
  ];

  const categories = ["Общие", "Эскалация", "Закрытие", "Информация", "Уведомления"];

  const handleSave = () => {
    if (!macroData.name || !macroData.trigger) {
      toast({
        title: "Ошибка",
        description: "Заполните название и триггер макроса",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Макрос сохранен ✅",
      description: `Макрос "${macroData.name}" успешно сохранен`,
    });
    
    onOpenChange(false);
  };

  const addAction = () => {
    setMacroData(prev => ({
      ...prev,
      actions: [...prev.actions, ""]
    }));
  };

  const removeAction = (index: number) => {
    setMacroData(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }));
  };

  const updateAction = (index: number, value: string) => {
    setMacroData(prev => ({
      ...prev,
      actions: prev.actions.map((action, i) => i === index ? value : action)
    }));
  };

  const moveAction = (index: number, direction: 'up' | 'down') => {
    const newActions = [...macroData.actions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newActions.length) {
      [newActions[index], newActions[targetIndex]] = [newActions[targetIndex], newActions[index]];
      setMacroData(prev => ({ ...prev, actions: newActions }));
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Zap className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-xl font-semibold">
              {macro?.id ? 'Редактировать макрос' : 'Создать макрос'}
            </h1>
            <p className="text-sm text-muted-foreground">
              Настройка автоматических действий
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
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основные настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Название макроса</Label>
                  <Input
                    id="name"
                    placeholder="Например: Стандартное приветствие"
                    value={macroData.name}
                    onChange={(e) => setMacroData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="trigger">Триггер</Label>
                  <Input
                    id="trigger"
                    placeholder="greeting"
                    value={macroData.trigger}
                    onChange={(e) => setMacroData(prev => ({ ...prev, trigger: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Категория</Label>
                <Select 
                  value={macroData.category} 
                  onValueChange={(value) => setMacroData(prev => ({ ...prev, category: value }))}
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Действия макроса</CardTitle>
                <Button onClick={addAction} size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Добавить действие
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {macroData.actions.map((action, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 border border-border rounded-lg">
                    <Badge variant="outline" className="shrink-0">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <Select 
                        value={action} 
                        onValueChange={(value) => updateAction(index, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите действие" />
                        </SelectTrigger>
                        <SelectContent>
                          {actionTypes.map((actionType) => (
                            <SelectItem key={actionType} value={actionType}>
                              {actionType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveAction(index, 'up')}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveAction(index, 'down')}
                        disabled={index === macroData.actions.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeAction(index)}
                        disabled={macroData.actions.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MacroEditorModal;