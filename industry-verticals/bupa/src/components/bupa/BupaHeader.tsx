'use client';

import type { JSX } from 'react';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { Menu, Search, UserRound, X } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/shadcn/components/ui/drawer';
import { ComponentProps } from '@/lib/component-props';

export type BupaHeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

function BupaLogo(): JSX.Element {
  return (
    <div className="inline-flex items-center gap-2.5 text-[#0079c1]">
      <div className="grid h-8 w-8 place-items-center rounded-[2px] bg-[#0079c1] text-xs font-bold text-white">
        B
      </div>
      <span className="text-[2.5rem] leading-none font-semibold tracking-tight italic">Bupa</span>
    </div>
  );
}

function MobileAction({
  icon,
  label,
  onClick,
}: {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-w-13 flex-col items-center justify-center gap-1 text-[#002b5c]"
    >
      {icon}
      <span className="text-[1.03rem] leading-none">{label}</span>
    </button>
  );
}

export const Default = (props: BupaHeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles: paramStyles, DynamicPlaceholderId } = props.params;
  const navPlaceholder = `bupa-header-nav-${DynamicPlaceholderId ?? '1'}`;

  return (
    <header
      key={id ?? props.rendering?.uid}
      className={`component bupa-header box-border w-full ${paramStyles || ''}`.trim()}
      id={id}
    >
      <div className="hidden w-full lg:block">
        <Placeholder name={navPlaceholder} rendering={props.rendering} />
      </div>

      <div className="flex items-center justify-between gap-3 bg-[#f5f6f8] px-3 py-3.5 lg:hidden">
        <BupaLogo />

        <div className="flex items-center gap-1">
          <MobileAction icon={<Search className="h-8 w-8 stroke-[1.6]" />} label="Search" />
          <MobileAction icon={<UserRound className="h-8 w-8 stroke-[1.6]" />} label="Sign in" />

          <Drawer direction="left">
            <DrawerTrigger asChild>
              <div>
                <MobileAction icon={<Menu className="h-8 w-8 stroke-[1.6]" />} label="Menu" />
              </div>
            </DrawerTrigger>
            <DrawerContent className="!w-full !max-w-full rounded-none border-0 bg-white p-0">
              <div className="flex h-full min-h-dvh flex-col">
                <div className="flex items-center gap-3 border-b border-[#d5dbe3] px-4 py-3">
                  <DrawerClose asChild>
                    <button type="button" aria-label="Close menu" className="text-[#4d4d4d]">
                      <X className="h-7 w-7 stroke-[1.7]" />
                    </button>
                  </DrawerClose>
                  <span className="text-[2rem] leading-none font-medium text-[#0f2147]">Menu</span>
                </div>

                <div className="min-h-0 flex-1 overflow-auto bg-[#f5f6f8]">
                  <Placeholder name={navPlaceholder} rendering={props.rendering} />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};
