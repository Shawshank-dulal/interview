export function InterviewHeader({
  title = "Sample Test",
  lessons = "3 Criterias",
  duration = "15 Min"
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center mt-2 text-gray-600">
        <span>{lessons}</span>
        <span className="mx-2">•</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}