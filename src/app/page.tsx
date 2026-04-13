import Link from 'next/link';
import { TEST_COUNT } from '@/lib/tests';
import HeroCarousel from '@/components/HeroCarousel';

const stats = [
  { label: 'Tests Available', value: `${TEST_COUNT}+` },
  { label: 'Diagnostic Catalog', value: 'Comprehensive' },
  { label: 'Turnaround', value: '10-24 Hours' },
  { label: 'Location', value: 'Moula-Ali' },
];

const services = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Expert Team',
    desc: 'Certified doctors and analysts ensuring the highest standards of diagnostic accuracy.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Same Day Results',
    desc: 'Most tests are processed and reported within 10-24 hours for timely clinical decisions.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Home Collection',
    desc: 'Convenient sample collection from your home by trained, professional phlebotomists.',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <HeroCarousel />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Moula-Ali, Hyderabad
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Darithri{' '}
                <span className="gradient-text">Diagnostic</span>
                <br />
                Centre
              </h1>
              <p className="mt-4 text-xl text-blue-600 font-bold tracking-wide uppercase">
                Advanced Clinical Excellence. Precise Results. Every Time.
              </p>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                State-of-the-art laboratory technology featuring <strong className="text-slate-800">Horiba Yumizen C600</strong>, <strong className="text-slate-800">Pentra C400</strong> & <strong className="text-slate-800">AutoLumo A1860</strong> for accurate, high-speed test results.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <Link
                  href="/patient-portal"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Home Collection
                </Link>
                <a
                  href="tel:+918897931005"
                  className="flex items-center gap-2 bg-white text-blue-700 border-2 border-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-sm"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call: +91 88979 31005
                </a>
                <Link
                  href="/test-menu"
                  className="flex items-center gap-2 bg-white text-slate-600 border border-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  View Test Menu
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Stats / Visual */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="card p-6">
                  <p className="text-3xl font-extrabold text-blue-600">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge badge-blue mb-3">What We Offer</span>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Comprehensive Diagnostic Services
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              From routine blood tests to complex immunological assays — all under one roof.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="card p-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Visit Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge badge-cyan mb-4">Find Us</span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">
                Visit Our Centre
              </h2>
              <p className="text-lg text-slate-500 mb-8">
                Conveniently located in Moula-Ali. Walk in for tests or book a home collection.
              </p>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Darithri Diagnostic Centre</p>
                  <p className="text-slate-500 text-sm mt-1">B-16/1, Ground floor, IDA,<br />Moula-Ali, Hyderabad-500040<br />Telangana, India</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/patient-portal"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                >
                  Book Appointment
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Map placeholder with styled overlay */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg h-72 bg-gradient-to-br from-blue-100 via-cyan-50 to-slate-100 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-700">Moula-Ali, Hyderabad</p>
                <p className="text-sm text-slate-500">B-16/1, IDA, Hyderabad-500040</p>
              </div>
              <a
                href="https://maps.app.goo.gl/8m84ybQeQ8MyKzB86"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-white text-blue-600 border border-blue-200 px-4 py-1.5 rounded-full hover:bg-blue-50 font-medium transition-all"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge badge-cyan mb-3">Resources</span>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Browse Tests and Prices Online
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              View our complete list of tests, sample requirements, turnaround times, and prices directly on this website.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left: Features */}
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                <div>
                  <h3 className="font-semibold text-slate-900">300+ Laboratory Tests</h3>
                  <p className="text-sm text-slate-500 mt-1">Complete list across all departments and categories.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                <div>
                  <h3 className="font-semibold text-slate-900">Sample & Prep Info</h3>
                  <p className="text-sm text-slate-500 mt-1">Sample types, preparation guidelines, and storage details.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                <div>
                  <h3 className="font-semibold text-slate-900">Turnaround Times</h3>
                  <p className="text-sm text-slate-500 mt-1">Know when results will be ready for each test.</p>
                </div>
              </div>
            </div>

            {/* Right: Online Access Card */}
            <div className="card p-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col justify-center">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Online Price List</h3>
                <p className="text-sm text-slate-600 mt-2">Customer access is view-only on the website.</p>
              </div>
              
              <div className="space-y-3 mb-8 bg-white bg-opacity-60 rounded-lg p-4">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Price visibility</strong> for all listed tests</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span><strong>300+</strong> tests included</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Complete <strong>test details</strong> online</span>
                </div>
              </div>
              <Link
                href="/test-menu"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all text-center"
              >
                Open Test Menu
              </Link>
              <p className="text-xs text-slate-600 text-center mt-4">Downloads are disabled for customer access.</p>
            </div>
          </div>

          {/* When to use each option */}
          <div className="border border-slate-200 rounded-xl p-6 bg-white">
            <h3 className="font-bold text-slate-900 mb-4">Which option should you use?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Online Search
                </h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>✓ Find specific tests quickly</li>
                  <li>✓ Filter by category</li>
                  <li>✓ Check test details instantly</li>
                  <li>✓ Book directly</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-600 mb-2 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6" />
                  </svg>
                  Online Price View
                </h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>✓ View full test list on site</li>
                  <li>✓ See MRP values instantly</li>
                  <li>✓ Search and filter live</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4" />
                  </svg>
                  Print Page
                </h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>✓ Print filtered results</li>
                  <li>✓ Custom selection</li>
                  <li>✓ Clear details shown</li>
                  <li>✓ Share with team</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
