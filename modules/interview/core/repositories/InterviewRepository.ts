import { Interview } from '../entities/Interview';

export interface InterviewRepository {
  getCurrentInterview(): Promise<Interview>;
  updateInterviewStatus(id: string, status: string): Promise<void>;
  getParticipants(interviewId: string): Promise<Interview['participants']>;
}