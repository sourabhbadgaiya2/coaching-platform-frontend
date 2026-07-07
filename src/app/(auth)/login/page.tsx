"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth.actions";

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

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white rounded p-2 disabled:opacity-50"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
