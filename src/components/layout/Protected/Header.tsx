"use client";

import { useState } from "react";

type UserRole = "admin" | "customer" | "restaurant" | "superAdmin";

interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  firstName?: string;
  lastName?: string;
}

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getRoleBadgeColor = (role: UserRole): string => {
    const colors = {
      admin: "bg-blue-100 text-blue-800",
      customer: "bg-green-100 text-green-800",
      restaurant: "bg-purple-100 text-purple-800",
      superAdmin: "bg-red-100 text-red-800",
    };
    return colors[role];
  };

  const getUserDisplayName = (user: User): string => {
    if (user.name) return user.name;
    if (user.firstName || user.lastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }
    return user.email.split("@")[0];
  };

  const userInitial = getUserDisplayName(user).charAt(0).toUpperCase();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome back, {getUserDisplayName(user)}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(
              user.role
            )}`}
          >
            {user.role}
          </span>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {userInitial}
                  </span>
                </div>
                <span>▼</span>
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-medium">{getUserDisplayName(user)}</p>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="mr-2">🚪</span>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
