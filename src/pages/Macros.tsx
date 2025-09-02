import { useState } from "react";
import { Zap, Plus, Play, Edit, Trash2, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MacroEditorModal } from "@/components/modals/MacroEditorModal";
import { useToast } from "@/hooks/use-toast";

const Macros = () => {
  const { toast } = useToast();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingMacro, setEditingMacro] = useState<any>(null);
  
  const macros = [
    {
      name: "Стандартное приветствие",
      trigger: "greeting",
      actions: ["Отправить шаблон приветствия", "Установить статус 'В работе'"],
      usageCount: 847,
      lastUsed: "2 часа назад",
      category: "Общие"
    },
    {
      name: "Эскалация в отдел",
      trigger: "escalate_tech",
      actions: ["Переназначить в Тех. отдел", "Изменить приоритет на 'Высокий'", "Уведомить менеджера"],
      usageCount: 234,
      lastUsed: "15 минут назад",
      category: "Эскалация"
    },
    {
      name: "Закрытие решенного тикета",
      trigger: "close_resolved",
      actions: ["Отправить опрос удовлетворенности", "Закрыть тикет", "Обновить базу знаний"],
      usageCount: 1523,
      lastUsed: "1 час назад",
      category: "Закрытие"
    },
    {
      name: "Запрос дополнительной информации",
      trigger: "need_info",
      actions: ["Отправить шаблон запроса информации", "Установить статус 'Ожидание клиента'"],
      usageCount: 692,
      lastUsed: "30 минут назад",
      category: "Информация"
    }
  ];

  const categories = ["Все", "Общие", "Эскалация", "Закрытие", "Информация"];

  const handleCreateMacro = () => {
    setEditingMacro(null);
    setIsEditorOpen(true);
  };

  const handleEditMacro = (macro: any) => {
    setEditingMacro(macro);
    setIsEditorOpen(true);
  };

  const handleRunMacro = (macroName: string) => {
    toast({
      title: "Макрос выполнен ✅",
      description: `Макрос "${macroName}" успешно выполнен`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Макросы</h1>
            <p className="text-muted-foreground">Автоматизация повторяющихся действий</p>
          </div>
        </div>
        <Button onClick={handleCreateMacro}>
          <Plus className="h-4 w-4 mr-2" />
          Создать макрос
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Активных макросов</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Play className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">3,296</div>
                <div className="text-sm text-muted-foreground">Выполнений сегодня</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">2.3 ч</div>
                <div className="text-sm text-muted-foreground">Сэкономлено времени</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Zap className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-muted-foreground">Успешность выполнения</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Список макросов</CardTitle>
            <div className="flex items-center gap-2">
              <Input placeholder="Поиск макросов..." className="w-64" />
              <div className="flex gap-1">
                {categories.map((category) => (
                  <Button 
                    key={category} 
                    variant={category === "Все" ? "default" : "outline"} 
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Триггер</TableHead>
                <TableHead>Действия</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Использований</TableHead>
                <TableHead>Последнее использование</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {macros.map((macro, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{macro.name}</TableCell>
                  <TableCell>
                    <code className="bg-accent/50 px-2 py-1 rounded text-sm">{macro.trigger}</code>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {macro.actions.slice(0, 2).map((action, i) => (
                        <div key={i} className="text-xs text-muted-foreground">{action}</div>
                      ))}
                      {macro.actions.length > 2 && (
                        <div className="text-xs text-muted-foreground">+{macro.actions.length - 2} еще</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{macro.category}</Badge>
                  </TableCell>
                  <TableCell>{macro.usageCount.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{macro.lastUsed}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleRunMacro(macro.name)}
                        title="Выполнить макрос"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleEditMacro(macro)}
                        title="Редактировать макрос"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        title="Удалить макрос"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MacroEditorModal 
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        macro={editingMacro}
      />
    </div>
  );
};

export default Macros;