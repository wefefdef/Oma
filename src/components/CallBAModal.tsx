/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Phone, Clock } from 'lucide-react';

interface CallBAModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallBAModal: React.FC<CallBAModalProps> = ({ isOpen, onClose }) => {
  const [callbackRequested, setCallbackRequested] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  if (!isOpen) return null;

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackRequested(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded border border-slate-300 shadow-xl overflow-hidden z-10 flex flex-col">
        {/* Header */}
        <div className="bg-[#002868] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Phone className="w-5 h-5 text-white" />
            <div>
              <h3 className="font-serif text-base font-bold text-white">Call Brokers Alliance</h3>
              <p className="text-xs text-blue-100">Final Expense Senior Division</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-blue-200 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-4 rounded bg-slate-50 border border-slate-200 text-center space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
              Toll-Free Direct Line
            </span>
            <div className="font-serif text-2xl font-bold text-[#002868]">
              1-800-444-8485
            </div>
            <p className="text-xs text-slate-600">
              Press <strong>Option 2</strong> for Final Expense Underwriting & Case Support
            </p>
            <div className="pt-1">
              <a
                href="tel:18004448485"
                className="inline-flex items-center justify-center gap-2 w-full py-2 px-4 rounded bg-[#002868] hover:bg-[#001f52] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now: 1-800-444-8485</span>
              </a>
            </div>
          </div>

          <div className="p-3 rounded bg-blue-50/50 border border-blue-200 text-xs text-slate-700 flex items-start gap-2">
            <Clock className="w-4 h-4 text-[#002868] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#002868]">Support Hours</p>
              <p className="text-[11px] text-slate-600">Monday through Friday, 7:00 AM to 5:00 PM Mountain Standard Time (MST).</p>
            </div>
          </div>

          {callbackRequested ? (
            <div className="p-3 rounded bg-blue-50 border border-blue-200 text-xs text-[#002868] text-center font-medium">
              Thank you. A representative will call <strong>{phone}</strong> shortly.
            </div>
          ) : (
            <form onSubmit={handleCallbackSubmit} className="pt-2 border-t border-slate-200 space-y-2.5">
              <span className="text-xs font-bold text-slate-800 uppercase block">
                Request a Callback
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border border-slate-300 rounded p-1.5 text-xs text-slate-800"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white border border-slate-300 rounded p-1.5 text-xs text-slate-800"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded border border-[#002868] text-[#002868] hover:bg-blue-50 text-xs font-semibold transition-colors cursor-pointer"
              >
                Submit Callback Request
              </button>
            </form>
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Brokers Alliance, Inc. · Scottsdale, Arizona
        </div>
      </div>
    </div>
  );
};
