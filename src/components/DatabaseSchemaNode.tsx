import { Handle, Position } from 'reactflow';
import { cn } from '@/lib/utils';

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
      "p-4 min-w-[200px] rounded-lg bg-card border-2",
      isValid ? "border-border" : "border-destructive"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <h3 className="font-bold">{data.label}</h3>
      </div>
      <div className="space-y-1">
        {data.columns.map((column) => (
          <div key={column.name} className="flex items-center text-sm relative">
            {column.references ? (
              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 7h10v10H7V7z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
            <span className="text-muted-foreground">{column.name}</span>
            <span className="text-xs text-primary ml-2">{column.type}</span>
            
            {/* Add handle for primary key (id) columns */}
            {column.name === 'id' && (
              <Handle
                type="target"
                position={Position.Left}
                id={column.name}
                className="w-3 h-3 -left-1 bg-primary border-2 border-background"
              />
            )}
            
            {/* Add handle for foreign key columns */}
            {column.references && (
              <Handle
                type="source"
                position={Position.Right}
                id={column.name}
                className="w-3 h-3 -right-1 bg-primary border-2 border-background"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}