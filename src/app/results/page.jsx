"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import courseData from "@/data/data.json";

export default function ResultsPage() {
  const router = useRouter();
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    const lessonsComplete = courseData.lessons.every(
      (lesson) => localStorage.getItem(`lesson_${lesson.id}_complete`) === "true"
    );
    const examComplete = localStorage.getItem("final_exam_complete") === "true";
    const savedScore = localStorage.getItem("final_exam_score");
    const savedTotal = localStorage.getItem("final_exam_total");
    const savedAnswers = localStorage.getItem("final_exam_answers");

    if (
      localStorage.getItem("pre_test_complete") !== "true" ||
      !lessonsComplete ||
      !examComplete ||
      savedScore === null ||
      savedTotal === null ||
      !savedAnswers
    ) {
      router.replace("/");
      return;
    }

    const parsedScore = Number(savedScore);
    const parsedTotal = Number(savedTotal);
    let parsedAnswers;
    try {
      parsedAnswers = JSON.parse(savedAnswers);
    } catch {
      router.replace("/");
      return;
    }
    if (
      !Number.isInteger(parsedScore) ||
      !Number.isInteger(parsedTotal) ||
      parsedScore < 0 ||
      parsedScore > parsedTotal ||
      parsedTotal !== courseData.finalExam.questions.length ||
      !Array.isArray(parsedAnswers) ||
      parsedAnswers.length !== parsedTotal ||
      !parsedAnswers.every((answer, index) =>
        courseData.finalExam.questions[index].options.includes(answer)
      ) ||
      parsedAnswers.filter(
        (answer, index) => answer === courseData.finalExam.questions[index].correctAnswer
      ).length !== parsedScore
    ) {
      router.replace("/");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScore(parsedScore);
    setTotal(parsedTotal);
    setAnswers(parsedAnswers);
  }, [router]);

  if (score === null || total === null || answers === null) {
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
        className="mx-auto max-w-5xl rounded-3xl border border-slate-700 bg-slate-900 p-8 text-center shadow-2xl md:p-10"
      >
        <h1 className="text-3xl font-extrabold text-emerald-300">نتيجة الاختبار النهائي</h1>
        <p className="mt-4 text-lg text-slate-300">
          نتيجتك في مقرر {courseData.courseTitle}، مع مراجعة إجاباتك وتصحيح الأخطاء.
        </p>

        <div className="mt-8 space-y-4 rounded-2xl bg-slate-950/70 p-6 text-right text-lg text-slate-200">
          <p>
            <span className="font-bold text-emerald-300">اسم الطالب:</span> {courseData.student.name}
          </p>
          <p>
            <span className="font-bold text-emerald-300">النتيجة:</span> {score} / {total}
          </p>
        </div>

        <section className="mt-8 space-y-4 text-right">
          <h2 className="text-2xl font-bold text-slate-100">التغذية الراجعة</h2>
          {courseData.finalExam.questions.map((question, index) => {
            const isCorrect = answers[index] === question.correctAnswer;
            return (
              <article
                key={`${question.question}-${index}`}
                className={`rounded-2xl border p-5 ${
                  isCorrect
                    ? "border-emerald-700 bg-emerald-950/30"
                    : "border-rose-800 bg-rose-950/30"
                }`}
              >
                <h3 className="font-bold text-slate-100">
                  {index + 1}. {question.question}
                </h3>
                <p className={`mt-3 font-semibold ${isCorrect ? "text-emerald-300" : "text-rose-300"}`}>
                  {isCorrect ? "إجابة صحيحة" : "إجابة غير صحيحة"}
                </p>
                <p className="mt-3 text-slate-300">
                  إجابتك: <span className="font-semibold">{answers[index]}</span>
                </p>
                {!isCorrect && (
                  <p className="mt-2 text-emerald-300">
                    الإجابة الصحيحة: <span className="font-semibold">{question.correctAnswer}</span>
                  </p>
                )}
              </article>
            );
          })}
        </section>

        <div className="mt-10">
          <button
            onClick={() => router.push("/")}
            className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </motion.section>
    </main>
  );
}
