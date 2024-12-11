import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  ConnectionMode,
  MarkerType,
  useNodesState,
  useEdgesState,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Table } from '@/lib/sqlParser';
import { DatabaseSchemaNode } from './DatabaseSchemaNode';
import { SchemaLegend } from './SchemaLegend';
import { useCallback } from 'react';

interface SchemaGraphProps {
  tables: Table[];
  isValid: boolean;
}

const nodeTypes = {
  databaseSchema: DatabaseSchemaNode,
};

// Helper function to create a circular layout
const getCircularPosition = (index: number, total: number, radius: number = 300) => {
  const angle = (index * 2 * Math.PI) / total;
  return {
    x: radius * Math.cos(angle) + radius,
    y: radius * Math.sin(angle) + radius,
  };
};

export function SchemaGraph({ tables, isValid }: SchemaGraphProps) {
  // Create initial nodes with circular layout
  const initialNodes: Node[] = tables.map((table, index) => ({
    id: table.name,
    type: 'databaseSchema',
    position: getCircularPosition(index, tables.length),
    data: {
      label: table.name,
      columns: table.columns,
    },
    className: isValid ? undefined : 'border-destructive',
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const edges: Edge[] = tables.flatMap(table =>
    table.columns
      .filter(column => column.references)
      .map(column => ({
        id: `${table.name}-${column.name}-${column.references!.table}`,
        source: column.references!.table,
        target: table.name,
        sourceHandle: `id-right`,
        targetHandle: `${column.name}-left`,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        className: isValid ? 'stroke-muted-foreground' : 'stroke-destructive',
      }))
  );

  const onLayout = useCallback(() => {
    setNodes((nds) =>
      nds.map((node, index) => ({
        ...node,
        position: getCircularPosition(index, nds.length),
      }))
    );
  }, [setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      onNodesChange={onNodesChange}
      fitView
      className="bg-background"
    >
      <Background />
      <Controls />
      <Panel position="top-right">
        <button
          onClick={onLayout}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
        >
          Auto Layout
        </button>
      </Panel>
      <SchemaLegend />
    </ReactFlow>
  );
}