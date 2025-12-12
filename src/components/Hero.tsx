"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { useState } from "react";
import { MoonIcon } from "lucide-react";
import BeforeAfterComparison from "./ui/BeforeAfterComparisons";

export default function Hero() {
    const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-r ${darkMode ? 'from-gray-900 to-black' : 'from-indigo-600 to-blue-500'}`}>
      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between max-w-7xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow">
            <span className="text-blue-600 font-bold text-xl">P</span>
          </div>
          <span className="text-white font-semibold text-xl">Planix</span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-white/80 text-lg">
          <span className="hover:text-white cursor-pointer">Clean</span>
          <span className="hover:text-white cursor-pointer">Oninietr</span>
          <span className="hover:text-white cursor-pointer">Dweaction</span>

          <MoonIcon onClick={() => setDarkMode(!darkMode)} />
        </div>

        <Button
          className="hidden md:block rounded-full px-8 py-3 bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition text-lg h-auto"
        >
          Davaeation
        </Button>
      </nav>

      {/* HERO CONTENT */}
      <div className="max-w-7xl mx-auto text-center px-6 pt-24 pb-28">
        <h1 className="text-white font-extrabold text-5xl sm:text-6xl md:text-6xl leading-tight">
          Master Your Exams with AI-Powered
          <br />
          Study Schedules
        </h1>

        <p className="mt-6 text-white/80 text-lg sm:text-xl max-w-2xl mx-auto">
          Master your Exams AI Powered Study Schedules
        </p>

        {/* CTA BUTTON */}
        <div className="mt-10">
          <Link href="/sign-up">
            <Button className="text-lg px-10 py-5 h-auto rounded-full bg-gradient-to-r from-[#00E676] to-[#00C853] text-white shadow-xl hover:opacity-90">
              Get Started
            </Button>
          </Link>
        </div>

        {/* FEATURES SECTION */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon="/calendar.png" // replace with your icons if needed
            title="Smart Scheduling"
            description="Professional explanations for study schedules."
          />
          <FeatureCard
            icon="/brain.png"
            title="AI-Powered"
            description="Professional AI to handle clean visual planning."
          />
          <FeatureCard
            icon="/chart.png"
            title="Track Progress"
            description="Encouraging tools to track progress effectively."
          />
        </div>
      </div>
      <BeforeAfterComparison />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition text-center flex flex-col items-center">
      <img src={icon} alt={title} className="h-14 w-14 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
