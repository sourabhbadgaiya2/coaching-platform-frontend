"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBatch } from "@/actions/courses.actions";
import { Course, ActionState } from "@/types";
import { Plus } from "lucide-react";

export function CreateBatchDialog({ courses }: { courses: Course[] }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<
    ActionState | null,
    FormData
  >(createBatch, null);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
        <Plus className="size-4" /> Add Batch
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Batch</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select name="course" required>
              <SelectTrigger id="course">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={String(course.id)}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="batch_name">Batch Name</Label>
            <Input
              id="batch_name"
              name="name"
              required
              placeholder="e.g. Morning Batch"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="start_date">Start Date</Label>
            <Input id="start_date" name="start_date" type="date" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timing">Timing</Label>
            <Input
              id="timing"
              name="timing"
              required
              placeholder="e.g. Mon-Fri 6-8 AM"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              min={1}
              required
              defaultValue={30}
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating..." : "Create Batch"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
