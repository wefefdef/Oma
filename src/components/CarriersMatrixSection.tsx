/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { CARRIERS } from '../data/carriers';
import { CarrierLogo } from './CarrierLogo';

interface CarriersMatrixSectionProps {
  onOpenContracting: () => void;
}

export const CarriersMatrixSection: React.FC<CarriersMatrixSectionProps> = ({
  onOpenContracting
}) => {
  const [selectedCarrierId, setSelectedCarrierId] = useState<string>(CARRIERS[0].id);
  const selectedCarrier = CARRIERS.find((c) => c.id === selectedCarrierId) || CARRIERS[0];

  return (
    <section id="carriers" className="py-10 bg-white border-t border-slate-200 scroll-mt-20">
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#002868] tracking-tight">
            Approved Insurance Carriers
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Participating life insurance companies with A.M. Best financial strength ratings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Carrier List */}
          <div className="md:col-span-5 border border-slate-300 rounded overflow-hidden divide-y divide-slate-200">
            {CARRIERS.map((carrier) => {
              const isSelected = carrier.id === selectedCarrierId;
              return (
                <button
                  key={carrier.id}
                  onClick={() => setSelectedCarrierId(carrier.id)}
                  className={`w-full p-2.5 text-left transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#002868] text-white'
                      : 'bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CarrierLogo
                      carrierId={carrier.id}
                      name={carrier.name}
                      className="w-7 h-7"
                    />
                    <div>
                      <p className="font-medium text-xs leading-snug">
                        {carrier.name}
                      </p>
                      <p className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                        {carrier.planName}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    A.M. Best {carrier.amBestRating}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Carrier Details */}
          <div className="md:col-span-7 border border-slate-300 rounded p-5 bg-slate-50/50 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#002868]">
                  {selectedCarrier.name}
                </h3>
                <p className="text-xs text-slate-600">{selectedCarrier.parentCompany || selectedCarrier.planName}</p>
              </div>
              <div className="text-right text-xs">
                <span className="text-slate-500 block">A.M. Best Rating</span>
                <span className="font-bold text-[#002868]">{selectedCarrier.amBestRating}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700">
              <span className="font-semibold uppercase tracking-wide text-slate-800 block text-[11px]">
                Underwriting & Specifications
              </span>
              <p>• Max Coverage: <strong>${selectedCarrier.maxCoverage.toLocaleString()}</strong></p>
              <p>• Underwriting Speed: <strong>{selectedCarrier.underwritingSpeed}</strong></p>
              <p>• Application: <strong>{selectedCarrier.paperlessApp ? 'Electronic application (e-App) available' : 'Standard application'}</strong></p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700">
              <span className="font-semibold uppercase tracking-wide text-slate-800 block text-[11px]">
                Plan Features
              </span>
              {selectedCarrier.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#002868] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={onOpenContracting}
                className="px-3.5 py-1.5 rounded bg-[#002868] text-white text-xs font-semibold hover:bg-[#001f52] transition-colors cursor-pointer"
              >
                Request Contracting for {selectedCarrier.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
