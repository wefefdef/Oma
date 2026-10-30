/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, Phone } from 'lucide-react';
import { AmericanFlagLogo } from './AmericanFlagLogo';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenContracting: () => void;
  onOpenCallBA: () => void;
  onScrollToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenContracting,
  onOpenCallBA,
  onScrollToForm
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Top subtle blue institutional bar */}
      <div className="bg-[#002868] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-blue-900">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-200 text-xs">
            <span className="font-semibold tracking-wide">Brokers Alliance</span>
            <span className="text-blue-300">·</span>
            <span className="text-slate-200">National Final Expense Quoting Network</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCallBA}
              className="flex items-center gap-1.5 text-white hover:text-blue-100 transition-colors cursor-pointer text-xs font-semibold"
            >
              <Phone className="w-3 h-3 text-white" />
              <span>1-800-444-8485</span>
            </button>
            <span className="text-blue-400 hidden md:inline">|</span>
            <button
              onClick={onOpenContracting}
              className="hidden md:inline text-xs text-blue-100 hover:text-white transition-colors cursor-pointer font-medium"
            >
              Agent Licensing & Contracting
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation row: Simple, clean Oxford-style hierarchy */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Brand Zone with American Flag Emblem */}
        <a href="/" className="flex items-center gap-3 shrink-0">
          <AmericanFlagLogo className="w-9 h-9" />
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#002868]">
              Brokers Alliance
            </span>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Final Expense Life Insurance
            </span>
          </div>
        </a>

        {/* Navigation Links: Clean, unboxed text */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <button
            onClick={onScrollToForm}
            className="hover:text-[#002868] transition-colors cursor-pointer"
          >
            Quote Calculator
          </button>
          <a
            href="#carriers"
            className="hover:text-[#002868] transition-colors"
          >
            Approved Carriers
          </a>
          <a
            href="#underwriting"
            className="hover:text-[#002868] transition-colors"
          >
            Underwriting Standards
          </a>
        </nav>

        {/* Actions: Clean single solid blue button + hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenContracting}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-white bg-[#002868] hover:bg-[#001f52] rounded-md transition-colors cursor-pointer"
          >
            Get Contracted
          </button>

          <button
            onClick={onOpenMenu}
            className="p-2 text-slate-700 hover:text-[#002868] hover:bg-slate-100 rounded-md md:hidden transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
