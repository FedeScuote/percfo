import { PLData, ParsedCSVData } from '@/types';

export function parseCSV(csvText: string): ParsedCSVData {
  const lines = csvText.trim().split('\n');
  const errors: string[] = [];
  const data: PLData[] = [];

  if (lines.length < 2) {
    errors.push('CSV file must contain at least a header and one data row');
    return { data, errors };
  }

  const header = lines[0].toLowerCase().split(',').map(h => h.trim());
  const expectedHeaders = ['month', 'revenue', 'cogs', 'marketing', 'operations', 'other_expenses'];
  
  // Check if all required headers are present
  const missingHeaders = expectedHeaders.filter(h => !header.includes(h));
  if (missingHeaders.length > 0) {
    errors.push(`Missing required columns: ${missingHeaders.join(', ')}`);
    return { data, errors };
  }

  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map(cell => cell.trim());
    
    if (row.length !== header.length) {
      errors.push(`Row ${i + 1}: Expected ${header.length} columns, got ${row.length}`);
      continue;
    }

    try {
      const monthIndex = header.indexOf('month');
      const revenueIndex = header.indexOf('revenue');
      const cogsIndex = header.indexOf('cogs');
      const marketingIndex = header.indexOf('marketing');
      const operationsIndex = header.indexOf('operations');
      const otherExpensesIndex = header.indexOf('other_expenses');

      const plRow: PLData = {
        month: row[monthIndex],
        revenue: parseFloat(row[revenueIndex]),
        cogs: parseFloat(row[cogsIndex]),
        marketing: parseFloat(row[marketingIndex]),
        operations: parseFloat(row[operationsIndex]),
        otherExpenses: parseFloat(row[otherExpensesIndex])
      };

      // Validate numeric values
      const numericFields = ['revenue', 'cogs', 'marketing', 'operations', 'otherExpenses'] as const;
      for (const field of numericFields) {
        if (isNaN(plRow[field])) {
          errors.push(`Row ${i + 1}: Invalid number for ${field}`);
          break;
        }
      }

      if (!plRow.month) {
        errors.push(`Row ${i + 1}: Month cannot be empty`);
        continue;
      }

      data.push(plRow);
    } catch {
      errors.push(`Row ${i + 1}: Failed to parse data`);
    }
  }

  return { data, errors };
}