import { useAuthStore } from "@/lib/store";

export const UserAuth = () => {
  const user = useAuthStore((state) => state.user);
  if (user) {
    return true;
  } else {
    return false;
  }
};
