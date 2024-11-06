import { Statistics } from "@/components/Statistics";

export function CourseContent() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Course Contents</h2>
        <div className="text-sm text-teal-500">2/5 COMPLETED</div>
      </div>

      <Statistics />
    </div>
  );
}