import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { Button } from "../../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      plans: {
        orderBy: { createdAt: "desc" },
        include: { cards: true },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-white dark:from-gray-900 dark:to-black transition-colors">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              My Study Plans
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage and track your learning journey
            </p>
          </div>

          <Link href="/planner/new">
            <Button className="cursor-pointer hover:scale-[1.05] transition-all easeInOut rounded-xl px-6 py-3 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition">
              + Create New Plan
            </Button>
          </Link>
        </div>

        {user?.plans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="max-w-md">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                No study plans yet
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
                Create your first AI-powered study plan and start progressing.
              </p>
              <Link href="/planner/new">
                <Button className="rounded-xl px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {user?.plans.map((plan) => {
              const completedCards = plan.cards.filter(
                (c) => c.status === "DONE"
              ).length;

              const progress =
                plan.cards.length > 0
                  ? (completedCards / plan.cards.length) * 100
                  : 0;

              return (
                <Link key={plan.id} href={`/planner/${plan.id}`}>
                  <Card className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-md hover:shadow-2xl transition-all cursor-pointer">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 to-purple-500/10" />

                    <CardHeader className="relative z-10">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {plan.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-4">
                      <div className="flex gap-3 flex-wrap">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          {plan.totalDays} days
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                          {plan.hoursPerDay} hrs/day
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {completedCards}/{plan.cards.length} days completed
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
