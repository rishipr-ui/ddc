import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/darithri-logo.png"
              alt="Darithri Diagnostic Centre"
              width={1416}
              height={260}
              className="mb-4 h-10 w-auto brightness-0 invert"
            />
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Advanced clinical excellence with state-of-the-art diagnostic technology in Hyderabad.
            </p>
            <a 
              href="tel:+918897931005" 
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold transition-all"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 88979 31005
            </a>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wider uppercase mb-4">Location</h3>
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-slate-400 text-sm leading-relaxed">
                B-16/1, Ground floor, IDA,<br />
                Moula-Ali, Hyderabad-500040<br />
                Telangana, India
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/patient-portal" className="text-sm text-slate-400 hover:text-white flex items-center gap-2 group">
                  <span className="h-px w-4 bg-blue-400 group-hover:w-6 transition-all duration-200"></span>
                  Book a Home Collection
                </Link>
              </li>
              <li>
                <Link href="/patient-portal" className="text-sm text-slate-400 hover:text-white flex items-center gap-2 group">
                  <span className="h-px w-4 bg-blue-400 group-hover:w-6 transition-all duration-200"></span>
                  Download Reports
                </Link>
              </li>
              <li>
                <Link href="/test-menu" className="text-sm text-slate-400 hover:text-white flex items-center gap-2 group">
                  <span className="h-px w-4 bg-blue-400 group-hover:w-6 transition-all duration-200"></span>
                  Tests and Prices
                </Link>
              </li>
              <li>
                <Link href="/technology" className="text-sm text-slate-400 hover:text-white flex items-center gap-2 group">
                  <span className="h-px w-4 bg-blue-400 group-hover:w-6 transition-all duration-200"></span>
                  Our Technology
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 flex justify-center items-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Darithri Diagnostic Centre LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
