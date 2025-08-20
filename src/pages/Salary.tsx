import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Download, Calendar, TrendingUp, Banknote, Clock } from "lucide-react";

const Salary = () => {
  const currentSalary = {
    base: 85000,
    bonus: 12000,
    total: 97000,
    currency: "₽",
    period: "месяц"
  };

  const paymentHistory = [
    {
      date: "2024-01-31",
      amount: 97000,
      type: "Основная зарплата",
      status: "paid",
      bonus: 12000
    },
    {
      date: "2023-12-31", 
      amount: 95000,
      type: "Основная зарплата",
      status: "paid",
      bonus: 10000
    },
    {
      date: "2023-11-30",
      amount: 85000,
      type: "Основная зарплата", 
      status: "paid",
      bonus: 0
    },
    {
      date: "2023-10-31",
      amount: 91000,
      type: "Основная зарплата",
      status: "paid",
      bonus: 6000
    }
  ];

  const bonuses = [
    {
      title: "Премия за качество работы",
      amount: 8000,
      date: "2024-01-15",
      description: "За отличную работу с клиентами в декабре"
    },
    {
      title: "Новогодняя премия",
      amount: 4000,
      date: "2023-12-25",
      description: "Праздничная премия"
    }
  ];

  const benefits = [
    { name: "Медицинская страховка", value: "Полное покрытие", type: "insurance" },
    { name: "Оплачиваемый отпуск", value: "28 дней", type: "vacation" },
    { name: "Обучение и развитие", value: "50,000 ₽/год", type: "development" },
    { name: "Спортивная компенсация", value: "5,000 ₽/месяц", type: "fitness" }
  ];

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Заработная плата</h1>
            <p className="text-muted-foreground">Информация о зарплате и премиях</p>
          </div>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Скачать справку
        </Button>
      </div>

      {/* Текущая зарплата */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Banknote className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {currentSalary.base.toLocaleString()} {currentSalary.currency}
                </div>
                <div className="text-sm text-muted-foreground">Базовая зарплата</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {currentSalary.bonus.toLocaleString()} {currentSalary.currency}
                </div>
                <div className="text-sm text-muted-foreground">Премии за месяц</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-warning/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {currentSalary.total.toLocaleString()} {currentSalary.currency}
                </div>
                <div className="text-sm text-muted-foreground">Итого к выплате</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* История выплат */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              История выплат
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentHistory.map((payment, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">{payment.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </div>
                  </div>
                  <Badge variant="default">Выплачено</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">
                    {payment.amount.toLocaleString()} ₽
                  </div>
                  {payment.bonus > 0 && (
                    <div className="text-sm text-success font-medium">
                      +{payment.bonus.toLocaleString()} ₽ премия
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Премии и бонусы */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Премии и бонусы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bonuses.map((bonus, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{bonus.title}</div>
                  <div className="text-lg font-bold text-success">
                    +{bonus.amount.toLocaleString()} ₽
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {bonus.description}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(bonus.date).toLocaleDateString('ru-RU')}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Льготы и компенсации */}
      <Card>
        <CardHeader>
          <CardTitle>Льготы и компенсации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <div className="font-medium mb-2">{benefit.name}</div>
                <div className="text-lg font-bold text-primary">{benefit.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Годовая статистика */}
      <Card>
        <CardHeader>
          <CardTitle>Статистика за год</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Всего получено</div>
              <div className="text-2xl font-bold">1,068,000 ₽</div>
              <Progress value={89} className="mt-2" />
              <div className="text-xs text-muted-foreground mt-1">89% от плана</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Премии</div>
              <div className="text-2xl font-bold">48,000 ₽</div>
              <Progress value={76} className="mt-2" />
              <div className="text-xs text-muted-foreground mt-1">76% от плана</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Средняя зарплата</div>
              <div className="text-2xl font-bold">89,000 ₽</div>
              <Progress value={95} className="mt-2" />
              <div className="text-xs text-muted-foreground mt-1">95% роста</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Salary;