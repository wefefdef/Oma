/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Printer, RotateCw, ArrowUpDown } from 'lucide-react';
import {
  CarrierQuote,
  QuoteComparisonGroup,
  QuoteFormData
} from '../types/insurance';
import { calculateAge, determineUnderwritingTier } from '../utils/quoteCalculator';
import { CarrierCard } from './CarrierCard';

interface QuoteResultsProps {
  quoteGroups: QuoteComparisonGroup[];
  formData: QuoteFormData;
  onRefreshQuotes: () => void;
  onSelectQuote: (quote: CarrierQuote) => void;
  onOpenContracting: () => void;
}

export const QuoteResults: React.FC<QuoteResultsProps> = ({
  quoteGroups,
  formData,
  onRefreshQuotes,
  onSelectQuote,
  onOpenContracting
}) => {
  const [selectedAmountIndex, setSelectedAmountIndex] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'lowest' | 'rating' | 'name'>('lowest');

  const clientAge = calculateAge(formData.dob);
  const healthTierInfo = determineUnderwritingTier(formData.health);

  if (!quoteGroups || quoteGroups.length === 0) {
    return null;
  }

  const currentGroup = quoteGroups[selectedAmountIndex] || quoteGroups[0];
  let displayedQuotes = [...currentGroup.quotes];

  if (sortBy === 'lowest') {
    displayedQuotes.sort((a, b) => a.monthlyPremium - b.monthlyPremium);
  } else if (sortBy === 'rating') {
    displayedQuotes.sort((a, b) => b.amBestRating.localeCompare(a.amBestRating));
  } else if (sortBy === 'name') {
    displayedQuotes.sort((a, b) => a.carrierName.localeCompare(b.carrierName));
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="quote-results-section" className="space-y-6 pt-4 scroll-mt-20">
      {/* Results Header Card */}
      <div className="bg-white rounded border border-slate-300 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#002868] tracking-tight">
              Carrier Rate Comparisons
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Quotes sorted in ascending order by monthly premium
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto no-print">
            <button
              onClick={onRefreshQuotes}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#002868]" />
              <span>Refresh Rates</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Sheet</span>
            </button>
          </div>
        </div>

        {/* Client Demographic Recap */}
        <div className="p-3 rounded bg-blue-50 border border-blue-200 text-xs text-[#002868] flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Client Age: <strong>{clientAge}</strong></span>
            <span>·</span>
            <span>Gender: <strong>{formData.gender === 'male' ? 'Male' : 'Female'}</strong></span>
            <span>·</span>
            <span>Tobacco: <strong>{formData.smoker === 'smoker' ? 'Smoker' : 'Non-Smoker'}</strong></span>
            <span>·</span>
            <span>State: <strong>{formData.state}</strong></span>
            <span>·</span>
            <span>Tier: <strong>{healthTierInfo.label}</strong></span>
          </div>

          <div className="font-semibold text-slate-700">
            {displayedQuotes.length} Approved Carriers Available
          </div>
        </div>

        {/* Multi-Amount Comparison Tabs */}
        {quoteGroups.length > 1 && (
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
              Select Coverage Amount Tab:
            </span>
            <div className="flex flex-wrap gap-2">
              {quoteGroups.map((group, idx) => {
                const isSelected = idx === selectedAmountIndex;
                const lowestRate = group.quotes[0]?.monthlyPremium;

                return (
                  <button
                    key={group.faceAmount}
                    onClick={() => setSelectedAmountIndex(idx)}
                    className={`px-3.5 py-2 rounded text-xs font-semibold transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-[#002868] text-white border-[#002868]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>${group.faceAmount.toLocaleString()} Benefit</span>
                    {lowestRate && (
                      <span className={`ml-2 text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                        (from ${lowestRate.toFixed(2)}/mo)
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sort selector */}
        <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200 no-print">
          <span className="text-slate-500">
            Showing rates for <strong>${currentGroup.faceAmount.toLocaleString()}</strong> coverage
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-300 rounded py-1 px-2 text-xs text-slate-800 cursor-pointer"
            >
              <option value="lowest">Lowest Monthly Rate</option>
              <option value="rating">A.M. Best Rating</option>
              <option value="name">Carrier Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quote Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displayedQuotes.map((quote, idx) => (
          <CarrierCard
            key={quote.quoteId}
            quote={quote}
            formData={formData}
            clientAge={clientAge}
            rank={idx + 1}
            onSelect={onSelectQuote}
          />
        ))}
      </div>
    </section>
  );
};
