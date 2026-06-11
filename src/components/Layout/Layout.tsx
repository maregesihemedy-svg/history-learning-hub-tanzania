'use client';

import React from 'react';
import { useUIStore } from '@/hooks';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
