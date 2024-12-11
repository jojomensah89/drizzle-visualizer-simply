import { useState } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { SchemaGraph } from '@/components/SchemaGraph';
import { ResizablePanels } from '@/components/ResizablePanels';
import { parseSQL } from '@/lib/sqlParser';

const DEFAULT_SQL = `CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  user_id INTEGER REFERENCES users(id)
);`;

export default function Index() {
  const [sql, setSql] = useState(DEFAULT_SQL);
  const tables = parseSQL(sql);

  return (
    <div className="h-screen">
      <ResizablePanels
        left={
          <div className="h-full p-4">
            <CodeEditor value={sql} onChange={(value) => setSql(value || '')} />
          </div>
        }
        right={
          <div className="h-full">
            <SchemaGraph tables={tables} />
          </div>
        }
      />
    </div>
  );
}