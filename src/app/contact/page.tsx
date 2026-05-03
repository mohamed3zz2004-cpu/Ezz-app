export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 md:px-14">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
          <h1 className="text-3xl font-extrabold text-emerald-400">تواصل معنا</h1>
          <p className="mt-4 text-slate-300 leading-8">
            إذا كان لديك أي أسئلة أو تحتاج إلى دعم حول الدروس، فيسعدنا التواصل معك.
            يمكنك الاتصال بنا مباشرة أو إرسال بريد إلكتروني للمزيد من التفاصيل.
          </p>
          
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Email Section */}
            <a
              href="mailto:Mohamed3zz2004@gmail.com"
              className="group rounded-3xl border border-slate-800 bg-slate-950/80 p-8 transition hover:border-emerald-400 hover:bg-slate-900/95"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl text-emerald-400">✉️</div>
                <div>
                  <h2 className="text-xl font-semibold text-emerald-400">البريد الإلكتروني</h2>
                  <p className="mt-2 text-slate-200 group-hover:text-emerald-300 transition">
                    Mohamed3zz2004@gmail.com
                  </p>
                </div>
              </div>
            </a>

            {/* Phone Section */}
            <a
              href="tel:+201126065803"
              className="group rounded-3xl border border-slate-800 bg-slate-950/80 p-8 transition hover:border-emerald-400 hover:bg-slate-900/95"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl text-emerald-400">📞</div>
                <div>
                  <h2 className="text-xl font-semibold text-emerald-400">رقم الهاتف</h2>
                  <p className="mt-2 text-slate-200 group-hover:text-emerald-300 transition">
                    +201126065803
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="mt-12 rounded-2xl bg-slate-950/80 p-6 ring-1 ring-slate-700">
            <p className="text-center text-slate-300 text-sm">
              نحن نرحب بأي استفسارات أو ملاحظات حول المنصة والدروس التعليمية.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
