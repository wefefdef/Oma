/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

interface ActuarialLoaderProps {
  state: string;
  age: number;
}

const STEPS = [
  'Verifying state insurance rate schedules...',
  'Evaluating actuarial age and mortality tables...',
  'Checking underwriting classification and risk guidelines...',
  'Compiling carrier rate results in ascending order...'
];

export const ActuarialLoader: React.FC<ActuarialLoaderProps> = ({ state, age }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStepIndex(1), 250);
    const timer2 = setTimeout(() => setCurrentStepIndex(2), 550);
    const timer3 = setTimeout(() => setCurrentStepIndex(3), 850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="py-10 max-w-lg mx-auto text-center space-y-4">
      <div className="flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#002868] animate-spin" />
      </div>

      <div>
        <h3 className="font-serif text-lg font-bold text-[#002868]">
          Calculating Carrier Rates
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          State: {state} · Client Age: {age} · Actuarial Database
        </p>
      </div>

      <div className="bg-white rounded border border-slate-300 p-4 text-left space-y-2.5">
        {STEPS.map((step, idx) => {
          const isDone = currentStepIndex > idx;
          const isCurrent = currentStepIndex === idx;

          return (
            <div key={idx} className="flex items-center gap-2.5 text-xs">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  isDone
                    ? 'bg-[#002868] text-white'
                    : isCurrent
                    ? 'border-2 border-[#002868] text-[#002868]'
                    : 'border border-slate-300 text-slate-400'
                }`}
              >
                {isDone ? <Check className="w-3 h-3" /> : idx + 1}
              </div>
              <span
                className={`${
                  isDone
                    ? 'text-slate-400 line-through'
                    : isCurrent
                    ? 'text-[#002868] font-semibold'
                    : 'text-slate-500'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
