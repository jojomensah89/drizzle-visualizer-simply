import { Handle, Position } from 'reactflow';
import { cn } from '@/lib/utils';
import { Key, Circle, Link } from 'lucide-react';

interface SchemaField {
  name: string;
  type: string;
  references?: {
    table: string;
    column: string;
  };
}

interface DatabaseSchemaNodeProps {
  data: {
    label: string;
    columns: SchemaField[];
  };
  isValid?: boolean;
}

export function DatabaseSchemaNode({ data, isValid = true }: DatabaseSchemaNodeProps) {
  return (
    <div className={cn(
      "px-4 py-3 min-w-[200px] rounded-xl bg-card border-2",
      isValid ? "border-border" : "border-destructive"
    )}>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
        <div className="p-1.5 rounded-md bg-primary/10">
          <Key className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-sm">{data.label}</h3>
      </div>
      <div className="space-y-2">
        {data.columns.map((column) => (
          <div key={column.name} className="flex items-center text-sm relative group">
            <div className="flex items-center gap-2 flex-1">
              {column.name === 'id' ? (
                <Key className="w-3.5 h-3.5 text-primary" />
              ) : column.references ? (
                <Link className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-muted-foreground" />
              )}
              <span className="text-muted-foreground">{column.name}</span>
              <span className="text-xs text-primary ml-auto">{column.type}</span>
            </div>
            
            {/* Add handles for primary key (id) columns */}
            {column.name === 'id' && (
              <>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`${column.name}-right`}
                  className="w-3 h-3 -right-1.5 bg-primary border-2 border-background"
                />
                <Handle
                  type="source"
                  position={Position.Left}
                  id={`${column.name}-left`}
                  className="w-3 h-3 -left-1.5 bg-primary border-2 border-background"
                />
              </>
            )}
            
            {/* Add handles for foreign key columns */}
            {column.references && (
              <>
                <Handle
                  type="target"
                  position={Position.Right}
                  id={`${column.name}-right`}
                  className="w-3 h-3 -right-1.5 bg-primary border-2 border-background"
                />
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`${column.name}-left`}
                  className="w-3 h-3 -left-1.5 bg-primary border-2 border-background"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}