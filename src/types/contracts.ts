export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  enrolledStudents: number;
  modules?: {
    title: string;
    description: string;
  }[];
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  level: string;
  instructor: string;
  views: number;
  likes: number;
  requiresMembership: boolean;
  courseId: string;
}

export interface ContractResult {
  success: boolean;
  hash?: string;
  error?: string;
}
