import { getEnrollments } from "@/actions/enrollment.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MarkPaidDialog } from "./mark-paid-dialog";
import { RejectButton } from "./reject-button";

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  active: "default",
  pending: "secondary",
  rejected: "destructive",
  completed: "secondary",
};

export default async function EnrollmentsPage() {
  const enrollments = await getEnrollments();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Enrollments</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    No enrollments yet
                  </TableCell>
                </TableRow>
              )}
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">
                    {enrollment.student_name}
                  </TableCell>
                  <TableCell>{enrollment.batch_name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={statusVariant[enrollment.status] || "secondary"}
                    >
                      {enrollment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(enrollment.requested_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {enrollment.status === "pending" && (
                      <>
                        <MarkPaidDialog enrollmentId={enrollment.id} />
                        <RejectButton enrollmentId={enrollment.id} />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
