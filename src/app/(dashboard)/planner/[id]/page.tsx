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
      const response = await fetch(`/api/generate-plan?id=${params.id}`);
      const data = await response.json();
      setPlan(data);
    } catch (error) {
      console.error('Failed to fetch plan', error);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading study plan...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Plan not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {plan.title}
          </h1>
          <p className="text-gray-600">
            {plan.totalDays} days • {plan.hoursPerDay} hours per day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
