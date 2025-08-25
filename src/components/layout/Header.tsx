import { Bell, Search, Settings, User, MessageSquare, BarChart3, LogOut, UserCog, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const notifications = [
    { id: 1, title: "Новый тикет #4521", message: "Клиент сообщил о проблеме с доступом", time: "2 мин назад", type: "ticket" },
    { id: 2, title: "Тикет #4510 требует внимания", message: "Превышен SLA", time: "15 мин назад", type: "sla" },
    { id: 3, title: "Новое сообщение в чате", message: "Техподдержка: важное обновление", time: "1 час назад", type: "chat" },
    { id: 4, title: "Обновление системы", message: "Запланировано на 02:00", time: "3 часа назад", type: "system" }
  ];

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex h-16 items-center px-6 gap-4">
        {/* Логотип */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              TicketPro Enterprise
            </h1>
            <p className="text-xs text-muted-foreground">Демо версия с заглушками</p>
          </div>
        </div>

        {/* Поиск */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Поиск тикетов, клиентов..." 
              className="pl-10 bg-background/50"
            />
          </div>
        </div>

        {/* Статистика быстрого доступа */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-accent/50">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">324 активных</span>
          </div>
        </div>

        {/* Кнопки управления */}
        <div className="flex items-center gap-2">
          {/* Уведомления */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                  12
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Уведомления</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <div key={notification.id}>
                        <div className="px-4 py-3 hover:bg-accent/50 cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'ticket' ? 'bg-primary' :
                              notification.type === 'sla' ? 'bg-destructive' :
                              notification.type === 'chat' ? 'bg-blue-500' : 'bg-orange-500'
                            }`} />
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium">{notification.title}</p>
                              <p className="text-xs text-muted-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                        {index < notifications.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="p-3">
                    <Button variant="outline" size="sm" className="w-full">
                      Показать все уведомления
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>

          {/* Переключатель темы */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Настройки */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* Профиль пользователя */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Иван Петров</p>
                      <p className="text-sm text-muted-foreground">Администратор</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 px-3"
                      onClick={() => navigate('/settings')}
                    >
                      <UserCog className="h-4 w-4" />
                      Настройки профиля
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 px-3"
                      onClick={() => navigate('/salary')}
                    >
                      <BarChart3 className="h-4 w-4" />
                      Моя зарплата
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 px-3"
                      onClick={() => navigate('/schedule')}
                    >
                      <Settings className="h-4 w-4" />
                      Мой график
                    </Button>
                    <Separator />
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 px-3 text-destructive hover:text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      Выйти
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;