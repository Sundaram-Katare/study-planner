'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
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

export default function DailyCard({
  id,
  dayNumber,
  topics,
  subtasks,
  estimatedTime,
  status,
  hasRevision,
  revisionTopics,
  onStatusChange,
}: DailyCardProps) {
  const [currentStatus, setCurrentStatus] = useState<CardStatus>(status);
  const [loading, setLoading] = useState(false);
  const badge = getStatusBadge(currentStatus);

  const handleStatusChange = async () => {
    const statusFlow: Record<CardStatus, CardStatus> = {
      TODO: 'IN_PROGRESS',
      IN_PROGRESS: 'DONE',
      DONE: 'TODO',
    };

    const newStatus = statusFlow[currentStatus];
    setLoading(true);

    try {
      const response = await fetch('/api/update-card', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: id, status: newStatus }),
      });

      if (response.ok) {
        setCurrentStatus(newStatus);
        onStatusChange(newStatus);
      }
    } catch (error) {
      console.error('Failed to update status', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">Day {dayNumber}</CardTitle>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}
          >
            {badge.emoji} {badge.label}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">📖 Topics</h4>
            <ul className="list-disc list-inside space-y-1">
              {topics.map((topic, idx) => (
                <li key={idx} className="text-gray-600">
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">
              ⏱️ Estimated Time: {estimatedTime} hours
            </h4>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">✅ Subtasks</h4>
            <ul className="space-y-1">
              {subtasks.map((task, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">☐</span>
                  <span className="text-gray-600">{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {hasRevision && revisionTopics.length > 0 && (
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">
                🔄 Revision Needed
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {revisionTopics.map((topic, idx) => (
                  <li key={idx} className="text-yellow-700">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button
            onClick={handleStatusChange}
            disabled={loading}
            variant="outline"
            className="w-full mt-4"
          >
            {loading ? 'Updating...' : 'Update Status'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
