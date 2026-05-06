'use client';

import type { JSX } from 'react';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { Menu, Search, X } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/shadcn/components/ui/drawer';
import { ComponentProps } from '@/lib/component-props';

export type BupaCorporateHeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

function CorporateLogo(): JSX.Element {
  return (
    <a href="/" className="inline-flex items-center gap-2.5 text-white no-underline">
      <span className="grid h-8 w-8 place-items-center rounded-[2px] bg-[#0079c1] text-xs font-bold text-white">
        B
      </span>
      <span className="text-[2rem] leading-none font-semibold tracking-tight text-white italic md:text-[2.25rem]">
        Bupa
      </span>
    </a>
  );
}

export const Default = (props: BupaCorporateHeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles: paramStyles, DynamicPlaceholderId } = props.params;
  const suffix = DynamicPlaceholderId ?? '1';
  const utilityPh = `bupa-corporate-header-utility-${suffix}`;
  const navPh = `bupa-corporate-header-nav-${suffix}`;

  return (
    <header
      key={id ?? props.rendering?.uid}
      className={`component bupa-corporate-header box-border w-full bg-[#001a3d] text-white ${paramStyles || ''}`.trim()}
      id={id}
    >
      {/* Desktop */}
      <div className="hidden w-full lg:block">
        <div className="border-b border-white/10 bg-[#00122b]">
          <div className="mx-auto flex max-w-[min(96rem,100vw)] items-center justify-end gap-2 px-4 py-2 text-[0.8125rem] font-medium text-white/90 xl:px-6">
            <div className="flex min-w-0 flex-1 items-center">
              <Placeholder name={utilityPh} rendering={props.rendering} />
            </div>
            <button
              type="button"
              aria-label="Search"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white/90 transition hover:bg-white/10 hover:text-white"
            >
              <Search className="h-5 w-5 stroke-[1.8]" />
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-[min(96rem,100vw)] items-center gap-8 px-4 py-4 xl:gap-12 xl:px-6">
          <CorporateLogo />
          <div className="min-w-0 flex-1">
            <Placeholder name={navPh} rendering={props.rendering} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between gap-3 px-4 py-3.5 lg:hidden">
        <CorporateLogo />

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10"
          >
            <Search className="h-7 w-7 stroke-[1.6]" />
          </button>

          <Drawer direction="right">
            <DrawerTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10"
              >
                <Menu className="h-7 w-7 stroke-[1.6]" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="!h-full !max-h-full !w-[min(100%,24rem)] !max-w-full rounded-none border-0 bg-[#001a3d] p-0">
              <div className="flex h-full min-h-dvh flex-col text-white">
                <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
                  <span className="text-lg font-semibold">Menu</span>
                  <DrawerClose asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="text-white/80 hover:text-white"
                    >
                      <X className="h-7 w-7 stroke-[1.7]" />
                    </button>
                  </DrawerClose>
                </div>
                <div className="min-h-0 flex-1 overflow-auto px-2 py-4">
                  <Placeholder name={utilityPh} rendering={props.rendering} />
                  <div className="mt-6 border-t border-white/15 pt-4">
                    <Placeholder name={navPh} rendering={props.rendering} />
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};
