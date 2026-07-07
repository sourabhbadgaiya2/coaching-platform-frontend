"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { requestEnrollment } from "@/actions/enrollment.actions";

export function EnrollButton({ batchId }: { batchId: number }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleEnroll = () => {
    startTransition(async () => {
      const result = await requestEnrollment(batchId);
      if (result.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div>
      <Button onClick={handleEnroll} disabled={isPending} className="w-full">
        {isPending ? "Requesting..." : "Enroll"}
      </Button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
