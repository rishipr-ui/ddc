/**
 * PDF Metadata and Utilities
 */

export const PDF_METADATA = {
  name: 'Test Catalog',
  filename: 'ddc-directory-services-01.pdf',
  path: '/brochures/ddc-directory-services-01.pdf',
  size: '503 KB',
  sizeBytes: 515574,
  lastUpdated: 'March 15, 2026',
  testCount: 300,
  description: 'Complete test catalog with pricing, sample requirements, and turnaround times',
};

export function getPDFDownloadUrl() {
  return PDF_METADATA.path;
}

export function formatPDFSize(bytes: number): string {
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${Math.round(kb)} KB`;
  }
  const mb = kb / 1024;
  return `${(mb).toFixed(1)} MB`;
}

export const PDF_BENEFITS = [
  {
    icon: 'list',
    title: '300+ Tests',
    description: 'Complete catalog of all tests across all departments',
  },
  {
    icon: 'money',
    title: 'B2B & MRP Pricing',
    description: 'Corporate and retail pricing for every test',
  },
  {
    icon: 'droplet',
    title: 'Sample Information',
    description: 'Sample types, preparation, and storage details',
  },
  {
    icon: 'clock',
    title: 'Turnaround Times',
    description: 'Know when results will be ready',
  },
];
