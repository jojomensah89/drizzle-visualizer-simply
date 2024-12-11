import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  ConnectionMode,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Table } from '@/lib/sqlParser';
import { cn } from '@/lib/utils';

interface SchemaGraphProps {
  tables: Table[];
  isValid: boolean;
}

export function SchemaGraph({ tables, isValid }: SchemaGraphProps) {
  const nodes: Node[] = tables.map((table, index) => ({
    id: table.name,
    type: 'default',
    position: { x: 100 + index * 300, y: 100 },
    data: {
      label: (
        <div className="p-4 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h3 className="font-bold">{table.name}</h3>
          </div>
          <div className="space-y-1">
            {table.columns.map((column) => (
              <div key={column.name} className="flex items-center text-sm">
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
              </div>
            ))}
          </div>
        </div>
      ),
    },
    className: cn(
      'border-2',
      isValid ? 'border-border' : 'border-destructive'
    ),
  }));

  const edges: Edge[] = tables.flatMap(table =>
    table.columns
      .filter(column => column.references)
      .map(column => ({
        id: `${table.name}-${column.name}-${column.references!.table}`,
        source: column.references!.table,
        target: table.name,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        className: isValid ? 'stroke-muted-foreground' : 'stroke-destructive',
      }))
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      connectionMode={ConnectionMode.Loose}
      fitView
      className="bg-background"
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}