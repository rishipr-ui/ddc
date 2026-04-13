import catalog from '@/data/ddc-tests.json';

export type TestItem = {
  id: string;
  serial: number;
  code: string;
  name: string;
  category: string;
  department: string;
  methodology: string;
  sampleType: string;
  storageTemp: string;
  schedule: string;
  tat: string;
  b2bPrice: number;
  mrpPrice: number;
  description: string;
  details: string;
  preparation: string;
};

const PREPARATION_DEFAULT = 'Preparation may vary by clinical context. Please follow lab instructions.';

type CatalogRow = Omit<TestItem, 'description' | 'details' | 'preparation' | 'b2bPrice' | 'mrpPrice'> & {
  b2bPrice: number | string;
  mrpPrice: number | string;
};

function normalizePrice(value: number | string) {
  const numericValue = typeof value === 'number' ? value : Number.parseFloat(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export const TEST_DATABASE: TestItem[] = (catalog as CatalogRow[])
  .map((item) => ({
    ...item,
    b2bPrice: normalizePrice(item.b2bPrice),
    mrpPrice: normalizePrice(item.mrpPrice),
    description: `${item.department} test. Sample: ${item.sampleType}. Reported in ${item.tat}.`,
    details: `Method: ${item.methodology}. Storage: ${item.storageTemp}. Schedule: ${item.schedule}.`,
    preparation: PREPARATION_DEFAULT,
  }))
  .sort((a, b) => {
    if (a.category === 'Profiles' && b.category !== 'Profiles') return -1;
    if (a.category !== 'Profiles' && b.category === 'Profiles') return 1;
    return 0;
  });

export const TEST_COUNT = TEST_DATABASE.length;

export const categoryColors: Record<string, string> = {
  Profiles: 'bg-indigo-600 text-white font-bold',
  Biochemistry: 'bg-blue-50 text-blue-700',
  Immunology: 'bg-violet-50 text-violet-700',
  Serology: 'bg-cyan-50 text-cyan-700',
  Haematology: 'bg-rose-50 text-rose-700',
  Immunohaematology: 'bg-amber-50 text-amber-700',
  Cytology: 'bg-emerald-50 text-emerald-700',
  'Clinical Pathology': 'bg-indigo-50 text-indigo-700',
  Other: 'bg-slate-100 text-slate-700',
};

export const tatColors: Record<string, string> = {
  '10 hours': 'bg-green-50 text-green-700',
  '24 hours': 'bg-amber-50 text-amber-700',
  NA: 'bg-slate-100 text-slate-700',
};

export function getTestById(id: string): TestItem | undefined {
  return TEST_DATABASE.find((test) => test.id === id);
}

export function getTestsByIds(ids: string[]): TestItem[] {
  const selected = new Set(ids);
  return TEST_DATABASE.filter((test) => selected.has(test.id));
}

export function getSearchableTests(query: string, category: string): TestItem[] {
  const search = query.trim().toLowerCase();
  return TEST_DATABASE.filter((test) => {
    const matchesCategory = category === 'All' || test.category === category;
    if (!search) return matchesCategory;
    return (
      matchesCategory &&
      (test.name.toLowerCase().includes(search) ||
        test.code.toLowerCase().includes(search) ||
        test.sampleType.toLowerCase().includes(search))
    );
  });
}

export function getPriceSummary(testIds: string[]) {
  const tests = getTestsByIds(testIds);
  const b2bTotal = tests.reduce((sum, test) => sum + test.b2bPrice, 0);
  const mrpTotal = tests.reduce((sum, test) => sum + test.mrpPrice, 0);
  return { tests, b2bTotal, mrpTotal, savings: mrpTotal - b2bTotal };
}
