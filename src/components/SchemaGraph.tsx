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
import { DatabaseSchemaNode } from './DatabaseSchemaNode';

interface SchemaGraphProps {
  tables: Table[];
  isValid: boolean;
}

const nodeTypes = {
  databaseSchema: DatabaseSchemaNode,
};

export function SchemaGraph({ tables, isValid }: SchemaGraphProps) {
  const nodes: Node[] = tables.map((table, index) => ({
    id: table.name,
    type: 'databaseSchema',
    position: { x: 100 + index * 300, y: 100 },
    data: {
      label: table.name,
      columns: table.columns,
    },
    className: isValid ? undefined : 'border-destructive',
  }));

  const edges: Edge[] = tables.flatMap(table =>
    table.columns
      .filter(column => column.references)
      .map(column => ({
        id: `${table.name}-${column.name}-${column.references!.table}`,
        source: table.name,
        target: column.references!.table,
        sourceHandle: column.name,
        targetHandle: 'id',
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
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      fitView
      className="bg-background"
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}