/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CARRIERS } from '../data/carriers';
import {
  CarrierQuote,
  DateOfBirth,
  QuoteComparisonGroup,
  QuoteFormData,
  UnderwritingTier
} from '../types/insurance';

/**
 * Calculates current age from birthdate
 */
export function calculateAge(dob: DateOfBirth): number {
  const today = new Date();
  let age = today.getFullYear() - dob.year;
  const monthDiff = today.getMonth() + 1 - dob.month;
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.day)) {
    age--;
  }
  return Math.max(0, age);
}

/**
 * Determines underwriting tier according to health details
 */
export function determineUnderwritingTier(health: QuoteFormData['health']): {
  tier: UnderwritingTier;
  label: string;
  dayOneBenefit: boolean;
  notes: string;
} {
  const { isDiabetic, isOverweight, hasMajorCondition } = health;
  const riskCount = (isDiabetic ? 1 : 0) + (isOverweight ? 1 : 0) + (hasMajorCondition ? 2 : 0);

  if (hasMajorCondition) {
    return {
      tier: 'graded',
      label: 'Graded / Modified Benefit',
      dayOneBenefit: false,
      notes: 'Recent major health condition detected. Carriers provide graded death benefit (Yr 1: 30-40%, Yr 2: 70%, Yr 3: 100%) or Guaranteed Issue.'
    };
  }

  if (riskCount >= 2) {
    return {
      tier: 'standard',
      label: 'Standard / Graded Benefit',
      dayOneBenefit: true,
      notes: 'Qualified for Standard or Graded underwriting depending on specific prescription history.'
    };
  }

  if (riskCount === 1) {
    return {
      tier: 'standard',
      label: 'Standard Level Benefit',
      dayOneBenefit: true,
      notes: 'Qualifies for standard full day-one immediate death benefit with most final expense carriers.'
    };
  }

  return {
    tier: 'level',
    label: 'Preferred / Level Benefit',
    dayOneBenefit: true,
    notes: 'Clean health profile qualifies for the lowest premium rates and 100% immediate full day-one death benefit.'
  };
}

/**
 * Base rate per $1,000 face amount per month based on age
 */
function getBaseRatePerThousand(age: number): number {
  if (age <= 50) return 2.15;
  if (age <= 55) return 2.75;
  if (age <= 60) return 3.55;
  if (age <= 65) return 4.75;
  if (age <= 70) return 6.85;
  if (age <= 75) return 9.95;
  if (age <= 80) return 14.85;
  return 19.95;
}

/**
 * Carrier-specific price index adjustments to model real-world market competition
 */
const CARRIER_BASE_FACTORS: Record<string, number> = {
  'mutual-of-omaha': 0.94,      // Very competitive for clean healthy seniors
  'aetna': 0.96,                // Strong non-tobacco rates
  'royal-neighbors': 0.98,      // Very competitive for mild health issues
  'foresters': 1.01,            // Includes free fraternal benefits
  'transamerica': 1.02,         // Household brand, robust riders
  'prosperity': 1.03,           // Flexible underwriting
  'americo': 1.04,              // Instant automated decision
  'american-amicable': 1.05,    // Liberal smoking & weight guidelines
  'baltimore-life': 1.07,       // Strong cash accumulation
  'corebridge': 1.18            // Guaranteed acceptance baseline
};

/**
 * Calculates a fresh, randomized set of quotes for given inputs
 */
export function generateCarrierQuotes(
  formData: QuoteFormData,
  faceAmount: number
): CarrierQuote[] {
  const age = calculateAge(formData.dob);
  const healthTierInfo = determineUnderwritingTier(formData.health);

  // Age multiplier curve
  const baseRate = getBaseRatePerThousand(age);

  // Gender factor (Males historically have ~25-35% higher mortality risk in life tables)
  const genderFactor = formData.gender === 'male' ? 1.28 : 1.0;

  // Smoker factor
  const smokerFactor = formData.smoker === 'smoker' ? 1.42 : 1.0;

  // Health risk factor
  let healthFactor = 1.0;
  if (formData.health.hasMajorCondition) {
    healthFactor = 1.38;
  } else if (formData.health.isDiabetic && formData.health.isOverweight) {
    healthFactor = 1.22;
  } else if (formData.health.isDiabetic) {
    healthFactor = 1.12;
  } else if (formData.health.isOverweight) {
    healthFactor = 1.08;
  }

  const thousands = faceAmount / 1000;

  // Policy fee (most carriers charge $2.50 - $4.00/mo administrative fee)
  const basePolicyFee = 3.5;

  const quotes: CarrierQuote[] = [];

  for (const carrier of CARRIERS) {
    // Check if carrier supports this face amount
    if (faceAmount > carrier.maxCoverage || faceAmount < carrier.minCoverage) {
      continue;
    }

    // Health condition eligibility logic
    let carrierTier = healthTierInfo.tier;
    let dayOne = healthTierInfo.dayOneBenefit;
    let tierLabel = healthTierInfo.label;

    if (carrier.id === 'corebridge') {
      // Guaranteed issue
      carrierTier = 'guaranteed';
      dayOne = false;
      tierLabel = 'Guaranteed Issue (2-Yr Graded)';
    } else if (carrier.id === 'royal-neighbors' && formData.health.isDiabetic && !formData.health.hasMajorCondition) {
      // Royal Neighbors is famous for giving Day-1 Level to insulin diabetics!
      carrierTier = 'level';
      dayOne = true;
      tierLabel = 'Level Benefit (Diabetic Friendly)';
    }

    const carrierFactor = CARRIER_BASE_FACTORS[carrier.id] || 1.0;

    // Stochastic randomized variance: +/- 3.5% random variation per request
    // This satisfies: "Every time the user clicks Get Quotes again, generate a fresh set of randomized results."
    const randomVariation = 1 + (Math.random() * 0.08 - 0.04);

    // Compute monthly premium
    const rawMonthly = ((thousands * baseRate * genderFactor * smokerFactor * healthFactor * carrierFactor) + basePolicyFee) * randomVariation;
    const roundedMonthly = Math.round(rawMonthly * 100) / 100;
    const annualPremium = Math.round(roundedMonthly * 11.6 * 100) / 100;

    // Dynamic tailored coverage details
    const dynamicDetails = [
      dayOne ? 'Full 100% Day-One Immediate Death Benefit' : 'Graded Benefit (Full coverage after 24 mo)',
      'Fixed level premium — guaranteed never to increase with age',
      'Policy cannot be cancelled due to future health changes',
      `Underwriting: ${carrier.underwritingSpeed}`
    ];

    quotes.push({
      quoteId: `${carrier.id}-${faceAmount}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      carrierId: carrier.id,
      carrierName: carrier.name,
      parentCompany: carrier.parentCompany,
      planName: carrier.planName,
      amBestRating: carrier.amBestRating,
      monthlyPremium: roundedMonthly,
      annualPremium,
      faceAmount,
      tier: carrierTier,
      tierLabel,
      dayOneBenefit: dayOne,
      coverageDetails: dynamicDetails,
      underwritingSpeed: carrier.underwritingSpeed,
      logoColor: carrier.logoColor,
      accentBg: carrier.accentBg,
      accentBorder: carrier.accentBorder
    });
  }

  // Sort from lowest monthly premium to highest as required!
  quotes.sort((a, b) => a.monthlyPremium - b.monthlyPremium);

  // Mark the lowest priced carrier as Best Value
  if (quotes.length > 0) {
    quotes[0].isBestValue = true;
  }

  return quotes;
}

/**
 * Generates quote comparison groups for all selected face amounts
 */
export function generateAllQuoteGroups(formData: QuoteFormData): QuoteComparisonGroup[] {
  return formData.faceAmounts.map(amount => ({
    faceAmount: amount,
    quotes: generateCarrierQuotes(formData, amount)
  }));
}
