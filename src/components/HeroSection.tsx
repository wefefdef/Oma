/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check } from 'lucide-react';

interface HeroSectionProps {
  onScrollToForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToForm }) => {
  return (
    <section className="bg-white border-b border-slate-200 py-10 md:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#002868]">
          Institutional Multi-Carrier Actuarial Engine
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#002868] tracking-tight leading-tight">
          Final Expense Life Insurance Quotes
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Compare real-time premium rates across top-rated domestic insurance carriers. Simplified underwriting, immediate coverage options, and customizable coverage amounts from $5,000 to $50,000.
        </p>

        {/* Clean, simple trust points */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#002868]" />
            <span>A.M. Best 'A' Rated Insurers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#002868]" />
            <span>No Medical Exam Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#002868]" />
            <span>Multi-Amount Coverage Comparisons</span>
          </div>
        </div>
      </div>
    </section>
  );
};
