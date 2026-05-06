'use client';

import type { JSX, ReactNode } from 'react';
import { createContext, useContext } from 'react';

/** True when this card is rendered inside a hero that shows the full-bleed desktop background. */
const BupaHeroDesktopBgContext = createContext(false);

export function BupaHeroDesktopBgProvider({
  value,
  children,
}: {
  value: boolean;
  children: ReactNode;
}): JSX.Element {
  return (
    <BupaHeroDesktopBgContext.Provider value={value}>{children}</BupaHeroDesktopBgContext.Provider>
  );
}

export function useBupaHeroDesktopBg(): boolean {
  return useContext(BupaHeroDesktopBgContext);
}
