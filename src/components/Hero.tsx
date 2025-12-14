"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";
import { BookOpenCheck, CircleCheckBig, Frown, Github, Handshake, MoonIcon } from "lucide-react";
import BeforeAfterComparison from "./ui/BeforeAfterComparisons";
import { Check, Car, MapPin } from "lucide-react";
import LaptopShowcase from "./LaptopShowcase";

export default function Hero() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-r ${darkMode ? 'from-gray-900 to-black' : 'from-white to-gray-100'}`}>
      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between max-w-7xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow">
            <span className="text-blue-600 font-bold text-xl">P</span>
          </div>
          <span className="text-white font-semibold text-xl">Planix</span>
        </div> 

        <Button
          className="cursor-pointer hidden md:block rounded-full px-8 py-3 bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition text-lg h-auto"
        >
          <Github href="https://github.com/Sundaram-Katare/study-planner" />
        </Button>
      </nav>

      {/* HERO CONTENT */}
      <div className="max-w-7xl mx-auto text-center px-6 pt-24 pb-28">
        <h1 className={` font- text-5xl sm:text-6xl md:text-6xl ${darkMode ? 'glow-silver' : 'text-black font-[700]'} leading-tight`}>
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
        <div className="mt-4 md:mt-8">
          <Stepper mode={darkMode ? "dark" : "light"} />
        </div>
        {/* <LaptopShowcase /> */}
      </div>

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


const steps = [
  { label: "Exams next week?", icon: <BookOpenCheck size={36} color="black" /> },
  { label: "Stress starts coming", icon: <Frown size={36} color="black" /> },
  { label: "Use Planix", icon: <Handshake size={36} color="black" /> },
  { label: "Ready with the plan", icon: <CircleCheckBig size={36} color="black" /> }
];

function Stepper({ mode }: { mode?: "light" | "dark" }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setActive(prev => (prev + 1) % steps.length);
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full flex items-center justify-center px-4 py-8">
      <div className="flex items-center w-full max-w-4xl">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center w-full">
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full transition-all
                ${
                  index < active
                    ? "bg-green-500 text-white"
                    : index === active
                    ? "bg-green-400 text-white ring-4 ring-green-200"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.icon}
              </div>
              <p
                className={`mt-2 text-sm font-medium transition-all
                ${
                  mode === "light" ? (index <= active ? "text-black" : "text-gray-400") : (index <= active ? "text-white" : "text-gray-500" )
                }`}
              >
                {step.label}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`h-[2px] flex-1 mx-2 transition-all
                ${
                  index < active
                    ? "bg-green-400"
                    : "bg-gray-300"
                }`}
              />
            )}
          </div> 
        ))}
      </div>
    </div>
  );
}
