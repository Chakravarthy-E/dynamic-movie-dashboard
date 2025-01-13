"use client";

import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  if (user) {
    router.push("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        {children}
      </div>
    </div>
  );
}
