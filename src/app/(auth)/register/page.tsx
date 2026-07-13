"use client";

import { useActionState } from "react";
import { registerAction } from "@/actions/auth.actions";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        action={formAction}
        className="w-full max-w-sm space-y-4 p-6 border rounded-lg"
      >
        <div>
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enroll and start with your batch.
          </p>
        </div>

        <FormError message={state?.error} />

        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            required
            className="w-full border rounded p-2"
            placeholder="Choose a username"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            required
            className="w-full border rounded p-2"
            placeholder="10-digit mobile number"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full border rounded p-2"
            placeholder="Create a password"
          />
        </div>

        <SubmitButton isPending={isPending} loadingText="Creating account...">
          Create account
        </SubmitButton>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
