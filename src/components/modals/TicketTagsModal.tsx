import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Tag, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TicketTagsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId?: string;
  currentTags?: string[];
}

const TicketTagsModal = ({ open, onOpenChange, ticketId, currentTags = [] }: TicketTagsModalProps) => {
  const { toast } = useToast();
  
  // Демо популярные теги
  const [popularTags] = useState([
    'багфикс', 'новая функция', 'срочно', 'ui/ux', 'backend', 
    'frontend', 'api', 'база данных', 'безопасность', 'тестирование',
    'документация', 'интеграция', 'производительность', 'mobile'
  ]);

  const [selectedTags, setSelectedTags] = useState<string[]>(currentTags);
  const [newTag, setNewTag] = useState('');

  // Группировка тегов по категориям
  const tagCategories = {
    'Тип': ['багфикс', 'новая функция', 'улучшение', 'документация'],
    'Приоритет': ['срочно', 'важно', 'позже', 'критично'],
    'Область': ['frontend', 'backend', 'api', 'база данных', 'ui/ux'],
    'Статус': ['в работе', 'на проверке', 'готово', 'отложено']
  };

  const handleAddTag = (tag: string) => {
    const normalizedTag = tag.toLowerCase().trim();
    if (normalizedTag && !selectedTags.includes(normalizedTag)) {
      setSelectedTags([...selectedTags, normalizedTag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleAddNewTag = () => {
    if (newTag.trim()) {
      handleAddTag(newTag);
      setNewTag('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddNewTag();
    }
  };

  const getTagColor = (tag: string): string => {
    // Определяем цвет тега на основе его содержания
    if (tag.includes('срочно') || tag.includes('критично')) return 'destructive';
    if (tag.includes('багфикс') || tag.includes('ошибка')) return 'secondary';
    if (tag.includes('функция') || tag.includes('новое')) return 'default';
    if (tag.includes('ui') || tag.includes('дизайн')) return 'outline';
    return 'outline';
  };

  const handleSave = () => {
    toast({
      title: "Теги обновлены",
      description: `Для тикета установлено ${selectedTags.length} тегов`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Управление тегами тикета
          </DialogTitle>
          <DialogDescription>
            Добавьте теги для лучшей категоризации и поиска тикетов
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Текущие теги */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Выбранные теги ({selectedTags.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant={getTagColor(tag) as any}
                      className="pr-1"
                    >
                      {tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-destructive/20"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Теги не выбраны</p>
              )}
            </CardContent>
          </Card>

          {/* Добавление нового тега */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Добавить новый тег</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Введите название тега..."
                  onKeyPress={handleKeyPress}
                />
                <Button onClick={handleAddNewTag} disabled={!newTag.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Популярные теги по категориям */}
          <div className="space-y-4">
            {Object.entries(tagCategories).map(([category, tags]) => (
              <Card key={category}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/20"
                        onClick={() => 
                          selectedTags.includes(tag) 
                            ? handleRemoveTag(tag)
                            : handleAddTag(tag)
                        }
                      >
                        {selectedTags.includes(tag) && <X className="h-3 w-3 mr-1" />}
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Все популярные теги */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Популярные теги</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags
                  .filter(tag => !Object.values(tagCategories).flat().includes(tag))
                  .map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/20"
                      onClick={() => 
                        selectedTags.includes(tag) 
                          ? handleRemoveTag(tag)
                          : handleAddTag(tag)
                      }
                    >
                      {selectedTags.includes(tag) && <X className="h-3 w-3 mr-1" />}
                      {tag}
                    </Badge>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSave}>
            Сохранить теги
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketTagsModal;