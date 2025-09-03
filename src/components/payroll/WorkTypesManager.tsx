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
import { Plus, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { mockWorkTypes, WorkType } from "@/data/payrollData";
import { WorkTypeModal } from "./WorkTypeModal";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const WorkTypesManager = () => {
  const [workTypes, setWorkTypes] = useState<WorkType[]>(mockWorkTypes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkType, setSelectedWorkType] = useState<WorkType | undefined>();

  const handleCreate = () => {
    setSelectedWorkType(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (workType: WorkType) => {
    setSelectedWorkType(workType);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setWorkTypes(prev => prev.filter(wt => wt.id !== id));
  };

  const handleSave = (workTypeData: Omit<WorkType, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedWorkType) {
      // Редактирование
      setWorkTypes(prev => prev.map(wt => 
        wt.id === selectedWorkType.id 
          ? { ...wt, ...workTypeData, updatedAt: new Date() }
          : wt
      ));
    } else {
      // Создание
      const newWorkType: WorkType = {
        ...workTypeData,
        id: `wt-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setWorkTypes(prev => [...prev, newWorkType]);
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

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Виды работ</CardTitle>
            <CardDescription>
              Управление расценками за различные виды выполняемых работ
            </CardDescription>
          </div>
          <Button onClick={handleCreate} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Добавить вид работы
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Единица измерения</TableHead>
                  <TableHead>Цена за единицу</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Обновлено</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workTypes.map((workType) => (
                  <TableRow key={workType.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{workType.name}</div>
                        {workType.description && (
                          <div className="text-sm text-muted-foreground">
                            {workType.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{workType.unit}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(workType.pricePerUnit)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={workType.isActive ? "default" : "secondary"}>
                        {workType.isActive ? "Активен" : "Неактивен"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(workType.updatedAt, "dd MMM yyyy", { locale: ru })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(workType)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(workType.id)}
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
                {workTypes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Eye className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">Виды работ не найдены</p>
                        <Button variant="outline" onClick={handleCreate}>
                          Создать первый вид работы
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

      <WorkTypeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        workType={selectedWorkType}
        onSave={handleSave}
      />
    </>
  );
};