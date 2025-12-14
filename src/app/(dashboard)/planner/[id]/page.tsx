'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
import DailyCard from '../../../../components/DailyCard';
import type { StudyPlanData, CardStatus } from '../../../../types';

export default function PlannerViewPage() {
  const params = useParams();
  const [plan, setPlan] = useState<StudyPlanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlan();
  }, [params.id]);

  const fetchPlan = async () => {
    try {
      const res = await fetch(`/api/generate-plan?id=${params.id}`);
      const data = await res.json();
      setPlan(data);
    } catch (err) {
      console.error('Failed to fetch plan', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (cardId: string, newStatus: CardStatus) => {
    setPlan((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        cards: prev.cards.map((card) =>
          card.id === cardId ? { ...card, status: newStatus } : card
        ),
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-[#0b0f1a] dark:via-[#0f1424] dark:to-[#0b0f1a] transition-colors">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white bg-orange-500 rounded-2xl py-1 px-2 max-w-2xl ">
            {plan?.title || 'Study Plan'}
          </h1>

          {plan && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {plan.totalDays} days • {plan.hoursPerDay} hours per day
            </p>
          )}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[240px] rounded-xl bg-white/60 dark:bg-white/5 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !plan && (
          <div className="flex items-center justify-center py-32">
            <p className="text-gray-500 dark:text-gray-400">
              Study plan not found.
            </p>
          </div>
        )}

        {/* CONTENT */}
        {!loading && plan && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.cards.map((card) => (
              <DailyCard
                key={card.id}
                {...card}
                onStatusChange={(newStatus) =>
                  handleStatusChange(card.id, newStatus)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
