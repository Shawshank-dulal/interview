"use client";

import { Video, Mic, PhoneCall, Monitor, Share2 } from "lucide-react";
import { Interview } from '../../../core/entities/Interview';

interface InterviewVideoProps {
  interview: Interview;
}

export function InterviewVideo({ interview }: InterviewVideoProps) {
  return (
    <div className="bg-gray-200 rounded-xl overflow-hidden">
      <div className="relative aspect-video">
        <img
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
          alt="Interview participant"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50">
          <div className="flex justify-center gap-4">
            <button className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200">
              <Mic className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200">
              <PhoneCall className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200">
              <Monitor className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {interview.participants.map((participant) => (
            <div key={participant.id} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white">
              <img
                src={participant.avatarUrl}
                alt={participant.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}