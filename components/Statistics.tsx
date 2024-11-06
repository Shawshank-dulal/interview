"use client";

import { User, Clock, CheckSquare } from "lucide-react";

interface StatisticsProps {
  personalInfoPercentage?: number;
  academicsPercentage?: number;
  intentPercentage?: number;
  completedPercentage?: number;
}

export function Statistics({
  personalInfoPercentage = 0,
  academicsPercentage = 0,
  intentPercentage = 0,
  completedPercentage = 0,
}: StatisticsProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-2">Test Stats</h2>
      <p className="text-gray-500 mb-8">January - June 2021</p>
      
      <div className="space-y-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500 p-2 rounded-full">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500">Personal Info</p>
            <div className="flex justify-between items-center">
              <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden mr-3">
                <div className="h-full bg-blue-500" style={{ width: `${personalInfoPercentage}%` }}></div>
              </div>
              <span className="font-semibold">{personalInfoPercentage}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-green-500 p-2 rounded-full">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500">Academics</p>
            <div className="flex justify-between items-center">
              <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden mr-3">
                <div className="h-full bg-green-500" style={{ width: `${academicsPercentage}%` }}></div>
              </div>
              <span className="font-semibold">{academicsPercentage}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-orange-500 p-2 rounded-full">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500">Intent</p>
            <div className="flex justify-between items-center">
              <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden mr-3">
                <div className="h-full bg-orange-500" style={{ width: `${intentPercentage}%` }}></div>
              </div>
              <span className="font-semibold">{intentPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative pt-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center mt-8">
            <span className="text-4xl font-bold text-green-500 mt-10">{completedPercentage}%</span>
            <p className="text-gray-500 mt-2">Completed</p>
          </div>
        </div>
        <svg className="w-full h-48" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#22c55e"
            strokeWidth="10"
            strokeDasharray="282.7"
            strokeDashoffset={`${(1 - completedPercentage / 100) * 282.7}`}
            transform="rotate(-90 50 50)"
          />
        </svg>
      </div>
    </div>
  );
}