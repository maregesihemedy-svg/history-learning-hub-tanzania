'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth, useUIStore } from '@/hooks';
import { Menu, LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-neutral-800 shadow-md border-b border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              HH
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary-900 dark:text-white">History Hub</h1>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Tanzania</p>
            </div>
          </Link>
        </div>

        {/* Right: User Menu */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">{user.full_name}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{user.role}</p>
              </div>
              <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center text-white">
                <span className="text-sm font-bold">{user.full_name.charAt(0).toUpperCase()}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition text-red-600 dark:text-red-400"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
