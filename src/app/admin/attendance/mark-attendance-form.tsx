"use client";

import { useActionState, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  bulkMarkAttendance,
  getAttendanceForDate,
} from "@/actions/attendance.actions";
import { ActionState, AttendanceStatus } from "@/types";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";

interface Student {
  id: number;
  username: string;
}

type Status = AttendanceStatus;

export function MarkAttendanceForm({
  batchId,
  students,
}: {
  batchId: number;
  students: Student[];
}) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [statuses, setStatuses] = useState<Record<number, Status>>(
    Object.fromEntries(students.map((s) => [s.id, "present" as Status])),
  );
  const [state, formAction, isPending] = useActionState<
    ActionState | null,
    FormData
  >(bulkMarkAttendance, null);

  // Jab bhi date/batch change ho, existing attendance fetch karke prefill karo
  useEffect(() => {
    getAttendanceForDate(batchId, date).then((existing) => {
      setStatuses((prev) => {
        const updated: Record<number, Status> = {};
        students.forEach((s) => {
          updated[s.id] = existing[s.id] || "present";
        });
        return updated;
      });
    });
  }, [batchId, date, students]);

  useEffect(() => {
    if (state?.success) {
      alert("Attendance saved!");
    }
  }, [state]);

  const setStatus = (studentId: number, status: Status) => {
    setStatuses((prev) => ({ ...prev, [studentId]: status }));
  };

  const records = students.map((s) => ({
    student_id: s.id,
    status: statuses[s.id] || "present",
  }));

  if (students.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No active students in this batch.
      </p>
    );
  }
  const markAllAs = (status: Status) => {
    setStatuses(Object.fromEntries(students.map((s) => [s.id, status])));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <FormError message={state?.error} />
          <input type="hidden" name="batch_id" value={batchId} />
          <input type="hidden" name="date" value={date} />
          <input type="hidden" name="records" value={JSON.stringify(records)} />

          <div className="space-y-2 max-w-[200px]">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => markAllAs("present")}
            >
              Mark All Present
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => markAllAs("absent")}
            >
              Mark All Absent
            </Button>
          </div>

          <div className="space-y-2">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <span className="text-sm font-medium">{student.username}</span>
                <div className="flex gap-2">
                  {(["present", "absent", "leave"] as Status[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatus(student.id, s)}
                      className={`text-xs px-3 py-1 rounded-full border capitalize ${
                        statuses[student.id] === s
                          ? s === "present"
                            ? "bg-green-600 text-white"
                            : s === "absent"
                              ? "bg-red-600 text-white"
                              : "bg-yellow-600 text-white"
                          : ""
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <SubmitButton isPending={isPending} loadingText="Saving...">
            Save Attendance
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
