import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AtSign, Bell } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department: string;
  online: boolean;
}

interface UserMentionsProps {
  onMention: (user: User) => void;
  className?: string;
}

const UserMentions = ({ onMention, className }: UserMentionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Демо пользователи
  const users: User[] = [
    {
      id: '1',
      name: 'Анна Сидорова',
      email: 'anna.sidorova@company.com',
      role: 'Старший агент',
      department: 'Техподдержка',
      online: true
    },
    {
      id: '2',
      name: 'Михаил Петров',
      email: 'mikhail.petrov@company.com',
      role: 'Руководитель отдела',
      department: 'Техподдержка',
      online: true
    },
    {
      id: '3',
      name: 'Елена Васильева',
      email: 'elena.vasileva@company.com',
      role: 'Агент',
      department: 'Продажи',
      online: false
    },
    {
      id: '4',
      name: 'Дмитрий Козлов',
      email: 'dmitry.kozlov@company.com',
      role: 'Специалист',
      department: 'Разработка',
      online: true
    },
    {
      id: '5',
      name: 'Ольга Николаева',
      email: 'olga.nikolaeva@company.com',
      role: 'Менеджер',
      department: 'Продажи',
      online: false
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMention = (user: User) => {
    onMention(user);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8"
      >
        <AtSign className="h-4 w-4" />
      </Button>

      {isOpen && (
        <Card className="absolute bottom-full left-0 mb-2 w-80 z-50 shadow-lg">
          <CardContent className="p-0">
            <div className="p-3 border-b">
              <div className="flex items-center gap-2 mb-2">
                <AtSign className="h-4 w-4" />
                <span className="font-medium text-sm">Упомянуть пользователя</span>
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Поиск пользователей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-3 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => handleMention(user)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {user.online && (
                          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">
                            {user.name}
                          </span>
                          {user.online && (
                            <Badge variant="secondary" className="text-xs h-4">
                              Онлайн
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {user.role} • {user.department}
                        </div>
                      </div>
                      
                      <Bell className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-sm text-muted-foreground">
                  Пользователи не найдены
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Компонент для отображения упоминания в тексте
export const MentionDisplay = ({ user, onClick }: { user: User; onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
    >
      <AtSign className="h-3 w-3" />
      {user.name}
    </button>
  );
};

// Хук для обработки упоминаний в тексте
export const useMentions = () => {
  const [mentions, setMentions] = useState<User[]>([]);

  const addMention = (user: User) => {
    if (!mentions.find(m => m.id === user.id)) {
      setMentions([...mentions, user]);
    }
  };

  const removeMention = (userId: string) => {
    setMentions(mentions.filter(m => m.id !== userId));
  };

  const parseMentions = (text: string) => {
    // Простая логика для парсинга упоминаний @username
    const mentionRegex = /@(\w+)/g;
    return text.replace(mentionRegex, (match, username) => {
      const user = mentions.find(m => 
        m.name.toLowerCase().replace(/\s+/g, '') === username.toLowerCase()
      );
      return user ? `<@${user.id}>` : match;
    });
  };

  return {
    mentions,
    addMention,
    removeMention,
    parseMentions
  };
};

export default UserMentions;