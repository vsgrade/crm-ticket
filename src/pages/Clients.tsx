import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowUpDown,
  Eye,
  Users,
  Star,
  MapPin,
  Building2,
  Phone,
  Mail
} from "lucide-react";
import { mockClients } from "@/data/mockData";
import CreateClientModal from "@/components/modals/CreateClientModal";
import FullPageClientModal from "@/components/modals/FullPageClientModal";

const Clients = () => {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [clientModalOpen, setClientModalOpen] = useState(false);

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-warning fill-warning' : 'text-muted-foreground'}`} 
      />
    ));
  };

  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case 'enterprise':
        return <Badge className="bg-primary/20 text-primary">Enterprise</Badge>;
      case 'smb':
        return <Badge variant="secondary">SMB</Badge>;
      default:
        return <Badge variant="outline">Базовый</Badge>;
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Заголовок */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Клиенты</h1>
          <p className="text-muted-foreground">
            База клиентов с полной историей обращений • Демо данные
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Поиск клиентов..." 
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <CreateClientModal />
        </div>
      </div>

      {/* Статистика клиентов */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">Всего клиентов</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <Star className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-lg font-bold">4.6</div>
                <div className="text-sm text-muted-foreground">Средний рейтинг</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Building2 className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-lg font-bold">89</div>
                <div className="text-sm text-muted-foreground">Enterprise</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/20">
                <Users className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="text-lg font-bold">23</div>
                <div className="text-sm text-muted-foreground">Новые за месяц</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Таблица клиентов */}
      <Card className="flex-1 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Список клиентов
            <Badge variant="secondary" className="ml-auto">
              {mockClients.length} из 1,247 клиентов (демо данные)
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto h-[calc(100vh-400px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[200px]">
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      Клиент
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Контакты</TableHead>
                  <TableHead>Компания</TableHead>
                  <TableHead>Сегмент</TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      Тикеты
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Рейтинг</TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 p-0">
                      Потрачено
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Последний тикет</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClients.map((client) => (
                  <TableRow key={client.id} className="ticket-table-row">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <button 
                            onClick={() => {
                              setSelectedClient(client.id);
                              setClientModalOpen(true);
                            }}
                            className="font-medium hover:text-primary hover:underline cursor-pointer text-left"
                          >
                            {client.name}
                          </button>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {client.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {client.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {client.email}
                          </div>
                        )}
                        {client.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {client.phone}
                          </div>
                        )}
                        <div className="flex gap-1 mt-1">
                          {client.messengerIds.telegram && (
                            <Badge variant="outline" className="text-xs">📱 TG</Badge>
                          )}
                          {client.messengerIds.whatsapp && (
                            <Badge variant="outline" className="text-xs">💬 WA</Badge>
                          )}
                          {client.messengerIds.vk && (
                            <Badge variant="outline" className="text-xs">🔵 VK</Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {client.company || 'Частное лицо'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getSegmentBadge(client.customFields?.segment || 'basic')}
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="text-lg font-bold">{client.ticketsCount}</div>
                        <div className="text-xs text-muted-foreground">обращений</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getRatingStars(client.rating || 0)}
                        <span className="text-sm ml-1">{client.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-right">
                        <div className="font-medium">
                          {client.totalSpent?.toLocaleString()}₽
                        </div>
                        <div className="text-xs text-muted-foreground">
                          за все время
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {client.lastTicketDate.toLocaleDateString('ru-RU')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => {
                          setSelectedClient(client.id);
                          setClientModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Модальное окно клиента */}
      <FullPageClientModal 
        open={clientModalOpen}
        onOpenChange={setClientModalOpen}
        clientId={selectedClient || undefined}
      />
    </div>
  );
};

export default Clients;