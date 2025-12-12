// components/BeforeAfterComparison.tsx
import { X, Check, Calendar, TrendingUp, Clock, Brain } from 'lucide-react';

export default function BeforeAfterComparison() {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Study Chaos
          </h2>
          <p className="text-xl text-gray-600">
            From overwhelming mess to organized success
          </p>
        </div>

        {/* Split Comparison */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* BEFORE Section */}
          <div className="relative">
            {/* Label Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
                ❌ Before
              </span>
            </div>

            {/* Before Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-red-200 h-full">
              {/* Messy Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Traditional Planning
                </h3>
                <p className="text-gray-500 italic">Stress & Confusion</p>
              </div>

              {/* Messy Elements */}
              <div className="space-y-4">
                {/* Crossed out sticky notes */}
                <div className="bg-yellow-100 p-4 rounded-lg rotate-[-2deg] border-2 border-yellow-300 relative">
                  <p className="text-gray-700 line-through">Study Arrays - Day 1</p>
                  <X className="absolute top-2 right-2 text-red-500 w-8 h-8" strokeWidth={3} />
                </div>

                <div className="bg-pink-100 p-4 rounded-lg rotate-[3deg] border-2 border-pink-300 relative">
                  <p className="text-gray-700 line-through">Finish Trees by Thursday</p>
                  <X className="absolute top-2 right-2 text-red-500 w-8 h-8" strokeWidth={3} />
                </div>

                <div className="bg-blue-100 p-4 rounded-lg rotate-[-1deg] border-2 border-blue-300">
                  <p className="text-gray-700">??? What to study today?</p>
                  <p className="text-sm text-gray-500 mt-1">Confused & Lost</p>
                </div>

                {/* Pain Points List */}
                <div className="mt-6 space-y-3 pt-4 border-t-2 border-gray-200">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">Spent 3 hours making a plan that didn't work</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">Forgot what I studied last week</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">No idea if I'll finish on time</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">Constantly stressed and anxious</p>
                  </div>
                </div>
              </div>

              {/* Stressed Emoji */}
              <div className="text-center mt-6 text-5xl">
                😰
              </div>
            </div>
          </div>

          {/* AFTER Section */}
          <div className="relative">
            {/* Label Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
                ✨ After
              </span>
            </div>

            {/* After Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-green-200 h-full">
              {/* Clean Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  With SmartStudy Planner
                </h3>
                <p className="text-green-600 font-semibold italic">Organized & Confident</p>
              </div>

              {/* Progress Overview */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                  <span className="text-green-600 font-bold">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" style={{width: '67%'}}></div>
                </div>
              </div>

              {/* Clean Task Cards */}
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Check className="w-6 h-6 text-green-600" strokeWidth={3} />
                      <div>
                        <p className="font-semibold text-gray-800">Day 12: Binary Trees</p>
                        <p className="text-sm text-gray-500">Completed today</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-bold text-2xl">✓</span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-yellow-600" />
                    <div>
                      <p className="font-semibold text-gray-800">Day 13: AVL Trees</p>
                      <p className="text-sm text-gray-500">In progress - 2/4 tasks done</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800">Day 14: Graph Basics</p>
                      <p className="text-sm text-gray-500">Scheduled for tomorrow</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="mt-6 space-y-3 pt-4 border-t-2 border-gray-200">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600">Schedule generated in 30 seconds</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600">Automatic review days for retention</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600">Clear visibility of exam readiness</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600">Calm, focused, and in control</p>
                </div>
              </div>

              {/* Happy Emoji */}
              <div className="text-center mt-6 text-5xl">
                🎯
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
            Get Your AI Study Plan Now →
          </button>
          <p className="text-gray-500 mt-4">Join 1,000+ students studying smarter, not harder</p>
        </div>
      </div>
    </section>
  );
}
