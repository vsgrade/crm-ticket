import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User,
  Settings
} from 'lucide-react';
import ContactFieldsManager from '@/components/ContactFieldsManager';

const SystemFields = () => {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <div className="flex-none p-6 border-b border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Системные настройки
            </h1>
            <p className="text-muted-foreground">Управление дополнительными полями для клиентов и сотрудников</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            Демо данные
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Дополнительные поля
            </CardTitle>
            <CardDescription>Настройка дополнительных полей для клиентов и сотрудников</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactFieldsManager />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemFields;