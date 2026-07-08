"use client";

import { useActionState, useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createLiveClass } from "@/actions/live-classes.actions";
import { Batch, ActionState } from "@/types";
import { Plus } from "lucide-react";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";

export function CreateLiveClassDialog({ batches }: { batches: Batch[] }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<
    ActionState | null,
    FormData
  >(createLiveClass, null);

  useEffect(() => {
    if (state?.success) setOpen(false);
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
        <Plus className="size-4" /> Schedule Class
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Live Class</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <FormError message={state?.error} />

          <div className="space-y-2">
            <Label htmlFor="batch">Batch</Label>
            <Select name="batch" required>
              <SelectTrigger id="batch">
                <SelectValue placeholder="Select a batch" />
              </SelectTrigger>
              <SelectContent>
                {batches.map((batch) => (
                  <SelectItem key={batch.id} value={String(batch.id)}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="e.g. Doubt Session"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" type="time" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meeting_link">Meeting Link</Label>
            <Input
              id="meeting_link"
              name="meeting_link"
              required
              placeholder="https://meet.google.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration_minutes">Duration (minutes)</Label>
            <Input
              id="duration_minutes"
              name="duration_minutes"
              type="number"
              min={1}
              required
              defaultValue={60}
            />
          </div>

          <SubmitButton isPending={isPending} loadingText="Scheduling...">
            Schedule Class
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
