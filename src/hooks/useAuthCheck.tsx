"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useRouter } from "next/navigation";

interface useAuthCheckProps {
  allowRoles?: string[];
  // redirectPath?: string;
}

const useAuthCheck = ({ allowRoles }: useAuthCheckProps = {}) => {
  const { user, token } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Extract role to stabilize dependency
  const userRole = user?.role;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!token) {
      router.push("/login"); // Redirect to login if no token
      return;
    }

    try {
      if (allowRoles && !allowRoles.includes(userRole || "")) {
        if (String(userRole) === "CUSTOMER") {
          router.push("/"); // Redirect to homepage if customer
        } else if (String(userRole) === "RESTAURANT_OWNER") {
          router.push("/dashboard/orders"); // Redirect to restaurant dashboard
        } else if (String(userRole) === "ADMIN") {
          router.push("/admin/restaurants"); // Redirect to admin page
        } else {
          router.push("/"); // Default redirect if role is not recognized
        }
      }
    } catch (err) {
      console.error("Error checking user role:", err);
      router.push("/login"); // Redirect to login on error
    }
  }, [token, userRole, allowRoles, router, isMounted]);

  return { isAuthenticated: !!token, user };
};
export default useAuthCheck;
