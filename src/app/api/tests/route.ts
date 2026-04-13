import { NextRequest, NextResponse } from 'next/server';
import { getSearchableTests } from '@/lib/tests';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') ?? '';
  const category = request.nextUrl.searchParams.get('category') ?? 'All';
  const tests = getSearchableTests(query, category);
  return NextResponse.json({ count: tests.length, tests });
}
