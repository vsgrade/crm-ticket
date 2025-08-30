import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface ResizableTableHeaderProps {
  width: number;
  onResize: (newWidth: number) => void;
  onSort?: () => void;
  children: React.ReactNode;
  className?: string;
  resizable?: boolean;
}

const ResizableTableHeader = ({
  width,
  onResize,
  onSort,
  children,
  className = "",
  resizable = true
}: ResizableTableHeaderProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const headerRef = useRef<HTMLTableCellElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!resizable) return;
    
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(width);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const diff = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + diff);
      onResize(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, startX, startWidth, onResize]);

  return (
    <th
      ref={headerRef}
      className={`relative select-none ${className}`}
      style={{ width: `${width}px`, minWidth: `${width}px` }}
    >
      <div className="flex items-center h-full">
        {onSort ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 p-0 flex-1 justify-start"
            onClick={onSort}
          >
            {children}
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ) : (
          <div className="flex-1">{children}</div>
        )}
      </div>
      
      {resizable && (
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-border transition-colors"
          onMouseDown={handleMouseDown}
          style={{ 
            background: isResizing ? 'hsl(var(--border))' : 'transparent'
          }}
        />
      )}
    </th>
  );
};

export default ResizableTableHeader;