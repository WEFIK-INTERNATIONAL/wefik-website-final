"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  ShieldAlert,
  MessageSquare,
  FileEdit,
  ExternalLink,
  LogOut,
  Sparkles,
  KeyRound,
  CheckCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function PortalDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    email: "staff@wefik.in",
    full_name: "Staff Member",
    role: "admin", // Default mock role until Supabase session is established
    status: "active",
  });

  useEffect(() => {
    async function loadSession() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from("profiles")
            .select("email, full_name, role, status")
            .eq("id", user.id)
            .single();

          if (data) {
            setProfile(data);
          } else {
            setProfile((prev) => ({
              ...prev,
              email: user.email || prev.email,
              full_name: user.user_metadata?.full_name || prev.full_name,
            }));
          }
        }
      } catch {
        // Fallback to active mock state
      }
    }
    loadSession();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isAdmin = profile.role === "admin" || profile.role === "super_admin";

  return (
    <div className="animate-in fade-in space-y-8 duration-200">
      {/* Top Banner & Profile Header */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-card,#ffffff)] p-6 shadow-sm sm:flex-row sm:items-center sm:p-8 dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-card,#141414)]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-subtle,#d4f07a)] px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-[var(--color-accent,#51731a)] uppercase dark:bg-[var(--color-accent-subtle,#1e2e08)] dark:text-[var(--color-accent,#a3e635)]">
            {profile.role.replace("_", " ")}
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Welcome back, {profile.full_name}
          </h1>
          <p className="text-xs text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
            Signed in as <span className="font-mono">{profile.email}</span>
          </p>
        </div>

        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-[var(--color-border,#dde8c0)] px-4 py-2 text-xs font-semibold text-[var(--color-text-primary,#0f1a05)] transition-colors hover:bg-[var(--color-bg-secondary,#eef4de)] sm:self-center dark:border-[var(--color-border,#262626)] dark:text-white dark:hover:bg-[var(--color-bg-secondary,#1a1a1a)]"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Quick Launchpad Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Admin Access Center (Admins only) */}
        {isAdmin && (
          <Link
            href="/portal/admin"
            className="group flex flex-col justify-between rounded-3xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-card,#ffffff)] p-6 shadow-sm transition-all hover:border-[var(--color-accent,#51731a)] hover:shadow-md dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-card,#141414)] dark:hover:border-[var(--color-accent,#a3e635)]"
          >
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-accent-subtle,#d4f07a)] text-[var(--color-accent,#51731a)] dark:bg-[var(--color-accent-subtle,#1e2e08)] dark:text-[var(--color-accent,#a3e635)]">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="mb-1 text-base font-bold">
                Access & User Management
              </h2>
              <p className="text-xs leading-relaxed text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
                Invite team members, assign RBAC roles, manage permission
                overrides, and inspect security audit logs.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border,#dde8c0)] pt-3 text-xs font-semibold text-[var(--color-accent,#51731a)] dark:border-[var(--color-border,#1e1e1e)] dark:text-[var(--color-accent,#a3e635)]">
              <span>Open Admin Suite</span>
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </div>
          </Link>
        )}

        {/* Team Chat (Mattermost) */}
        <a
          href={
            process.env.NEXT_PUBLIC_MATTERMOST_URL || "https://team.wefik.in"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between rounded-3xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-card,#ffffff)] p-6 shadow-sm transition-all hover:border-[var(--color-accent,#51731a)] hover:shadow-md dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-card,#141414)] dark:hover:border-[var(--color-accent,#a3e635)]"
        >
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h2 className="mb-1 text-base font-bold">Team Chat (Mattermost)</h2>
            <p className="text-xs leading-relaxed text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
              Connect to self-hosted encrypted messaging, project channels, and
              engineering threads at team.wefik.in.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border,#dde8c0)] pt-3 text-xs font-semibold text-sky-600 dark:border-[var(--color-border,#1e1e1e)] dark:text-sky-400">
            <span>Launch Team Chat</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </div>
        </a>

        {/* Headless CMS (Sanity Studio) */}
        <Link
          href="/studio"
          className="group flex flex-col justify-between rounded-3xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-card,#ffffff)] p-6 shadow-sm transition-all hover:border-[var(--color-accent,#51731a)] hover:shadow-md dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-card,#141414)] dark:hover:border-[var(--color-accent,#a3e635)]"
        >
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <FileEdit className="h-5 w-5" />
            </div>
            <h2 className="mb-1 text-base font-bold">Content Studio</h2>
            <p className="text-xs leading-relaxed text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
              Author and publish case studies, articles, and job postings via
              embedded Sanity Studio.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border,#dde8c0)] pt-3 text-xs font-semibold text-purple-600 dark:border-[var(--color-border,#1e1e1e)] dark:text-purple-400">
            <span>Open Studio</span>
            <span className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </div>
        </Link>
      </div>

      {/* Security & Access Notice */}
      <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-secondary,#eef4de)] p-4 text-xs text-[var(--color-text-muted,#5a6e3a)] dark:border-[var(--color-border,#222222)] dark:bg-[var(--color-bg-secondary,#161616)] dark:text-[var(--color-text-muted,#c8ccd4)]">
        <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
        <span>
          Session active with PostgreSQL Row Level Security (RLS) enforcement.
          All privileged administrative operations are recorded in the immutable
          audit log.
        </span>
      </div>
    </div>
  );
}
