import { NextResponse } from 'next/server';
import { getPriceSummary } from '@/lib/tests';

type EstimateRequest = {
  testIds?: string[];
};

export async function POST(request: Request) {
  let payload: EstimateRequest;
  try {
    payload = (await request.json()) as EstimateRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const testIds = Array.isArray(payload.testIds) ? payload.testIds : [];
  const summary = getPriceSummary(testIds);

  return NextResponse.json({
    count: summary.tests.length,
    testIds,
    b2bTotal: summary.b2bTotal,
    mrpTotal: summary.mrpTotal,
    savings: summary.savings,
    tests: summary.tests,
  });
}
