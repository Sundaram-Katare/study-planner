import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateStudyPlan(
  syllabus: string,
  totalDays: number,
  hoursPerDay: number
) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an expert study planner. Create a detailed ${totalDays}-day study plan.

User has ${hoursPerDay} hours per day to study.
Syllabus: ${syllabus}

Generate a JSON response with this exact structure:
{
  "days": [
    {
      "dayNumber": 1,
      "topics": ["Topic 1", "Topic 2"],
      "subtasks": ["Subtask 1", "Subtask 2", "Subtask 3"],
      "estimatedTime": 3.0,
      "hasRevision": false,
      "revisionTopics": []
    }
  ]
}

Rules:
1. Distribute topics logically across ${totalDays} days
2. Each day should have ${hoursPerDay} hours of content
3. Add revision days after completing major topics (set hasRevision: true)
4. Break down topics into specific, actionable subtasks
5. Estimate time realistically for each day
6. Return ONLY valid JSON, no markdown or explanations`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Clean the response to extract JSON
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to generate valid study plan');
  }

  return JSON.parse(jsonMatch[0]);
}
