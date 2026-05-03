"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import courseData from "@/data/data.json";

const typedData = courseData;

export default function HomePage() {
  const router = useRouter();
  const [modal, setModal] = useState({
    open: false,
    lessonId: 1
  });
  const [allLessonsComplete, setAllLessonsComplete] = useState(false);

  const lessons = useMemo(() => typedData.lessons, []);

  const isLessonUnlocked = (lessonId) => {
    if (lessonId === 1) {
      return true;
    }
    if (typeof window === "undefined") {
      return false;
    }
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
      const complete = typedData.lessons.every(
        (lesson) => localStorage.getItem(`lesson_${lesson.id}_complete`) === "true"
      );
      setAllLessonsComplete(complete);
    };

    checkAllLessons();
    window.addEventListener("focus", checkAllLessons);
    return () => window.removeEventListener("focus", checkAllLessons);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 md:px-14">
      <section className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl"
        >
          <h1 className="text-center text-3xl font-extrabold leading-relaxed text-emerald-300 md:text-5xl">
            أهلاً وسهلاً بكم في منصة تعليم البرمجة
          </h1>
          <p className="mt-5 text-center text-lg text-slate-300">
            {typedData.description}
          </p>
          <div className="mt-8 space-y-2 text-center text-base font-medium text-slate-400 md:text-lg">
            <p>إعداد الطالب: محمد عز الدين عبد الرؤوف</p>
            <p>تحت إشراف: د. محمد عادل & د. أمل</p>
          </div>
        </motion.div>

        <section id="lessons" className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-100">الدروس التعليمية</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {lessons.map((lesson, index) => {
              const unlocked = isLessonUnlocked(lesson.id);
              return (
                <motion.button
                  key={lesson.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => handleLessonClick(lesson.id)}
                  className={`group rounded-2xl border p-6 text-right shadow-lg transition ${
                    unlocked
                      ? "border-slate-800 bg-slate-900/90 hover:-translate-y-1 hover:border-emerald-400"
                      : "border-slate-700 bg-slate-950/80 opacity-90"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-slate-100">{lesson.title}</h3>
                    {!unlocked && (
                      <span className="rounded-full bg-slate-700 px-3 py-1 text-sm font-semibold text-slate-200">
                        Lock 🔒
                      </span>
                    )}
                  </div>
                  <p className="mt-4 line-clamp-3 text-slate-400">
                    {lesson.content.slice(0, 130)}...
                  </p>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
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
                  Lock 🔒
                </span>
              )}
            </div>
            <p className="mt-3 text-slate-400">
              {allLessonsComplete
                ? "أصبحت مؤهلاً لدخول الاختبار النهائي."
                : "أكمل جميع الدروس الأربعة أولاً لفتح الاختبار النهائي."}
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
            <h3 className="text-xl font-bold text-slate-900">هل حللت اختبار الدرس السابق؟</h3>
            <p className="mt-3 text-slate-600">
              يجب اجتياز اختبار الدرس السابق لفتح هذا الدرس.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setModal((old) => ({ ...old, open: false }))}
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700"
              >
                نعم
              </button>
              <button
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
