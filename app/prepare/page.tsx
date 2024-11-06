"use client";

import { useState, useEffect, useRef } from "react";
import { Settings, ArrowLeft } from "lucide-react";
import { InterviewHeader } from "@/components/interview/InterviewHeader";
import { InterviewVideo } from "@/components/interview/InterviewVideo";
import { BookSection } from "@/components/interview/BookSection";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/modules/auth/store/authStore';
import { Statistics } from "@/components/Statistics";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <h1 className="text-xl">My Application</h1>
          {user && (
              <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                  Logout
              </button>
          )}
      </header>
  );
}

function SpeechRecognitionHandler({ transcript, setTranscript, socket, threadId }) {
  const [recognizing, setRecognizing] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    const recognitionInstance = new (window as any).webkitSpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onstart = () => setRecognizing(true);
    recognitionInstance.onend = () => {
      setRecognizing(false);
      if (socket && transcript) socket.send(transcript);
    };
    recognitionInstance.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        else interimTranscript += event.results[i][0].transcript;
      }
      setTranscript((prev: string) => prev + finalTranscript);
    };

    recognitionRef.current = recognitionInstance;
  }, [socket, transcript]);

  const startRecognition = () => {
    setTranscript("");
    recognitionRef.current?.start();
  };

  const stopRecognition = () => {
    recognitionRef.current?.stop();
    if (socket && transcript) {
      socket.send(JSON.stringify({
        action: "sendmessage",
        data: { question: transcript, agent_id: "interv101", thread_id: threadId }
      }));
    }
  };

  return { startRecognition, stopRecognition, recognizing };
}

function WebSocketHandler({ transcript, setTranscript, audioQueue, setAudioQueue }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL || "");
    ws.onopen = () => {
      ws.send(JSON.stringify({
        action: "sendmessage",
        data: { question: "start", agent_id: "interv101" }
      }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const { message: msg, thread_id } = message;
      setThreadId(thread_id);

      const parsedMessage = JSON.parse(msg.replace(/```json/g, '').replace(/```/g, ''));
      playAudio(parsedMessage.question);
    };

    setSocket(ws);

    return () => ws.close();
  }, [transcript]);

  const playAudio = (text: string) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.NEXT_PUBLIC_AZURE_SPEECH_SERVICES_KEY || "",
      process.env.NEXT_PUBLIC_AZURE_SPEECH_SERVICES_REGION || ""
    );
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(
      text,
      (result) => {
        synthesizer.close();
        if (result.errorDetails) return console.error(result.errorDetails);

        const audioBlob = new Blob([result.audioData], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioQueue((prevQueue: string[]) => [...prevQueue, audioUrl]);
      },
      (error) => {
        synthesizer.close();
        console.error("Error synthesizing speech:", error);
      }
    );
  };

  return { socket, threadId };
}

export default function PreparePage() {
  const [transcript, setTranscript] = useState<string>("");
  const [audioQueue, setAudioQueue] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { socket, threadId } = WebSocketHandler({ transcript, setTranscript, audioQueue, setAudioQueue });
  const { startRecognition, stopRecognition, recognizing } = SpeechRecognitionHandler({ transcript, setTranscript, socket, threadId });

  useEffect(() => {
    if (audioQueue.length > 0 && audioRef.current) {
      audioRef.current.src = audioQueue[0];
      audioRef.current.play()
        .then(() => setAudioQueue((prevQueue: string[]) => prevQueue.slice(1)))
        .catch((error) => console.error("Audio playback failed:", error));
    }
  }, [audioQueue]);

  return (
    <>
      <Header />
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
              <InterviewHeader title="Interview Title" lessons="5 Lessons" duration="30 Min" />
              <InterviewVideo />
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg"
                rows={5}
                value={transcript}
                readOnly
              />
              <div className="flex gap-4">
                <button
                  onClick={startRecognition}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={recognizing}
                >
                  Start Recognition
                </button>
                <button
                  onClick={stopRecognition}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  disabled={!recognizing}
                >
                  Stop Recognition
                </button>
              </div>
              <audio ref={audioRef} controls autoPlay className="w-full mt-4" />
            </div>
            <div className="space-y-8">
              <Statistics />
              <BookSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
