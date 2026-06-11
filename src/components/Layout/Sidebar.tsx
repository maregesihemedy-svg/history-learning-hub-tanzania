'use client';

import React from 'react';
import Link from 'next/link';
import { useUIStore } from '@/hooks';
import { Home, BookOpen, Download, Heart, Settings, LogIn } from 'lucide-react';

const Sidebar: React.FC = () => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: BookOpen, label: 'Materials', href: '/materials' },
    { icon: Download, label: 'Downloads', href: '/downloads' },
    { icon: Heart, label: 'Favorites', href: '/favorites' },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 shadow-lg transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } z-30`}
    >
      <nav className="p-4 space-y-2 h-full overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-3 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
            Main
          </p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition group"
            >
              <item.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-500" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-1 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <p className="px-3 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
            Categories
          </p>
          <Link
            href="/materials?form_level=form-i"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
          >
            Form I
          </Link>
          <Link
            href="/materials?material_type=lesson-notes"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
          >
            Lesson Notes
          </Link>
          <Link
            href="/materials?material_type=past-papers"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
          >
            Past Papers
          </Link>
        </div>

        {/* Settings */}
        <div className="space-y-1 pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition group"
          >
            <Settings className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Settings</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
