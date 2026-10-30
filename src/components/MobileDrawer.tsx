/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Phone, FileCheck2 } from 'lucide-react';
import { AmericanFlagLogo } from './AmericanFlagLogo';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContracting: () => void;
  onOpenCallBA: () => void;
  onScrollToForm: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onOpenContracting,
  onOpenCallBA,
  onScrollToForm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-xl flex flex-col z-10 border-l border-slate-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <AmericanFlagLogo className="w-7 h-7" />
            <div>
              <p className="font-serif font-bold text-[#002868] text-sm">Brokers Alliance</p>
              <p className="text-[11px] text-slate-500">Final Expense Quoting</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto text-sm">
          <div className="space-y-1">
            <button
              onClick={() => {
                onScrollToForm();
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded text-slate-800 hover:bg-slate-100 font-medium"
            >
              Quote Calculator
            </button>
            <a
              href="#carriers"
              onClick={onClose}
              className="block px-3 py-2 rounded text-slate-800 hover:bg-slate-100 font-medium"
            >
              Approved Carriers
            </a>
            <a
              href="#underwriting"
              onClick={onClose}
              className="block px-3 py-2 rounded text-slate-800 hover:bg-slate-100 font-medium"
            >
              Underwriting Standards
            </a>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                onClose();
                onOpenContracting();
              }}
              className="w-full py-2.5 px-3 rounded bg-[#002868] text-white font-semibold text-xs flex items-center justify-center gap-2"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Get Contracted</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenCallBA();
              }}
              className="w-full py-2.5 px-3 rounded border border-slate-300 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              <Phone className="w-4 h-4 text-[#002868]" />
              <span>Call 1-800-444-8485</span>
            </button>
          </div>
        </div>

        <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center">
          © {new Date().getFullYear()} Brokers Alliance, Inc.
        </div>
      </div>
    </div>
  );
};
