"use client";

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  TEST_DATABASE,
  categoryColors,
  getPriceSummary,
  getTestsByIds,
} from '@/lib/tests';

type Tab = 'book' | 'reports';
type SlotStatus = 'available' | 'few' | 'booked';

type Slot = {
  id: string;
  label: string;
  time: string;
  status: SlotStatus;
};

const SLOT_TEMPLATES = [
  { id: 'morning', label: 'Morning', time: '8:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 4:00 PM' },
  { id: 'evening', label: 'Evening', time: '4:00 PM - 8:00 PM' },
];

function hashStr(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (Math.imul(31, hash) + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getSlotsForDate(date: string): Slot[] {
  const today = new Date().toISOString().split('T')[0];
  const currentHour = new Date().getHours();

  return SLOT_TEMPLATES.map((slot) => {
    if (date === today) {
      if (slot.id === 'morning' && currentHour >= 12) return { ...slot, status: 'booked' };
      if (slot.id === 'afternoon' && currentHour >= 16) return { ...slot, status: 'booked' };
      if (slot.id === 'evening' && currentHour >= 20) return { ...slot, status: 'booked' };
    }

    const score = hashStr(`${date}-${slot.id}`) % 10;
    if (score <= 1) return { ...slot, status: 'booked' };
    if (score <= 3) return { ...slot, status: 'few' };
    return { ...slot, status: 'available' };
  });
}

const statusClasses: Record<SlotStatus, string> = {
  available: 'border-green-300 bg-green-50 hover:bg-green-100 cursor-pointer',
  few: 'border-amber-300 bg-amber-50 hover:bg-amber-100 cursor-pointer',
  booked: 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed',
};

function currency(value: number) {
  return `Rs ${value.toLocaleString('en-IN')}`;
}

function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedCode = searchParams.get('test');

  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);
  const [testSearch, setTestSearch] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    date: '',
    notes: '',
  });

  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedCode && !selectedTestIds.includes(preselectedCode)) {
      setSelectedTestIds([preselectedCode]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselectedCode]);

  useEffect(() => {
    if (!form.date) {
      setSlots([]);
      setSelectedSlot(null);
      return;
    }

    setLoadingSlots(true);
    const timer = setTimeout(() => {
      setSlots(getSlotsForDate(form.date));
      setSelectedSlot(null);
      setLoadingSlots(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [form.date]);

  const filteredTests = useMemo(() => {
    const search = testSearch.toLowerCase();
    if (!search) return TEST_DATABASE;
    return TEST_DATABASE.filter(
      (test) =>
        test.name.toLowerCase().includes(search) ||
        test.code.toLowerCase().includes(search) ||
        test.sampleType.toLowerCase().includes(search)
    );
  }, [testSearch]);

  const selectedTests = getTestsByIds(selectedTestIds);
  const summary = getPriceSummary(selectedTestIds);

  const toggleTest = (id: string) => {
    setSelectedTestIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.firstName.trim()) nextErrors.firstName = 'Required';
    if (!form.lastName.trim()) nextErrors.lastName = 'Required';
    if (!/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, ''))) nextErrors.phone = 'Enter a valid number';
    if (!form.address.trim()) nextErrors.address = 'Required';
    if (!form.date) nextErrors.date = 'Required';
    if (!selectedSlot) nextErrors.slot = 'Select a time slot';
    if (selectedTestIds.length === 0) nextErrors.tests = 'Select at least one test';
    return nextErrors;
  };

  const buildWhatsAppUrl = () => {
    const slotLabel = SLOT_TEMPLATES.find((s) => s.id === selectedSlot)?.label ?? selectedSlot;
    const slotTime  = SLOT_TEMPLATES.find((s) => s.id === selectedSlot)?.time  ?? '';
    const testList  = selectedTests.map((t) => `  - ${t.name} (${t.code})`).join('\n');
    const message = [
      '*New Home Collection Booking - Darithri Diagnostic Centre*',
      '',
      `*Patient:* ${form.firstName} ${form.lastName}`,
      `*Phone:* ${form.phone}`,
      `*Address:* ${form.address}`,
      `*Date:* ${form.date}`,
      `*Slot:* ${slotLabel} (${slotTime})`,
      '',
      `*Tests Requested (${selectedTests.length}):*`,
      testList,
      '',
      `*B2B Total:* ${currency(summary.b2bTotal)}`,
      `*MRP Total:* ${currency(summary.mrpTotal)}`,
      `*Savings:* ${currency(summary.savings)}`,
      form.notes ? `\n*Notes:* ${form.notes}` : '',
    ].filter(Boolean).join('\n');
    return `https://wa.me/918897931005?text=${encodeURIComponent(message)}`;
  };

  const whatsappUrl = buildWhatsAppUrl();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Booking Sent via WhatsApp!</h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Thank you, {form.firstName}. Your booking details have been sent to our team on WhatsApp. We will contact you at {form.phone} to confirm your appointment on {form.date}.
        </p>
        <div className="mt-6 max-w-lg mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left space-y-3">
          <p className="text-sm font-semibold text-slate-700">Billing Reference</p>
          <p className="text-sm text-slate-600">Tests: {summary.tests.length}</p>
          <p className="text-sm text-slate-600">B2B Total: {currency(summary.b2bTotal)}</p>
          <p className="text-sm text-slate-600">MRP Total: {currency(summary.mrpTotal)}</p>
          <p className="text-sm text-green-700 font-semibold">Savings vs MRP: {currency(summary.savings)}</p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Open WhatsApp
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedTestIds([]);
              setSelectedSlot(null);
              setForm({ firstName: '', lastName: '', phone: '', address: '', date: '', notes: '' });
            }}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Schedule a Home Collection</h2>
      <p className="text-sm text-slate-500 mb-6">Select tests and confirm patient details.</p>

      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-1">Select Tests *</label>

        {selectedTests.length > 0 && (
          <div className="space-y-2 mb-3">
            {selectedTests.map((test) => (
              <div key={test.id} className="rounded-xl border border-blue-100 bg-blue-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-500">{test.code}</p>
                    <p className="text-sm font-semibold text-slate-800">{test.name}</p>
                    <p className="text-xs text-slate-500 mt-1">Sample: {test.sampleType} | TAT: {test.tat}</p>
                  </div>
                  <button type="button" onClick={() => toggleTest(test.id)} className="text-xs text-blue-700 font-semibold">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowPicker((value) => !value)}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm ${
            errors.tests ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white hover:border-blue-400'
          }`}
        >
          <span className={selectedTestIds.length === 0 ? 'text-slate-400' : 'text-slate-700'}>
            {selectedTestIds.length === 0 ? 'Choose one or more tests...' : `${selectedTestIds.length} selected`}
          </span>
          <span className="text-slate-500">{showPicker ? 'Hide' : 'Select'}</span>
        </button>
        {errors.tests && <p className="text-xs text-red-500 mt-1">{errors.tests}</p>}

        {showPicker && (
          <div className="mt-2 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            <div className="p-3 border-b border-slate-100">
              <input
                type="text"
                value={testSearch}
                onChange={(event) => setTestSearch(event.target.value)}
                placeholder="Search by code, name, sample"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <ul className="max-h-64 overflow-y-auto divide-y divide-slate-50">
              {filteredTests.map((test) => {
                const checked = selectedTestIds.includes(test.id);
                return (
                  <li key={test.id}>
                    <button
                      type="button"
                      onClick={() => toggleTest(test.id)}
                      className={`w-full px-4 py-3 text-left hover:bg-slate-50 ${checked ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs text-slate-500">{test.code}</p>
                          <p className="text-sm font-medium text-slate-800">{test.name}</p>
                          <p className="text-xs text-slate-500">{test.sampleType} | {test.tat}</p>
                        </div>
                        <div className="text-right">
                          <span className={`badge text-xs ${categoryColors[test.category] ?? 'bg-slate-100 text-slate-700'}`}>
                            {test.category}
                          </span>
                          <p className="text-xs text-slate-600 mt-1">MRP {currency(test.mrpPrice)}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {selectedTests.length > 0 && (
        <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-700 mb-2">Price Reference</p>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <p className="text-slate-600">B2B Total: <span className="font-semibold text-slate-800">{currency(summary.b2bTotal)}</span></p>
            <p className="text-slate-600">MRP Total: <span className="font-semibold text-slate-800">{currency(summary.mrpTotal)}</span></p>
            <p className="text-green-700">Savings: <span className="font-semibold">{currency(summary.savings)}</span></p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
          <input
            value={form.firstName}
            onChange={(event) => setForm({ ...form, firstName: event.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
          <input
            value={form.lastName}
            onChange={(event) => setForm({ ...form, lastName: event.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
          <input
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Collection Address *</label>
          <textarea
            rows={2}
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"
          />
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date *</label>
        <input
          type="date"
          min={new Date().toISOString().split('T')[0]}
          value={form.date}
          onChange={(event) => setForm({ ...form, date: event.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
        />
        {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}

        {form.date && (
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-700 mb-3">Available Time Slots *</p>
            {loadingSlots ? (
              <p className="text-sm text-slate-500">Checking available slots...</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {slots.map((slot) => {
                  const disabled = slot.status === 'booked';
                  const selected = selectedSlot === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`rounded-2xl border px-3 py-3 text-center text-sm ${statusClasses[slot.status]} ${
                        selected ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <p className="font-semibold">{slot.label}</p>
                      <p className="text-xs">{slot.time}</p>
                    </button>
                  );
                })}
              </div>
            )}
            {errors.slot && !loadingSlots && <p className="text-xs text-red-500 mt-2">{errors.slot}</p>}
          </div>
        )}
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes</label>
        <textarea
          rows={2}
          value={form.notes}
          onChange={(event) => setForm({ ...form, notes: event.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700"
      >
        Confirm Booking
      </button>
    </form>
  );
}

function ReportsForm() {
  const [form, setForm] = useState({ phone: '', patientId: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searched, setSearched] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, ''))) nextErrors.phone = 'Enter a valid number';
    if (!form.patientId.trim()) nextErrors.patientId = 'Required';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSearched(true);
  };

  if (searched) {
    return (
      <div className="text-center py-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No reports found yet</h3>
        <p className="text-sm text-slate-500">Reports for {form.patientId} may still be processing.</p>
        <button
          onClick={() => {
            setSearched(false);
            setForm({ phone: '', patientId: '' });
          }}
          className="mt-4 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">View Your Reports</h2>
      <p className="text-sm text-slate-500">Use your registered mobile number and patient ID.</p>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Registered Mobile Number *</label>
        <input
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Patient ID or Bill Number *</label>
        <input
          value={form.patientId}
          onChange={(event) => setForm({ ...form, patientId: event.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
        />
        {errors.patientId && <p className="text-xs text-red-500 mt-1">{errors.patientId}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700"
      >
        View Reports
      </button>
    </form>
  );
}

function PortalContent() {
  const [activeTab, setActiveTab] = useState<Tab>('book');

  return (
    <div>
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="badge badge-blue mb-4">Patient Portal</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Patient Portal</h1>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            Book a home sample collection or access your diagnostic reports.
          </p>
        </div>
      </section>

      <section className="py-12 section-alt min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-100 rounded-2xl p-1 flex gap-1 mb-8">
            <button
              onClick={() => setActiveTab('book')}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold ${
                activeTab === 'book' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              Book Collection
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold ${
                activeTab === 'reports' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              View Reports
            </button>
          </div>

          <div className="card p-8">{activeTab === 'book' ? <BookingForm /> : <ReportsForm />}</div>

          <div className="mt-6 text-center">
            <Link
              href="/test-menu"
              className="inline-flex items-center gap-2 text-sm text-blue-700 font-semibold hover:text-blue-900"
            >
              Browse full test catalog and prices
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PatientPortal() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>}>
      <PortalContent />
    </Suspense>
  );
}
