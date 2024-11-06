"use client";

import { ChevronDown, Clock, Lock } from "lucide-react";
import { Course } from '../../../core/entities/Course';

interface CourseContentProps {
  courses: Course[];
}

export function CourseContent({ courses }: CourseContentProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Course Contents</h2>
        <div className="text-sm text-teal-500">2/5 COMPLETED</div>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <button className="flex items-center justify-between w-full text-left">
              <div>
                <h3 className="font-medium">{course.title}</h3>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                  <span className="mx-2">•</span>
                  {course.totalLessons} Lessons
                </div>
              </div>
              <ChevronDown className="w-5 h-5" />
            </button>

            {course.items && course.items.length > 0 && (
              <div className="mt-4 space-y-3 pl-4">
                {course.items.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      {item.isLocked && <Lock className="w-4 h-4 mr-2 text-gray-400" />}
                      <span className={item.isLocked ? "text-gray-400" : ""}>
                        {index + 1}. {item.title}
                      </span>
                    </div>
                    <span className={item.isLocked ? "text-gray-400" : ""}>{item.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}