export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  experienceLevel: "Без опыта" | "С опытом";
  image: string;
  duration: number;
  totalLessons: number;
  completedLessons: number;
  requirements: string[];
  whatYouWillLearn: string[];
}
