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
import { uploadMaterial } from "@/actions/content.actions";
import { Batch, ActionState } from "@/types";
import { Plus } from "lucide-react";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";

export function UploadMaterialDialog({ batches }: { batches: Batch[] }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<
    ActionState | null,
    FormData
  >(uploadMaterial, null);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
        <Plus className="size-4" /> Upload Material
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Material</DialogTitle>
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
              placeholder="e.g. Chapter 1 - Notes"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video_url">Video URL (optional)</Label>
            <Input
              id="video_url"
              name="video_url"
              placeholder="YouTube unlisted link"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Or Upload File (PDF, etc.)</Label>
            <Input id="file" name="file" type="file" />
          </div>

          <SubmitButton isPending={isPending} loadingText="Uploading...">
            Upload
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
