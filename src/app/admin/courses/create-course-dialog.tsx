"use client";

import { useActionState, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCourse } from "@/actions/courses.actions";
import { getSubjects } from "@/actions/courses.actions";
import { Subject, ActionState } from "@/types";
import { Plus } from "lucide-react";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { cn } from "@/lib/utils";

export function CreateCourseDialog() {
  const [open, setOpen] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [state, formAction, isPending] = useActionState<
    ActionState | null,
    FormData
  >(createCourse, null);

  useEffect(() => {
    if (open) {
      getSubjects()
        .then(setSubjects)
        .catch(() => setSubjects([]));
    }
  }, [open]);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
        <Plus className="size-4" /> Add Course
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <FormError message={state?.error} />

          <div className="space-y-2">
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="e.g. NEET 2027"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" placeholder="Optional" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration_months">Duration (months)</Label>
            <Input
              id="duration_months"
              name="duration_months"
              type="number"
              min={1}
              required
              defaultValue={12}
            />
          </div>

          <div className="space-y-2">
            <Label>Subjects</Label>
            <div className="flex flex-wrap gap-3">
              {subjects.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No subjects found. Add subjects first.
                </p>
              )}
              {subjects.map((subject) => (
                <label
                  key={subject.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    name="subject_ids"
                    value={subject.id}
                  />
                  {subject.name}
                </label>
              ))}
            </div>
          </div>

          <SubmitButton isPending={isPending} loadingText="Creating...">
            Create Course
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
