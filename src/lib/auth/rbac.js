/**
 * Role-Based Access Control (RBAC) Definitions & Guard Utilities
 * Location: src/lib/auth/rbac.js
 */

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  MANAGER: "manager",
  EMPLOYEE: "employee",
  VIEWER: "viewer",
};

export const PERMISSIONS = {
  USERS_READ: "users.read",
  USERS_WRITE: "users.write",
  USERS_ROLES: "users.roles",
  LISTINGS_WRITE: "listings.write",
  CONTENT_PUBLISH: "content.publish",
  AUDIT_READ: "audit.read",
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    PERMISSIONS.USERS_READ,
    PERMISSIONS.USERS_WRITE,
    PERMISSIONS.USERS_ROLES,
    PERMISSIONS.LISTINGS_WRITE,
    PERMISSIONS.CONTENT_PUBLISH,
    PERMISSIONS.AUDIT_READ,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.USERS_READ,
    PERMISSIONS.USERS_WRITE,
    PERMISSIONS.USERS_ROLES,
    PERMISSIONS.LISTINGS_WRITE,
    PERMISSIONS.CONTENT_PUBLISH,
    PERMISSIONS.AUDIT_READ,
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.USERS_READ,
    PERMISSIONS.LISTINGS_WRITE,
    PERMISSIONS.CONTENT_PUBLISH,
  ],
  [ROLES.EMPLOYEE]: [PERMISSIONS.USERS_READ, PERMISSIONS.CONTENT_PUBLISH],
  [ROLES.VIEWER]: [PERMISSIONS.USERS_READ],
};

/**
 * Checks whether a given role possesses a requested permission
 */
export function hasPermission(role, permission, customPermissions = []) {
  if (!role) return false;

  // Custom permission overrides take precedence
  if (customPermissions.includes(permission)) return true;

  const allowedPermissions = ROLE_PERMISSIONS[role] || [];
  return allowedPermissions.includes(permission);
}

/**
 * Validates whether an actor can modify a target user's role
 * Rule: Nobody can edit their own role, and only admins/super_admins can assign roles
 */
export function canModifyRole(actorId, actorRole, targetUserId) {
  if (!actorId || !targetUserId) return false;
  if (actorId === targetUserId) {
    // Self-role modification is strictly forbidden
    return false;
  }
  return actorRole === ROLES.SUPER_ADMIN || actorRole === ROLES.ADMIN;
}
