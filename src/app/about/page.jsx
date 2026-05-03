export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 md:px-14">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-emerald-400">نبذة عن الموقع</h1>
        <p className="mt-4 text-slate-300 leading-8">
          هذه المنصة مصممة لتقديم تجربة تعليمية تفاعلية في البرمجة مع مسار متدرج من المفاهيم الأساسية إلى التطبيقات العملية.
          الهدف هو تمكين الطلاب من فهم المتغيرات، الثوابت، الجمل الشرطية، والجمل التكرارية خطوة بخطوة.
        </p>
        <div className="mt-8 space-y-4 rounded-2xl bg-slate-950/80 p-6 ring-1 ring-slate-700">
          <p className="text-slate-400">نستخدم واجهة مستخدم احترافية تعتمد على Tailwind CSS مع ألوان داكنة وتباعد واضح لراحة القراءة.</p>
          <p className="text-slate-400">تم تصميم المحتوى ليكون مناسبًا للطلاب في المراحل التمهيدية مع تركيز على البساطة والوضوح.</p>
        </div>
      </div>
    </main>
  );
}
