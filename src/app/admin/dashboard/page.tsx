import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardSummary } from "@/actions/dashboard.actions";
import { Users, UserCheck, Clock, Video } from "lucide-react";

// ✅ Enable ISR: Revalidate every 5 minutes for dashboard (more frequent updates)
export const revalidate = 300;

export default async function AdminDashboard() {
  const summary = await getDashboardSummary();

  const stats = [
    { title: "Total Students", value: summary.total_students, icon: Users },
    {
      title: "Active Enrollments",
      value: summary.active_enrollments,
      icon: UserCheck,
    },
    { title: "Pending Payments", value: summary.pending_payments, icon: Clock },
    {
      title: "Today's Live Classes",
      value: summary.todays_live_classes,
      icon: Video,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground font-normal">
                {stat.title}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
