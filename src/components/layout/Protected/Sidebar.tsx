"use client";

import { UserRole } from "@/src/lib/interfaces/enums";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {navigationItems} from "@/src/data/superadminNavData";




interface SidebarProps {
  userRole: UserRole;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

export default function Sidebar({
  userRole,
  isMobileOpen,
  onMobileToggle,
}: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:flex lg:flex-shrink-0
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col w-full h-full">
          {/* Header */}
          <div className="flex-shrink-0 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg sm:text-xl font-bold">Restaurant Hub</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 capitalize">
                  {userRole.replace("_", " ")} Panel
                </p>
              </div>
              {/* Mobile close button */}
              <button
                onClick={onMobileToggle}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation - Fixed scrollbar styling */}
          <nav className="flex-1 px-3 sm:px-4 pb-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
            <div className="space-y-1 sm:space-y-2">
              {filteredNavigation.map((item) => {
                const fullHref = `${getRoleBasedPrefix(userRole)}${item.href}`;
                const isActive = pathname === fullHref;

                return (
                  <Link
                    key={item.name}
                    href={fullHref}
                    onClick={() => {
                      // Close mobile menu when navigating
                      if (window.innerWidth < 1024) {
                        onMobileToggle();
                      }
                    }}
                    className={`
                      flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base
                      ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }
                    `}
                  >
                    <span className="mr-2 sm:mr-3 text-lg">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer info */}
          <div className="flex-shrink-0 p-4 border-t border-gray-800">
            <p className="text-xs text-gray-400 text-center">v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-track-gray-800::-webkit-scrollbar-track {
          background-color: #1f2937;
          border-radius: 4px;
        }

        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 4px;
          border: 1px solid #374151;
        }

        .hover\\:scrollbar-thumb-gray-500::-webkit-scrollbar-thumb:hover {
          background-color: #6b7280;
        }

        /* For Firefox */
        .scrollbar-thin {
          scrollbar-color: #4b5563 #1f2937;
        }
      `}</style>
    </>
  );
}
