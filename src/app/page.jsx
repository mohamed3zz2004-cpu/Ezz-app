"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import courseData from "@/data/data.json";

const typedData = courseData;

export default function HomePage() {
  const router = useRouter();
  const [allLessonsComplete, setAllLessonsComplete] = useState(false);
  const [modal, setModal] = useState({ open: false, lessonId: 1 });

  const lessons = useMemo(() => typedData.lessons || [], []);

  const isLessonUnlocked = (lessonId) => {
    if (typeof window === "undefined") return false;
    if (localStorage.getItem("pre_test_complete") !== "true") return false;
    if (lessonId === 1) return true;
    return localStorage.getItem(`lesson_${lessonId - 1}_complete`) === "true";
  };

  const handleLessonClick = (lessonId) => {
    if (!isLessonUnlocked(lessonId)) {
      setModal({ open: true, lessonId });
      return;
    }
    router.push(`/lesson/${lessonId}`);
  };

  const handleModalNo = () => {
    const previousLesson = Math.max(1, modal.lessonId - 1);
    setModal((old) => ({ ...old, open: false }));
    router.push(`/lesson/${previousLesson}`);
  };

  useEffect(() => {
    const checkAllLessons = () => {
      const complete = (typedData.lessons || []).every(
        (lesson) => localStorage.getItem(`lesson_${lesson.id}_complete`) === "true"
      );
      setAllLessonsComplete(complete);
    };

    checkAllLessons();
    window.addEventListener("focus", checkAllLessons);
    return () => window.removeEventListener("focus", checkAllLessons);
  }, []);

  const portalSections = [
    { title: "دليل الطالب والمعلم", description: "التعليمات، رموز المنصة، وكيفية التحرك داخل البرمجية.", href: "/instructions", icon: "📘" },
    { title: "الاختبار القبلي", description: "قياس نقطة بداية الطالب قبل دراسة الوحدة كاملة.", href: "/pre-test", icon: "🧪" },
    { title: "خريطة دروس الوحدة", description: "التسلسل المنطقي للدروس والعناصر الرئيسية والتفرعات.", href: "#mind-map", icon: "🗺️" },
    { title: "الأهداف التعليمية", description: "أهداف عامة + سلوكية معرفية ومهارية ووجدانية.", href: "#learning-objectives", icon: "🎯" },
    { title: "مقدمة الوحدة", description: "ملخص قصير يوضح محتوى الوحدة في خمس نقاط رئيسية.", href: "#unit-introduction", icon: "📖" },
    { title: "شرح دروس الوحدة", description: "محتوى كل درس مع العناصر الفرعية بالتسلسل المنطقي.", href: "#lessons", icon: "📚" },
    { title: "أنشطة دروس الوحدة", description: "الأنشطة المتنوعة لكل درس حتى نهاية الوحدة.", href: "#activities", icon: "🧩" },
    { title: "ملخص الوحدة", description: "تلخيص مختصر لما تم دراسته في الوحدة.", href: "#summary", icon: "📝" },
    { title: "الاختبار النهائي", description: "اختبار الوحدة مع التغذية الراجعة وتحديد نقاط الضعف.", href: "/final-exam", icon: "✅" }
  ];

  const handlePortalClick = (item) => {
    if (item.href.startsWith("#")) {
      document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push(item.href);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 md:px-14">
      <section className="mx-auto max-w-6xl space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl"
        >
          <h1 className="text-center text-3xl font-extrabold leading-relaxed text-emerald-300 md:text-5xl">
            {typedData.courseTitle}
          </h1>
          <p className="mt-5 text-center text-lg text-slate-300">{typedData.description}</p>

          <div className="mt-8 grid gap-4 rounded-2xl bg-slate-950/70 p-5 text-right text-base font-medium text-slate-300 md:grid-cols-2">
            <p><span className="font-bold text-emerald-300">اسم المقرر:</span> {typedData.courseInfo?.courseName}</p>
            <p><span className="font-bold text-emerald-300">المرحلة:</span> {typedData.courseInfo?.stage}</p>
            <p><span className="font-bold text-emerald-300">الصف:</span> {typedData.courseInfo?.grade}</p>
            <p><span className="font-bold text-emerald-300">الفصل:</span> {typedData.courseInfo?.semester}</p>
            <p className="md:col-span-2"><span className="font-bold text-emerald-300">العام الدراسي:</span> {typedData.courseInfo?.academicYear}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-xl font-bold text-emerald-300">بيانات الطالب المنفذ</h2>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li><span className="font-bold text-slate-100">الاسم:</span> {typedData.student?.name}</li>
                <li><span className="font-bold text-slate-100">القسم:</span> {typedData.student?.department}</li>
                <li><span className="font-bold text-slate-100">الشعبة:</span> {typedData.student?.section}</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-xl font-bold text-emerald-300">بيانات الإشراف</h2>
              <ul className="mt-3 space-y-2 text-slate-300">
                {typedData.supervisors?.map((supervisor) => (
                  <li key={supervisor}>• {supervisor}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-100">الصفحة الرئيسية للبرنامج</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {portalSections.map((item, index) => (
              <motion.button
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                type="button"
                onClick={() => handlePortalClick(item)}
                disabled={item.href === "/final-exam" && !allLessonsComplete}
                className={`rounded-2xl border p-5 text-right transition ${
                  item.href === "/final-exam" && !allLessonsComplete
                    ? "cursor-not-allowed border-slate-800 bg-slate-950/50 opacity-70"
                    : "border-slate-700 bg-slate-950/70 hover:-translate-y-1 hover:border-emerald-400"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-200">{index + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
                {item.href === "/final-exam" && !allLessonsComplete && (
                  <p className="mt-3 text-sm font-semibold text-amber-300">أكمل جميع الدروس أولًا لفتح الاختبار.</p>
                )}
              </motion.button>
            ))}
          </div>
        </section>

        <section id="mind-map" className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-100">{typedData.mindMap?.title}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {typedData.mindMap?.nodes?.map((node) => (
              <div key={node.title} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
                <h3 className="text-lg font-bold text-emerald-300">{node.title}</h3>
                <ul className="mt-3 space-y-2 text-slate-300">
                  {node.children.map((child) => (
                    <li key={child}>• {child}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="learning-objectives" className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-100">الأهداف التعليمية</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              <h3 className="text-xl font-bold text-emerald-300">الأهداف العامة</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                {typedData.unitObjectives?.general?.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              <h3 className="text-xl font-bold text-emerald-300">الأهداف السلوكية</h3>
              <div className="mt-4 space-y-5 text-slate-300">
                <div>
                  <h4 className="font-bold text-slate-100">معرفية</h4>
                  <ul className="mt-2 space-y-2">
                    {typedData.unitObjectives?.behavioral?.cognitive?.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-100">مهارية</h4>
                  <ul className="mt-2 space-y-2">
                    {typedData.unitObjectives?.behavioral?.skill?.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-100">وجدانية</h4>
                  <ul className="mt-2 space-y-2">
                    {typedData.unitObjectives?.behavioral?.affective?.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="unit-introduction" className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-100">مقدمة تمهيدية للوحدة</h2>
          <ul className="mt-6 space-y-3 text-slate-300">
            {typedData.unitIntroduction?.map((line, index) => (
              <li key={line} className="rounded-xl bg-slate-950/70 p-3">{index + 1}. {line}</li>
            ))}
          </ul>
        </section>

        <section id="lessons" className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-100">شرح دروس الوحدة</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {lessons.map((lesson, index) => {
              const unlocked = isLessonUnlocked(lesson.id);
              return (
                <motion.button
                  key={lesson.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  type="button"
                  onClick={() => handleLessonClick(lesson.id)}
                  className={`group rounded-2xl border p-6 text-right shadow-lg transition ${
                    unlocked
                      ? "border-slate-800 bg-slate-950/70 hover:-translate-y-1 hover:border-emerald-400"
                      : "border-slate-700 bg-slate-950/80 opacity-90"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-slate-100">{lesson.title}</h3>
                    {!unlocked && (
                      <span className="rounded-full bg-slate-700 px-3 py-1 text-sm font-semibold text-slate-200">
                        مغلق 🔒
                      </span>
                    )}
                  </div>
                  <p className="mt-4 line-clamp-3 text-slate-400">{lesson.content.slice(0, 120)}...</p>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section id="activities" className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-100">{typedData.activities?.title}</h2>
          <div className="mt-6 space-y-5">
            {typedData.activities?.items?.map((item) => (
              <div key={item.lesson} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
                <h3 className="text-lg font-bold text-emerald-300">{item.lesson}</h3>
                <ul className="mt-3 space-y-2 text-slate-300">
                  {item.activities.map((activity) => (
                    <li key={activity}>• {activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="summary" className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-100">{typedData.summary?.title}</h2>
          <ul className="mt-6 space-y-3 text-slate-300">
            {typedData.summary?.points?.map((point) => (
              <li key={point} className="rounded-xl bg-slate-950/70 p-3">• {point}</li>
            ))}
          </ul>
        </section>

        <section className="mt-2">
          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            type="button"
            onClick={() => allLessonsComplete && router.push("/final-exam")}
            className={`w-full rounded-2xl border p-6 text-right shadow-lg transition ${
              allLessonsComplete
                ? "border-emerald-500 bg-slate-900/90 hover:-translate-y-1 hover:border-emerald-400"
                : "cursor-not-allowed border-slate-700 bg-slate-950/80"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-bold text-slate-100">الاختبار النهائي</h3>
              {!allLessonsComplete && (
                <span className="rounded-full bg-slate-700 px-3 py-1 text-sm font-semibold text-slate-200">
                  مغلق 🔒
                </span>
              )}
            </div>
            <p className="mt-3 text-slate-400">
              {allLessonsComplete
                ? "أصبحت مؤهلاً لدخول الاختبار النهائي مع التغذية الراجعة."
                : "يجب إكمال جميع الدروس والاختبارات الداخلية أولًا لفتح الاختبار النهائي."}
            </p>
          </motion.button>
        </section>
      </section>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-900">هل أكملت الدرس السابق؟</h3>
            <p className="mt-3 text-slate-600">يجب إكمال اختبار الدرس السابق قبل فتح هذا الدرس.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModal((old) => ({ ...old, open: false }))}
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700"
              >
                نعم
              </button>
              <button
                type="button"
                onClick={handleModalNo}
                className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white"
              >
                لا
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
