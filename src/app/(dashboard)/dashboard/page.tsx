import { auth } from '@clerk/nextjs/server';
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import { Button } from '../../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      plans: {
        orderBy: { createdAt: 'desc' },
        include: {
          cards: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Study Plans</h1>
          <Link href="/planner/new">
            <Button>+ Create New Plan</Button>
          </Link>
        </div>

        {user?.plans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No study plans yet. Create your first one!
            </p>
            <Link href="/planner/new">
              <Button>Get Started</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.plans.map((plan) => {
              const completedCards = plan.cards.filter(
                (c) => c.status === 'DONE'
              ).length;
              const progress = (completedCards / plan.cards.length) * 100;

              return (
                <Link key={plan.id} href={`/planner/${plan.id}`}>
                  <Card className="hover:shadow-lg transition cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{plan.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          {plan.totalDays} days • {plan.hoursPerDay} hrs/day
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
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
