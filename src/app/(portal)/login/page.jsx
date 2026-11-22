"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // Generic error message to prevent user enumeration
        throw new Error(
          "Invalid email or password. Please verify your credentials."
        );
      }

      router.push("/portal");
    } catch (err) {
      setErrorMsg(err.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setErrorMsg(
        "Please enter your email address to receive password reset instructions."
      );
      return;
    }

    try {
      setErrorMsg("");
      await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/login?reset=true`,
      });
      setResetSent(true);
    } catch (err) {
      // Generic message to avoid email enumeration
      setResetSent(true);
    }
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-card,#ffffff)] p-8 shadow-xl dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-card,#141414)]">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-subtle,#d4f07a)] text-[var(--color-accent,#51731a)] dark:bg-[var(--color-accent-subtle,#1e2e08)] dark:text-[var(--color-accent,#a3e635)]">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Staff Sign In</h1>
          <p className="mt-1 text-xs text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
            Access the internal Wefik operations dashboard
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {resetSent && (
          <div className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center text-xs text-emerald-600 dark:text-emerald-400">
            If an account exists for {email}, password recovery instructions
            have been dispatched.
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted,#5a6e3a)]" />
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@wefik.in"
                className="w-full rounded-xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-primary,#f5f8ee)] py-3 pr-3.5 pl-10 text-xs text-[var(--color-text-primary,#0f1a05)] focus:ring-1 focus:ring-[var(--color-accent,#51731a)] focus:outline-none dark:border-[var(--color-border,#262626)] dark:bg-[var(--color-bg-primary,#0a0a0a)] dark:text-white"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]"
              >
                Password
              </label>
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-[11px] text-[var(--color-accent,#51731a)] hover:underline dark:text-[var(--color-accent,#a3e635)]"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted,#5a6e3a)]" />
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-primary,#f5f8ee)] py-3 pr-3.5 pl-10 text-xs text-[var(--color-text-primary,#0f1a05)] focus:ring-1 focus:ring-[var(--color-accent,#51731a)] focus:outline-none dark:border-[var(--color-border,#262626)] dark:bg-[var(--color-bg-primary,#0a0a0a)] dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email.trim() || !password}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent,#51731a)] py-3 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover,#3a5212)] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-[var(--color-border,#dde8c0)] pt-6 text-center dark:border-[var(--color-border,#1e1e1e)]">
          <p className="text-[11px] text-[var(--color-text-subtle,#8fa060)] dark:text-[var(--color-text-subtle,#666666)]">
            Account registration is invite-only. Contact your system
            administrator to request an access invitation.
          </p>
        </div>
      </div>
    </div>
  );
}
