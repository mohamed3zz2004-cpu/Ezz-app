"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import courseData from "@/data/data.json";

const typedData = courseData;

const conditionalVisuals = [
  {
    title: "مخطط If/Else",
    description: "تدفق قرار واضح يوضح كيف يتم تنفيذ أحد الفرعين بناءً على الشرط.",
    src: "/image1.jpg"
  },
  {
    title: "شيفرة if بسيطة",
    description: "مثال برمجي يوضح تنفيذ فرع عند تحقق الشرط وفرع آخر عند عدم تحققه.",
    src: "/image2.jpg"
  },
  {
    title: "شيفرة if-else",
    description: "مثال آخر يوضح بناء if-else في برنامج بسيط.",
    src: "/image3.jpg"
  }
];

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = Number(params.id);

  const lesson = useMemo(
    () => typedData.lessons.find((item) => item.id === lessonId),
    [lessonId]
  );
  const [accessChecked, setAccessChecked] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    if (!lesson) return;

    if (localStorage.getItem("pre_test_complete") !== "true") {
      router.replace("/pre-test");
      return;
    }

    if (
      lessonId > 1 &&
      localStorage.getItem(`lesson_${lessonId - 1}_complete`) !== "true"
    ) {
      router.replace("/");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAccessChecked(true);
  }, [lesson, lessonId, router]);

  if (!lesson) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <p className="text-xl font-semibold text-red-500">الدرس غير موجود.</p>
      </main>
    );
  }

  if (!accessChecked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <p className="text-lg font-semibold">جارٍ التحقق من إمكانية فتح الدرس...</p>
      </main>
    );
  }

  const currentQuestion = lesson.quiz[questionIndex];

  const handleAnswer = (option) => {
    setSelectedOption(option);
  };

  const submitAnswer = () => {
    if (!selectedOption) {
      return;
    }
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    setSelectedOption(null);

    if (questionIndex === lesson.quiz.length - 1) {
      setIsDone(true);
      if (newScore === lesson.quiz.length) {
        localStorage.setItem(`lesson_${lesson.id}_complete`, "true");
      }
      return;
    }
    setQuestionIndex((old) => old + 1);
  };

  const nextLesson = lesson.id + 1;
  const hasNextLesson = nextLesson <= typedData.lessons.length;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 md:px-14">
      <div className="mx-auto max-w-5xl space-y-8">
        <button
          onClick={() => router.push("/")}
          className="rounded-lg border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-100"
        >
          العودة إلى الصفحة الرئيسية
        </button>

        <AnimatePresence mode="wait">
          {!quizStarted && (
            <motion.section
              key="content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl"
            >
              <h1 className="text-3xl font-extrabold text-emerald-400">{lesson.title}</h1>

              <h2 className="mt-8 text-xl font-bold text-slate-100">الأهداف التعليمية</h2>
              <ul className="mt-4 space-y-3">
                {lesson.objectives.map((objective) => (
                  <li key={objective} className="flex items-start gap-3 rounded-xl bg-slate-950/80 p-3">
                    <span className="text-xl text-emerald-300">🎯</span>
                    <span className="text-slate-300">{objective}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-xl font-bold text-slate-100">المحتوى</h2>
              <p className="mt-3 leading-8 text-slate-300">{lesson.content}</p>

              {lesson.id === 3 && (
                <section className="mt-8">
                  <h2 className="text-xl font-bold text-slate-100">صور خاصة بالجمل الشرطية</h2>
                  <div className="mt-4 grid gap-6 md:grid-cols-3">
                    {conditionalVisuals.map((item) => (
                      <div
                        key={item.title}
                        className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80"
                      >
                        <Image
                          src={item.src}
                          alt={item.title}
                          width={1280}
                          height={720}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="aspect-video w-full object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-emerald-300">{item.title}</h3>
                          <p className="mt-2 text-slate-200 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {lesson.id === 1 && (
                <>
                  <h2 className="mt-8 text-xl font-bold text-slate-100">فيديو توضيحي</h2>
                  <div className="mt-4">
                    <video controls className="aspect-video w-full rounded-lg">
                      <source src="/Variables.mp4" type="video/mp4" />
                      متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                  </div>
                </>
              )}

              {lesson.id === 4 && (
                <>
                  <h2 className="mt-8 text-xl font-bold text-slate-100">فيديو توضيحي</h2>
                  <div className="mt-4">
                    <video controls className="aspect-video w-full rounded-lg">
                      <source src="/Loop.mp4" type="video/mp4" />
                      متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                  </div>
                </>
              )}

              <button
                onClick={() => setQuizStarted(true)}
                className="mt-8 rounded-xl bg-emerald-500 px-6 py-3 text-lg font-bold text-slate-950 transition hover:bg-emerald-400"
              >
                ابدأ اختبار الدرس
              </button>
            </motion.section>
          )}

          {quizStarted && (
            <motion.section
              key="quiz"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl"
            >
              {!isDone ? (
                <>
                  <h2 className="text-2xl font-bold text-emerald-400">
                    السؤال {questionIndex + 1} من {lesson.quiz.length}
                  </h2>
                  <p className="mt-4 text-lg text-white">{currentQuestion.question}</p>
                  <div className="mt-6 space-y-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className={`block w-full rounded-lg border px-4 py-3 text-right text-white transition ${
                          selectedOption === option
                            ? "border-emerald-500 bg-emerald-500/15"
                            : "border-slate-700 bg-slate-950/90 hover:border-emerald-400 hover:bg-slate-900"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={submitAnswer}
                    disabled={!selectedOption}
                    className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 disabled:cursor-not-allowed disabled:bg-slate-700"
                  >
                    تأكيد الإجابة
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-emerald-400">نتيجة الاختبار</h2>
                  <p className="mt-4 text-xl text-slate-300">
                    درجتك: {score} / {lesson.quiz.length}
                  </p>
                  {score === lesson.quiz.length ? (
                    <p className="mt-2 font-semibold text-emerald-400">
                      ممتاز! تم فتح الدرس التالي بنجاح.
                    </p>
                  ) : (
                    <p className="mt-2 font-semibold text-amber-400">
                      يجب الإجابة عن جميع الأسئلة بشكل صحيح لفتح الدرس التالي. أعد المحاولة.
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setQuestionIndex(0);
                        setScore(0);
                        setIsDone(false);
                        setSelectedOption(null);
                      }}
                      className="rounded-lg border border-slate-700 bg-slate-950/80 px-5 py-2 font-semibold text-slate-200"
                    >
                      إعادة الاختبار
                    </button>
                    {score === lesson.quiz.length && hasNextLesson && (
                      <button
                        onClick={() => router.push(`/lesson/${nextLesson}`)}
                        className="rounded-lg bg-emerald-500 px-5 py-2 font-semibold text-slate-950"
                      >
                        الدرس التالي
                      </button>
                    )}
                    <button
                      onClick={() => router.push("/")}
                      className="rounded-lg bg-slate-800 px-5 py-2 font-semibold text-white"
                    >
                      الصفحة الرئيسية
                    </button>
                  </div>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

    </main>
  );
}
