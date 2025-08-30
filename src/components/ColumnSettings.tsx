import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Settings, GripVertical } from "lucide-react";

export interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
  resizable: boolean;
  sortable: boolean;
}

interface ColumnSettingsProps {
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
}

const ColumnSettings = ({ columns, onColumnsChange }: ColumnSettingsProps) => {
  const [open, setOpen] = useState(false);

  const handleVisibilityChange = (columnId: string, visible: boolean) => {
    const updatedColumns = columns.map(col =>
      col.id === columnId ? { ...col, visible } : col
    );
    onColumnsChange(updatedColumns);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedColumns = Array.from(columns);
    const [reorderedItem] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, reorderedItem);

    onColumnsChange(reorderedColumns);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Столбцы
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-background border border-border shadow-lg z-50" align="end">
        <div className="space-y-4">
          <h4 className="font-medium">Настройка столбцов</h4>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="columns">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {columns.map((column, index) => (
                    <Draggable key={column.id} draggableId={column.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center space-x-2 p-2 rounded border ${
                            snapshot.isDragging ? 'bg-accent' : 'bg-background'
                          }`}
                        >
                          <div {...provided.dragHandleProps} className="cursor-grab">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                          </div>
                          
                          <Checkbox
                            checked={column.visible}
                            onCheckedChange={(checked) =>
                              handleVisibilityChange(column.id, checked as boolean)
                            }
                          />
                          
                          <span className="flex-1 text-sm">{column.label}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const allVisible = columns.map(col => ({ ...col, visible: true }));
                onColumnsChange(allVisible);
              }}
            >
              Показать все
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const allHidden = columns.map(col => ({ ...col, visible: col.id === 'select' || col.id === 'actions' }));
                onColumnsChange(allHidden);
              }}
            >
              Скрыть все
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnSettings;