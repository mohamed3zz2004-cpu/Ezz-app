"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import courseData from "@/data/data.json";
import { CourseData } from "@/types/course";

const typedData = courseData as CourseData;

export default function FinalExamPage() {
  const router = useRouter();
  const questions = useMemo(() => typedData.finalExam.questions, []);
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const complete = typedData.lessons.every(
      (lesson) => localStorage.getItem(`lesson_${lesson.id}_complete`) === "true"
    );

    if (!complete) {
      router.replace("/");
      return;
    }
    setIsAllowed(true);
  }, [router]);

  if (!isAllowed) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-slate-700">جاري التحقق من أهلية الاختبار...</p>
      </main>
    );
  }

  const currentQuestion = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;

  const submitAnswer = () => {
    if (!selectedOption) {
      return;
    }

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    setSelectedOption(null);

    if (questionIndex === questions.length - 1) {
      localStorage.setItem("final_exam_score", String(newScore));
      localStorage.setItem("final_exam_total", String(questions.length));
      localStorage.setItem("final_exam_complete", "true");
      router.push("/results");
      return;
    }

    setQuestionIndex((old) => old + 1);
  };

  return (
    <main className="min-h-screen px-6 py-10 md:px-14">
      <section className="mx-auto max-w-4xl rounded-3xl border border-indigo-100 bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-extrabold text-indigo-900">الاختبار النهائي</h1>
        <p className="mt-2 text-slate-600">أجب عن الأسئلة التالية بالترتيب لإتمام الاختبار.</p>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm font-semibold text-slate-600">
            <span>
              السؤال {questionIndex + 1} من {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
              className="h-3 rounded-full bg-indigo-600"
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">{currentQuestion.question}</h2>
          <div className="mt-5 space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedOption(option)}
                className={`block w-full rounded-lg border px-4 py-3 text-right transition ${
                  selectedOption === option
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 hover:border-indigo-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={submitAnswer}
          disabled={!selectedOption}
          className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {questionIndex === questions.length - 1 ? "إنهاء الاختبار" : "السؤال التالي"}
        </button>
      </section>
    </main>
  );
}
