import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { UserAuth } from "./userAuth";

const useProtected = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
};

export default dynamic(() => Promise.resolve(useProtected), { ssr: false });
