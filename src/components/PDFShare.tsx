interface ShareOptions {
  title?: string;
  text?: string;
}

export function PDFShareButtons({ text }: ShareOptions) {
  const priceListUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/test-menu`;
  const shareText = text || `Check out Darithri Diagnostic Centre's online test and price list`;

  const handleEmailShare = () => {
    const subject = 'Darithri Diagnostic Centre - Test Catalog';
    const body = `${shareText}\n\n${priceListUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsAppShare = () => {
    const message = `${shareText}\n\n${priceListUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleEmailShare}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all"
        title="Share via email"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Email
      </button>
      <button
        onClick={handleWhatsAppShare}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:bg-green-50 transition-all"
        title="Share via WhatsApp"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.95 1.298l-.313-.156a9.9 9.9 0 01-3.228-5.684 9.9 9.9 0 01.25-7.386A9.9 9.9 0 0112 0a9.9 9.9 0 018.855 4.747 9.9 9.9 0 011.52 7.382 9.88 9.88 0 01-3.239 5.234c3.572-2.595 5.918-6.874 5.918-11.652 0-7.734-6.268-14-14-14s-14 6.266-14 14 6.268 14 14 14c1.172 0 2.318-.146 3.433-.426a9.87 9.87 0 007.516-11.73" />
        </svg>
        WhatsApp
      </button>
    </div>
  );
}

export function PDFInfoCard() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-slate-900">Online Test and Price List</h3>
          <p className="text-sm text-slate-600 mt-1">Search all tests with live pricing directly on the website.</p>
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
            <span>📄 300+ tests</span>
            <span>•</span>
            <span>🔍 Search enabled</span>
            <span>•</span>
            <span>💳 Price view only</span>
          </div>
          <p className="mt-3 text-xs text-blue-800">Downloads are disabled for customer access.</p>
        </div>
      </div>
    </div>
  );
}
