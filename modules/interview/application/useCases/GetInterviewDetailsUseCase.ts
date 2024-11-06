import { Interview } from '../../core/entities/Interview';
import { InterviewRepository } from '../../core/repositories/InterviewRepository';

export class GetInterviewDetailsUseCase {
  constructor(private interviewRepository: InterviewRepository) {}

  async execute(): Promise<Interview> {
    try {
      return await this.interviewRepository.getCurrentInterview();
    } catch (error) {
      throw new Error('Failed to fetch interview details');
    }
  }
}