/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CarrierLogoProps {
  carrierId: string;
  name: string;
  className?: string;
}

export const CarrierLogo: React.FC<CarrierLogoProps> = ({ carrierId, name, className = 'w-10 h-10' }) => {
  switch (carrierId) {
    case 'mutual-of-omaha':
      return (
        <div className={`${className} rounded-lg bg-[#00529B] flex items-center justify-center text-white font-bold text-xs shadow-sm ring-1 ring-black/5`}>
          <span className="font-extrabold tracking-tighter">MO</span>
        </div>
      );
    case 'aetna':
      return (
        <div className={`${className} rounded-lg bg-[#D22630] flex items-center justify-center text-white font-bold text-xs shadow-sm ring-1 ring-black/5`}>
          <span className="font-bold tracking-tight">aetna</span>
        </div>
      );
    case 'transamerica':
      return (
        <div className={`${className} rounded-lg bg-[#C41230] flex items-center justify-center text-white font-bold text-xs shadow-sm ring-1 ring-black/5`}>
          <span className="font-serif font-black text-sm">TA</span>
        </div>
      );
    case 'foresters':
      return (
        <div className={`${className} rounded-lg bg-[#007A3D] flex items-center justify-center text-white font-bold text-xs shadow-sm ring-1 ring-black/5`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v18m0-18l7 7m-7-7l-7 7m7 4l5 5m-5-5l-5 5" />
          </svg>
        </div>
      );
    case 'royal-neighbors':
      return (
        <div className={`${className} rounded-lg bg-[#532D6D] flex items-center justify-center text-white font-bold text-xs shadow-sm ring-1 ring-black/5`}>
          <span className="font-serif font-bold text-sm">RN</span>
        </div>
      );
    case 'prosperity':
      return (
        <div className={`${className} rounded-lg bg-[#0B3B60] flex items-center justify-center text-white font-bold text-xs shadow-sm ring-1 ring-black/5`}>
          <span className="font-mono font-bold text-sm">PLG</span>
        </div>
      );
    case 'americo':
      return (
        <div className={`${className} rounded-lg bg-[#002B49] flex items-center justify-center text-white font-bold text-xs shadow-sm ring-1 ring-black/5`}>
          <span className="font-bold text-xs tracking-wider">AM</span>
        </div>
      );
    case 'baltimore-life':
      return (
        <div className={`${className} rounded-lg bg-[#1F4788] flex items-center justify-center text-white font-bold text-xs shadow-sm ring-1 ring-black/5`}>
          <span className="font-bold text-xs">BL</span>
        </div>
      );
    case 'american-amicable':
      return (
        <div className={`${className} rounded-lg bg-[#8C1D40] flex items-center justify-center text-white font-bold text-xs shadow-sm ring-1 ring-black/5`}>
          <span className="font-bold text-xs">AmAm</span>
        </div>
      );
    case 'corebridge':
      return (
        <div className={`${className} rounded-lg bg-[#00263E] flex items-center justify-center text-white font-bold text-xs shadow-sm ring-1 ring-black/5`}>
          <span className="font-bold text-xs text-sky-400">CB</span>
        </div>
      );
    default:
      return (
        <div className={`${className} rounded-lg bg-slate-800 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-1 ring-black/5`}>
          <span>{name.slice(0, 2).toUpperCase()}</span>
        </div>
      );
  }
};
