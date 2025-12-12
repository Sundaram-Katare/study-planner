import Navbar from '../../../../components/Navbar';
import PlanForm from '../../../../components/PlanForm';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/Card';

export default function NewPlanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Create AI Study Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <PlanForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
