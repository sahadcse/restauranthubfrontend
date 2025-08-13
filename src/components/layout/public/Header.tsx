"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react"; // Import useEffect
import { useAuth } from "../../../contexts/authContext";
import { useCart } from "../../../contexts/cartContext";
import { useWishlist } from "../../../contexts/wishlistContext";
import HeaderTop from "./HeaderTop";
import HeaderNav from "./HeaderNav";
import CartModal from "../../features/cart/CartModal";
import headerData from "../../../data/headerData.json";
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";
import { redirectManager } from "../../../lib/services/redirectManager"; // Import redirectManager

// Reusable header with navigation links
const Header = () => {
  const { token, logout, user } = useAuth(); // added user
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Add mounted state
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Add search focus state

  // Set mounted to true only on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemCount = wishlist.length;
  const logoText = headerData.logo;

  return (
    <>
      {/* Header Top remains unchanged */}
      <HeaderTop
        onCartToggle={() => setIsCartOpen(true)}
        cartItemCount={cartItemCount}
        wishlistItemCount={wishlistItemCount}
      />

      {/* Moved Header Middle Section for sticky to work */}
      <div className="md:sticky md:top-0 md:z-40 ">
        <div className="border-b border-gray-200 lg:py-0 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            {/* Desktop Header Middle Start (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center justify-between py-2">
              {/* Header Logo Start */}
              <div className="header-logo">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/siteMainLogo.jpg"
                    alt={logoText || "Site Logo"}
                    width={86}
                    height={70}
                    priority // Load logo image with high priority
                    className="h-auto" // Maintain aspect ratio
                  />
                </Link>
              </div>
              {/* Header Logo End */}

              {/* Header Search Start */}
              <div className="flex-grow mx-8 z-40">
                <div className="header-search">
                  <form className="relative flex" action="#">
                    <input
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search Products..."
                      type="text"
                    />
                    <button
                      className="search_submit bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 flex items-center justify-center"
                      type="submit"
                    >
                      <FiSearch className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </div>
              {/* Header Search End */}

              {/* Header Button Start */}
              <div className="flex items-center space-x-4">
                {/* Header User Start */}
                <div className="relative group">
                  <button
                    className="flex items-center text-gray-700 hover:text-blue-500 "
                    title="Account"
                  >
                    <div className="header-icon mr-2">
                      <FiUser className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-medium">Account</span>
                      <span className="block text-xs text-gray-500">
                        {token ? "Manage" : "Login"}
                      </span>
                    </div>
                  </button>
                  <ul className="absolute right-0 mt-0.5 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-50">
                    {token ? (
                      <>
                        <li>
                          <Link
                            href={redirectManager.getPostLoginPath(
                              user?.role || ""
                            )} // changed to dynamic role-based URL
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            My Account
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/checkout"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Checkout
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            href="/auth/register"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Register
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/auth/login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/checkout"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Checkout
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                {/* Header User End */}

                {/* Header wishlist Start */}
                <Link
                  href="/wishlist"
                  className="flex items-center text-gray-700 hover:text-blue-500 relative"
                  title="Wishlist"
                >
                  <div className="header-icon mr-2 relative">
                    <FiHeart className="h-6 w-6" />
                    {/* Use mounted state for desktop badge */}
                    {mounted && wishlistItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ring-1 ring-white">
                        {wishlistItemCount}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-medium">Wishlist</span>
                    <span className="block text-xs text-gray-500">
                      {/* Use mounted state for desktop text count */}
                      <b className="font-semibold">
                        {mounted ? wishlistItemCount : 0}
                      </b>
                      -items
                    </span>
                  </div>
                </Link>
                {/* Header wishlist End */}

                {/* Header Cart Start */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center text-gray-700 hover:text-blue-500 relative cursor-pointer "
                  title="Cart"
                >
                  <div className="header-icon mr-2 relative">
                    <FiShoppingBag className="h-6 w-6" />
                    {/* Use mounted state for desktop badge */}
                    {mounted && cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ring-1 ring-white">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-medium">Cart</span>
                    <span className="block text-xs text-gray-500">
                      {/* Use mounted state for desktop text count */}
                      <b className="font-semibold">
                        {mounted ? cartItemCount : 0}
                      </b>
                      -items
                    </span>
                  </div>
                </button>
                {/* Header Cart End */}
              </div>
              {/* Header Button End */}
            </div>
            {/* Desktop Header Middle End */}

            {/* Mobile Header Middle Start (Visible on Mobile) */}
            <div className="lg:hidden py-4 px-2">
              <div className="flex items-center gap-3">
                {/* Mobile Logo */}
                <div
                  className={`header-logo transition-all duration-300 ${
                    isSearchFocused
                      ? "opacity-50 scale-90"
                      : "opacity-100 scale-100"
                  }`}
                >
                  <Link href="/" className="inline-block">
                    <Image
                      src="/siteMainLogo.jpg"
                      alt={logoText || "Site Logo"}
                      width={60}
                      height={48}
                      priority // Load logo image with high priority
                      className="h-auto" // Maintain aspect ratio
                    />
                  </Link>
                </div>

                {/* Mobile Search */}
                <div
                  className={`header-search flex-1 transition-all duration-300 ${
                    isSearchFocused ? "scale-105" : "scale-100"
                  }`}
                >
                  <form className="relative" action="#">
                    <input
                      className={`form-input w-full pl-3 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm transition-all duration-300 ${
                        isSearchFocused ? "shadow-lg bg-blue-50" : "shadow-sm"
                      }`}
                      placeholder="Search products..."
                      type="text"
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                    <button
                      className={`search_submit bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 flex items-center justify-center absolute right-0 top-0 bottom-0 transition-all duration-200 ${
                        isSearchFocused ? "bg-blue-600 scale-105" : ""
                      }`}
                      type="submit"
                      aria-label="Search"
                    >
                      <FiSearch className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* Mobile Header Middle End */}
          </div>
        </div>
      </div>

      <header className=" bg-white shadow-sm">
        {/* Header Nav remains */}
        <div className="hidden lg:block">
          <HeaderNav />
        </div>
        {/* Header Nav End */}
      </header>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
