export default function InstructionsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 md:px-14">
      <div className="mx-auto max-w-5xl space-y-8 rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-emerald-400">دليل الطالب ودليل المعلم</h1>

        <section className="rounded-2xl border border-slate-700 bg-slate-950/80 p-6">
          <h2 className="text-2xl font-bold text-slate-100">دليل الطالب</h2>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>• ابدأ من الصفحة الرئيسية للتعرّف إلى بيانات الوحدة والطالب والإشراف.</li>
            <li>• استخدم الروابط للانتقال بين الصفحات والشرائح بشكل متسلسل ومنطقي.</li>
            <li>• اقرأ التعليمات قبل الدخول إلى الدروس أو الاختبارات.</li>
            <li>• بعد كل درس، ركز على الأسئلة القصيرة للتأكد من فهمك.</li>
            <li>• تدرج في الدراسة من الدرس الأول إلى الدرس الأخير دون تخطي أي جزء.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-950/80 p-6">
          <h2 className="text-2xl font-bold text-slate-100">دليل المعلم</h2>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>• استخدم المنصة كأداة دعم للتدريس وتنظيم المحتوى.</li>
            <li>• شجع الطالب على قراءة ملخص الوحدة قبل الاختبار النهائي.</li>
            <li>• راقب نتائج الاختبار القبلي والنهائي لتحديد نقاط القوة والضعف.</li>
            <li>• أعِد الطالب إلى قراءة الأهداف التعليمية قبل كل درس.</li>
            <li>• استخدم الأنشطة داخل كل درس لتقوية مهارات الطالب.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-950/80 p-6">
          <h2 className="text-2xl font-bold text-slate-100">تفسير رموز المنصة</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-900 p-4 text-slate-200">🏠 الصفحة الرئيسية</div>
            <div className="rounded-xl bg-slate-900 p-4 text-slate-200">📘 الدرس</div>
            <div className="rounded-xl bg-slate-900 p-4 text-slate-200">🧪 الاختبار</div>
            <div className="rounded-xl bg-slate-900 p-4 text-slate-200">✅ الإنجاز</div>
          </div>
        </section>
      </div>
    </main>
  );
}
