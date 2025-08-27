import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  UserCheck, 
  Building2, 
  BookOpen, 
  Settings, 
  BarChart3,
  Zap,
  MessageSquare,
  Clock,
  CheckSquare,
  Archive,
  Globe,
  Smartphone,
  Mail,
  Phone,
  Bot,
  Target,
  AlertTriangle,
  FileText,
  Star,
  Calendar,
  DollarSign,
  ClipboardList,
  Database
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navigation = [
  {
    title: "Главная",
    items: [
      { name: "Дашборд", href: "/", icon: LayoutDashboard, badge: null },
      { name: "Тикеты", href: "/tickets", icon: Ticket, badge: "324" },
    ]
  },
  {
    title: "Управление",
    items: [
      { name: "Клиенты", href: "/clients", icon: Users, badge: "1,247" },
      { name: "Сотрудники", href: "/staff", icon: UserCheck, badge: null },
      { name: "Департаменты", href: "/departments", icon: Building2, badge: null },
      { name: "База знаний", href: "/knowledge", icon: BookOpen, badge: "156" },
    ]
  },
  {
    title: "Личный кабинет",
    items: [
      { name: "Заработная плата", href: "/salary", icon: DollarSign, badge: null },
      { name: "График работы", href: "/schedule", icon: ClipboardList, badge: null },
    ]
  },
  {
    title: "Аналитика",
    items: [
      { name: "Отчеты", href: "/reports", icon: BarChart3, badge: null },
      { name: "SLA Мониторинг", href: "/sla", icon: Clock, badge: "3" },
      { name: "Производительность", href: "/performance", icon: Target, badge: null },
    ]
  },
  {
    title: "Интеграции",
    items: [
      { name: "Мессенджеры", href: "/integrations/messengers", icon: MessageSquare, badge: "7" },
      { name: "Email", href: "/integrations/email", icon: Mail, badge: null },
      { name: "SMS", href: "/integrations/sms", icon: Phone, badge: null },
      { name: "API", href: "/integrations/api", icon: Globe, badge: null },
      { name: "Мобильное приложение", href: "/integrations/mobile", icon: Smartphone, badge: null },
    ]
  },
  {
    title: "Автоматизация",
    items: [
      { name: "ИИ Помощник", href: "/ai", icon: Bot, badge: "Бета" },
      { name: "Макросы", href: "/macros", icon: Zap, badge: null },
      { name: "Шаблоны", href: "/templates", icon: FileText, badge: "23" },
      { name: "Эскалация", href: "/escalation", icon: AlertTriangle, badge: null },
    ]
  },
  {
    title: "Система",
    items: [
      { name: "Системные настройки", href: "/system-fields", icon: Database, badge: null },
      { name: "Чеклист проекта", href: "/checklist", icon: CheckSquare, badge: null },
      { name: "Настройки", href: "/settings", icon: Settings, badge: null },
      { name: "Архив", href: "/archive", icon: Archive, badge: null },
      { name: "Календарь", href: "/calendar", icon: Calendar, badge: null },
    ]
  }
];

const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-border bg-card/30 backdrop-blur-sm h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {navigation.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg glow-effect"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )
                  }
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge 
                      variant={item.badge === "Бета" ? "secondary" : "outline"} 
                      className="text-xs px-1.5 py-0.5"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;