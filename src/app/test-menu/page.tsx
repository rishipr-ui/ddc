"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  TEST_DATABASE,
  categoryColors,
  getSearchableTests,
  tatColors,
} from '@/lib/tests';

function formatPrice(value: number) {
  return `Rs ${value.toLocaleString('en-IN')}`;
}

export default function TestMenu() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(TEST_DATABASE.map((test) => test.category))).sort();
    const otherCats = uniqueCategories.filter(c => c !== 'Profiles');
    const profilesExist = uniqueCategories.includes('Profiles');
    return ['All', ...(profilesExist ? ['Profiles'] : []), ...otherCats];
  }, []);

  const filteredTests = getSearchableTests(searchTerm, selectedCategory);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="badge badge-blue mb-4">Diagnostics</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Diagnostic Test Menu
          </h1>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            Search by test name, code, or sample type. View requirements, turnaround times, and details for each test.
          </p>
        </div>
      </section>

      <section className="py-16 section-alt min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by code, name, sample..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setExpandedId(null);
                }}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">Filter by Category</p>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setExpandedId(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md hover:shadow-lg'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400 hover:text-blue-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <p className="text-sm font-medium text-slate-600">
                Found <span className="font-bold text-slate-900">{filteredTests.length}</span> test{filteredTests.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
              Price list is view-only. Download and export options are disabled for customer access.
            </div>
          </div>

          <div className="space-y-4">
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => {
                const isExpanded = expandedId === test.id;
                return (
                  <div
                    key={test.id}
                    className={`card overflow-hidden transition-all duration-200 ${isExpanded ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
                  >
                    <button
                      onClick={() => handleToggle(test.id)}
                      className="w-full text-left p-6 flex flex-col gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="min-w-0 flex-grow">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{test.code}</p>
                          <p className="text-lg font-bold text-slate-900 mt-1">{test.name}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap justify-start sm:justify-end">
                          <span className={`badge text-xs ${categoryColors[test.category] ?? 'bg-slate-100 text-slate-700'}`}>
                            {test.category}
                          </span>
                          <span className={`badge text-xs ${tatColors[test.tat] ?? 'bg-slate-100 text-slate-700'}`}>
                            {test.tat}
                          </span>
                          {test.preparation && test.preparation !== 'Preparation may vary by clinical context. Please follow lab instructions.' && (
                            <span className="badge text-xs bg-orange-100 text-orange-700 font-semibold">⚠ Required</span>
                          )}
                          <span className="badge text-xs bg-blue-100 text-blue-700 font-semibold">MRP {formatPrice(test.mrpPrice)}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1"><span className="font-medium">Sample:</span> {test.sampleType}</span>
                        <span className="flex items-center gap-1"><span className="font-medium">Method:</span> {test.methodology}</span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50 px-6 py-6">
                        <div className="grid sm:grid-cols-3 gap-5 mb-6">
                          <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sample Type</p>
                            <p className="text-base font-semibold text-slate-900 mt-2">{test.sampleType}</p>
                          </div>
                          <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Turnaround Time</p>
                            <p className="text-base font-semibold text-slate-900 mt-2">{test.tat}</p>
                          </div>
                          <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pricing</p>
                            <p className="text-base font-semibold text-slate-900 mt-2">MRP: {formatPrice(test.mrpPrice)}</p>
                          </div>
                        </div>

                        {/* Preparation Info */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                          <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">⚠ Preparation Required</p>
                          <p className="text-sm text-amber-900">{test.preparation}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            href={`/patient-portal?test=${test.id}`}
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                          >
                            Book This Test
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="card p-16 text-center">
                <div className="mb-4">
                  <svg className="h-12 w-12 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-bold text-slate-800 text-lg">No tests found</p>
                <p className="text-slate-500 mt-2">Try adjusting your search or filter to find what you&apos;re looking for.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
