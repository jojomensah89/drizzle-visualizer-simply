import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Table } from '@/lib/sqlParser';

interface SchemaGraphProps {
  tables: Table[];
}

export function SchemaGraph({ tables }: SchemaGraphProps) {
  const nodes: Node[] = tables.map((table, index) => ({
    id: table.name,
    type: 'default',
    position: { x: 100 + index * 250, y: 100 },
    data: {
      label: (
        <div className="p-4">
          <h3 className="font-bold mb-2">{table.name}</h3>
          <div className="space-y-1">
            {table.columns.map((column) => (
              <div key={column.name} className="text-sm">
                <span className="text-muted-foreground">{column.name}</span>
                <span className="text-xs text-primary ml-2">{column.type}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  }));

  const edges: Edge[] = [];

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