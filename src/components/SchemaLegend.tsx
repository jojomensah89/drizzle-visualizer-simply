import { Key, Circle, Link } from 'lucide-react';

export function SchemaLegend() {
  return (
    <div className="absolute bottom-4 right-4 p-3 rounded-lg bg-card border border-border flex gap-4">
      <div className="flex items-center gap-2">
        <Key className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">Primary Key</span>
      </div>
      <div className="flex items-center gap-2">
        <Link className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Foreign Key</span>
      </div>
      <div className="flex items-center gap-2">
        <Circle className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Column</span>
      </div>
    </div>
  );
}