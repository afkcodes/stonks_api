import { JSDOM } from 'jsdom';

interface TableData {
  metric: string;
  unit: string;
  values: (number | string)[];
}

interface TableResult {
  headers: string[];
  data: TableData[];
}

interface Section {
  [periodKey: string]: string[] | TableData[] | Record<string, any> | undefined;
  headers?: string[];
  data: TableData[];
  notes?: Record<string, any>;
}

interface JsonOutput {
  [sectionKey: string]: Section;
}

// Generic function to parse HTML tables and generate JSON
function extractTableDataToJson(htmlString: string, tableSelector = '.beta-table'): JsonOutput {
  // Parse HTML string into DOM using jsdom
  const { window } = new JSDOM(htmlString);
  const { document: doc } = window;

  // Helper function to clean and parse values
  const parseValue = (text: string, unit: string): number | string => {
    const cleaned = text.trim().replace(/,/g, '');
    if (unit === '%' || unit === 'x' || unit === 'Rs') {
      return Number.isNaN(cleaned) ? cleaned : Number.parseFloat(cleaned);
    }
    return cleaned; // Return as string for non-numeric units (e.g., 'm', 'Days')
  };

  // Helper function to extract notes from nearby elements
  const extractNotes = (table: HTMLTableElement): Record<string, any> => {
    const notes: Record<string, any> = {};
    const nearbyText = table.parentElement?.querySelectorAll('.write small, .backlink small') || [];
    nearbyText.forEach((el: Element) => {
      const text = el.textContent?.trim() || '';
      if (text.includes('Consolidated')) {
        notes.consolidated = true;
      }
      if (text.includes('Interim results')) {
        notes.interim_results = text.match(/Interim results.*/)?.[0];
      }
      if (text.includes('Source:')) {
        notes.source = text.replace('Source:', '').trim();
      }
      if (
        el.parentElement?.classList.contains('write') &&
        !text.includes('Consolidated') &&
        !text.includes('Source:')
      ) {
        notes.description = text;
      }
    });
    return notes;
  };

  // Helper function to extract data from a single table
  const extractTable = (table: HTMLTableElement): TableResult => {
    const headers: string[] = Array.from(table.querySelectorAll('thead tr th'))
      .slice(2) // Skip metric and unit columns
      .map((th) => (th as HTMLTableCellElement).textContent?.trim() || '');

    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const data: TableData[] = rows.map((row) => {
      const cells = Array.from((row as HTMLTableRowElement).querySelectorAll('td'));
      const metric = cells[0].textContent?.trim() || '';
      const unit = cells[1].textContent?.trim() || '';
      const values = cells
        .slice(2)
        .map((cell: HTMLTableCellElement) => parseValue(cell.textContent || '', unit));
      return { metric, unit, values };
    });

    return { headers, data };
  };

  // Find all tables matching the selector
  const tables: HTMLTableElement[] = Array.from(doc.querySelectorAll(tableSelector));
  const result: JsonOutput = {};

  tables.forEach((table: HTMLTableElement) => {
    const tableId: string = table.id || `unknown_table_${Math.random().toString(36).substr(2, 9)}`;
    const periodKey: string =
      table
        .querySelector('thead th:first-child')
        ?.textContent?.trim()
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/\./g, '') || 'periods';

    const { headers, data } = extractTable(table);
    const notes = extractNotes(table);

    // Generate a section key
    let sectionKey: string = tableId
      .replace(/^tbl(Annl)?/, '')
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '')
      .replace(/_+/g, '_');

    // Map specific table IDs to desired section keys
    const sectionKeyMap: Record<string, string> = {
      tblQtr: 'quarterly',
      tblAnnlIncome: 'profit_and_loss',
      tblCompound: 'long_term_track_record',
      tblAnnlBalance: 'balance_sheet',
      tblAnnlKeyRatio: 'key_ratios',
      tblAnnlCash: 'cash_flow',
    };
    sectionKey = sectionKeyMap[tableId] || sectionKey;

    result[sectionKey] = {
      [periodKey]: headers,
      data,
      notes: Object.keys(notes).length > 0 ? notes : undefined,
    };
  });

  return result;
}

function processHtml(htmlString: string, tableSelector = '.beta-table'): string {
  const jsonData: JsonOutput = extractTableDataToJson(htmlString, tableSelector);
  return JSON.stringify(
    jsonData,
    (_key, value) => {
      // Remove undefined notes to clean up output
      if (value === undefined) return undefined;
      return value;
    },
    2,
  );
}

export { extractTableDataToJson, processHtml };
