import { format } from 'sql-formatter';

export interface TableColumn {
  name: string;
  type: string;
  constraints: string[];
}

export interface Table {
  name: string;
  columns: TableColumn[];
}

export function parseSQL(sql: string): Table[] {
  try {
    const formattedSQL = format(sql, { language: 'postgresql' });
    const tables: Table[] = [];
    
    // Basic regex to match CREATE TABLE statements
    const tableRegex = /CREATE\s+TABLE\s+(\w+)\s*\(([\s\S]*?)\);/gi;
    const columnRegex = /(\w+)\s+(\w+)(\s+[^,]+)?/g;
    
    let match;
    while ((match = tableRegex.exec(sql)) !== null) {
      const tableName = match[1];
      const columnsStr = match[2];
      const columns: TableColumn[] = [];
      
      let columnMatch;
      while ((columnMatch = columnRegex.exec(columnsStr)) !== null) {
        columns.push({
          name: columnMatch[1],
          type: columnMatch[2],
          constraints: columnMatch[3] ? [columnMatch[3].trim()] : []
        });
      }
      
      tables.push({ name: tableName, columns });
    }
    
    return tables;
  } catch (error) {
    console.error('Error parsing SQL:', error);
    return [];
  }
}