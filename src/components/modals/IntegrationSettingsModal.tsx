import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface IntegrationSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integration: {
    id: string;
    name: string;
    type: string;
    status: string;
  } | null;
}

const IntegrationSettingsModal = ({ open, onOpenChange, integration }: IntegrationSettingsModalProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    autoRespond: true,
    ticketCreatedMessage: "Ваш тикет #{{ticket_id}} был создан. Мы скоро свяжемся с вами.",
    ticketResolvedMessage: "Ваш тикет #{{ticket_id}} был решен. Спасибо за обращение!",
    ticketEscalatedMessage: "Ваш тикет #{{ticket_id}} был передан специалисту. Время ответа может увеличиться.",
    apiKey: "",
    webhookUrl: "",
    webhookSecret: ""
  });

  const handleSave = () => {
    toast({
      title: "Настройки сохранены",
      description: `Настройки интеграции ${integration?.name} обновлены`
    });
    onOpenChange(false);
  };

  if (!integration) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Настройки интеграции: {integration.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="messages">Сообщения</TabsTrigger>
            <TabsTrigger value="connection">Подключение</TabsTrigger>
            <TabsTrigger value="advanced">Дополнительно</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Автоматические ответы
                  <Switch 
                    checked={settings.autoRespond}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, autoRespond: checked }))
                    }
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ticketCreated">Сообщение при создании тикета</Label>
                  <Textarea
                    id="ticketCreated"
                    value={settings.ticketCreatedMessage}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, ticketCreatedMessage: e.target.value }))
                    }
                    placeholder="Введите сообщение..."
                    disabled={!settings.autoRespond}
                  />
                  <p className="text-xs text-muted-foreground">
                    Доступные переменные: {"{"}{"{"}{"}"}ticket_id{"}"}{"}"},  {"{"}{"{"}{"}"}client_name{"}"}{"}"},  {"{"}{"{"}{"}"}created_date{"}"}{"}"}{"}"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ticketResolved">Сообщение о решении</Label>
                  <Textarea
                    id="ticketResolved"
                    value={settings.ticketResolvedMessage}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, ticketResolvedMessage: e.target.value }))
                    }
                    placeholder="Введите сообщение..."
                    disabled={!settings.autoRespond}
                  />
                  <p className="text-xs text-muted-foreground">
                    Доступные переменные: {"{"}{"{"}{"}"}ticket_id{"}"}{"}"},  {"{"}{"{"}{"}"}client_name{"}"}{"}"},  {"{"}{"{"}{"}"}resolved_date{"}"}{"}"},  {"{"}{"{"}{"}"}solution{"}"}{"}"}{"}"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ticketEscalated">Сообщение об эскалации</Label>
                  <Textarea
                    id="ticketEscalated"
                    value={settings.ticketEscalatedMessage}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, ticketEscalatedMessage: e.target.value }))
                    }
                    placeholder="Введите сообщение..."
                    disabled={!settings.autoRespond}
                  />
                  <p className="text-xs text-muted-foreground">
                    Доступные переменные: {"{"}{"{"}{"}"}ticket_id{"}"}{"}"},  {"{"}{"{"}{"}"}client_name{"}"}{"}"},  {"{"}{"{"}{"}"}escalated_to{"}"}{"}"},  {"{"}{"{"}{"}"}new_priority{"}"}{"}"}{"}"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connection" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Параметры подключения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API ключ</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={settings.apiKey}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, apiKey: e.target.value }))
                    }
                    placeholder="Введите API ключ..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    value={settings.webhookUrl}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, webhookUrl: e.target.value }))
                    }
                    placeholder="https://api.example.com/webhook"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookSecret">Webhook секрет</Label>
                  <Input
                    id="webhookSecret"
                    type="password"
                    value={settings.webhookSecret}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, webhookSecret: e.target.value }))
                    }
                    placeholder="Введите секретный ключ..."
                  />
                </div>

                <Button variant="outline" className="w-full">
                  Тестировать подключение
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Дополнительные настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Логирование событий</Label>
                    <p className="text-sm text-muted-foreground">Записывать все действия интеграции</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Уведомления об ошибках</Label>
                    <p className="text-sm text-muted-foreground">Отправлять уведомления при сбоях</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Автоматическое переподключение</Label>
                    <p className="text-sm text-muted-foreground">Восстанавливать соединение при разрыве</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="pt-4 border-t">
                  <Button variant="destructive" className="w-full">
                    Удалить интеграцию
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSave}>
            Сохранить настройки
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationSettingsModal;