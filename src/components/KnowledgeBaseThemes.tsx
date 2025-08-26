import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Eye, Save, RotateCcw, Upload } from 'lucide-react';

interface ThemeSettings {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  headerColor: string;
  sidebarColor: string;
  linkColor: string;
  fontFamily: string;
  fontSize: string;
  borderRadius: string;
  logo: string;
  favicon: string;
  customCss: string;
  enableDarkMode: boolean;
  showBreadcrumbs: boolean;
  showSearchBar: boolean;
  showCategories: boolean;
  showPopularArticles: boolean;
  showRecentArticles: boolean;
  articlesPerPage: number;
  enableComments: boolean;
  enableRatings: boolean;
  enablePrint: boolean;
  enableShare: boolean;
}

const KnowledgeBaseThemes = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeSettings>({
    name: 'Стандартная тема',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    headerColor: '#f8fafc',
    sidebarColor: '#f1f5f9',
    linkColor: '#2563eb',
    fontFamily: 'Inter',
    fontSize: '16',
    borderRadius: '8',
    logo: '',
    favicon: '',
    customCss: '',
    enableDarkMode: true,
    showBreadcrumbs: true,
    showSearchBar: true,
    showCategories: true,
    showPopularArticles: true,
    showRecentArticles: true,
    articlesPerPage: 10,
    enableComments: true,
    enableRatings: true,
    enablePrint: true,
    enableShare: true
  });

  const predefinedThemes = [
    {
      name: 'Стандартная',
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      backgroundColor: '#ffffff',
      textColor: '#1f2937'
    },
    {
      name: 'Темная',
      primaryColor: '#3b82f6',
      secondaryColor: '#6b7280',
      backgroundColor: '#111827',
      textColor: '#f9fafb'
    },
    {
      name: 'Зеленая',
      primaryColor: '#059669',
      secondaryColor: '#6b7280',
      backgroundColor: '#ffffff',
      textColor: '#1f2937'
    },
    {
      name: 'Фиолетовая',
      primaryColor: '#7c3aed',
      secondaryColor: '#6b7280',
      backgroundColor: '#ffffff',
      textColor: '#1f2937'
    }
  ];

  const fontFamilies = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Poppins', label: 'Poppins' }
  ];

  const handleThemeChange = (field: keyof ThemeSettings, value: any) => {
    setCurrentTheme(prev => ({ ...prev, [field]: value }));
  };

  const applyPredefinedTheme = (theme: any) => {
    setCurrentTheme(prev => ({
      ...prev,
      ...theme
    }));
  };

  const saveTheme = () => {
    console.log('Saving theme:', currentTheme);
    // Here you would save the theme to your backend
  };

  const resetToDefault = () => {
    setCurrentTheme({
      name: 'Стандартная тема',
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      headerColor: '#f8fafc',
      sidebarColor: '#f1f5f9',
      linkColor: '#2563eb',
      fontFamily: 'Inter',
      fontSize: '16',
      borderRadius: '8',
      logo: '',
      favicon: '',
      customCss: '',
      enableDarkMode: true,
      showBreadcrumbs: true,
      showSearchBar: true,
      showCategories: true,
      showPopularArticles: true,
      showRecentArticles: true,
      articlesPerPage: 10,
      enableComments: true,
      enableRatings: true,
      enablePrint: true,
      enableShare: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Темы базы знаний</h2>
          <p className="text-muted-foreground">Настройка внешнего вида публичной базы знаний</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={resetToDefault}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Сбросить
          </Button>
          <Button onClick={saveTheme}>
            <Save className="mr-2 h-4 w-4" />
            Сохранить тему
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="appearance" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
              <TabsTrigger value="layout">Макет</TabsTrigger>
              <TabsTrigger value="features">Функции</TabsTrigger>
              <TabsTrigger value="advanced">Дополнительно</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Готовые темы</CardTitle>
                  <CardDescription>Выберите готовую тему или настройте свою</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {predefinedThemes.map((theme, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => applyPredefinedTheme(theme)}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: theme.secondaryColor }}
                          />
                          <span className="font-medium">{theme.name}</span>
                        </div>
                        <div 
                          className="h-12 rounded border"
                          style={{ 
                            backgroundColor: theme.backgroundColor,
                            color: theme.textColor,
                            borderColor: theme.primaryColor 
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Цвета</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Основной цвет</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={currentTheme.primaryColor}
                          onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                          className="w-12 h-10 border rounded"
                        />
                        <Input
                          value={currentTheme.primaryColor}
                          onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Вторичный цвет</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={currentTheme.secondaryColor}
                          onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                          className="w-12 h-10 border rounded"
                        />
                        <Input
                          value={currentTheme.secondaryColor}
                          onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Фон</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={currentTheme.backgroundColor}
                          onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                          className="w-12 h-10 border rounded"
                        />
                        <Input
                          value={currentTheme.backgroundColor}
                          onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Цвет текста</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={currentTheme.textColor}
                          onChange={(e) => handleThemeChange('textColor', e.target.value)}
                          className="w-12 h-10 border rounded"
                        />
                        <Input
                          value={currentTheme.textColor}
                          onChange={(e) => handleThemeChange('textColor', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Типографика</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Шрифт</Label>
                      <Select value={currentTheme.fontFamily} onValueChange={(value) => handleThemeChange('fontFamily', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontFamilies.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Размер шрифта (px)</Label>
                      <Input
                        type="number"
                        min="12"
                        max="24"
                        value={currentTheme.fontSize}
                        onChange={(e) => handleThemeChange('fontSize', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Радиус скругления (px)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="20"
                      value={currentTheme.borderRadius}
                      onChange={(e) => handleThemeChange('borderRadius', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Элементы интерфейса</CardTitle>
                  <CardDescription>Настройте отображение элементов</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Строка поиска</Label>
                      <Switch
                        checked={currentTheme.showSearchBar}
                        onCheckedChange={(checked) => handleThemeChange('showSearchBar', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Хлебные крошки</Label>
                      <Switch
                        checked={currentTheme.showBreadcrumbs}
                        onCheckedChange={(checked) => handleThemeChange('showBreadcrumbs', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Список категорий</Label>
                      <Switch
                        checked={currentTheme.showCategories}
                        onCheckedChange={(checked) => handleThemeChange('showCategories', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Популярные статьи</Label>
                      <Switch
                        checked={currentTheme.showPopularArticles}
                        onCheckedChange={(checked) => handleThemeChange('showPopularArticles', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Недавние статьи</Label>
                      <Switch
                        checked={currentTheme.showRecentArticles}
                        onCheckedChange={(checked) => handleThemeChange('showRecentArticles', checked)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Статей на странице</Label>
                    <Select 
                      value={currentTheme.articlesPerPage.toString()} 
                      onValueChange={(value) => handleThemeChange('articlesPerPage', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Функциональность</CardTitle>
                  <CardDescription>Включите или отключите функции</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Темная тема</Label>
                      <Switch
                        checked={currentTheme.enableDarkMode}
                        onCheckedChange={(checked) => handleThemeChange('enableDarkMode', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Комментарии</Label>
                      <Switch
                        checked={currentTheme.enableComments}
                        onCheckedChange={(checked) => handleThemeChange('enableComments', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Рейтинги статей</Label>
                      <Switch
                        checked={currentTheme.enableRatings}
                        onCheckedChange={(checked) => handleThemeChange('enableRatings', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Печать статей</Label>
                      <Switch
                        checked={currentTheme.enablePrint}
                        onCheckedChange={(checked) => handleThemeChange('enablePrint', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Поделиться статьей</Label>
                      <Switch
                        checked={currentTheme.enableShare}
                        onCheckedChange={(checked) => handleThemeChange('enableShare', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Логотип и иконки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Логотип (URL)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={currentTheme.logo}
                        onChange={(e) => handleThemeChange('logo', e.target.value)}
                        placeholder="https://example.com/logo.png"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Favicon (URL)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={currentTheme.favicon}
                        onChange={(e) => handleThemeChange('favicon', e.target.value)}
                        placeholder="https://example.com/favicon.ico"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Дополнительный CSS</CardTitle>
                  <CardDescription>Добавьте пользовательские стили</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={currentTheme.customCss}
                    onChange={(e) => handleThemeChange('customCss', e.target.value)}
                    placeholder="/* Ваши CSS стили */&#10;.custom-class {&#10;  color: #333;&#10;}"
                    rows={10}
                    className="font-mono text-sm"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Предварительный просмотр</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="border rounded-lg p-4 space-y-3"
                style={{ 
                  backgroundColor: currentTheme.backgroundColor,
                  color: currentTheme.textColor,
                  fontFamily: currentTheme.fontFamily,
                  fontSize: `${currentTheme.fontSize}px`
                }}
              >
                <div 
                  className="text-lg font-bold"
                  style={{ color: currentTheme.primaryColor }}
                >
                  База знаний
                </div>
                {currentTheme.showSearchBar && (
                  <div className="p-2 border rounded" style={{ borderRadius: `${currentTheme.borderRadius}px` }}>
                    🔍 Поиск...
                  </div>
                )}
                {currentTheme.showCategories && (
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Категории:</div>
                    <div className="flex space-x-2">
                      <span 
                        className="px-2 py-1 text-xs rounded"
                        style={{ 
                          backgroundColor: currentTheme.primaryColor,
                          color: currentTheme.backgroundColor,
                          borderRadius: `${currentTheme.borderRadius}px`
                        }}
                      >
                        FAQ
                      </span>
                      <span 
                        className="px-2 py-1 text-xs rounded"
                        style={{ 
                          backgroundColor: currentTheme.secondaryColor,
                          color: currentTheme.backgroundColor,
                          borderRadius: `${currentTheme.borderRadius}px`
                        }}
                      >
                        Руководства
                      </span>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <div 
                    className="p-2 border rounded"
                    style={{ borderRadius: `${currentTheme.borderRadius}px` }}
                  >
                    <div 
                      className="font-medium text-sm"
                      style={{ color: currentTheme.linkColor }}
                    >
                      Пример статьи
                    </div>
                    <div className="text-xs" style={{ color: currentTheme.secondaryColor }}>
                      Краткое описание статьи...
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Текущая тема</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Название:</span>
                  <Badge variant="outline">{currentTheme.name}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Шрифт:</span>
                  <span className="text-sm">{currentTheme.fontFamily}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Основной цвет:</span>
                  <div 
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: currentTheme.primaryColor }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseThemes;