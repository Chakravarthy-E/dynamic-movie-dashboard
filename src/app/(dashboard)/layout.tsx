"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Film, LayoutDashboard, LogOut, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import UseProtected from "@/hooks/useProtected";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <UseProtected>
      <div className="min-h-screen bg-background">
        <nav className="border-b">
          <div className="flex h-16 items-center px-4 md:px-8">
            <div className="flex items-center space-x-4">
              <Film className="h-6 w-6" />
              <span className="text-lg font-semibold">Movie Manager</span>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </span>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </nav>

        <div className="flex">
          <aside className="w-64 border-r min-h-[calc(100vh-4rem)] p-4 hidden md:block">
            <nav className="space-y-2">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/movies">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Film className="mr-2 h-4 w-4" />
                  Movies
                </Button>
              </Link>
              <Link href="/cast">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Cast
                </Button>
              </Link>
            </nav>
          </aside>

          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </UseProtected>
  );
}
