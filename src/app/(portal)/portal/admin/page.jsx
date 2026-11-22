"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  UserPlus,
  History,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  X,
  Loader2,
} from "lucide-react";
import { ROLES, canModifyRole } from "@/lib/auth/rbac";

const MOCK_USERS = [
  {
    id: "usr-01",
    email: "info.wefik@gmail.com",
    full_name: "Wefik Super Administrator",
    role: ROLES.SUPER_ADMIN,
    status: "active",
    created_at: "2026-11-20T10:00:00Z",
  },
  {
    id: "usr-02",
    email: "designer@wefik.in",
    full_name: "Creative Lead",
    role: ROLES.MANAGER,
    status: "active",
    created_at: "2026-11-21T14:30:00Z",
  },
  {
    id: "usr-03",
    email: "dev@wefik.in",
    full_name: "Full Stack Engineer",
    role: ROLES.EMPLOYEE,
    status: "active",
    created_at: "2026-11-22T09:15:00Z",
  },
  {
    id: "usr-04",
    email: "intern@wefik.in",
    full_name: "Design Intern",
    role: ROLES.VIEWER,
    status: "invited",
    created_at: "2026-11-23T01:00:00Z",
  },
];

const MOCK_AUDIT = [
  {
    id: "aud-01",
    actor: "info.wefik@gmail.com",
    action: "user.role_change",
    target: "designer@wefik.in",
    details: "Changed role from employee to manager",
    timestamp: "2026-11-22T16:20:00Z",
  },
  {
    id: "aud-02",
    actor: "info.wefik@gmail.com",
    action: "user.invite",
    target: "intern@wefik.in",
    details: "Invited with role: viewer",
    timestamp: "2026-11-23T01:00:00Z",
  },
];

export default function AdminAccessPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [auditLogs, setAuditLogs] = useState(MOCK_AUDIT);
  const [activeTab, setActiveTab] = useState("users"); // "users" | "audit"
  const [currentUserId] = useState("usr-01"); // Logged in super admin
  const [currentUserRole] = useState(ROLES.SUPER_ADMIN);

  // Invite modal state
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: "",
    full_name: "",
    role: ROLES.EMPLOYEE,
  });
  const [statusMsg, setStatusMsg] = useState("");

  const handleRoleChange = (targetUserId, newRole) => {
    if (!canModifyRole(currentUserId, currentUserRole, targetUserId)) {
      alert("Policy Violation: You cannot modify your own role.");
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === targetUserId ? { ...u, role: newRole } : u))
    );

    const targetUser = users.find((u) => u.id === targetUserId);
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        actor: "info.wefik@gmail.com",
        action: "user.role_change",
        target: targetUser?.email || targetUserId,
        details: `Role updated to ${newRole}`,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);

    setStatusMsg(`Role updated to ${newRole} for ${targetUser?.email}`);
    setTimeout(() => setStatusMsg(""), 4000);
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteForm.email.trim() || !inviteForm.full_name.trim()) return;

    const newUser = {
      id: `usr-${Date.now()}`,
      email: inviteForm.email.trim(),
      full_name: inviteForm.full_name.trim(),
      role: inviteForm.role,
      status: "invited",
      created_at: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        actor: "info.wefik@gmail.com",
        action: "user.invite",
        target: newUser.email,
        details: `Invited as ${newUser.role}`,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);

    setStatusMsg(`Invitation sent to ${newUser.email}`);
    setIsInviteOpen(false);
    setInviteForm({ email: "", full_name: "", role: ROLES.EMPLOYEE });
    setTimeout(() => setStatusMsg(""), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/portal"
            className="mb-1 inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted,#5a6e3a)] hover:text-[var(--color-accent,#51731a)] dark:text-[var(--color-text-muted,#c8ccd4)] dark:hover:text-[var(--color-accent,#a3e635)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Portal Home</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            Access & User Management
          </h1>
          <p className="text-xs text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
            Administer staff roles, issue invitation links, and review audit
            events
          </p>
        </div>

        <button
          onClick={() => setIsInviteOpen(true)}
          className="inline-flex items-center gap-2 self-start rounded-xl bg-[var(--color-accent,#51731a)] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-accent-hover,#3a5212)] sm:self-center"
        >
          <UserPlus className="h-4 w-4" />
          <span>Invite New User</span>
        </button>
      </div>

      {statusMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* View Tabs */}
      <div className="flex gap-2 border-b border-[var(--color-border,#dde8c0)] pb-1 dark:border-[var(--color-border,#1e1e1e)]">
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
            activeTab === "users"
              ? "bg-[var(--color-bg-card,#ffffff)] text-[var(--color-accent,#51731a)] shadow-sm dark:bg-[var(--color-bg-card,#141414)] dark:text-[var(--color-accent,#a3e635)]"
              : "text-[var(--color-text-muted,#5a6e3a)] hover:text-current dark:text-[var(--color-text-muted,#c8ccd4)]"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Team Directory ({users.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
            activeTab === "audit"
              ? "bg-[var(--color-bg-card,#ffffff)] text-[var(--color-accent,#51731a)] shadow-sm dark:bg-[var(--color-bg-card,#141414)] dark:text-[var(--color-accent,#a3e635)]"
              : "text-[var(--color-text-muted,#5a6e3a)] hover:text-current dark:text-[var(--color-text-muted,#c8ccd4)]"
          }`}
        >
          <History className="h-4 w-4" />
          <span>Audit Trail ({auditLogs.length})</span>
        </button>
      </div>

      {/* Tab 1: Users Directory */}
      {activeTab === "users" && (
        <div className="overflow-hidden rounded-3xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-card,#ffffff)] shadow-sm dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-card,#141414)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-secondary,#eef4de)] text-[var(--color-text-muted,#5a6e3a)] dark:border-[var(--color-border,#222222)] dark:bg-[var(--color-bg-secondary,#161616)] dark:text-[var(--color-text-muted,#c8ccd4)]">
                <tr>
                  <th className="p-4 font-semibold">User / Email</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Role Assignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border,#dde8c0)] dark:divide-[var(--color-border,#1e1e1e)]">
                {users.map((u) => {
                  const isSelf = u.id === currentUserId;
                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-[var(--color-bg-primary,#f5f8ee)]/50 dark:hover:bg-[var(--color-bg-card,#1a1a1a)]/50"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-[var(--color-text-primary,#0f1a05)] dark:text-white">
                          {u.full_name}{" "}
                          {isSelf && (
                            <span className="font-mono text-[10px] text-emerald-500">
                              (You)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
                          {u.email}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-block rounded-full bg-[var(--color-accent-subtle,#d4f07a)] px-2.5 py-1 font-mono text-[10px] font-semibold text-[var(--color-accent,#51731a)] uppercase dark:bg-[var(--color-accent-subtle,#1e2e08)] dark:text-[var(--color-accent,#a3e635)]">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            u.status === "active"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {isSelf ? (
                          <span className="text-[11px] text-[var(--color-text-subtle,#8fa060)] italic dark:text-[var(--color-text-subtle,#666666)]">
                            Protected (Self-edit forbidden)
                          </span>
                        ) : (
                          <select
                            value={u.role}
                            onChange={(e) =>
                              handleRoleChange(u.id, e.target.value)
                            }
                            className="rounded-lg border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-primary,#f5f8ee)] px-2.5 py-1.5 text-xs text-[var(--color-text-primary,#0f1a05)] focus:ring-1 focus:ring-[var(--color-accent,#51731a)] focus:outline-none dark:border-[var(--color-border,#262626)] dark:bg-[var(--color-bg-primary,#0a0a0a)] dark:text-white"
                          >
                            <option value={ROLES.VIEWER}>Viewer</option>
                            <option value={ROLES.EMPLOYEE}>Employee</option>
                            <option value={ROLES.MANAGER}>Manager</option>
                            <option value={ROLES.ADMIN}>Admin</option>
                            <option value={ROLES.SUPER_ADMIN}>
                              Super Admin
                            </option>
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Audit Logs */}
      {activeTab === "audit" && (
        <div className="overflow-hidden rounded-3xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-card,#ffffff)] shadow-sm dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-card,#141414)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-secondary,#eef4de)] text-[var(--color-text-muted,#5a6e3a)] dark:border-[var(--color-border,#222222)] dark:bg-[var(--color-bg-secondary,#161616)] dark:text-[var(--color-text-muted,#c8ccd4)]">
                <tr>
                  <th className="p-4 font-semibold">Timestamp</th>
                  <th className="p-4 font-semibold">Actor</th>
                  <th className="p-4 font-semibold">Action</th>
                  <th className="p-4 font-semibold">Target / Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border,#dde8c0)] font-mono text-[11px] dark:divide-[var(--color-border,#1e1e1e)]">
                {auditLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-[var(--color-bg-primary,#f5f8ee)]/50 dark:hover:bg-[var(--color-bg-card,#1a1a1a)]/50"
                  >
                    <td className="p-4 text-[var(--color-text-muted,#5a6e3a)] dark:text-[var(--color-text-muted,#c8ccd4)]">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-4 font-semibold text-[var(--color-text-primary,#0f1a05)] dark:text-white">
                      {log.actor}
                    </td>
                    <td className="p-4">
                      <span className="rounded bg-[var(--color-accent-subtle,#d4f07a)] px-2 py-0.5 text-[var(--color-accent,#51731a)] dark:bg-[var(--color-accent-subtle,#1e2e08)] dark:text-[var(--color-accent,#a3e635)]">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-sans text-xs">
                      <div>
                        <span className="font-semibold">{log.target}</span>:{" "}
                        {log.details}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {isInviteOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm duration-200">
          <div className="w-full max-w-md rounded-3xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-card,#ffffff)] p-6 shadow-2xl dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-card,#141414)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold">Invite Staff Member</h3>
              <button
                onClick={() => setIsInviteOpen(false)}
                className="rounded-lg p-1 text-[var(--color-text-muted,#5a6e3a)] hover:text-current"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
              <div>
                <label className="mb-1 block font-semibold">Full Name *</label>
                <input
                  type="text"
                  required
                  value={inviteForm.full_name}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, full_name: e.target.value })
                  }
                  placeholder="Jane Smith"
                  className="w-full rounded-xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-primary,#f5f8ee)] px-3 py-2.5 focus:ring-1 focus:ring-[var(--color-accent,#51731a)] focus:outline-none dark:border-[var(--color-border,#262626)] dark:bg-[var(--color-bg-primary,#0a0a0a)]"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, email: e.target.value })
                  }
                  placeholder="jane@wefik.in"
                  className="w-full rounded-xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-primary,#f5f8ee)] px-3 py-2.5 focus:ring-1 focus:ring-[var(--color-accent,#51731a)] focus:outline-none dark:border-[var(--color-border,#262626)] dark:bg-[var(--color-bg-primary,#0a0a0a)]"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold">
                  Assigned Role *
                </label>
                <select
                  value={inviteForm.role}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, role: e.target.value })
                  }
                  className="w-full rounded-xl border border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-primary,#f5f8ee)] px-3 py-2.5 focus:ring-1 focus:ring-[var(--color-accent,#51731a)] focus:outline-none dark:border-[var(--color-border,#262626)] dark:bg-[var(--color-bg-primary,#0a0a0a)]"
                >
                  <option value={ROLES.VIEWER}>Viewer</option>
                  <option value={ROLES.EMPLOYEE}>Employee</option>
                  <option value={ROLES.MANAGER}>Manager</option>
                  <option value={ROLES.ADMIN}>Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-[var(--color-accent,#51731a)] py-3 font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover,#3a5212)]"
              >
                Dispatch Invitation Link
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
