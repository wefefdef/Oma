/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Gender = 'male' | 'female';
export type SmokerStatus = 'non-smoker' | 'smoker';

export interface DateOfBirth {
  month: number;
  day: number;
  year: number;
}

export interface HealthDetails {
  isDiabetic: boolean;
  isOverweight: boolean;
  hasMajorCondition: boolean;
}

export interface QuoteFormData {
  gender: Gender;
  smoker: SmokerStatus;
  dob: DateOfBirth;
  state: string;
  faceAmounts: number[];
  health: HealthDetails;
}

export type UnderwritingTier = 'level' | 'standard' | 'graded' | 'modified' | 'guaranteed';

export interface CarrierDefinition {
  id: string;
  name: string;
  parentCompany?: string;
  amBestRating: string;
  ratingCategory: string;
  planName: string;
  logoColor: string;
  accentBg: string;
  accentBorder: string;
  tagline: string;
  keyFeatures: string[];
  maxCoverage: number;
  minCoverage: number;
  standardAvailable: boolean;
  gradedAvailable: boolean;
  guaranteedIssueAvailable: boolean;
  underwritingSpeed: string;
  paperlessApp: boolean;
}

export interface CarrierQuote {
  quoteId: string;
  carrierId: string;
  carrierName: string;
  parentCompany?: string;
  planName: string;
  amBestRating: string;
  monthlyPremium: number;
  annualPremium: number;
  faceAmount: number;
  tier: UnderwritingTier;
  tierLabel: string;
  dayOneBenefit: boolean;
  coverageDetails: string[];
  underwritingSpeed: string;
  logoColor: string;
  accentBg: string;
  accentBorder: string;
  isBestValue?: boolean;
}

export interface QuoteComparisonGroup {
  faceAmount: number;
  quotes: CarrierQuote[];
}
