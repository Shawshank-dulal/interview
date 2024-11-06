"use client";

import { useEffect, useState } from 'react';
import { Settings, ArrowLeft } from "lucide-react";
import { Interview } from '../../../core/entities/Interview';
import { Course } from '../../../core/entities/Course';
import { FirebaseInterviewRepository } from '../../../infrastructure/repositories/FirebaseInterviewRepository';
import { FirebaseCourseRepository } from '../../../infrastructure/repositories/FirebaseCourseRepository';
import { GetInterviewDetailsUseCase } from '../../../application/useCases/GetInterviewDetailsUseCase';
import { GetCourseContentUseCase } from '../../../application/useCases/GetCourseContentUseCase';
import { InterviewHeader } from '../components/InterviewHeader';
import { InterviewVideo } from '../components/InterviewVideo';
import { CourseContent } from '../components/CourseContent';
import { BookSection } from '../components/BookSection';

export default function PreparePage() {
  const [interview, setInterview] = useState<Interview | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const interviewRepository = new FirebaseInterviewRepository();
      const courseRepository = new FirebaseCourseRepository();
      
      const getInterviewDetails = new GetInterviewDetailsUseCase(interviewRepository);
      const getCourseContent = new GetCourseContentUseCase(courseRepository);

      try {
        const interviewData = await getInterviewDetails.execute();
        const courseData = await getCourseContent.execute(interviewData.id);
        
        setInterview(interviewData);
        setCourses(courseData);
      } catch (error) {
        console.error('Failed to load interview data:', error);
      }
    };

    loadData();
  }, []);

  if (!interview) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back</span>
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <InterviewHeader interview={interview} />
            <InterviewVideo interview={interview} />
          </div>
          <div className="space-y-8">
            <CourseContent courses={courses} />
            <BookSection />
          </div>
        </div>
      </div>
    </div>
  );
}