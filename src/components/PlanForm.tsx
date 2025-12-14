'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/TextArea';

export default function PlanForm({ onGenerate }: { onGenerate: () => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    syllabus: '',
    totalDays: '',
    hoursPerDay: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      onGenerate();
    setLoading(true);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          syllabus: formData.syllabus,
          totalDays: parseInt(formData.totalDays),
          hoursPerDay: parseFloat(formData.hoursPerDay),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/planner/${data.planId}`);
      } else {
        alert(data.error || 'Failed to generate study plan');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Plan Title
        </label>
        <Input
          type="text"
          placeholder="e.g., Data Structures Exam Prep"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Syllabus / Topics
        </label>
        <Textarea
          placeholder="Enter your syllabus topics (e.g., Arrays, Linked Lists, Trees, Graphs, Sorting Algorithms...)"
          rows={6}
          value={formData.syllabus}
          onChange={(e) =>
            setFormData({ ...formData, syllabus: e.target.value })
          }
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Number of Days
          </label>
          <Input
            type="number"
            min="1"
            max="365"
            placeholder="e.g., 14"
            value={formData.totalDays}
            onChange={(e) =>
              setFormData({ ...formData, totalDays: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Hours Per Day
          </label>
          <Input
            type="number"
            min="0.5"
            max="24"
            step="0.5"
            placeholder="e.g., 3"
            value={formData.hoursPerDay}
            onChange={(e) =>
              setFormData({ ...formData, hoursPerDay: e.target.value })
            }
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Generating Plan...' : 'Generate AI Study Plan'}
      </Button>
    </form>
  );
}
