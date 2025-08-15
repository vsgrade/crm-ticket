import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Send, MessageSquare, User, Building2, Phone, Mail } from "lucide-react";

interface CreateTicketModalProps {
  trigger?: React.ReactNode;
}

export const CreateTicketModal = ({ trigger }: CreateTicketModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    content: "",
    priority: "",
    source: "",
    clientType: "existing",
    clientId: "",
    newClientName: "",
    newClientEmail: "",
    newClientPhone: "",
    department: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Симуляция создания тикета
    const newTicketId = `TIC-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    toast({
      title: "Тикет создан! 🎫",
      description: `Тикет ${newTicketId} успешно создан (демо функция)`,
    });
    
    setOpen(false);
    setFormData({
      subject: "",
      content: "",
      priority: "",
      source: "",
      clientType: "existing",
      clientId: "",
      newClientName: "",
      newClientEmail: "",
      newClientPhone: "",
      department: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="btn-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Создать тикет
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Создание нового тикета
            <Badge variant="secondary" className="ml-auto">Демо функция</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Приоритет</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({...prev, priority: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Низкий</SelectItem>
                  <SelectItem value="medium">🟡 Средний</SelectItem>
                  <SelectItem value="high">🟠 Высокий</SelectItem>
                  <SelectItem value="critical">🔴 Критический</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Источник</Label>
              <Select value={formData.source} onValueChange={(value) => setFormData(prev => ({...prev, source: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Канал обращения" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telegram">📱 Telegram</SelectItem>
                  <SelectItem value="whatsapp">💬 WhatsApp</SelectItem>
                  <SelectItem value="whatsapp-business">💼 WhatsApp Business</SelectItem>
                  <SelectItem value="vk">🔵 ВКонтакте</SelectItem>
                  <SelectItem value="email">📧 Email</SelectItem>
                  <SelectItem value="sms">📨 SMS</SelectItem>
                  <SelectItem value="manual">✋ Ручное создание</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Департамент</Label>
            <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({...prev, department: value}))}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите департамент" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="support">🛠️ Техническая поддержка</SelectItem>
                <SelectItem value="sales">💰 Отдел продаж</SelectItem>
                <SelectItem value="billing">💳 Бухгалтерия</SelectItem>
                <SelectItem value="hr">👥 HR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Тема тикета</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({...prev, subject: e.target.value}))}
              placeholder="Кратко опишите проблему..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Описание проблемы</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
              placeholder="Подробно опишите проблему или вопрос..."
              rows={4}
              required
            />
          </div>

          {/* Клиент */}
          <div className="space-y-4">
            <Label>Клиент</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={formData.clientType === "existing" ? "default" : "outline"}
                onClick={() => setFormData(prev => ({...prev, clientType: "existing"}))}
                className="flex-1"
              >
                <User className="h-4 w-4 mr-2" />
                Существующий клиент
              </Button>
              <Button
                type="button"
                variant={formData.clientType === "new" ? "default" : "outline"}
                onClick={() => setFormData(prev => ({...prev, clientType: "new"}))}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                Новый клиент
              </Button>
            </div>

            {formData.clientType === "existing" ? (
              <Select value={formData.clientId} onValueChange={(value) => setFormData(prev => ({...prev, clientId: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите клиента" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Анна Петрова (anna@example.com)</SelectItem>
                  <SelectItem value="2">Иван Сидоров (ivan@company.ru)</SelectItem>
                  <SelectItem value="3">ООО Технологии (info@tech.com)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newClientName">Имя клиента</Label>
                  <Input
                    id="newClientName"
                    value={formData.newClientName}
                    onChange={(e) => setFormData(prev => ({...prev, newClientName: e.target.value}))}
                    placeholder="Имя Фамилия"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newClientEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newClientEmail"
                      type="email"
                      value={formData.newClientEmail}
                      onChange={(e) => setFormData(prev => ({...prev, newClientEmail: e.target.value}))}
                      placeholder="email@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newClientPhone">Телефон</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newClientPhone"
                      value={formData.newClientPhone}
                      onChange={(e) => setFormData(prev => ({...prev, newClientPhone: e.target.value}))}
                      placeholder="+7 999 123-45-67"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Отмена
            </Button>
            <Button type="submit" className="btn-gradient flex-1">
              <Send className="h-4 w-4 mr-2" />
              Создать тикет
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTicketModal;