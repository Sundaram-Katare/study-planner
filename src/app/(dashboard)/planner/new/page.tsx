"use client";

import { useState } from "react";
import Navbar from "../../../../components/Navbar";
import PlanForm from "../../../../components/PlanForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../../components/ui/Card";

const tips = [
  "Sit straight, your posture matters 🧍‍♂️",
  "Drink some water 💧",
  "Relax your eyes for a moment 👀",
  "Deep breath in… and out 🌿",
];

export default function NewPlanPage() {
  const [generating, setGenerating] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const handleGenerate = async () => {
    setGenerating(true);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTipIndex(i % tips.length);
    }, 4000);

    setTimeout(() => {
      clearInterval(interval);
      setGenerating(false);
    }, 16000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r  dark:from-gray-900 dark:to-black transition-colors">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT – FORM */}
          <Card className="rounded-3xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Create AI Study Plan
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tell us your goals and let AI handle the planning
              </p>
            </CardHeader>
            <CardContent>
              <PlanForm onGenerate={handleGenerate} />
            </CardContent>
          </Card>

          {/* RIGHT – VISUAL / LOADER */}
          <div className="relative rounded-3xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-white/70 to-white/40 dark:from-white/5 dark:to-white/10 backdrop-blur-xl shadow-xl flex items-center justify-center overflow-hidden">

            {!generating ? (
              <div className="text-center px-8">
                {/* YOU WILL ADD IMAGE HERE */}
                <div className="mb-6 h-48 w-full rounded-xl flex items-center justify-center text-gray-400">
                  <img src="https://www.transparentpng.com/download/books/reading-study-knowledge-letters-two-in-a-row-animation-books-transparent-hd--Mi0MLZ.png" className="object-fit max-w-fit h-36" alt="" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Personalized Plan
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  AI will generate a focused, balanced and achievable study plan
                  based on your inputs.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-purple-600 animate-spin" />
                </div>

                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center transition">
                  {tips[tipIndex]}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
