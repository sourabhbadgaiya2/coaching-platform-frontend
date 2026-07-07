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
import { markPaid } from "@/actions/enrollment.actions";
import { ActionState } from "@/types";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";

export function MarkPaidDialog({ enrollmentId }: { enrollmentId: number }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<ActionState | null, FormData>(
    markPaid,
    null
  );

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
        Mark Paid
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <FormError message={state?.error} />
          <input type="hidden" name="enrollment_id" value={enrollmentId} />

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input id="amount" name="amount" type="number" min={0} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mode">Payment Mode</Label>
            <Select name="mode" required>
              <SelectTrigger id="mode">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paid_on">Paid On</Label>
            <Input id="paid_on" name="paid_on" type="date" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Input id="notes" name="notes" placeholder="Any remarks" />
          </div>

          <SubmitButton isPending={isPending} loadingText="Saving...">
            Confirm Payment
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}