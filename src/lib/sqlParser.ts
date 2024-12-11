import { format } from 'sql-formatter';

export interface TableColumn {
  name: string;
  type: string;
  constraints: string[];
  references?: {
    table: string;
    column: string;
  };
}

export interface Table {
  name: string;
  columns: TableColumn[];
}

export function parseSQL(sql: string): { tables: Table[]; isValid: boolean } {
  try {
    const formattedSQL = format(sql, { language: 'postgresql' });
    const tables: Table[] = [];
    
    // Enhanced regex to match CREATE TABLE statements and foreign keys
    const tableRegex = /CREATE\s+TABLE\s+(\w+)\s*\(([\s\S]*?)\);/gi;
    const columnRegex = /(\w+)\s+(\w+)(?:\s+([^,]+))?/g;
    const foreignKeyRegex = /REFERENCES\s+(\w+)\s*\((\w+)\)/i;
    
    let match;
    while ((match = tableRegex.exec(sql)) !== null) {
      const tableName = match[1];
      const columnsStr = match[2];
      const columns: TableColumn[] = [];
      
      let columnMatch;
      while ((columnMatch = columnRegex.exec(columnsStr)) !== null) {
        const constraints = columnMatch[3] ? [columnMatch[3].trim()] : [];
        const column: TableColumn = {
          name: columnMatch[1],
          type: columnMatch[2],
          constraints
        };

        // Check for foreign key references
        const refMatch = columnMatch[3] && columnMatch[3].match(foreignKeyRegex);
        if (refMatch) {
          column.references = {
            table: refMatch[1],
            column: refMatch[2]
          };
        }
        
        columns.push(column);
      }
      
      tables.push({ name: tableName, columns });
    }
    
    return { tables, isValid: true };
  } catch (error) {
    console.error('Error parsing SQL:', error);
    return { tables: [], isValid: false };
  }
}