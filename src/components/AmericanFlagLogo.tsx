/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AmericanFlagLogoProps {
  className?: string;
}

export const AmericanFlagLogo: React.FC<AmericanFlagLogoProps> = ({ className = 'w-9 h-9' }) => {
  return (
    <div className={`${className} shrink-0 relative flex items-center justify-center rounded-md overflow-hidden shadow-xs ring-1 ring-slate-300`}>
      <svg
        viewBox="0 0 48 48"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield outline / base */}
        <path
          d="M24 2C35 2 44 6 44 14C44 28 34 40 24 46C14 40 4 28 4 14C4 6 13 2 24 2Z"
          fill="#002868"
        />

        {/* Stripes lower section */}
        <g clipPath="url(#shield-clip)">
          {/* Alternating Red and White Stripes */}
          <rect x="4" y="20" width="40" height="26" fill="#FFFFFF" />
          <rect x="4" y="20" width="5.7" height="26" fill="#BF0A30" />
          <rect x="15.4" y="20" width="5.7" height="26" fill="#BF0A30" />
          <rect x="26.8" y="20" width="5.7" height="26" fill="#BF0A30" />
          <rect x="38.2" y="20" width="5.7" height="26" fill="#BF0A30" />

          {/* Top Blue Canton */}
          <path
            d="M4 14C4 6 13 2 24 2C35 2 44 6 44 14L44 20L4 20Z"
            fill="#002868"
          />

          {/* Clean White Stars */}
          <polygon points="24,5 25.5,9.5 30.2,9.5 26.4,12.3 27.9,16.8 24,14 20.1,16.8 21.6,12.3 17.8,9.5 22.5,9.5" fill="#FFFFFF" />
          <polygon points="14,8 15,11 18,11 15.5,13 16.5,16 14,14 11.5,16 12.5,13 10,11 13,11" fill="#FFFFFF" transform="scale(0.8) translate(3, 1)" />
          <polygon points="34,8 35,11 38,11 35.5,13 36.5,16 34,14 31.5,16 32.5,13 30,11 33,11" fill="#FFFFFF" transform="scale(0.8) translate(8, 1)" />
        </g>

        {/* Clip path for the shield boundary */}
        <clipPath id="shield-clip">
          <path d="M24 2C35 2 44 6 44 14C44 28 34 40 24 46C14 40 4 28 4 14C4 6 13 2 24 2Z" />
        </clipPath>

        {/* Hairline border */}
        <path
          d="M24 2C35 2 44 6 44 14C44 28 34 40 24 46C14 40 4 28 4 14C4 6 13 2 24 2Z"
          fill="none"
          stroke="#002868"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
