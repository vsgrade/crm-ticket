import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Edit, Trash2, Eye, FileText, CheckCircle } from "lucide-react";
import { mockPayrollSheets, PayrollSheet } from "@/data/payrollData";
import { PayrollSheetModal } from "./PayrollSheetModal";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const PayrollSheetManager = () => {
  const [payrollSheets, setPayrollSheets] = useState<PayrollSheet[]>(mockPayrollSheets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState<PayrollSheet | undefined>();

  const handleCreate = () => {
    setSelectedSheet(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (sheet: PayrollSheet) => {
    setSelectedSheet(sheet);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPayrollSheets(prev => prev.filter(ps => ps.id !== id));
  };

  const handleApprove = (id: string) => {
    setPayrollSheets(prev => prev.map(ps => 
      ps.id === id ? { ...ps, status: 'approved' as const, updatedAt: new Date() } : ps
    ));
  };

  const handleSave = (sheetData: Omit<PayrollSheet, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    if (selectedSheet) {
      // Редактирование
      setPayrollSheets(prev => prev.map(ps => 
        ps.id === selectedSheet.id 
          ? { ...ps, ...sheetData, updatedAt: new Date() }
          : ps
      ));
    } else {
      // Создание
      const newSheet: PayrollSheet = {
        ...sheetData,
        id: `ps-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "admin"
      };
      setPayrollSheets(prev => [...prev, newSheet]);
    }
    setIsModalOpen(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: PayrollSheet['status']) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Черновик</Badge>;
      case 'approved':
        return <Badge variant="default">Утверждена</Badge>;
      case 'paid':
        return <Badge variant="outline" className="border-green-500 text-green-700">Выплачена</Badge>;
      default:
        return null;
    }
  };

  const totalAmount = payrollSheets.reduce((sum, sheet) => sum + sheet.totalAmount, 0);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{payrollSheets.length}</p>
                <p className="text-xs text-muted-foreground">Всего платежек</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{payrollSheets.filter(ps => ps.status === 'approved').length}</p>
                <p className="text-xs text-muted-foreground">Утверждено</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
                <p className="text-xs text-muted-foreground">Общая сумма</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Платежки</CardTitle>
            <CardDescription>
              Начисления заработной платы сотрудникам
            </CardDescription>
          </div>
          <Button onClick={handleCreate} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Создать платежку
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Сотрудник</TableHead>
                  <TableHead>Период</TableHead>
                  <TableHead>Количество позиций</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Создано</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollSheets.map((sheet) => (
                  <TableRow key={sheet.id}>
                    <TableCell>
                      <div className="font-medium">{sheet.employeeName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(sheet.periodStart, "dd MMM", { locale: ru })} - {format(sheet.periodEnd, "dd MMM yyyy", { locale: ru })}
                      </div>
                    </TableCell>
                    <TableCell>
                      {sheet.items.length} поз.
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(sheet.totalAmount)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(sheet.status)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(sheet.createdAt, "dd MMM yyyy", { locale: ru })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(sheet)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Редактировать
                          </DropdownMenuItem>
                          {sheet.status === 'draft' && (
                            <DropdownMenuItem onClick={() => handleApprove(sheet.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Утвердить
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(sheet.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {payrollSheets.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Eye className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">Платежки не найдены</p>
                        <Button variant="outline" onClick={handleCreate}>
                          Создать первую платежку
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PayrollSheetModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        payrollSheet={selectedSheet}
        onSave={handleSave}
      />
    </>
  );
};