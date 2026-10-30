/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check, Phone, FileCheck2, Printer } from 'lucide-react';
import { CarrierQuote, QuoteFormData } from '../types/insurance';
import { CarrierLogo } from './CarrierLogo';

interface QuoteDetailModalProps {
  quote: CarrierQuote | null;
  formData: QuoteFormData;
  clientAge: number;
  onClose: () => void;
  onOpenContracting: () => void;
  onOpenCallBA: () => void;
}

export const QuoteDetailModal: React.FC<QuoteDetailModalProps> = ({
  quote,
  formData,
  clientAge,
  onClose,
  onOpenContracting,
  onOpenCallBA
}) => {
  const [appSubmitted, setAppSubmitted] = useState<boolean>(false);
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantEmail, setApplicantEmail] = useState<string>('');

  if (!quote) return null;

  const handleStartApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setAppSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white rounded border border-slate-300 shadow-xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#002868] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CarrierLogo
              carrierId={quote.carrierId}
              name={quote.carrierName}
              className="w-9 h-9"
            />
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                {quote.carrierName}
              </h3>
              <p className="text-xs text-blue-100">{quote.planName} · A.M. Best {quote.amBestRating}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-blue-200 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {appSubmitted ? (
            <div className="p-5 rounded bg-blue-50 border border-blue-200 text-center space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#002868]">
                Application Initialized
              </h4>
              <p className="text-xs text-slate-700">
                Rate locked at <strong>${quote.monthlyPremium.toFixed(2)}/mo</strong> for {quote.carrierName}. A formal summary has been prepared for {applicantName || 'Applicant'}.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded border border-slate-300 bg-white text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Summary</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded bg-[#002868] text-white text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Premium and Benefit */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                    Monthly Premium
                  </span>
                  <div className="font-serif text-2xl font-bold text-[#002868] tabular-nums mt-0.5">
                    ${quote.monthlyPremium.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    Annual: ${quote.annualPremium.toFixed(2)}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                    Death Benefit
                  </span>
                  <div className="font-serif text-2xl font-bold text-[#002868] tabular-nums mt-0.5">
                    ${quote.faceAmount.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-[#002868] font-semibold block">
                    {quote.tierLabel}
                  </span>
                </div>
              </div>

              {/* Policy Specifications */}
              <div className="space-y-2 text-xs text-slate-700">
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                  Policy Guarantees
                </h4>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#002868] shrink-0 mt-0.5" />
                    <span><strong>Guaranteed Level Premium:</strong> Rates will never increase due to age or future health changes.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#002868] shrink-0 mt-0.5" />
                    <span><strong>Whole Life Protection:</strong> Policy never expires as long as premiums are paid.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#002868] shrink-0 mt-0.5" />
                    <span><strong>Simplified Underwriting:</strong> No medical examination or fluids required.</span>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleStartApplication} className="p-4 rounded border border-slate-200 bg-slate-50 space-y-3">
                <h4 className="text-xs font-bold text-[#002868] uppercase tracking-wide">
                  Start Application / Lock Quote
                </h4>

                <div className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-800"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="bg-white border border-slate-300 rounded p-2 text-xs text-slate-800"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="bg-white border border-slate-300 rounded p-2 text-xs text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-[#002868] hover:bg-[#001f52] text-white font-semibold text-xs tracking-wide transition-colors cursor-pointer"
                >
                  Lock Rate & Continue
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <button
            onClick={onOpenCallBA}
            className="text-[#002868] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call BA Desk: 1-800-444-8485</span>
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
