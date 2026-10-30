/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AmericanFlagLogo } from './AmericanFlagLogo';

interface FooterProps {
  onScrollToForm: () => void;
  onOpenContracting: () => void;
  onOpenCallBA: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToForm,
  onOpenContracting,
  onOpenCallBA
}) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-300 py-10 text-xs text-slate-600 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <AmericanFlagLogo className="w-6 h-6" />
            <span className="font-serif font-bold text-base text-[#002868]">
              Brokers Alliance
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 text-xs">National Senior Life Division</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={onScrollToForm}
              className="hover:text-[#002868] transition-colors cursor-pointer"
            >
              Quote Calculator
            </button>
            <a href="#carriers" className="hover:text-[#002868] transition-colors">
              Carriers
            </a>
            <a href="#underwriting" className="hover:text-[#002868] transition-colors">
              Underwriting Standards
            </a>
            <button
              onClick={onOpenContracting}
              className="hover:text-[#002868] transition-colors cursor-pointer"
            >
              Agent Contracting
            </button>
            <button
              onClick={onOpenCallBA}
              className="font-semibold text-[#002868] hover:underline cursor-pointer"
            >
              1-800-444-8485
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-2 text-[11px] text-slate-500 leading-relaxed">
          <p>
            Brokers Alliance, Inc. · 16220 N. Scottsdale Rd, Suite 400, Scottsdale, AZ 85254. Dedicated Senior Market Desk: 1-800-444-8485 (Mon–Fri 7am–5pm MST).
          </p>
          <p>
            Premium estimates provided on this site are calculated using published carrier rate filings and are subject to underwriting review and verification by the respective insurance company. Not affiliated with any government agency.
          </p>
          <p className="pt-1">
            © {new Date().getFullYear()} Brokers Alliance, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
