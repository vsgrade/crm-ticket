import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { PayrollSheet, PayrollSheetItem, mockWorkTypes } from "@/data/payrollData";
import { mockEmployees } from "@/data/mockData";

interface PayrollSheetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payrollSheet?: PayrollSheet;
  onSave: (sheet: Omit<PayrollSheet, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
}

export const PayrollSheetModal = ({ open, onOpenChange, payrollSheet, onSave }: PayrollSheetModalProps) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    periodStart: new Date(),
    periodEnd: new Date(),
    items: [] as PayrollSheetItem[],
    totalAmount: 0,
    status: 'draft' as PayrollSheet['status'],
  });

  useEffect(() => {
    if (payrollSheet) {
      setFormData({
        employeeId: payrollSheet.employeeId,
        employeeName: payrollSheet.employeeName,
        periodStart: payrollSheet.periodStart,
        periodEnd: payrollSheet.periodEnd,
        items: payrollSheet.items,
        totalAmount: payrollSheet.totalAmount,
        status: payrollSheet.status,
      });
    } else {
      setFormData({
        employeeId: "",
        employeeName: "",
        periodStart: new Date(),
        periodEnd: new Date(),
        items: [],
        totalAmount: 0,
        status: 'draft',
      });
    }
  }, [payrollSheet, open]);

  // Пересчитываем общую сумму при изменении позиций
  useEffect(() => {
    const total = formData.items.reduce((sum, item) => sum + item.total, 0);
    setFormData(prev => ({ ...prev, totalAmount: total }));
  }, [formData.items]);

  const handleEmployeeChange = (employeeId: string) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    setFormData(prev => ({
      ...prev,
      employeeId,
      employeeName: employee?.name || ""
    }));
  };

  const addItem = () => {
    const newItem: PayrollSheetItem = {
      id: `psi-${Date.now()}`,
      workTypeId: "",
      quantity: 0,
      pricePerUnit: 0,
      total: 0
    };
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const updateItem = (itemId: string, field: keyof PayrollSheetItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          
          // Если изменился тип работы, обновляем цену
          if (field === 'workTypeId') {
            const workType = mockWorkTypes.find(wt => wt.id === value);
            if (workType) {
              updatedItem.pricePerUnit = workType.pricePerUnit;
              updatedItem.total = updatedItem.quantity * workType.pricePerUnit;
            }
          }
          
          // Если изменилось количество, пересчитываем сумму
          if (field === 'quantity') {
            updatedItem.total = updatedItem.pricePerUnit * value;
          }
          
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {payrollSheet ? "Редактировать платежку" : "Создать платежку"}
          </DialogTitle>
          <DialogDescription>
            Создайте начисление заработной платы для сотрудника
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employee">Сотрудник *</Label>
              <Select
                value={formData.employeeId}
                onValueChange={handleEmployeeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сотрудника" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Период *</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start text-left font-normal",
                        !formData.periodStart && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.periodStart ? format(formData.periodStart, "dd MMM yyyy", { locale: ru }) : "От"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.periodStart}
                      onSelect={(date) => date && setFormData(prev => ({ ...prev, periodStart: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start text-left font-normal",
                        !formData.periodEnd && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.periodEnd ? format(formData.periodEnd, "dd MMM yyyy", { locale: ru }) : "До"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.periodEnd}
                      onSelect={(date) => date && setFormData(prev => ({ ...prev, periodEnd: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Позиции */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Позиции начисления</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить позицию
              </Button>
            </div>

            {formData.items.length > 0 && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Вид работы</TableHead>
                      <TableHead>Количество</TableHead>
                      <TableHead>Цена за ед.</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Select
                            value={item.workTypeId}
                            onValueChange={(value) => updateItem(item.id, 'workTypeId', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите вид работы" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockWorkTypes.filter(wt => wt.isActive).map((workType) => (
                                <SelectItem key={workType.id} value={workType.id}>
                                  {workType.name} ({workType.unit})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {formatCurrency(item.pricePerUnit)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {formatCurrency(item.total)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-semibold">
                        Итого:
                      </TableCell>
                      <TableCell className="font-bold text-lg">
                        {formatCurrency(formData.totalAmount)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}

            {formData.items.length === 0 && (
              <div className="text-center py-8 border rounded-md border-dashed">
                <p className="text-muted-foreground">Добавьте позиции для начисления</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit" disabled={!formData.employeeId || formData.items.length === 0}>
              {payrollSheet ? "Сохранить" : "Создать"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};