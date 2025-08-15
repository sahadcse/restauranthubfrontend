import { UserRole } from "../lib/interfaces/enums";

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  roles: UserRole[];
}

export const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "🏠",
    roles: [UserRole.ADMIN, UserRole.RESTAURANT_OWNER, UserRole.SUPER_ADMIN],
  },
  {
    name: "User Management",
    href: "/users",
    icon: "👥",
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    name: "Restaurant Management",
    href: "/restaurants",
    icon: "🏪",
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    name: "Orders",
    href: "/orders",
    icon: "🛒",
    roles: [UserRole.RESTAURANT_OWNER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    name: "Content Management",
    href: "/content",
    icon: "📝",
    roles: [UserRole.SUPER_ADMIN],
  },
  {
    name: "Driver Management",
    href: "/drivers",
    icon: "🚗",
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: "🔔",
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: "📊",
    roles: [UserRole.RESTAURANT_OWNER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    name: "System Health",
    href: "/system",
    icon: "🏥",
    roles: [UserRole.SUPER_ADMIN],
  },
  {
    name: "Global Settings",
    href: "/settings",
    icon: "⚙️",
    roles: [UserRole.SUPER_ADMIN],
  },
  {
    name: "Menu Management",
    href: "/menu",
    icon: "🍽️",
    roles: [UserRole.RESTAURANT_OWNER],
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "👤",
    roles: [UserRole.ADMIN, UserRole.RESTAURANT_OWNER, UserRole.SUPER_ADMIN],
  },
];
