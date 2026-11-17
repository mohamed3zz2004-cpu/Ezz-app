"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import courseData from "@/data/data.json";

export default function PreTestPage() {
  const router = useRouter();
  const questions = courseData.finalExam.questions;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  const submitAnswer = () => {
    if (!selected || !current) return;

    const isCorrect = selected === current.correctAnswer;
    const nextScore = isCorrect ? score + 1 : score;

    if (index === questions.length - 1) {
      setScore(nextScore);
      setFinished(true);
      localStorage.setItem("pre_test_score", String(nextScore));
      localStorage.setItem("pre_test_total", String(questions.length));
      localStorage.setItem("pre_test_complete", "true");
      return;
    }

    setScore(nextScore);
    setSelected("");
    setIndex((prev) => prev + 1);
  };

  if (finished) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 md:px-14">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-center shadow-2xl">
          <h1 className="text-3xl font-extrabold text-emerald-400">نتيجة الاختبار القبلي</h1>
          <p className="mt-5 text-xl text-slate-200">النتيجة: {score} / {questions.length}</p>
          <p className="mt-4 text-slate-400">هذا الاختبار يوضح نقطة البداية لديك قبل دخول محتوى الوحدة.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-8 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </main>
    );
  }

  if (!current) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <p className="text-lg font-semibold text-amber-300">لا توجد أسئلة متاحة للاختبار القبلي.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 md:px-14">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-emerald-400">{courseData.preTest?.title}</h1>
        <p className="mt-2 text-slate-400">{courseData.preTest?.description}</p>

        <div className="mt-6 text-sm font-semibold text-slate-300">
          السؤال {index + 1} من {questions.length}
        </div>

        <h2 className="mt-4 text-2xl font-bold text-slate-100">{current.question}</h2>

        <div className="mt-6 space-y-3">
          {current.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`block w-full rounded-xl border px-4 py-3 text-right transition ${
                selected === option
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-200"
                  : "border-slate-700 bg-slate-950/60 text-slate-200 hover:border-slate-500"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={submitAnswer}
          disabled={!selected}
          className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-500"
        >
          {index === questions.length - 1 ? "إنهاء الاختبار" : "التالي"}
        </button>
      </div>
    </main>
  );
}
