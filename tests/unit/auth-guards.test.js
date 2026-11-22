import { describe, it, expect } from "vitest";
import {
  ROLES,
  PERMISSIONS,
  hasPermission,
  canModifyRole,
} from "@/lib/auth/rbac";

describe("portal auth guards and role checks", () => {
  it("enforces permission inheritance across roles", () => {
    // Super Admin & Admin have full access
    expect(hasPermission(ROLES.SUPER_ADMIN, PERMISSIONS.USERS_WRITE)).toBe(
      true
    );
    expect(hasPermission(ROLES.ADMIN, PERMISSIONS.USERS_ROLES)).toBe(true);

    // Manager can publish content and write listings, but cannot change roles
    expect(hasPermission(ROLES.MANAGER, PERMISSIONS.CONTENT_PUBLISH)).toBe(
      true
    );
    expect(hasPermission(ROLES.MANAGER, PERMISSIONS.USERS_ROLES)).toBe(false);

    // Viewer is strictly read-only
    expect(hasPermission(ROLES.VIEWER, PERMISSIONS.USERS_READ)).toBe(true);
    expect(hasPermission(ROLES.VIEWER, PERMISSIONS.USERS_WRITE)).toBe(false);
    expect(hasPermission(ROLES.VIEWER, PERMISSIONS.CONTENT_PUBLISH)).toBe(
      false
    );
  });

  it("applies per-user custom permission overrides", () => {
    // Employee normally cannot write listings, but with override they can
    expect(hasPermission(ROLES.EMPLOYEE, PERMISSIONS.LISTINGS_WRITE)).toBe(
      false
    );
    expect(
      hasPermission(ROLES.EMPLOYEE, PERMISSIONS.LISTINGS_WRITE, [
        PERMISSIONS.LISTINGS_WRITE,
      ])
    ).toBe(true);
  });

  it("strictly forbids self-role modifications", () => {
    const adminId = "user-admin-123";
    const employeeId = "user-employee-456";

    // Admin modifying another employee's role is allowed
    expect(canModifyRole(adminId, ROLES.ADMIN, employeeId)).toBe(true);

    // Admin modifying their OWN role is strictly denied
    expect(canModifyRole(adminId, ROLES.ADMIN, adminId)).toBe(false);

    // Non-admin modifying any role is denied
    expect(canModifyRole(employeeId, ROLES.EMPLOYEE, adminId)).toBe(false);
  });
});
