import Link from 'next/link';
import Image from 'next/image';

const instruments = [
  {
    id: 'autolumo',
    name: 'AutoLumo A1860',
    brand: 'Autobio',
    type: 'Chemiluminescence Immunoassay Analyzer',
    category: 'Immunology',
    description:
      'Our flagship immunology powerhouse. Utilizing state-of-the-art CLIA technology, the AutoLumo A1860 delivers exceptional sensitivity for complex markers — thyroid hormones, vitamins, infectious diseases, and tumor markers — with blazing speed.',
    specs: [
      { label: 'Throughput', value: '180 tests/hr' },
      { label: 'Technology', value: 'CLIA' },
      { label: 'Sample Types', value: 'Serum, Plasma, Urine' },
      { label: 'Menu', value: '100+ parameters' },
    ],
    highlights: [
      'Thyroid & hormone panels',
      'Vitamin B12 & D3 detection',
      'Infectious disease screening',
      'Tumor marker testing',
    ],
    image: '/autolumo_a1860.png',
    accent: '#0d9488',        // teal-600
    accentLight: '#f0fdfa',   // teal-50
    accentMid: '#ccfbf1',     // teal-100
    badge: 'Immunology',
    badgeColor: 'teal',
  },
  {
    id: 'yumizen-c600',
    name: 'Yumizen C600',
    brand: 'HORIBA',
    type: 'Clinical Chemistry Analyzer',
    category: 'Biochemistry',
    description:
      'A high-throughput chemistry workhorse engineered for precision. The Yumizen C600 handles our bulk biochemistry workload — liver panels, kidney function, lipid profiles, and glucose — with unmatched reproducibility.',
    specs: [
      { label: 'Throughput', value: '600 tests/hr' },
      { label: 'Technology', value: 'Spectrophotometry' },
      { label: 'Sample Types', value: 'Serum, Plasma' },
      { label: 'Reagents', value: 'Liquid stable' },
    ],
    highlights: [
      'Liver & kidney function panels',
      'Lipid & cardiac profiles',
      'Diabetes monitoring (HbA1c)',
      'Automated calibration',
    ],
    image: '/yumizen_c600.png',
    accent: '#1d4ed8',        // blue-700
    accentLight: '#eff6ff',   // blue-50
    accentMid: '#dbeafe',     // blue-100
    badge: 'Biochemistry',
    badgeColor: 'blue',
  },
  {
    id: 'pentra-c400',
    name: 'Pentra C400',
    brand: 'HORIBA',
    type: 'Clinical Chemistry Analyzer',
    category: 'Biochemistry',
    description:
      'The Pentra C400 is a high-performance clinical chemistry analyzer that provides unrivaled precision for specialized chemistry profiles. Its continuous random-access architecture ensures that even stat samples get priority processing.',
    specs: [
      { label: 'Throughput', value: '420 tests/hr' },
      { label: 'Technology', value: 'Spectrophotometry' },
      { label: 'Sample Types', value: 'Serum, Plasma, Urine' },
      { label: 'Parameters', value: '55 onboard' },
    ],
    highlights: [
      'Specialized chemistry profiles',
      'Continuous sample loading',
      'High precision photometry',
      'Low sample volume required',
    ],
    image: '/pentra_c400.png',
    accent: '#7c3aed',        // violet-600
    accentLight: '#f5f3ff',   // violet-50
    accentMid: '#ede9fe',     // violet-100
    badge: 'Biochemistry',
    badgeColor: 'violet',
  },
  {
    id: 'yumizen-h500',
    name: 'Yumizen H500',
    brand: 'HORIBA',
    type: 'Hematology Analyzer',
    category: 'Haematology',
    description:
      'The Yumizen H500 is a compact, world-class hematology analyzer designed to provide complete blood count (CBC) with 5-part differential results with high precision and reliability for clinical laboratories.',
    specs: [
      { label: 'Throughput', value: '50 tests/hr' },
      { label: 'Parameters', value: '27 parameters' },
      { label: 'Technology', value: 'Impedance & Flow' },
      { label: 'Sample Vol.', value: '20 µL' },
    ],
    highlights: [
      'CBC with 5-part Diff',
      'Immature cell detection',
      'Automated maintenance',
      'High linearity range',
    ],
    image: '/yumizen_h500.png',
    accent: '#b45309',        // amber-700
    accentLight: '#fffbeb',   // amber-50
    accentMid: '#fef3c7',     // amber-100
    badge: 'Haematology',
    badgeColor: 'amber',
  },
  {
    id: 'yumizen-g200',
    name: 'Yumizen G200',
    brand: 'HORIBA',
    type: 'Coagulation Analyzer',
    category: 'Haematology',
    description:
      'Dedicated coagulation analysis for comprehensive haemostasis testing. The Yumizen coagulation platform offers rapid, reliable clotting cascade results for pre-surgery and anticoagulant therapy monitoring.',
    specs: [
      { label: 'Technology', value: 'Optical & mechanical' },
      { label: 'Tests', value: 'PT, APTT, FIB' },
      { label: 'Channels', value: '2 independent' },
      { label: 'Footprint', value: 'Compact benchtop' },
    ],
    highlights: [
      'PT/INR monitoring',
      'APTT & fibrinogen panels',
      'Pre-operative screening',
      'Anticoagulant monitoring',
    ],
    image: '/yumizen_g200.png',
    accent: '#0369a1',        // sky-700
    accentLight: '#f0f9ff',   // sky-50
    accentMid: '#e0f2fe',     // sky-100
    badge: 'Coagulation',
    badgeColor: 'sky',
  },
];

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  teal:   { bg: 'bg-teal-50',   text: 'text-teal-700',   dot: 'bg-teal-500' },
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-700',   dot: 'bg-blue-500' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
  sky:    { bg: 'bg-sky-50',    text: 'text-sky-700',    dot: 'bg-sky-500' },
  amber:  { bg: 'bg-amber-50',  text: 'text-amber-700',  dot: 'bg-amber-500' },
};

export default function Technology() {
  return (
    <div className="instruments-page">
      {/* ── Hero ── */}
      <section className="inst-hero">
        <div className="inst-hero-bg" aria-hidden="true">
          <div className="inst-hero-orb inst-hero-orb-1" />
          <div className="inst-hero-orb inst-hero-orb-2" />
          <div className="inst-hero-orb inst-hero-orb-3" />
          <div className="inst-hero-grid" />
        </div>
        <div className="inst-hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inst-tag">Technical Infrastructure</span>
          <h1 className="inst-hero-title">
            Instruments of
            <span className="inst-multi-gradient"> Precision</span>
          </h1>
          <p className="inst-hero-sub">
            DDC is equipped with ISO-class diagnostic analyzers — each chosen for accuracy,
            throughput, and clinical breadth — so every result you receive is trustworthy.
          </p>
          <div className="inst-hero-stats">
            {[
              { n: '5', label: 'Analyzer Platforms' },
              { n: '100+', label: 'Tests Available' },
              { n: '600', label: 'Tests / Hour' },
              { n: 'ISO', label: 'Class Standards' },
            ].map((s) => (
              <div key={s.label} className="inst-stat-pill">
                <span className="inst-stat-num">{s.n}</span>
                <span className="inst-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instrument Cards ── */}
      <section className="inst-grid-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inst-section-header">
            <span className="badge badge-blue">Our Fleet</span>
            <h2 className="inst-section-title">Meet the Machines</h2>
            <p className="inst-section-sub">
              Five industry-leading platforms. One diagnostic centre.
            </p>
          </div>

          <div className="inst-cards-grid">
            {instruments.map((inst) => {
              const colors = categoryColors[inst.badgeColor];
              return (
                <article key={inst.id} className="inst-card" style={{ '--accent': inst.accent, '--accent-light': inst.accentLight, '--accent-mid': inst.accentMid } as React.CSSProperties}>
                  {/* Image Panel */}
                  <div className="inst-card-image-wrap">
                    <div className="inst-card-image-bg" />
                    <Image
                      src={inst.image}
                      alt={`${inst.name} – ${inst.type}`}
                      width={400}
                      height={280}
                      className="inst-card-img"
                    />
                    <span className={`inst-cat-badge ${colors.bg} ${colors.text}`}>
                      <span className={`inst-cat-dot ${colors.dot}`} />
                      {inst.badge}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="inst-card-body">
                    <div className="inst-card-brand">{inst.brand}</div>
                    <h3 className="inst-card-name">{inst.name}</h3>
                    <p className="inst-card-type">{inst.type}</p>
                    <p className="inst-card-desc">{inst.description}</p>

                    {/* Specs grid */}
                    <div className="inst-specs-grid">
                      {inst.specs.map((sp) => (
                        <div key={sp.label} className="inst-spec-item">
                          <span className="inst-spec-label">{sp.label}</span>
                          <span className="inst-spec-value">{sp.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul className="inst-highlights">
                      {inst.highlights.map((h) => (
                        <li key={h} className="inst-highlight-item">
                          <span className="inst-check" aria-hidden="true">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why It Matters ── */}
      <section className="inst-why-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inst-why-grid">
            {[
              {
                icon: '⚡',
                title: 'Same-Day Results',
                desc: 'Most panels are ready within hours — not days — because our analyzers run at full capacity throughout the day.',
              },
              {
                icon: '🎯',
                title: 'Clinical Accuracy',
                desc: 'Every machine undergoes daily QC calibration so your results meet international precision standards every time.',
              },
              {
                icon: '🔬',
                title: '100+ Parameters',
                desc: 'From routine blood sugar to niche tumour markers, we cover a comprehensive menu under one roof.',
              },
              {
                icon: '🛡️',
                title: 'ISO-grade Equipment',
                desc: 'Instruments certified by global bodies — ensuring you receive diagnostics that meet the highest clinical benchmarks.',
              },
            ].map((w) => (
              <div key={w.title} className="inst-why-card">
                <span className="inst-why-icon">{w.icon}</span>
                <h3 className="inst-why-title">{w.title}</h3>
                <p className="inst-why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="inst-cta-section">
        <div className="inst-cta-inner max-w-3xl mx-auto px-4 text-center">
          <h2 className="inst-cta-title">Ready to Experience Precision?</h2>
          <p className="inst-cta-sub">
            Book a home collection or walk in to DDC — Moula-Ali, Hyderabad.
          </p>
          <div className="inst-cta-buttons">
            <Link href="/patient-portal" className="inst-btn-primary">
              Book Home Collection
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/test-menu" className="inst-btn-secondary">
              Browse Test Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
