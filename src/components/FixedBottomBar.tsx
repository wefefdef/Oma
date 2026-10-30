/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, FileCheck2 } from 'lucide-react';

interface FixedBottomBarProps {
  onOpenContracting: () => void;
  onOpenCallBA: () => void;
}

export const FixedBottomBar: React.FC<FixedBottomBarProps> = ({
  onOpenContracting,
  onOpenCallBA
}) => {
  return (
    <aside
      id="fixed-bottom-bar"
      aria-label="Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-300 py-2.5 px-4 shadow-md no-print"
    >
      <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
        {/* Button 1: Get Contracted */}
        <button
          type="button"
          onClick={onOpenContracting}
          className="flex-1 py-2.5 px-4 rounded border border-[#002868] text-[#002868] hover:bg-blue-50 font-semibold text-xs sm:text-sm tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <FileCheck2 className="w-4 h-4 text-[#002868] shrink-0" />
          <span>Get Contracted</span>
        </button>

        {/* Button 2: Call BA */}
        <button
          type="button"
          onClick={onOpenCallBA}
          className="flex-1 py-2.5 px-4 rounded bg-[#002868] hover:bg-[#001f52] text-white font-semibold text-xs sm:text-sm tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <Phone className="w-4 h-4 text-white shrink-0" />
          <span>Call BA</span>
        </button>
      </div>
    </aside>
  );
};
