import { getBatches } from "@/actions/courses.actions";
import { getMyEnrollments } from "@/actions/enrollment.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnrollButton } from "./enroll-button";

export default async function BatchesPage() {
  const [batches, myEnrollments] = await Promise.all([
    getBatches(),
    getMyEnrollments(),
  ]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Available Batches</h1>

      <div className="space-y-3">
        {batches.map((batch) => {
          const enrollment = myEnrollments.find((e) => e.batch === batch.id);

          return (
            <Card key={batch.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{batch.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {batch.course_name}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span>{batch.timing}</span>
                  <span>•</span>
                  <span>
                    Starts {new Date(batch.start_date).toLocaleDateString()}
                  </span>
                </div>

                {enrollment ? (
                  <Badge
                    variant={
                      enrollment.status === "active" ? "default" : "secondary"
                    }
                  >
                    {enrollment.status === "pending"
                      ? "Request Pending"
                      : enrollment.status}
                  </Badge>
                ) : (
                  <EnrollButton batchId={batch.id} />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
