/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { CARRIERS } from '../data/carriers';

interface ContractingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContractingModal: React.FC<ContractingModalProps> = ({
  isOpen,
  onClose
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    npn: '',
    email: '',
    phone: '',
    residentState: 'FL',
    selectedCarriers: ['mutual-of-omaha', 'foresters', 'aetna']
  });

  if (!isOpen) return null;

  const toggleCarrier = (carrierId: string) => {
    if (formData.selectedCarriers.includes(carrierId)) {
      setFormData({
        ...formData,
        selectedCarriers: formData.selectedCarriers.filter((c) => c !== carrierId)
      });
    } else {
      setFormData({
        ...formData,
        selectedCarriers: [...formData.selectedCarriers, carrierId]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded border border-slate-300 shadow-xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#002868] text-white p-4 sm:p-5 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-white">
              Agent Contracting & Appointments
            </h3>
            <p className="text-xs text-blue-100">
              Direct carrier contracting for independent life insurance producers
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-blue-200 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#002868]">
                Contracting Request Received
              </h4>
              <p className="text-xs text-slate-700">
                Thank you, <strong>{formData.fullName}</strong>. Your appointment paperwork will be sent to <strong>{formData.email}</strong> via SuranceBay within 24 business hours.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded bg-[#002868] text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Smith"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    National Producer # (NPN)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 19283746"
                    value={formData.npn}
                    onChange={(e) => setFormData({ ...formData, npn: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="agent@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5">
                  Requested Carrier Appointments ({formData.selectedCarriers.length} Selected)
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto p-1 border border-slate-200 rounded">
                  {CARRIERS.map((carrier) => {
                    const isChecked = formData.selectedCarriers.includes(carrier.id);
                    return (
                      <button
                        key={carrier.id}
                        type="button"
                        onClick={() => toggleCarrier(carrier.id)}
                        className={`p-2 rounded text-left text-xs border transition-colors flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-[#002868] text-white border-[#002868]'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate pr-1 text-[11px]">{carrier.name}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-[#002868] hover:bg-[#001f52] text-white font-semibold text-xs tracking-wide transition-colors cursor-pointer"
              >
                Submit Contracting Application
              </button>
            </form>
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Brokers Alliance Producer Help Desk: 1-800-444-8485
        </div>
      </div>
    </div>
  );
};
