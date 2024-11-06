import { Interview } from '../../../core/entities/Interview';

interface InterviewHeaderProps {
  interview: Interview;
}

export function InterviewHeader({ interview }: InterviewHeaderProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">{interview.title}</h1>
      <div className="flex items-center mt-2 text-gray-600">
        <span>{interview.totalLessons} Lessons</span>
        <span className="mx-2">•</span>
        <span>{interview.duration}</span>
      </div>
    </div>
  );
}