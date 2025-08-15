"use client";

import { UserRole } from "@/src/lib/interfaces/enums";
import { useState } from "react";
import { User } from "@/src/lib/interfaces";
import { FaHome, FaBars } from "react-icons/fa";
import Link from "next/link";

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onMobileMenuToggle: () => void;
}

export default function Header({
  user,
  onLogout,
  onMobileMenuToggle,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log("User data from Header:", user);

  const getRoleBadgeColor = (role: UserRole): string => {
    const colors: Record<UserRole, string> = {
      [UserRole.ADMIN]: "bg-blue-100 text-blue-800",
      [UserRole.CUSTOMER]: "bg-green-100 text-green-800",
      [UserRole.RESTAURANT_OWNER]: "bg-purple-100 text-purple-800",
      [UserRole.SUPER_ADMIN]: "bg-red-100 text-red-800",
      [UserRole.RESTAURANT_STAFF]: "bg-yellow-100 text-yellow-800",
      [UserRole.DRIVER]: "bg-indigo-100 text-indigo-800",
    };
    return colors[role];
  };

  const getUserDisplayName = (user: User): string => {
    // Check if firstName or lastName exist and are not empty
    const hasFirstName = user.firstName && user.firstName.trim() !== "";
    const hasLastName = user.lastName && user.lastName.trim() !== "";

    if (hasFirstName || hasLastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }

    // Fallback to email username
    return user.email.split("@")[0];
  };

  const userInitial = getUserDisplayName(user).charAt(0).toUpperCase();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Left side - Mobile menu button and navigation */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <span className="sr-only">Open sidebar</span>
            <FaBars className="h-5 w-5" />
          </button>

          {/* Home link */}
          <Link
            href="/"
            className="flex items-center text-teal-600 hover:text-teal-700 transition-colors"
            title="Go to Homepage"
          >
            <FaHome className="text-base sm:text-lg mr-1 sm:mr-2" />
            <span className="font-medium text-sm sm:text-base hidden sm:inline">
              Home
            </span>
          </Link>

          {/* Separator - hidden on mobile */}
          <div className="border-l border-gray-300 h-6 hidden sm:block"></div>

          {/* Welcome message - responsive */}
          <h2 className="text-base sm:text-xl font-semibold text-gray-900 truncate">
            <span className="hidden sm:inline">Welcome back, </span>
            <span className="sm:hidden">Hi, </span>
            {getUserDisplayName(user)}
          </h2>
        </div>

        {/* Right side - Role badge and user menu */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Role badge */}
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(
              user.role
            )}`}
          >
            <span className="hidden sm:inline">
              {user.role.toLowerCase().replace("_", " ")}
            </span>
            <span className="sm:hidden">
              {user.role.toLowerCase().replace("_", " ").split(" ")[0]}
            </span>
          </span>

          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 p-1 sm:p-0"
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    {userInitial}
                  </span>
                </div>
                <span className="hidden sm:inline">▼</span>
              </div>
            </button>

            {dropdownOpen && (
              <>
                {/* Mobile backdrop */}
                <div
                  className="fixed inset-0 z-10 sm:hidden"
                  onClick={() => setDropdownOpen(false)}
                />

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium truncate">
                        {getUserDisplayName(user)}
                      </p>
                      <p className="text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onLogout();
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-2">🚪</span>
                      Sign out -D
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
