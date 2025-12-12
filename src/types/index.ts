export type CardStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface DailyCardData {
  id: string;
  dayNumber: number;
  topics: string[];
  subtasks: string[];
  estimatedTime: number;
  status: CardStatus;
  hasRevision: boolean;
  revisionTopics: string[];
}

export interface StudyPlanData {
  id: string;
  title: string;
  syllabus: string;
  totalDays: number;
  hoursPerDay: number;
  cards: DailyCardData[];
  createdAt: Date;
}
