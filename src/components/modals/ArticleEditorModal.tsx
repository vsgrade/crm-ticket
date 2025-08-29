import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Save, 
  Eye, 
  FileText, 
  Tag, 
  Users, 
  Calendar,
  Hash,
  Globe,
  Lock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Article {
  id?: string;
  title: string;
  content: string;
  categoryId: string;
  tags: string[];
  isPublic: boolean;
  allowComments: boolean;
  metaDescription: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  lastUpdated?: Date;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface ArticleEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article?: Article | null;
  categories: Category[];
  onSave: (article: Article) => void;
}

const ArticleEditorModal: React.FC<ArticleEditorModalProps> = ({
  open,
  onOpenChange,
  article,
  categories,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Article>({
    title: '',
    content: '',
    categoryId: '',
    tags: [],
    isPublic: true,
    allowComments: true,
    metaDescription: '',
    slug: '',
    status: 'draft',
    author: 'Текущий пользователь'
  });
  
  const [tagInput, setTagInput] = useState('');
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (article) {
      setFormData(article);
    } else {
      setFormData({
        title: '',
        content: '',
        categoryId: '',
        tags: [],
        isPublic: true,
        allowComments: true,
        metaDescription: '',
        slug: '',
        status: 'draft',
        author: 'Текущий пользователь'
      });
    }
  }, [article, open]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[а-я]/g, (char) => {
        const map: { [key: string]: string } = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
          'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
          'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
          'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        return map[char] || char;
      })
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Ошибка",
        description: "Заголовок статьи обязателен",
        variant: "destructive"
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Ошибка", 
        description: "Содержимое статьи не может быть пустым",
        variant: "destructive"
      });
      return;
    }

    if (!formData.categoryId) {
      toast({
        title: "Ошибка",
        description: "Выберите категорию для статьи",
        variant: "destructive"
      });
      return;
    }

    const articleToSave: Article = {
      ...formData,
      id: formData.id || Date.now().toString(),
      lastUpdated: new Date(),
      metaDescription: formData.metaDescription || formData.content.substring(0, 160)
    };

    onSave(articleToSave);
    
    toast({
      title: "Статья сохранена",
      description: `Статья "${formData.title}" успешно ${article ? 'обновлена' : 'создана'}`,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {article ? 'Редактировать статью' : 'Создать новую статью'}
          </DialogTitle>
          <DialogDescription>
            Создайте информативную статью для базы знаний
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="content" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Содержимое</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
            <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Заголовок статьи</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Введите заголовок статьи"
                />
              </div>
              <div>
                <Label htmlFor="category">Категория</Label>
                <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="content">Содержимое статьи</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Напишите содержимое статьи..."
                rows={12}
                className="resize-none"
              />
              <div className="text-sm text-muted-foreground mt-1">
                Символов: {formData.content.length}
              </div>
            </div>

            <div>
              <Label>Теги</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Добавить тег"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} variant="outline">
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="slug">URL слаг</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="article-url-slug"
                />
              </div>
              <div>
                <Label htmlFor="status">Статус</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Черновик</SelectItem>
                    <SelectItem value="published">Опубликована</SelectItem>
                    <SelectItem value="archived">Архив</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="meta">Мета-описание (SEO)</Label>
              <Textarea
                id="meta"
                value={formData.metaDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                placeholder="Краткое описание статьи для поисковых систем (до 160 символов)"
                rows={3}
              />
              <div className="text-sm text-muted-foreground mt-1">
                {formData.metaDescription.length}/160
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <Label>Публичная статья</Label>
                </div>
                <Switch
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <Label>Разрешить комментарии</Label>
                </div>
                <Switch
                  checked={formData.allowComments}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allowComments: checked }))}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {formData.title || 'Заголовок статьи'}
                  <div className="flex items-center gap-2">
                    <Badge variant={formData.status === 'published' ? 'default' : 'secondary'}>
                      {formData.status === 'published' ? 'Опубликована' : 
                       formData.status === 'draft' ? 'Черновик' : 'Архив'}
                    </Badge>
                    {formData.isPublic ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                  </div>
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date().toLocaleDateString('ru-RU')}
                  <Users className="h-4 w-4 ml-2" />
                  {formData.author}
                  <Hash className="h-4 w-4 ml-2" />
                  {formData.slug}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {formData.content ? (
                    <div className="whitespace-pre-wrap">{formData.content}</div>
                  ) : (
                    <div className="text-muted-foreground italic">Содержимое статьи будет отображаться здесь...</div>
                  )}
                </div>
                {formData.tags.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))} variant="secondary">
            <Save className="h-4 w-4 mr-2" />
            Сохранить как черновик
          </Button>
          <Button onClick={handleSave}>
            <Eye className="h-4 w-4 mr-2" />
            {formData.status === 'published' ? 'Обновить' : 'Опубликовать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleEditorModal;