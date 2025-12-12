import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusBadge(status: string) {
  switch (status) {
    case 'TODO':
      return { emoji: '🟦', label: 'To Do', color: 'bg-blue-100 text-blue-800' };
    case 'IN_PROGRESS':
      return { emoji: '🟧', label: 'In Progress', color: 'bg-orange-100 text-orange-800' };
    case 'DONE':
      return { emoji: '🟩', label: 'Done', color: 'bg-green-100 text-green-800' };
    default:
      return { emoji: '🟦', label: 'To Do', color: 'bg-gray-100 text-gray-800' };
  }
}
