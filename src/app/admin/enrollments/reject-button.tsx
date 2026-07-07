"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { rejectEnrollment } from "@/actions/enrollment.actions";

export function RejectButton({ enrollmentId }: { enrollmentId: number }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleReject = () => {
    startTransition(async () => {
      const result = await rejectEnrollment(enrollmentId);
      if (result.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="inline-block">
      <Button
        variant="destructive"
        size="sm"
        onClick={handleReject}
        disabled={isPending}
      >
        {isPending ? "Rejecting..." : "Reject"}
      </Button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
