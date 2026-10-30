/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { CarrierQuote, QuoteFormData } from '../types/insurance';
import { CarrierLogo } from './CarrierLogo';

interface CarrierCardProps {
  quote: CarrierQuote;
  formData: QuoteFormData;
  clientAge: number;
  rank: number;
  onSelect: (quote: CarrierQuote) => void;
}

export const CarrierCard: React.FC<CarrierCardProps> = ({
  quote,
  formData,
  clientAge,
  rank,
  onSelect
}) => {
  return (
    <div
      className={`bg-white rounded border transition-colors ${
        quote.isBestValue
          ? 'border-[#002868] ring-1 ring-[#002868]/30 shadow-xs'
          : 'border-slate-300 hover:border-slate-400'
      }`}
    >
      {/* Best value bar */}
      {quote.isBestValue && (
        <div className="bg-[#002868] text-white px-4 py-1 text-xs font-semibold flex items-center justify-between">
          <span>Lowest Monthly Premium</span>
          <span>Rank #{rank}</span>
        </div>
      )}

      <div className="p-5 space-y-4">
        {/* Header: Carrier info & A.M. Best Rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <CarrierLogo
              carrierId={quote.carrierId}
              name={quote.carrierName}
              className="w-10 h-10 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-[#002868]">
                  {quote.carrierName}
                </h3>
              </div>
              <p className="text-xs text-slate-600">
                {quote.planName}
              </p>
              <p className="text-[11px] text-slate-500">
                A.M. Best Rating: <strong>{quote.amBestRating}</strong>
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-slate-500 block">Coverage Amount</span>
            <span className="font-serif font-bold text-slate-900 text-sm">
              ${quote.faceAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Pricing Box */}
        <div className="p-3.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
              Monthly Premium
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#002868] tabular-nums">
                ${quote.monthlyPremium.toFixed(2)}
              </span>
              <span className="text-xs text-slate-600">/ mo</span>
            </div>
            <span className="text-[11px] text-slate-500 block">
              Annual rate: ${quote.annualPremium.toFixed(2)} / yr
            </span>
          </div>

          <div className="text-right text-xs space-y-0.5">
            <span className="block font-semibold text-[#002868]">
              {quote.tierLabel}
            </span>
            <span className="text-[11px] text-slate-500 block">
              Age {clientAge} · {formData.gender === 'male' ? 'Male' : 'Female'} · {formData.smoker === 'smoker' ? 'Smoker' : 'Non-Smoker'}
            </span>
            <span className="text-[11px] text-slate-600 block">
              {quote.underwritingSpeed}
            </span>
          </div>
        </div>

        {/* Coverage Highlights */}
        <div className="space-y-1.5 text-xs text-slate-600">
          {quote.coverageDetails.slice(0, 3).map((detail, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-[#002868] shrink-0 mt-0.5" />
              <span>{detail}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Guaranteed locked rate
          </span>
          <button
            type="button"
            onClick={() => onSelect(quote)}
            className="px-4 py-2 rounded bg-[#002868] hover:bg-[#001f52] text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Select Plan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
