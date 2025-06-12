"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Heart,
  LogOut,
  Settings,
  Package,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items } = useCartStore();

  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  const navigateToPanel = () => {
    if (user?.role === "admin") {
      window.open("http://localhost:3002", "_blank");
    } else {
      window.open("http://localhost:3001", "_blank");
    }
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 space-x-reverse"
          >
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">فروشگاه</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="جستجو در محصولات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-primary-500 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                href="/wishlist"
                className="p-2 text-gray-600 hover:text-primary-500 transition-colors"
              >
                <Heart className="w-6 h-6" />
              </Link>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 space-x-reverse p-2 text-gray-600 hover:text-primary-500 transition-colors"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden sm:block">{user?.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <button
                      onClick={navigateToPanel}
                      className="w-full flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4" />
                      <span>پنل کاربری</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 space-x-reverse px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>خروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 space-x-reverse">
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-primary-500 transition-colors"
                >
                  ورود
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/auth/register"
                  className="text-gray-600 hover:text-primary-500 transition-colors"
                >
                  ثبت‌نام
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-500"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block border-t border-gray-200">
          <div className="flex items-center space-x-8 space-x-reverse py-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              خانه
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              محصولات
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              دسته‌بندی‌ها
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              درباره ما
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              تماس با ما
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجو در محصولات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link
                href="/"
                className="block py-2 text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                خانه
              </Link>
              <Link
                href="/products"
                className="block py-2 text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                محصولات
              </Link>
              <Link
                href="/categories"
                className="block py-2 text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                دسته‌بندی‌ها
              </Link>
              <Link
                href="/about"
                className="block py-2 text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                درباره ما
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                تماس با ما
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
