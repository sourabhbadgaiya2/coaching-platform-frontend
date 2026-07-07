"use client";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isPending: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

export function SubmitButton({
  isPending,
  children,
  loadingText = "Saving...",
}: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {isPending ? loadingText : children}
    </Button>
  );
}
