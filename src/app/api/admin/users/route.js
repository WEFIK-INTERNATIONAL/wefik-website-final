import { NextResponse } from "next/server";
import { requireServerPermission } from "@/lib/auth/server";
import { PERMISSIONS, canModifyRole } from "@/lib/auth/rbac";

export async function GET() {
  const authCheck = await requireServerPermission(PERMISSIONS.USERS_READ);
  if (!authCheck.authorized) {
    return NextResponse.json(
      { error: authCheck.error },
      { status: authCheck.status }
    );
  }

  // Returns list of users
  return NextResponse.json({
    users: [
      {
        id: "usr-01",
        email: "info.wefik@gmail.com",
        full_name: "Wefik Super Administrator",
        role: "super_admin",
        status: "active",
      },
    ],
  });
}

export async function POST(req) {
  const authCheck = await requireServerPermission(PERMISSIONS.USERS_ROLES);
  if (!authCheck.authorized) {
    return NextResponse.json(
      { error: authCheck.error },
      { status: authCheck.status }
    );
  }

  try {
    const body = await req.json();
    const { targetUserId, newRole } = body;

    if (!targetUserId || !newRole) {
      return NextResponse.json(
        { error: "targetUserId and newRole are required." },
        { status: 400 }
      );
    }

    // Policy check: cannot modify own role
    const canChange = canModifyRole(
      authCheck.user.id,
      authCheck.profile.role,
      targetUserId
    );
    if (!canChange) {
      return NextResponse.json(
        {
          error: "Security Policy Violation: You cannot modify your own role.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Role successfully updated to ${newRole}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Failed to update role." },
      { status: 500 }
    );
  }
}
