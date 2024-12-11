import { useState } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { SchemaGraph } from '@/components/SchemaGraph';
import { ResizablePanels } from '@/components/ResizablePanels';
import { parseSQL } from '@/lib/sqlParser';

const DEFAULT_SQL = `CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL
);

CREATE TABLE rooms (
  id BIGINT PRIMARY KEY,
  topic TEXT,
  user_id UUID REFERENCES users(id)
);

CREATE TABLE rooms_users (
  user_id UUID REFERENCES users(id),
  room_topic TEXT,
  joined_at TIMESTAMP(3),
  PRIMARY KEY (user_id, room_topic)
);`;

export default function Index() {
  const [sql, setSql] = useState(DEFAULT_SQL);
  const { tables, isValid } = parseSQL(sql);

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
            <SchemaGraph tables={tables} isValid={isValid} />
          </div>
        }
      />
    </div>
  );
}