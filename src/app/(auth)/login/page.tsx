"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/dist/client/link";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        action={formAction}
        className="w-full max-w-sm space-y-4 p-6 border rounded-lg"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

        <input
          name="username"
          placeholder="Username"
          className="w-full border rounded p-2"
          defaultValue={"admin-sb"}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border rounded p-2"
          defaultValue={"sourabh12"}
          required
        />

        <SubmitButton isPending={isPending} loadingText="Logging in...">
          Login
        </SubmitButton>

        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
