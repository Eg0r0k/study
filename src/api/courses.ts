import type { Course } from "@/types/course";

const mockCourses: Course[] = [
  {
    id: 1,
    title: "Основы машинного обучения",
    description:
      "Изучите основы ML, включая классические алгоритмы и современные подходы.",
    category: "ai",
    experienceLevel: "Без опыта",
    image: "/img/Card-1.png",
    duration: 48,
    totalLessons: 24,
    completedLessons: 0,
    requirements: ["Базовые знания Python", "Основы математики"],
    whatYouWillLearn: [
      "Основные алгоритмы ML",
      "Работа с данными",
      "Построение моделей",
    ],
  },
  {
    id: 2,
    title: "Разработка Web-приложений на React",
    description:
      "Создавайте современные веб-приложения с использованием React, Redux и современных инструментов разработки.",
    category: "dev",
    experienceLevel: "С опытом",
    image: "/img/Card-2.png",
    duration: 56,
    totalLessons: 32,
    completedLessons: 0,
    requirements: ["JavaScript", "HTML/CSS", "Базовые знания веб-разработки"],
    whatYouWillLearn: [
      "React и его экосистема",
      "Управление состоянием",
      "Оптимизация производительности",
    ],
  },
  {
    id: 3,
    title: "Современные технологии DevOps",
    description:
      "Погрузитесь в мир DevOps: контейнеризация, CI/CD, облачные сервисы и автоматизация.",
    category: "tech",
    experienceLevel: "С опытом",
    image: "/img/Card-1.png",
    duration: 42,
    totalLessons: 28,
    completedLessons: 0,
    requirements: ["Linux", "Базовые знания сетей", "Git"],
    whatYouWillLearn: [
      "Docker и Kubernetes",
      "CI/CD пайплайны",
      "Мониторинг и логирование",
    ],
  },
  {
    id: 4,
    title: "Управление IT-проектами",
    description:
      "Освойте ключевые навыки управления IT-проектами, от планирования до успешного запуска.",
    category: "business",
    experienceLevel: "Без опыта",
    image: "/img/Card-2.png",
    duration: 36,
    totalLessons: 20,
    completedLessons: 0,
    requirements: ["Базовые знания IT", "Английский язык"],
    whatYouWillLearn: [
      "Agile методологии",
      "Управление командой",
      "Оценка рисков",
    ],
  },
  {
    id: 5,
    title: "Нейронные сети и Deep Learning",
    description:
      "Изучите глубокое обучение, архитектуры нейронных сетей и их применение в реальных проектах.",
    category: "ai",
    experienceLevel: "С опытом",
    image: "/img/Card-1.png",
    duration: 64,
    totalLessons: 40,
    completedLessons: 0,
    requirements: ["Python", "Математическая статистика", "ML основы"],
    whatYouWillLearn: [
      "CNN и RNN архитектуры",
      "Transfer Learning",
      "Развертывание моделей",
    ],
  },
  // Добавьте больше курсов...
];

export const fetchCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses);
    }, 1000);
  });
};
