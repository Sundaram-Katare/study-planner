'use client';

import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { getStatusBadge } from '../lib/utils';
import type { CardStatus } from '../types';

interface DailyCardProps {
  id: string;
  dayNumber: number;
  topics: string[];
  subtasks: string[];
  estimatedTime: number;
  status: CardStatus;
  hasRevision: boolean;
  revisionTopics: string[];
  onStatusChange: (newStatus: CardStatus) => void;
}

export default function DailyCard(props: DailyCardProps) {
  const {
    id,
    dayNumber,
    topics,
    subtasks,
    estimatedTime,
    status,
    hasRevision,
    revisionTopics,
    onStatusChange,
  } = props;

  const [currentStatus, setCurrentStatus] = useState<CardStatus>(status);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const badge = getStatusBadge(currentStatus);

  const statusBg: Record<CardStatus, string> = {
    TODO: 'bg-gray-200',
    IN_PROGRESS: 'bg-yellow-500',
    DONE: 'bg-green-400',
  };

  const handleStatusChange = async () => {
    const flow: Record<CardStatus, CardStatus> = {
      TODO: 'IN_PROGRESS',
      IN_PROGRESS: 'DONE',
      DONE: 'TODO',
    };

    const newStatus = flow[currentStatus];
    setLoading(true);

    try {
      const res = await fetch('/api/update-card', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: id, status: newStatus }),
      });

      if (res.ok) {
        setCurrentStatus(newStatus);
        onStatusChange(newStatus);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        className={`h-[240px] p-4 rounded-xl border border-white/10 text-black flex flex-col justify-between transition hover:scale-[1.02] ${statusBg[currentStatus]}`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Day {dayNumber}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${badge.color}`}>
              {badge.emoji} {badge.label}
            </span>
          </div>

          <p className="text-xs text-black font-semibold">
            ⏱ {estimatedTime} hrs
          </p>

          <ul className="text-xs black space-y-1 line-clamp-3">
            {topics.slice(0, 3).map((t, i) => (
              <li key={i}>• {t}</li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => setOpen(true)}
          >
            View
          </Button>

          <Button
            disabled={loading}
            className="w-full bg-white text-black hover:bg-gray-200"
            onClick={handleStatusChange}
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </Card>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="max-w-lg w-full rounded-2xl bg-[#0b1220] border border-white/10 p-6 text-white space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Day {dayNumber} Details
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Topics</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                {topics.map((t, i) => (
                  <li key={i}>• {t}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Subtasks</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                {subtasks.map((s, i) => (
                  <li key={i}>☐ {s}</li>
                ))}
              </ul>
            </div>

            {hasRevision && revisionTopics.length > 0 && (
              <div className="bg-[#1f2937] rounded-lg p-3">
                <h4 className="text-sm font-semibold mb-2">
                  🔄 Revision
                </h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  {revisionTopics.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              </div>
            )}

            <Button className="w-full" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
