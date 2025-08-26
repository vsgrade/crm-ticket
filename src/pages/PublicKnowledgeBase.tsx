import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Search, BookOpen, Star, ThumbsUp, ThumbsDown, Share2, Printer, ArrowLeft, User, Calendar, Eye, MessageSquare } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  views: number;
  likes: number;
  dislikes: number;
  author: string;
  publishDate: string;
  lastUpdated: string;
  tags: string[];
  helpful: boolean | null;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  articleCount: number;
  color: string;
}

const PublicKnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [userRating, setUserRating] = useState<boolean | null>(null);

  const categories: Category[] = [
    {
      id: '1',
      name: 'Начало работы',
      description: 'Основы использования системы',
      icon: '🚀',
      articleCount: 12,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: '2',
      name: 'Управление тикетами',
      description: 'Работа с обращениями',
      icon: '🎫',
      articleCount: 25,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: '3',
      name: 'Интеграции',
      description: 'Подключение внешних сервисов',
      icon: '🔗',
      articleCount: 18,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: '4',
      name: 'Настройки',
      description: 'Конфигурация системы',
      icon: '⚙️',
      articleCount: 15,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      id: '5',
      name: 'Отчеты',
      description: 'Аналитика и метрики',
      icon: '📊',
      articleCount: 10,
      color: 'bg-pink-100 text-pink-800'
    },
    {
      id: '6',
      name: 'Устранение неполадок',
      description: 'Решение распространенных проблем',
      icon: '🔧',
      articleCount: 20,
      color: 'bg-red-100 text-red-800'
    }
  ];

  const popularArticles: Article[] = [
    {
      id: '1',
      title: 'Как создать первый тикет',
      content: `# Как создать первый тикет

Создание тикета - это основа работы в системе поддержки. В этой статье мы рассмотрим пошаговый процесс создания вашего первого тикета.

## Шаг 1: Вход в систему
Для начала необходимо войти в систему, используя ваши учетные данные.

## Шаг 2: Переход к разделу тикетов
В главном меню выберите раздел "Тикеты" или нажмите кнопку "Создать тикет".

## Шаг 3: Заполнение формы
Заполните все необходимые поля:
- **Тема** - краткое описание проблемы
- **Описание** - подробное описание проблемы
- **Приоритет** - выберите соответствующий уровень
- **Категория** - выберите подходящую категорию

## Шаг 4: Добавление вложений
При необходимости прикрепите файлы, скриншоты или другие документы.

## Шаг 5: Отправка тикета
Проверьте введенную информацию и нажмите кнопку "Создать тикет".

После создания тикета вы получите уникальный номер для отслеживания статуса обращения.`,
      category: 'Начало работы',
      views: 1250,
      likes: 45,
      dislikes: 3,
      author: 'Анна Иванова',
      publishDate: '2024-01-15',
      lastUpdated: '2024-01-20',
      tags: ['тикеты', 'начало работы', 'создание'],
      helpful: null
    },
    {
      id: '2',
      title: 'Настройка уведомлений',
      content: `# Настройка уведомлений

Правильная настройка уведомлений поможет вам не пропустить важные обновления и оперативно реагировать на новые обращения.

## Типы уведомлений

### Email уведомления
Настройте получение уведомлений на вашу электронную почту:
- Новые тикеты
- Обновления статуса
- Комментарии клиентов
- Эскалация тикетов

### Push уведомления
Включите браузерные уведомления для мгновенного получения важных сообщений.

### SMS уведомления
Настройте SMS для критически важных событий.

## Как настроить

1. Перейдите в раздел "Настройки профиля"
2. Выберите вкладку "Уведомления"
3. Установите нужные параметры
4. Сохраните изменения

Рекомендуется включить уведомления для всех важных событий, чтобы обеспечить высокое качество обслуживания клиентов.`,
      category: 'Настройки',
      views: 980,
      likes: 32,
      dislikes: 1,
      author: 'Михаил Петров',
      publishDate: '2024-01-10',
      lastUpdated: '2024-01-18',
      tags: ['уведомления', 'настройки', 'email'],
      helpful: null
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    // Increment view count
    article.views += 1;
  };

  const handleRating = (helpful: boolean) => {
    setUserRating(helpful);
    if (selectedArticle) {
      if (helpful) {
        selectedArticle.likes += 1;
      } else {
        selectedArticle.dislikes += 1;
      }
    }
  };

  const handleShare = () => {
    if (selectedArticle) {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredArticles = popularArticles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      article.category === categories.find(c => c.id === selectedCategory)?.name;
    
    return matchesSearch && matchesCategory;
  });

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-4xl">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedArticle(null)}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад к статьям
            </Button>
            
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={() => setSelectedArticle(null)}>
                    База знаний
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={() => setSelectedCategory(selectedArticle.category)}>
                    {selectedArticle.category}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedArticle.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{selectedArticle.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{selectedArticle.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Обновлено: {selectedArticle.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{selectedArticle.views} просмотров</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedArticle.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedArticle.content.replace(/\n/g, '<br>') }} />
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h4 className="font-medium">Была ли эта статья полезной?</h4>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={userRating === true ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleRating(true)}
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Да ({selectedArticle.likes})
                      </Button>
                      <Button
                        variant={userRating === false ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => handleRating(false)}
                      >
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Нет ({selectedArticle.dislikes})
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">База знаний</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Найдите ответы на ваши вопросы и изучите возможности системы
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по статьям..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Категории</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{category.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge className={category.color}>
                    {category.articleCount} статей
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {selectedCategory 
                ? `Статьи в категории "${categories.find(c => c.id === selectedCategory)?.name}"`
                : searchQuery 
                  ? `Результаты поиска "${searchQuery}"`
                  : 'Популярные статьи'
              }
            </h2>
            {(selectedCategory || searchQuery) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
              >
                Показать все
              </Button>
            )}
          </div>
          
          <div className="grid gap-4">
            {filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleArticleSelect(article)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {article.content.substring(0, 150).replace(/[#*]/g, '')}...
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{article.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    <span>{article.lastUpdated}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Статьи не найдены</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory 
                  ? 'Попробуйте изменить поисковый запрос или выбрать другую категорию'
                  : 'В базе знаний пока нет статей'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicKnowledgeBase;