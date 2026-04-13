/**
 * Export utilities intentionally disabled for customer-facing build.
 */

export interface TestItem {
  id: string;
  code: string;
  name: string;
  category: string;
  sampleType: string;
  tat: string;
  b2bPrice: number;
  mrpPrice: number;
  preparation?: string;
}

export function downloadFilteredPDF(tests: TestItem[], filterName: string) {
  console.info('downloadFilteredPDF disabled', { totalTests: tests.length, filterName });
}

export function exportTestsToCSV(tests: TestItem[], filename = 'tests.csv') {
  console.info('exportTestsToCSV disabled', { totalTests: tests.length, filename });
}

export function exportTestsToText(tests: TestItem[], filename = 'tests.txt') {
  console.info('exportTestsToText disabled', { totalTests: tests.length, filename });
}
