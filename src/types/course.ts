export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Lesson {
  id: number;
  title: string;
  objectives: string[];
  content: string;
  quiz: QuizQuestion[];
}

export interface CourseData {
  courseTitle: string;
  description: string;
  lessons: Lesson[];
  finalExam: {
    title: string;
    questions: QuizQuestion[];
  };
}
