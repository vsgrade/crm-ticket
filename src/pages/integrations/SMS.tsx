import { Phone, Settings, Plus, CheckCircle, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SMS = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Phone className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">SMS интеграция</h1>
            <p className="text-muted-foreground">Настройка SMS рассылок и уведомлений</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Настроить SMS
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-muted-foreground">SMS отправлено</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">98.5%</div>
              <div className="text-sm text-muted-foreground">Доставляемость</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SMS провайдеры</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Настройте интеграцию с SMS провайдерами для отправки уведомлений клиентам.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SMS;