import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Plus, 
  BookOpen,
  FileText,
  Folder,
  Eye,
  Edit,
  Star,
  ChevronRight,
  TrendingUp,
  Users,
  Clock,
  ThumbsUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Article {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  views: number;
  likes: number;
  lastUpdated: Date;
  author: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  articlesCount: number;
  icon: string;
}

const Knowledge = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  const categories: Category[] = [
    {
      id: "auth",
      name: "Авторизация и безопасность",
      description: "Проблемы входа, сброс паролей, двухфакторная аутентификация",
      articlesCount: 12,
      icon: "🔐"
    },
    {
      id: "billing",
      name: "Биллинг и платежи", 
      description: "Вопросы оплаты, тарифы, возвраты средств",
      articlesCount: 8,
      icon: "💳"
    },
    {
      id: "technical",
      name: "Технические вопросы",
      description: "Настройка, интеграции, API, баги",
      articlesCount: 24,
      icon: "⚙️"
    },
    {
      id: "account",
      name: "Управление аккаунтом",
      description: "Профиль, настройки, персональные данные",
      articlesCount: 15,
      icon: "👤"
    },
    {
      id: "features",
      name: "Функции системы",
      description: "Как использовать возможности платформы",
      articlesCount: 18,
      icon: "🚀"
    }
  ];

  const popularArticles: Article[] = [
    {
      id: "1",
      title: "Как сбросить пароль в системе",
      content: "Подробная инструкция по восстановлению доступа к аккаунту...",
      categoryId: "auth",
      views: 1247,
      likes: 89,
      lastUpdated: new Date("2024-01-10"),
      author: "Мария Иванова"
    },
    {
      id: "2", 
      title: "Настройка двухфакторной аутентификации",
      content: "Пошаговое руководство по настройке 2FA для повышения безопасности...",
      categoryId: "auth",
      views: 892,
      likes: 156,
      lastUpdated: new Date("2024-01-12"),
      author: "Алексей Петров"
    },
    {
      id: "3",
      title: "Интеграция с Telegram Bot API",
      content: "Полное руководство по подключению и настройке Telegram бота...",
      categoryId: "technical",
      views: 2341,
      likes: 234,
      lastUpdated: new Date("2024-01-08"),
      author: "Дмитрий Козлов"
    },
    {
      id: "4",
      title: "Тарифы и способы оплаты",
      content: "Обзор доступных тарифных планов и методов оплаты...",
      categoryId: "billing",
      views: 756,
      likes: 67,
      lastUpdated: new Date("2024-01-14"),
      author: "Елена Смирнова"
    }
  ];

  const recentArticles: Article[] = [
    {
      id: "5",
      title: "Новые возможности в версии 2.4",
      content: "Обзор нововведений и улучшений в последнем обновлении...",
      categoryId: "features",
      views: 234,
      likes: 45,
      lastUpdated: new Date("2024-01-15"),
      author: "Иван Тестов"
    },
    {
      id: "6",
      title: "Настройка уведомлений в мессенджерах",
      content: "Как настроить получение уведомлений через различные каналы...",
      categoryId: "features",
      views: 123,
      likes: 23,
      lastUpdated: new Date("2024-01-14"),
      author: "Анна Новикова"
    }
  ];

  const handleCreateArticle = () => {
    toast({
      title: "Создание статьи 📝",
      description: "Открывается редактор статей (демо функция)",
    });
  };

  const handleViewArticle = (article: Article) => {
    toast({
      title: "Просмотр статьи 👁️",
      description: `Открывается статья "${article.title}" (демо функция)`,
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryArticles = [...popularArticles, ...recentArticles].filter(
      article => article.categoryId === categoryId
    );
    setFilteredArticles(categoryArticles);
    toast({
      title: "Фильтр по категории",
      description: `Показаны статьи категории "${categories.find(cat => cat.id === categoryId)?.name}"`,
    });
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const searchResults = [...popularArticles, ...recentArticles].filter(
      article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(searchResults);
    setSelectedCategory(null);
    toast({
      title: "Поиск",
      description: `Найдено ${searchResults.length} статей по запросу "${searchQuery}"`,
    });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setFilteredArticles([]);
    setSearchQuery("");
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">База знаний</h1>
          <p className="text-muted-foreground">
            Централизованное хранилище знаний и инструкций • Демо контент
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Поиск
          </Button>
          <Button className="btn-gradient" onClick={handleCreateArticle}>
            <Plus className="h-4 w-4 mr-2" />
            Создать статью
          </Button>
        </div>
      </div>

      {/* Поиск */}
      <Card className="bg-gradient-to-br from-card to-card/50">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Поиск по заголовкам и содержимому статей..." 
              className="pl-12 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              className="absolute right-2 top-2 h-8"
              onClick={handleSearch}
            >
              Найти
            </Button>
          </div>
          <div className="flex gap-2 mt-4">
            <Badge 
              variant={selectedCategory === null && filteredArticles.length === 0 ? "default" : "outline"} 
              className="cursor-pointer hover:bg-accent"
              onClick={clearFilters}
            >
              Все статьи
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              Популярные
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              Недавние
            </Badge>
            {selectedCategory && (
              <Badge variant="default">
                {categories.find(cat => cat.id === selectedCategory)?.name}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold">77</div>
                <div className="text-sm text-muted-foreground">Статей</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <Folder className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-lg font-bold">5</div>
                <div className="text-sm text-muted-foreground">Категорий</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Eye className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-lg font-bold">12.4k</div>
                <div className="text-sm text-muted-foreground">Просмотров</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/20">
                <ThumbsUp className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="text-lg font-bold">1.8k</div>
                <div className="text-sm text-muted-foreground">Лайков</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Категории */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Категории
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className={`p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors cursor-pointer ${
                  selectedCategory === category.id ? 'bg-primary/10 border-primary/20' : 'bg-accent/30'
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{category.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{category.name}</div>
                      <div className="text-xs text-muted-foreground">{category.articlesCount} статей</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {category.description}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Популярные статьи или результаты поиска */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {selectedCategory ? `Статьи категории: ${categories.find(cat => cat.id === selectedCategory)?.name}` :
               filteredArticles.length > 0 ? 'Результаты поиска' : 'Популярные статьи'}
              <Badge variant="secondary" className="ml-auto">
                {filteredArticles.length > 0 ? `${filteredArticles.length} статей` : 'Демо контент'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(filteredArticles.length > 0 ? filteredArticles : popularArticles).map((article) => (
              <div key={article.id} className="p-4 rounded-lg bg-accent/30 border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{article.title}</h4>
                  <Button variant="ghost" size="icon" onClick={() => handleViewArticle(article)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {article.content}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {article.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {article.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {article.author}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.lastUpdated.toLocaleDateString('ru-RU')}
                  </div>
                </div>
              </div>
            ))}
            {filteredArticles.length === 0 && searchQuery && (
              <div className="text-center p-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2" />
                <p>По запросу "{searchQuery}" ничего не найдено</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Недавние статьи */}
      <Card className="bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Недавно добавленные
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentArticles.map((article) => (
              <div key={article.id} className="p-4 rounded-lg bg-accent/30 border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{article.title}</h4>
                  <Button variant="ghost" size="icon" onClick={() => handleViewArticle(article)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {article.content}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {article.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {article.likes}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Новое
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Knowledge;