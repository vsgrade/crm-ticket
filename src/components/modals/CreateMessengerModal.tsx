import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Settings, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateMessengerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateMessengerModal = ({ open, onOpenChange }: CreateMessengerModalProps) => {
  const { toast } = useToast();
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    platform: "",
    token: "",
    webhook: "",
    description: ""
  });

  const platforms = [
    { id: "telegram", name: "Telegram Bot", icon: "📱", description: "Интеграция с Telegram Bot API" },
    { id: "whatsapp-business", name: "WhatsApp Business", icon: "💬", description: "WhatsApp Business API" },
    { id: "viber", name: "Viber", icon: "💜", description: "Viber Bot API" },
    { id: "facebook", name: "Facebook Messenger", icon: "📘", description: "Facebook Messenger Platform" },
    { id: "instagram", name: "Instagram Direct", icon: "📷", description: "Instagram Direct Messages" },
    { id: "vk", name: "VK Messages", icon: "🔵", description: "VK Bot API" }
  ];

  const handleSubmit = () => {
    if (!formData.name || !selectedPlatform) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Интеграция создана",
      description: `Настроена интеграция с ${platforms.find(p => p.id === selectedPlatform)?.name}`,
    });
    
    onOpenChange(false);
    setFormData({ name: "", platform: "", token: "", webhook: "", description: "" });
    setSelectedPlatform("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Новая интеграция мессенджера
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Выбор платформы */}
          <div>
            <Label className="text-base font-medium">Выберите платформу</Label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPlatform === platform.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedPlatform(platform.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{platform.icon}</span>
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    {selectedPlatform === platform.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{platform.description}</p>
                </div>
              ))}
            </div>
          </div>

          {selectedPlatform && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Название интеграции *</Label>
                <Input
                  id="name"
                  placeholder="Например: Основной Telegram бот"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="token">API Token / Ключ доступа *</Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Введите токен или ключ API"
                  value={formData.token}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="webhook">Webhook URL</Label>
                <Input
                  id="webhook"
                  placeholder="https://yoursite.com/webhook"
                  value={formData.webhook}
                  onChange={(e) => setFormData({ ...formData, webhook: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  placeholder="Краткое описание назначения интеграции"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSubmit}>
                  <Plus className="h-4 w-4 mr-2" />
                  Создать интеграцию
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMessengerModal;