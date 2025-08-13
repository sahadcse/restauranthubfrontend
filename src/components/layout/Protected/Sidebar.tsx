"use client";

import { UserRole } from "@/src/lib/interfaces/enums";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  roles: UserRole[];
}

const navigationItems: NavigationItem[] = [
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

export default function Sidebar({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname();

  const filteredNavigation = navigationItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const getRoleBasedPrefix = (role: UserRole): string => {
    const prefixes = {
      [UserRole.RESTAURANT_OWNER]: "/restaurant-panel",
      [UserRole.RESTAURANT_STAFF]: "/restaurant-staff",
      [UserRole.ADMIN]: "/admin",
      [UserRole.SUPER_ADMIN]: "/super-admin",
      [UserRole.DRIVER]: "/driver-panel",
      [UserRole.CUSTOMER]: "/",
    };
    return prefixes[role] || "/";
  };

  return (
    <div className="bg-gray-900 text-white w-64 flex-shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold">Restaurant Hub</h1>
        <p className="text-sm text-gray-400 mt-1 capitalize">
          {userRole} Panel
        </p>
      </div>

      <nav className="px-4 space-y-2">
        {filteredNavigation.map((item) => {
          const fullHref = `${getRoleBasedPrefix(userRole)}${item.href}`;
          const isActive = pathname === fullHref;

          return (
            <Link
              key={item.name}
              href={fullHref}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
