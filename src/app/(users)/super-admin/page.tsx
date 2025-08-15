import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Super Admin Dashboard | Restaurant Hub",
  description:
    "Super admin dashboard for managing the restaurant e-commerce platform",
};

export default function SuperAdminPage() {
  redirect("/super-admin/dashboard");
}
