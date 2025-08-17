import { FileText, Plus, Edit, Trash2, Copy, Eye, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Templates = () => {
  const templates = [
    {
      name: "Приветствие нового клиента",
      category: "Приветствие",
      type: "Автоответ",
      content: "Здравствуйте! Спасибо за обращение. Мы получили ваш запрос и рассмотрим его в ближайшее время...",
      usageCount: 1247,
      lastModified: "2 дня назад"
    },
    {
      name: "Запрос дополнительной информации",
      category: "Информация",
      type: "Стандартный",
      content: "Для решения вашего вопроса нам необходима дополнительная информация. Пожалуйста, предоставьте...",
      usageCount: 892,
      lastModified: "1 неделя назад"
    },
    {
      name: "Эскалация в технический отдел",
      category: "Эскалация",
      type: "Внутренний",
      content: "Тикет требует внимания технического специалиста. Детали проблемы...",
      usageCount: 234,
      lastModified: "3 дня назад"
    },
    {
      name: "Решение проблемы с доставкой",
      category: "Доставка",
      type: "Решение",
      content: "По вашему вопросу о доставке: мы проверили статус заказа и готовы предложить решение...",
      usageCount: 567,
      lastModified: "5 дней назад"
    },
    {
      name: "Закрытие тикета с благодарностью",
      category: "Закрытие",
      type: "Автоответ",
      content: "Ваш вопрос был успешно решен. Спасибо за терпение! Если у вас есть дополнительные вопросы...",
      usageCount: 1856,
      lastModified: "1 день назад"
    }
  ];

  const categories = ["Все", "Приветствие", "Информация", "Эскалация", "Доставка", "Закрытие"];
  const types = ["Все типы", "Автоответ", "Стандартный", "Внутренний", "Решение"];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Шаблоны</h1>
            <p className="text-muted-foreground">Готовые шаблоны для быстрых ответов</p>
          </div>
          <Badge variant="secondary">23 шаблона</Badge>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Создать шаблон
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">23</div>
              <div className="text-sm text-muted-foreground">Всего шаблонов</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">4,796</div>
              <div className="text-sm text-muted-foreground">Использований за месяц</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">12</div>
              <div className="text-sm text-muted-foreground">Автоматических</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">85%</div>
              <div className="text-sm text-muted-foreground">Эффективность</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Библиотека шаблонов</CardTitle>
            <div className="flex items-center gap-2">
              <Input placeholder="Поиск шаблонов..." className="w-64" />
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Фильтры
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="list">Список</TabsTrigger>
                <TabsTrigger value="grid">Сетка</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
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

            <TabsContent value="list" className="space-y-4">
              {templates.map((template, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{template.name}</h3>
                          <Badge variant="outline">{template.category}</Badge>
                          <Badge variant={template.type === "Автоответ" ? "default" : "secondary"}>
                            {template.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {template.content}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Использований: {template.usageCount}</span>
                          <span>Изменен: {template.lastModified}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm">{template.name}</h3>
                          <Button size="sm" variant="ghost">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs">{template.category}</Badge>
                          <Badge variant="secondary" className="text-xs">{template.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-3">
                          {template.content}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{template.usageCount} исп.</span>
                          <span>{template.lastModified}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Templates;