"use client";

import { UserRole } from "@/src/lib/interfaces/enums";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";

interface FooterProps {
  userRole: UserRole;
}

export default function Footer({ userRole }: FooterProps) {
  const getQuickLinks = (role: UserRole) => {
    const commonLinks = [
      { name: "Help Center", href: "/help" },
      { name: "Contact Support", href: "/support" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ];

    const roleSpecificLinks: Record<
      UserRole,
      { name: string; href: string }[]
    > = {
      [UserRole.CUSTOMER]: [
        { name: "Browse Restaurants", href: "/restaurants" },
        { name: "My Orders", href: "/customer-panel?tab=orders" },
        { name: "My Addresses", href: "/customer-panel?tab=addresses" },
        { name: "Loyalty Program", href: "/customer-panel?tab=loyalty" },
      ],
      [UserRole.RESTAURANT_OWNER]: [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Menu Management", href: "/dashboard/menu" },
        { name: "Orders", href: "/dashboard/orders" },
        { name: "Analytics", href: "/dashboard/analytics" },
      ],
      [UserRole.RESTAURANT_STAFF]: [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Orders", href: "/dashboard/orders" },
        { name: "Menu Items", href: "/dashboard/menu" },
      ],
      [UserRole.ADMIN]: [
        { name: "Admin Panel", href: "/admin" },
        { name: "User Management", href: "/admin/users" },
        { name: "Restaurant Management", href: "/admin/restaurants" },
        { name: "Reports", href: "/admin/reports" },
      ],
      [UserRole.SUPER_ADMIN]: [
        { name: "Super Admin", href: "/superadmin" },
        { name: "System Settings", href: "/superadmin/settings" },
        { name: "Global Analytics", href: "/superadmin/analytics" },
      ],
      [UserRole.DRIVER]: [
        { name: "Driver Dashboard", href: "/driver" },
        { name: "Active Deliveries", href: "/driver/deliveries" },
        { name: "Delivery History", href: "/driver/history" },
      ],
    };

    return [...(roleSpecificLinks[role] || []), ...commonLinks];
  };

  const quickLinks = getQuickLinks(userRole);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Restaurant Hub
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Your one-stop solution for restaurant management and food
              delivery. Connecting restaurants, customers, and drivers
              seamlessly.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-teal-500 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-500 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-500 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-500 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.slice(0, 6).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-teal-600 text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 text-sm">
                <FaPhone className="w-4 h-4 mr-3 text-teal-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <FaEnvelope className="w-4 h-4 mr-3 text-teal-500" />
                <span>support@restauranthub.com</span>
              </div>
              <div className="flex items-start text-gray-600 text-sm">
                <FaMapMarkerAlt className="w-4 h-4 mr-3 text-teal-500 mt-0.5" />
                <span>
                  123 Business Ave
                  <br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Support Hours
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Mon - Fri:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
              <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                <p className="text-xs text-teal-700">
                  24/7 Emergency support available for critical issues
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Restaurant Hub. All rights reserved.
            </p>
            <div className="flex items-center mt-4 sm:mt-0">
              <span className="text-gray-500 text-sm mr-2">Made with</span>
              <FaHeart className="text-red-500 w-4 h-4 mr-2" />
              <a
                href="https://www.linkedin.com/in/sahadcse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 text-sm hover:text-teal-600 transition-colors"
              >
                by Restaurant Hub Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
