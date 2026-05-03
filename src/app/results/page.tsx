"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const lessonsComplete = [1, 2, 3, 4].every(
      (id) => localStorage.getItem(`lesson_${id}_complete`) === "true"
    );
    const examComplete = localStorage.getItem("final_exam_complete") === "true";
    const savedScore = localStorage.getItem("final_exam_score");
    const savedTotal = localStorage.getItem("final_exam_total");

    if (!lessonsComplete || !examComplete || !savedScore || !savedTotal) {
      router.replace("/");
      return;
    }

    setScore(Number(savedScore));
    setTotal(Number(savedTotal));
  }, [router]);

  if (score === null || total === null) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-slate-700">جاري تجهيز الشهادة...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 md:px-14">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-5xl rounded-3xl border-4 border-amber-200 bg-gradient-to-b from-amber-50 to-white p-10 text-center shadow-2xl"
      >
        <h1 className="text-4xl font-extrabold text-amber-700">Certificate of Completion</h1>
        <p className="mt-4 text-lg text-slate-700">
          تُمنح هذه الشهادة تقديرًا لإتمام متطلبات مقرر أساسيات البرمجة بنجاح.
        </p>

        <div className="mt-10 space-y-4 text-right text-lg text-slate-800">
          <p>
            <span className="font-bold">Student Name:</span> محمد عز الدين عبد الرؤوف
          </p>
          <p>
            <span className="font-bold">Supervisors:</span> د. محمد عادل، د. أمل
          </p>
          <p>
            <span className="font-bold">Score:</span> {score} / {total}
          </p>
        </div>

        <div className="mt-10">
          <button
            onClick={() => router.push("/")}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </motion.section>
    </main>
  );
}
