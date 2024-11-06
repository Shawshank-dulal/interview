import { Course } from '../entities/Course';

export interface CourseRepository {
  getCourseContent(interviewId: string): Promise<Course[]>;
  updateProgress(courseId: string, progress: number): Promise<void>;
  getLessonDetails(courseId: string, lessonId: string): Promise<Course>;
}