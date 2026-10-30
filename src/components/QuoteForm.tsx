/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { US_STATES } from '../data/states';
import { Gender, QuoteFormData, SmokerStatus } from '../types/insurance';
import { calculateAge, determineUnderwritingTier } from '../utils/quoteCalculator';

interface QuoteFormProps {
  formData: QuoteFormData;
  onChange: (data: QuoteFormData) => void;
  onSubmit: () => void;
  isCalculating: boolean;
}

const COMMON_AMOUNTS = [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000];

const MONTHS = [
  { value: 1, label: '01 - January' },
  { value: 2, label: '02 - February' },
  { value: 3, label: '03 - March' },
  { value: 4, label: '04 - April' },
  { value: 5, label: '05 - May' },
  { value: 6, label: '06 - June' },
  { value: 7, label: '07 - July' },
  { value: 8, label: '08 - August' },
  { value: 9, label: '09 - September' },
  { value: 10, label: '10 - October' },
  { value: 11, label: '11 - November' },
  { value: 12, label: '12 - December' },
];

export const QuoteForm: React.FC<QuoteFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isCalculating
}) => {
  const [healthExpanded, setHealthExpanded] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const clientAge = calculateAge(formData.dob);
  const healthTierInfo = determineUnderwritingTier(formData.health);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 51 }, (_, i) => currentYear - 40 - i);

  const daysInMonth = new Date(formData.dob.year, formData.dob.month, 0).getDate();
  const dayOptions = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleGenderChange = (gender: Gender) => {
    onChange({ ...formData, gender });
  };

  const handleSmokerChange = (smoker: SmokerStatus) => {
    onChange({ ...formData, smoker });
  };

  const handleMonthChange = (month: number) => {
    onChange({ ...formData, dob: { ...formData.dob, month } });
  };

  const handleDayChange = (day: number) => {
    onChange({ ...formData, dob: { ...formData.dob, day } });
  };

  const handleYearChange = (year: number) => {
    onChange({ ...formData, dob: { ...formData.dob, year } });
  };

  const handleStateChange = (state: string) => {
    onChange({ ...formData, state });
  };

  const handlePrimaryAmountChange = (amount: number) => {
    const updated = [...formData.faceAmounts];
    updated[0] = Math.min(50000, Math.max(5000, amount));
    onChange({ ...formData, faceAmounts: updated });
  };

  const handleComparisonAmountChange = (index: number, amount: number) => {
    const updated = [...formData.faceAmounts];
    updated[index] = Math.min(50000, Math.max(5000, amount));
    onChange({ ...formData, faceAmounts: updated });
  };

  const handleAddComparisonAmount = () => {
    if (formData.faceAmounts.length >= 4) return;
    const lastAmount = formData.faceAmounts[formData.faceAmounts.length - 1];
    let nextAmount = lastAmount + 5000;
    if (nextAmount > 50000) nextAmount = 10000;
    if (formData.faceAmounts.includes(nextAmount)) {
      nextAmount = Math.min(50000, Math.max(5000, lastAmount + 10000));
    }
    onChange({
      ...formData,
      faceAmounts: [...formData.faceAmounts, nextAmount]
    });
  };

  const handleRemoveComparisonAmount = (indexToRemove: number) => {
    if (formData.faceAmounts.length <= 1) return;
    const updated = formData.faceAmounts.filter((_, idx) => idx !== indexToRemove);
    onChange({ ...formData, faceAmounts: updated });
  };

  const handleHealthChange = (key: keyof QuoteFormData['health'], value: boolean) => {
    onChange({
      ...formData,
      health: {
        ...formData.health,
        [key]: value
      }
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientAge < 45 || clientAge > 89) {
      setValidationError('Please specify a birth year resulting in an age between 45 and 89.');
      return;
    }
    if (!formData.state) {
      setValidationError('Please select a valid US state.');
      return;
    }
    setValidationError(null);
    onSubmit();
  };

  return (
    <div id="quote-form-section" className="scroll-mt-20">
      <div className="bg-white rounded-lg border border-slate-300 shadow-xs overflow-hidden">
        {/* Form Title Bar */}
        <div className="bg-[#002868] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
              Final Expense Quote Parameters
            </h2>
            <p className="text-xs text-blue-100">
              Complete the fields below to calculate comparative carrier pricing
            </p>
          </div>
          <div className="text-xs bg-[#001f52] px-3 py-1.5 rounded text-white self-start sm:self-auto border border-blue-900 font-medium">
            Calculated Age: <strong className="text-white font-bold">{clientAge} Years</strong>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">
          {validationError && (
            <div className="p-3.5 rounded bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#002868] shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Row 1: Gender & Smoker Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleGenderChange('male')}
                  className={`py-2.5 px-4 rounded text-sm font-semibold transition-colors border cursor-pointer ${
                    formData.gender === 'male'
                      ? 'bg-[#002868] text-white border-[#002868]'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange('female')}
                  className={`py-2.5 px-4 rounded text-sm font-semibold transition-colors border cursor-pointer ${
                    formData.gender === 'female'
                      ? 'bg-[#002868] text-white border-[#002868]'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                Tobacco / Smoker Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSmokerChange('non-smoker')}
                  className={`py-2.5 px-4 rounded text-sm font-semibold transition-colors border cursor-pointer ${
                    formData.smoker === 'non-smoker'
                      ? 'bg-[#002868] text-white border-[#002868]'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Non-Smoker
                </button>
                <button
                  type="button"
                  onClick={() => handleSmokerChange('smoker')}
                  className={`py-2.5 px-4 rounded text-sm font-semibold transition-colors border cursor-pointer ${
                    formData.smoker === 'smoker'
                      ? 'bg-[#002868] text-white border-[#002868]'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Smoker
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Date of Birth & State */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                Date of Birth
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <select
                    value={formData.dob.month}
                    onChange={(e) => handleMonthChange(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded py-2 px-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#002868] cursor-pointer"
                  >
                    {MONTHS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <span className="text-[11px] text-slate-500 block mt-1">Month</span>
                </div>

                <div>
                  <select
                    value={formData.dob.day}
                    onChange={(e) => handleDayChange(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded py-2 px-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#002868] cursor-pointer"
                  >
                    {dayOptions.map((d) => (
                      <option key={d} value={d}>
                        {d < 10 ? `0${d}` : d}
                      </option>
                    ))}
                  </select>
                  <span className="text-[11px] text-slate-500 block mt-1">Day</span>
                </div>

                <div>
                  <select
                    value={formData.dob.year}
                    onChange={(e) => handleYearChange(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded py-2 px-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#002868] cursor-pointer"
                  >
                    {yearOptions.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  <span className="text-[11px] text-slate-500 block mt-1">Year</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <label htmlFor="client-state-select" className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                State of Residence
              </label>
              <select
                id="client-state-select"
                value={formData.state}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded py-2 px-3 text-xs text-slate-800 focus:outline-hidden focus:border-[#002868] cursor-pointer"
              >
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-slate-500 block mt-1">
                Rates comply with state department of insurance filings.
              </span>
            </div>
          </div>

          {/* Row 3: Coverage Amount & Compare Another Amount */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Coverage Amount (Face Amount)
                </label>
                <p className="text-xs text-slate-500">
                  Select policy benefit amount ($5,000 to $50,000)
                </p>
              </div>

              {formData.faceAmounts.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddComparisonAmount}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-[#002868] bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Compare Another Amount</span>
                </button>
              )}
            </div>

            {/* Primary Amount Card */}
            <div className="p-4 rounded border border-slate-300 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  Primary Amount
                </span>
                <span className="text-xl font-bold font-serif text-[#002868] tabular-nums">
                  ${formData.faceAmounts[0].toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={formData.faceAmounts[0]}
                onChange={(e) => handlePrimaryAmountChange(Number(e.target.value))}
                className="w-full accent-[#002868] cursor-pointer"
              />

              <div className="flex flex-wrap gap-1.5 pt-1">
                {COMMON_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handlePrimaryAmountChange(amt)}
                    className={`px-2.5 py-1 rounded text-xs font-medium tabular-nums border transition-colors cursor-pointer ${
                      formData.faceAmounts[0] === amt
                        ? 'bg-[#002868] text-white border-[#002868]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    ${amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Comparison Amounts */}
            {formData.faceAmounts.slice(1).map((compAmount, index) => {
              const actualIdx = index + 1;
              return (
                <div
                  key={actualIdx}
                  className="p-3.5 rounded border border-blue-300 bg-blue-50/30 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#002868]">
                      Comparison Amount #{actualIdx + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold font-serif text-[#002868] tabular-nums">
                        ${compAmount.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveComparisonAmount(actualIdx)}
                        className="p-1 text-slate-400 hover:text-red-700 rounded transition-colors cursor-pointer"
                        title="Remove amount"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="1000"
                    value={compAmount}
                    onChange={(e) => handleComparisonAmountChange(actualIdx, Number(e.target.value))}
                    className="w-full accent-[#002868] cursor-pointer"
                  />

                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleComparisonAmountChange(actualIdx, amt)}
                        className={`px-2 py-0.5 rounded text-xs font-medium tabular-nums border transition-colors cursor-pointer ${
                          compAmount === amt
                            ? 'bg-[#002868] text-white border-[#002868]'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        ${amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 4: Expandable Health Details */}
          <div className="pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setHealthExpanded(!healthExpanded)}
              className="w-full flex items-center justify-between p-3.5 rounded border border-slate-300 bg-slate-50 text-left transition-colors cursor-pointer hover:bg-slate-100"
            >
              <div>
                <span className="font-semibold text-xs text-slate-800 uppercase tracking-wide">
                  Health & Underwriting Questionnaire (Optional)
                </span>
                <p className="text-xs text-slate-500">
                  3 questions to determine eligibility for Day-One Level Benefit vs Graded tier
                </p>
              </div>
              <div className="text-slate-600">
                {healthExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {healthExpanded && (
              <div className="mt-2.5 p-4 rounded border border-slate-200 bg-white space-y-4">
                {/* Question 1: Diabetes */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      1. Diabetic (insulin or oral medication)?
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Includes Type 1, Type 2, or oral hypoglycemic agents
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleHealthChange('isDiabetic', false)}
                      className={`px-3.5 py-1.5 rounded text-xs font-medium border cursor-pointer ${
                        !formData.health.isDiabetic
                          ? 'bg-[#002868] text-white border-[#002868]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHealthChange('isDiabetic', true)}
                      className={`px-3.5 py-1.5 rounded text-xs font-medium border cursor-pointer ${
                        formData.health.isDiabetic
                          ? 'bg-[#002868] text-white border-[#002868]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      Yes
                    </button>
                  </div>
                </div>

                {/* Question 2: Overweight */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      2. Significantly overweight for height?
                    </p>
                    <p className="text-[11px] text-slate-500">
                      BMI greater than 38 or exceeding standard underwriting tables
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleHealthChange('isOverweight', false)}
                      className={`px-3.5 py-1.5 rounded text-xs font-medium border cursor-pointer ${
                        !formData.health.isOverweight
                          ? 'bg-[#002868] text-white border-[#002868]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHealthChange('isOverweight', true)}
                      className={`px-3.5 py-1.5 rounded text-xs font-medium border cursor-pointer ${
                        formData.health.isOverweight
                          ? 'bg-[#002868] text-white border-[#002868]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      Yes
                    </button>
                  </div>
                </div>

                {/* Question 3: Major condition */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      3. Major health condition in recent years?
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Heart attack, cancer treatment, stroke, or COPD within past 2-3 years
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleHealthChange('hasMajorCondition', false)}
                      className={`px-3.5 py-1.5 rounded text-xs font-medium border cursor-pointer ${
                        !formData.health.hasMajorCondition
                          ? 'bg-[#002868] text-white border-[#002868]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHealthChange('hasMajorCondition', true)}
                      className={`px-3.5 py-1.5 rounded text-xs font-medium border cursor-pointer ${
                        formData.health.hasMajorCondition
                          ? 'bg-[#002868] text-white border-[#002868]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      Yes
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded bg-blue-50 border border-blue-200 text-xs text-blue-900">
                  Current Underwriting Assessment: <strong>{healthTierInfo.label}</strong>. {healthTierInfo.notes}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-3.5 px-6 rounded bg-[#002868] hover:bg-[#001f52] text-white font-bold text-sm tracking-wide transition-colors shadow-xs cursor-pointer disabled:opacity-75 disabled:cursor-wait text-center"
            >
              {isCalculating ? 'CALCULATING RATES...' : 'GET QUOTES'}
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2">
              Generates comparative monthly rates across approved domestic insurance companies.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
