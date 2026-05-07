'use client';

import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { Image as SitecoreImage, ImageField, Placeholder } from '@sitecore-content-sdk/nextjs';
import { Menu, Search, X } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/shadcn/components/ui/drawer';
import { ComponentProps } from '@/lib/component-props';
import { extractMediaUrl } from '@/helpers/extractMediaUrl';
import {
  BUPA_CORPORATE_NAV_MEGA_CHANGE,
  BupaCorporateNavMegaDetail,
} from 'lib/bupa-corporate-events';

export type BupaCorporateHeaderProps = ComponentProps & {
  fields?: {
    Logo?: ImageField;
  };
  params: { [key: string]: string };
};

function CorporateLogo({ logoField }: { logoField?: ImageField }): JSX.Element {
  return (
    <a href="/" className="inline-flex items-center no-underline">
      <SitecoreImage
        field={logoField}
        className="h-14 w-auto object-contain md:h-16"
        alt={logoField?.value?.alt || 'Bupa'}
      />
    </a>
  );
}

export const Default = (props: BupaCorporateHeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles: paramStyles, DynamicPlaceholderId } = props.params;

  const [megaNavDesktopOpen, setMegaNavDesktopOpen] = useState(false);
  const [utilityBarVisible, setUtilityBarVisible] = useState(true);

  useEffect(() => {
    const onMega = (e: Event): void => {
      const detail = (e as CustomEvent<BupaCorporateNavMegaDetail>).detail;
      setMegaNavDesktopOpen(Boolean(detail?.open));
    };
    window.addEventListener(BUPA_CORPORATE_NAV_MEGA_CHANGE, onMega);
    return () => window.removeEventListener(BUPA_CORPORATE_NAV_MEGA_CHANGE, onMega);
  }, []);

  useEffect(() => {
    const TOP_THRESHOLD_PX = 40;
    const onScroll = (): void => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const viewport = window.innerHeight || 0;
      if (y <= TOP_THRESHOLD_PX) {
        setUtilityBarVisible(true);
      } else if (viewport > 0 && y > viewport) {
        setUtilityBarVisible(false);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoSrc = extractMediaUrl(props.params.Logo);
  const logoField: ImageField | undefined =
    props.fields?.Logo?.value?.src || props.fields?.Logo?.value?.srcset
      ? props.fields.Logo
      : logoSrc
        ? { value: { src: logoSrc, alt: 'Bupa' } }
        : undefined;
  const suffix = DynamicPlaceholderId ?? '1';
  const utilityPh = `bupa-corporate-header-utility-${suffix}`;
  const navPh = `bupa-corporate-header-nav-${suffix}`;

  return (
    <header
      key={id ?? props.rendering?.uid}
      className={`component bupa-corporate-header sticky top-0 z-100 box-border w-full ${paramStyles || ''}`.trim()}
      id={id}
      data-bupa-mega-open={megaNavDesktopOpen ? 'true' : 'false'}
    >
      {/* Desktop */}
      <div className="hidden w-full lg:block">
        <div
          className={[
            'overflow-hidden border-b border-white/10 bg-[#323237] transition-[max-height,opacity] duration-300 ease-out',
            utilityBarVisible
              ? 'max-h-20 opacity-100'
              : 'pointer-events-none max-h-0 border-transparent opacity-0',
          ].join(' ')}
          aria-hidden={!utilityBarVisible}
        >
          <div className="mx-auto flex max-w-[min(100rem,100vw)] items-center justify-end px-6 py-1.5 text-[0.875rem] font-medium text-white/90">
            <div className="flex min-w-0 items-center">
              <Placeholder name={utilityPh} rendering={props.rendering} />
            </div>
          </div>
        </div>

        <div
          className={[
            'transition-[background-color,box-shadow,backdrop-filter] duration-200',
            megaNavDesktopOpen
              ? 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]'
              : 'bg-[rgba(0,0,0,0.58)] backdrop-blur-md',
          ].join(' ')}
        >
          <div className="mx-auto flex max-w-[min(100rem,100vw)] items-center gap-8 px-6 py-4 xl:gap-12">
            <CorporateLogo logoField={logoField} />
            <div className="min-w-0 flex-1">
              <Placeholder name={navPh} rendering={props.rendering} />
            </div>
            <button
              type="button"
              aria-label="Search"
              className={[
                'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition',
                megaNavDesktopOpen
                  ? 'text-[#30343c] hover:bg-black/5'
                  : 'text-white hover:bg-white/10',
              ].join(' ')}
            >
              <Search className="h-5 w-5 stroke-[1.8]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between gap-3 border-b border-[#cfd4db] bg-[#eff1f4] px-4 py-2.5 lg:hidden">
        <CorporateLogo logoField={logoField} />

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[#30343c] hover:bg-black/5"
          >
            <Search className="h-7 w-7 stroke-[1.7]" />
          </button>

          <Drawer direction="left">
            <DrawerTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[#30343c] hover:bg-black/5"
              >
                <Menu className="h-7 w-7 stroke-[1.7]" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-full! max-h-full! w-full! max-w-full! rounded-none border-0 bg-[#0079c8] p-0">
              <div className="flex h-full min-h-dvh flex-col">
                <div className="flex items-center justify-between border-b border-[#cfd4db] bg-[#eff1f4] px-4 py-2.5">
                  <CorporateLogo logoField={logoField} />

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Search"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[#30343c] hover:bg-black/5"
                    >
                      <Search className="h-7 w-7 stroke-[1.7]" />
                    </button>
                    <DrawerClose asChild>
                      <button
                        type="button"
                        aria-label="Close menu"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[#0a4f8a] hover:bg-black/5"
                      >
                        <X className="h-8 w-8 stroke-[1.9]" />
                      </button>
                    </DrawerClose>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-auto">
                  <div className="px-0 py-0">
                    <Placeholder name={navPh} rendering={props.rendering} />
                  </div>
                </div>

                <div className="bg-[#323237] px-4 py-8">
                  <div className="mx-auto max-w-136 border border-white/25 px-5 py-4 text-white">
                    <Placeholder name={utilityPh} rendering={props.rendering} />
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
