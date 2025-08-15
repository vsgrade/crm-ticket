import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, Users, Building2, MapPin, Star, Mail, Phone } from "lucide-react";

interface CreateClientModalProps {
  trigger?: React.ReactNode;
}

export const CreateClientModal = ({ trigger }: CreateClientModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    segment: "",
    notes: "",
    telegramId: "",
    whatsappId: "",
    vkId: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Симуляция создания клиента
    const clientId = `CLI-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    
    toast({
      title: "Клиент добавлен! 👥",
      description: `Клиент ${formData.name} успешно добавлен с ID ${clientId} (демо функция)`,
    });
    
    setOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      location: "",
      segment: "",
      notes: "",
      telegramId: "",
      whatsappId: "",
      vkId: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="btn-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Добавить клиента
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Добавление нового клиента
            <Badge variant="secondary" className="ml-auto">Демо функция</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основная информация */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Основная информация</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя клиента *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  placeholder="Имя Фамилия"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="segment">Сегмент</Label>
                <Select value={formData.segment} onValueChange={(value) => setFormData(prev => ({...prev, segment: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Тип клиента" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enterprise">🏢 Enterprise</SelectItem>
                    <SelectItem value="smb">🏪 SMB (Малый бизнес)</SelectItem>
                    <SelectItem value="individual">👤 Частное лицо</SelectItem>
                    <SelectItem value="vip">⭐ VIP клиент</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    placeholder="email@example.com"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                    placeholder="+7 999 123-45-67"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Компания</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
                    placeholder="ООО Название"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Местоположение</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                    placeholder="Москва, Россия"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Мессенджеры */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Контакты в мессенджерах</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telegramId">Telegram</Label>
                <Input
                  id="telegramId"
                  value={formData.telegramId}
                  onChange={(e) => setFormData(prev => ({...prev, telegramId: e.target.value}))}
                  placeholder="@username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsappId">WhatsApp</Label>
                <Input
                  id="whatsappId"
                  value={formData.whatsappId}
                  onChange={(e) => setFormData(prev => ({...prev, whatsappId: e.target.value}))}
                  placeholder="+7 999 123-45-67"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vkId">ВКонтакте</Label>
                <Input
                  id="vkId"
                  value={formData.vkId}
                  onChange={(e) => setFormData(prev => ({...prev, vkId: e.target.value}))}
                  placeholder="vk.com/username"
                />
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Дополнительная информация</h4>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Заметки</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
                placeholder="Дополнительная информация о клиенте..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Отмена
            </Button>
            <Button type="submit" className="btn-gradient flex-1">
              <Save className="h-4 w-4 mr-2" />
              Сохранить клиента
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClientModal;