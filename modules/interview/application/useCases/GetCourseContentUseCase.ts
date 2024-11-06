import { Course } from '../../core/entities/Course';
import { CourseRepository } from '../../core/repositories/CourseRepository';

export class GetCourseContentUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(interviewId: string): Promise<Course[]> {
    try {
      return await this.courseRepository.getCourseContent(interviewId);
    } catch (error) {
      throw new Error('Failed to fetch course content');
    }
  }
}