/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QuoteForm } from './components/QuoteForm';
import { QuoteResults } from './components/QuoteResults';
import { ActuarialLoader } from './components/ActuarialLoader';
import { CarriersMatrixSection } from './components/CarriersMatrixSection';
import { UnderwritingGuideSection } from './components/UnderwritingGuideSection';
import { Footer } from './components/Footer';
import { FixedBottomBar } from './components/FixedBottomBar';
import { MobileDrawer } from './components/MobileDrawer';
import { ContractingModal } from './components/ContractingModal';
import { CallBAModal } from './components/CallBAModal';
import { QuoteDetailModal } from './components/QuoteDetailModal';
import { CarrierQuote, QuoteComparisonGroup, QuoteFormData } from './types/insurance';
import { calculateAge, generateAllQuoteGroups } from './utils/quoteCalculator';

export default function App() {
  const [formData, setFormData] = useState<QuoteFormData>({
    gender: 'male',
    smoker: 'non-smoker',
    dob: { month: 5, day: 15, year: 1961 }, // default age 65
    state: 'FL',
    faceAmounts: [10000, 15000],
    health: {
      isDiabetic: false,
      isOverweight: false,
      hasMajorCondition: false
    }
  });

  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [quoteGroups, setQuoteGroups] = useState<QuoteComparisonGroup[]>([]);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isContractingOpen, setIsContractingOpen] = useState<boolean>(false);
  const [isCallBAOpen, setIsCallBAOpen] = useState<boolean>(false);
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState<CarrierQuote | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialGroups = generateAllQuoteGroups(formData);
    setQuoteGroups(initialGroups);
    setHasCalculated(true);
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('quote-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToResults = () => {
    setTimeout(() => {
      const el = document.getElementById('quote-results-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCalculateQuotes = () => {
    setIsCalculating(true);

    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    setTimeout(() => {
      const freshGroups = generateAllQuoteGroups(formData);
      setQuoteGroups(freshGroups);
      setIsCalculating(false);
      setHasCalculated(true);
      scrollToResults();
    }, 1100);
  };

  const clientAge = calculateAge(formData.dob);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans pb-16">
      {/* Header with American Flag emblem and deep blue styling */}
      <Header
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        onOpenContracting={() => setIsContractingOpen(true)}
        onOpenCallBA={() => setIsCallBAOpen(true)}
        onScrollToForm={scrollToForm}
      />

      {/* Hero Section with clean, dignified Oxford-style presentation */}
      <HeroSection onScrollToForm={scrollToForm} />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full space-y-10">
        <QuoteForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleCalculateQuotes}
          isCalculating={isCalculating}
        />

        <div ref={resultsRef}>
          {isCalculating ? (
            <ActuarialLoader state={formData.state} age={clientAge} />
          ) : hasCalculated && quoteGroups.length > 0 ? (
            <QuoteResults
              quoteGroups={quoteGroups}
              formData={formData}
              onRefreshQuotes={handleCalculateQuotes}
              onSelectQuote={(quote) => setSelectedQuoteDetail(quote)}
              onOpenContracting={() => setIsContractingOpen(true)}
            />
          ) : null}
        </div>

        <CarriersMatrixSection
          onOpenContracting={() => setIsContractingOpen(true)}
        />

        <UnderwritingGuideSection />
      </main>

      {/* Institutional Footer */}
      <Footer
        onScrollToForm={scrollToForm}
        onOpenContracting={() => setIsContractingOpen(true)}
        onOpenCallBA={() => setIsCallBAOpen(true)}
      />

      {/* Fixed Bottom Bar: Get Contracted and Call BA */}
      <FixedBottomBar
        onOpenContracting={() => setIsContractingOpen(true)}
        onOpenCallBA={() => setIsCallBAOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenContracting={() => setIsContractingOpen(true)}
        onOpenCallBA={() => setIsCallBAOpen(true)}
        onScrollToForm={scrollToForm}
      />

      {/* Modals */}
      <QuoteDetailModal
        quote={selectedQuoteDetail}
        formData={formData}
        clientAge={clientAge}
        onClose={() => setSelectedQuoteDetail(null)}
        onOpenContracting={() => {
          setSelectedQuoteDetail(null);
          setIsContractingOpen(true);
        }}
        onOpenCallBA={() => {
          setSelectedQuoteDetail(null);
          setIsCallBAOpen(true);
        }}
      />

      <ContractingModal
        isOpen={isContractingOpen}
        onClose={() => setIsContractingOpen(false)}
      />

      <CallBAModal
        isOpen={isCallBAOpen}
        onClose={() => setIsCallBAOpen(false)}
      />
    </div>
  );
}
