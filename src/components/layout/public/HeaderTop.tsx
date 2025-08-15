"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import headerData from "../../../data/headerData.json";
import HeaderNav from "./HeaderNav";
import { useAuth } from "../../../contexts/authContext";
import { redirectManager } from "../../../lib/services/redirectManager";
import {
  FiPhoneCall,
  FiUser,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiLogOut,
  FiSettings,
  FiUserPlus,
  FiLogIn,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

interface Language {
  code: string;
  name: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface HeaderTopProps {
  onCartToggle: () => void;
  cartItemCount: number;
  wishlistItemCount: number; // Add wishlist count prop
}

const languages: Language[] = headerData.languages;
const currencies: Currency[] = headerData.currencies;
const phone: string = headerData.phone;
const whatsapp: string = headerData.whatsapp;
const topMessage: string = headerData.topMessage;

const HeaderTop: React.FC<HeaderTopProps> = ({
  onCartToggle,
  cartItemCount,
  wishlistItemCount,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(languages[0]);
  const [selectedCurr, setSelectedCurr] = useState<Currency>(currencies[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Get auth state
  const { isAuthenticated, user, logout } = useAuth();

  // Memoize dashboard path to prevent recalculation
  const dashboardPath = useMemo(() => {
    if (isAuthenticated && user?.role) {
      return redirectManager.getRoleDefaultPath(user.role);
    }
    return "/";
  }, [isAuthenticated, user?.role]);

  // Single useEffect for mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Memoized handlers to prevent re-renders
  const handleLangSelect = useCallback((lang: Language) => {
    setSelectedLang(lang);
    setIsLangOpen(false);
  }, []);

  const handleCurrSelect = useCallback((curr: Currency) => {
    setSelectedCurr(curr);
    setIsCurrOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthDropdownOpen(false);
    logout();
  }, [logout]);

  const handleAuthDropdownToggle = useCallback(() => {
    setIsAuthDropdownOpen(!isAuthDropdownOpen);
  }, [isAuthDropdownOpen]);

  const closeAuthDropdown = useCallback(() => {
    setIsAuthDropdownOpen(false);
  }, []);

  // Close dropdown when authentication state changes to unauthenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthDropdownOpen(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="header-top bg-white py-2 text-sm border-b lg:border-none lg:bg-gray-100 lg:py-1 lg:static sticky top-0 z-50 lg:z-auto pt-safe lg:pt-2">
      <div className="container mx-auto px-4">
        {/* Header Top Bar Start */}
        <div className="flex items-center justify-between lg:justify-start">
          {/* Mobile Menu Toggle Button - Moved to the left */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="gi-header-btn gi-site-menu-icon text-gray-700 hover:text-blue-600"
              title="Menu"
              aria-label="Open menu"
            >
              <FiMenu className="text-2xl" />
            </button>
          </div>

          {/* Desktop Top Left Section */}
          <div className="flex-1 text-left hidden lg:block">
            <div className="header-top-social">
              <ul className="m-0 p-0 list-none flex space-x-4">
                <li className="inline-block">
                  <Link
                    href={`tel:${phone}`}
                    className="text-gray-700 hover:text-blue-600 flex items-center"
                  >
                    <FiPhoneCall className="mr-1" />
                    {phone}
                  </Link>
                </li>
                <li className="inline-block">
                  <Link
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-green-600 flex items-center"
                  >
                    <FaWhatsapp className="mr-1" />
                    {whatsapp}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop Top Center Message */}
          <div className="hidden lg:flex flex-1 text-center">
            <div className="header-top-message text-gray-800 font-medium">
              {topMessage}
            </div>
          </div>

          {/* Desktop Top Right Section */}
          <div className="flex-1 hidden lg:block">
            <div className="flex justify-end items-center space-x-4">
              <Link
                className="gi-help text-gray-700 hover:text-blue-600"
                href="/faq"
              >
                Help?
              </Link>
              <Link
                className="gi-help text-gray-700 hover:text-blue-600"
                href="/track-order"
              >
                Track Order?
              </Link>
              <div
                className="relative border border-gray-300 rounded px-2 py-1 cursor-pointer"
                onMouseEnter={() => {
                  setIsLangOpen(true);
                  setIsCurrOpen(false);
                }}
                onMouseLeave={() => setIsLangOpen(false)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={isLangOpen}
                  className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  {selectedLang.name}
                  {isLangOpen ? (
                    <FiChevronUp className="ml-1" />
                  ) : (
                    <FiChevronDown className="ml-1" />
                  )}
                </button>
                <ul
                  className={`absolute right-0 mt-1.5 w-28 bg-white shadow-md rounded py-1 z-50 ${
                    isLangOpen ? "block" : "hidden"
                  }`}
                >
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      className={
                        selectedLang.code === lang.code
                          ? "active bg-gray-100"
                          : ""
                      }
                    >
                      <Link
                        className="block px-4 py-1 text-gray-700 hover:bg-gray-100"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLangSelect(lang);
                        }}
                      >
                        {lang.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="relative border border-gray-300 rounded px-2 py-1 cursor-pointer"
                onMouseEnter={() => {
                  setIsCurrOpen(true);
                  setIsLangOpen(false);
                }}
                onMouseLeave={() => setIsCurrOpen(false)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={isCurrOpen}
                  className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  {selectedCurr.name}
                  {isCurrOpen ? (
                    <FiChevronUp className="ml-1" />
                  ) : (
                    <FiChevronDown className="ml-1" />
                  )}
                </button>
                <ul
                  className={`absolute right-0 mt-1.5 w-28 bg-white shadow-md rounded py-1 z-50 ${
                    isCurrOpen ? "block" : "hidden"
                  }`}
                >
                  {currencies.map((curr) => (
                    <li
                      key={curr.code}
                      className={
                        selectedCurr.code === curr.code
                          ? "active bg-gray-100"
                          : ""
                      }
                    >
                      <Link
                        className="block px-4 py-1 text-gray-700 hover:bg-gray-100"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCurrSelect(curr);
                        }}
                      >
                        {curr.name} {curr.symbol}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Header Buttons - Improved layout */}
          <div className="lg:hidden">
            <div className="gi-header-buttons">
              <div className="flex justify-end items-center space-x-3">
                {/* Authentication Widget - New improved design */}
                <div className="relative">
                  <button
                    onClick={handleAuthDropdownToggle}
                    className="gi-header-btn gi-auth-toggle relative text-gray-700 hover:text-blue-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200"
                    title={isAuthenticated ? "Account" : "Login/Register"}
                    aria-label={
                      isAuthenticated ? "Account menu" : "Login or register"
                    }
                  >
                    <div className="flex items-center space-x-1">
                      <FiUser className="text-lg" />
                      {mounted && isAuthenticated && user && (
                        <span className="text-xs font-medium max-w-[60px] truncate">
                          {user.firstName || "User"}
                        </span>
                      )}
                      <FiChevronDown
                        className={`text-xs transition-transform ${
                          isAuthDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Authentication Dropdown - Fixed Logic */}
                  {isAuthDropdownOpen && mounted && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                      {isAuthenticated && user?.role ? (
                        // Authenticated menu - show only when fully authenticated
                        <div className="py-2">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                          <Link
                            href={dashboardPath}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={closeAuthDropdown}
                          >
                            <FiSettings className="mr-2" />
                            Dashboard
                          </Link>
                          <Link
                            href="/checkout"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={closeAuthDropdown}
                          >
                            <FiShoppingBag className="mr-2" />
                            Checkout
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <FiLogOut className="mr-2" />
                            Logout
                          </button>
                        </div>
                      ) : (
                        // Unauthenticated menu - show when not authenticated
                        <div className="py-2">
                          <Link
                            href="/auth/login"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={closeAuthDropdown}
                          >
                            <FiLogIn className="mr-2" />
                            Login
                          </Link>
                          <Link
                            href="/auth/register"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={closeAuthDropdown}
                          >
                            <FiUserPlus className="mr-2" />
                            Register
                          </Link>
                          <Link
                            href="/checkout"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={closeAuthDropdown}
                          >
                            <FiShoppingBag className="mr-2" />
                            Checkout
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Wishlist button */}
                <Link
                  href="/wishlist"
                  className="gi-header-btn gi-wish-toggle relative text-gray-700 hover:text-red-600 bg-gray-50 rounded-lg p-2 border border-gray-200"
                  title="Wishlist"
                >
                  <div className="header-icon text-lg relative">
                    <FiHeart />
                    {mounted && wishlistItemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                        {wishlistItemCount}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Cart button */}
                <button
                  onClick={onCartToggle}
                  className="gi-header-btn gi-cart-toggle relative text-gray-700 hover:text-green-600 bg-gray-50 rounded-lg p-2 border border-gray-200"
                  title="Cart"
                >
                  <div className="header-icon text-lg relative">
                    <FiShoppingBag />
                    {mounted && cartItemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (always rendered for smooth transition) */}
      <div className="lg:hidden fixed min-w-full inset-0 z-50 pointer-events-none">
        {/* Overlay */}
        <div
          className={
            "fixed inset-0 bg-black bg-opacity-80 transition-opacity duration-300 " +
            (isMobileMenuOpen
              ? "opacity-80 pointer-events-auto"
              : "opacity-0 pointer-events-none")
          }
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
          }}
          aria-hidden={!isMobileMenuOpen}
        ></div>
        {/* Drawer */}
        <div
          className={
            "fixed left-0 top-0 bg-white h-full w-[300px] max-w-[85%] overflow-y-auto p-0 shadow-xl z-50 " +
            "transform transition-transform duration-300 ease-in-out " +
            (isMobileMenuOpen ? "translate-x-0" : "-translate-x-full") +
            " pointer-events-auto"
          }
          onClick={(e) => e.stopPropagation()}
          aria-hidden={!isMobileMenuOpen}
        >
          {/* Menu Header */}
          <div className="flex justify-between items-center mb-0 pb-3 pt-4 px-4 border-b border-gray-200">
            <div className="font-semibold text-lg text-gray-800">My Menu</div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-500 hover:text-red-600"
              aria-label="Close menu"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          {/* Desktop Top Right Section for mobile */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex flex-col gap-2">
              <Link
                className="gi-help text-gray-700 hover:text-blue-600"
                href="/faq"
              >
                Help?
              </Link>
              <Link
                className="gi-help text-gray-700 hover:text-blue-600"
                href="/track-order"
              >
                Track Order?
              </Link>
              <div className="flex gap-2">
                {/* Language Dropdown */}
                <div className="relative flex-1">
                  <button
                    aria-haspopup="true"
                    aria-expanded={isLangOpen}
                    className="w-full flex items-center justify-between border border-gray-300 rounded px-2 py-1 text-gray-700 hover:text-blue-600 focus:outline-none"
                    onClick={() => {
                      setIsLangOpen((v) => !v);
                      setIsCurrOpen(false);
                    }}
                  >
                    {selectedLang.name}
                    {isLangOpen ? (
                      <FiChevronUp className="ml-1" />
                    ) : (
                      <FiChevronDown className="ml-1" />
                    )}
                  </button>
                  {isLangOpen && (
                    <ul className="absolute left-0 mt-1.5 w-full bg-white shadow-md rounded py-1 z-50">
                      {languages.map((lang) => (
                        <li
                          key={lang.code}
                          className={
                            selectedLang.code === lang.code
                              ? "active bg-gray-100"
                              : ""
                          }
                        >
                          <Link
                            className="block px-4 py-1 text-gray-700 hover:bg-gray-100"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLangSelect(lang);
                              setIsLangOpen(false);
                            }}
                          >
                            {lang.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Currency Dropdown */}
                <div className="relative flex-1">
                  <button
                    aria-haspopup="true"
                    aria-expanded={isCurrOpen}
                    className="w-full flex items-center justify-between border border-gray-300 rounded px-2 py-1 text-gray-700 hover:text-blue-600 focus:outline-none"
                    onClick={() => {
                      setIsCurrOpen((v) => !v);
                      setIsLangOpen(false);
                    }}
                  >
                    {selectedCurr.name}
                    {isCurrOpen ? (
                      <FiChevronUp className="ml-1" />
                    ) : (
                      <FiChevronDown className="ml-1" />
                    )}
                  </button>
                  {isCurrOpen && (
                    <ul className="absolute left-0 mt-1.5 w-full bg-white shadow-md rounded py-1 z-50">
                      {currencies.map((curr) => (
                        <li
                          key={curr.code}
                          className={
                            selectedCurr.code === curr.code
                              ? "active bg-gray-100"
                              : ""
                          }
                        >
                          <Link
                            className="block px-4 py-1 text-gray-700 hover:bg-gray-100"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleCurrSelect(curr);
                              setIsCurrOpen(false);
                            }}
                          >
                            {curr.name} {curr.symbol}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Integrate HeaderNav for mobile */}
          <HeaderNav
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>

      {/* Click outside handler for auth dropdown */}
      {isAuthDropdownOpen && (
        <div className="fixed inset-0 z-40" onClick={closeAuthDropdown} />
      )}
    </div>
  );
};

export default HeaderTop;
