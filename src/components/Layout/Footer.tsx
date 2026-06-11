'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/constants';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-neutral-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg flex items-center justify-center font-bold">
                HH
              </div>
              <span className="font-bold">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-sm text-neutral-400">{SITE_CONFIG.description}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/materials" className="hover:text-white transition">
                  Materials
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-2 text-sm text-neutral-400">
              <p>Email: {SITE_CONFIG.email}</p>
              <p>Phone: {SITE_CONFIG.phone}</p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="hover:text-accent-400 transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-accent-400 transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-accent-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <p>&copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
