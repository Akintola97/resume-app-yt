"use client";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function getInitials(user) {
  const first =
    user?.given_name ??
    user?.name?.split(" ")?.[0] ??
    user?.name?.split(" ")?.[0] ??
    user?.email?.split("@")?.[0] ??
    "User";

  const last =
    user?.family_name ?? (user?.name ? user.name.split(" ").slice(-1)[0] : "");

  const f = (first?.[0] ?? "U").toUpperCase();
  const l = (
    last?.[0] ?? (user?.name ? "" : user?.email?.[1] ?? "")
  ).toUpperCase();
  return (f + l).slice(0, 2);
}

export default function UserMenu({ user }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <LoginLink postLoginRedirectURL="/dashboard">
          <Button size="sm">Sign in</Button>
        </LoginLink>
      </div>
    );
  }

  const initials = getInitials(user);
  const displayName = user.given_name
    ? `${user.given_name} ${user.family_name ?? ""}`.trim()
    : user.name ?? user.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="inline-flex items-center rounded-full outline-none focus:ring-2 focus:ring-ring h-9 w-9 p-0"
          aria-label="Open user menu"
          title={displayName}
        >
          <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-medium">
            {initials}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* Header */}
        <DropdownMenuLabel className="truncate font-semibold">
          {displayName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Navigation Links */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard">🏠 Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">👤 Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/documents">📄 Documents</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem asChild>
          <LogoutLink>🚪 Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
