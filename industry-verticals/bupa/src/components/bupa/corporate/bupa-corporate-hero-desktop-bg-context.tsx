'use client';

import type { JSX, ReactNode } from 'react';
import { createContext, useContext } from 'react';

const BupaCorporateHeroDesktopBgContext = createContext(false);

export function BupaCorporateHeroDesktopBgProvider({
  value,
  children,
}: {
  value: boolean;
  children: ReactNode;
}): JSX.Element {
  return (
    <BupaCorporateHeroDesktopBgContext.Provider value={value}>
      {children}
    </BupaCorporateHeroDesktopBgContext.Provider>
  );
}

export function useBupaCorporateHeroDesktopBg(): boolean {
  return useContext(BupaCorporateHeroDesktopBgContext);
}
