import Link from 'next/link';

export default function About() {
  const whyChoose = [
    { label: 'Advanced Tech', desc: 'Cutting-edge technology for unmatched accuracy' },
    { label: 'Expert Team', desc: 'Skilled phlebotomists & certified lab technicians' },
    { label: 'Quality Control', desc: 'Strict calibration and quality assurance protocols' },
    { label: 'Fast Results', desc: 'Same-day results for most biochemistry tests' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="badge badge-blue mb-4">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Darithri Diagnostic Centre LLP
          </h1>
          <p className="mt-5 max-w-2xl text-xl text-slate-500 mx-auto leading-relaxed">
            Committed to providing accurate, reliable, and swift precision diagnostics to the community of Hyderabad.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-5">Our Commitment to Quality</h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Established with a vision to elevate healthcare standards, Darithri Diagnostic Centre represents a significant leap forward in local medical testing. Our facility is equipped with world-class precision diagnostics right in your neighbourhood in Moula-Ali.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our facility is equipped with fully automated, state-of-the-art analyzers that ensure every test result is precise and delivered with an industry-leading turnaround time.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {whyChoose.map((item) => (
                <div key={item.label} className="card p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{item.label}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Visit Our Facility</h2>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
            Located in the heart of Moula-Ali, our center is designed for patient comfort and efficiency.
          </p>
          <div className="inline-block text-left bg-slate-50 border border-slate-200 rounded-2xl px-8 py-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Darithri Diagnostic Centre</p>
                <p className="text-slate-500 mt-1">B-16/1, Ground floor, IDA,</p>
                <p className="text-slate-500">Moula-Ali, Hyderabad-500040</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/patient-portal"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
            >
              Book an Appointment
            </Link>
            <Link
              href="/test-menu"
              className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all"
            >
              View Test Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
