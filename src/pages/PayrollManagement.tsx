import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Clock, Calculator } from "lucide-react";
import { WorkTypesManager } from "@/components/payroll/WorkTypesManager";
import { PayrollSheetManager } from "@/components/payroll/PayrollSheetManager";

const PayrollManagement = () => {
  const [activeTab, setActiveTab] = useState("work-types");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Начисление заработной платы</h1>
          <p className="text-muted-foreground">
            Управление видами работ и создание платежек для сотрудников
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Card className="px-4 py-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Общий фонд: 2,450,000 ₽</span>
            </div>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="work-types" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Виды работ
          </TabsTrigger>
          <TabsTrigger value="payroll-sheets" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Платежки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="work-types" className="space-y-6">
          <WorkTypesManager />
        </TabsContent>

        <TabsContent value="payroll-sheets" className="space-y-6">
          <PayrollSheetManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollManagement;