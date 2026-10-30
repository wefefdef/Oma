/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const UnderwritingGuideSection: React.FC = () => {
  return (
    <section id="underwriting" className="py-10 bg-white border-t border-slate-200 scroll-mt-20">
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#002868] tracking-tight">
            Underwriting Standards
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Overview of final expense benefit structures and risk classifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-300 rounded p-4 space-y-2 bg-white">
            <span className="text-[11px] font-bold text-[#002868] uppercase tracking-wide block">
              Level Benefit (Day-One Full Coverage)
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides 100% full immediate death benefit from date of issue. Designed for applicants with standard health or well-controlled maintenance conditions.
            </p>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              Prescription checks confirm blood pressure or oral medication history.
            </p>
          </div>

          <div className="border border-slate-300 rounded p-4 space-y-2 bg-white">
            <span className="text-[11px] font-bold text-[#002868] uppercase tracking-wide block">
              Graded Benefit (2-Year Stepped Payout)
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides partial death benefit during the initial 24 months (e.g. 30%–40% Year 1, 70% Year 2, 100% Year 3+). Full payout immediately for accidental death.
            </p>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              Designed for moderate risk conditions or insulin-dependent diabetes.
            </p>
          </div>

          <div className="border border-slate-300 rounded p-4 space-y-2 bg-white">
            <span className="text-[11px] font-bold text-[#002868] uppercase tracking-wide block">
              Guaranteed Issue (Zero Medical Questions)
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Guaranteed acceptance without health questions. If death occurs within the first 2 policy years, all premiums paid are refunded plus 10% interest.
            </p>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              Designed for high-risk health conditions or recent medical treatments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
