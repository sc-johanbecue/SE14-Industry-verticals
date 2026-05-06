'use client';

import type { JSX } from 'react';
import {
  TextField,
  ImageField,
  Text,
  Placeholder,
  Image as SitecoreImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { BupaCorporateHeroDesktopBgProvider } from '@/components/bupa/corporate/bupa-corporate-hero-desktop-bg-context';

export interface BupaCorporateHeroSectionFields {
  Title: TextField;
  Subtitle: TextField;
  BackgroundImage: ImageField;
  HeaderImage: ImageField;
}

const defaultFields: BupaCorporateHeroSectionFields = {
  Title: { value: 'Section title' },
  Subtitle: { value: 'Supporting line of copy.' },
  BackgroundImage: { value: { src: '', alt: '' } },
  HeaderImage: { value: { src: '', alt: '' } },
};

export type BupaCorporateHeroSectionProps = ComponentProps & {
  fields: BupaCorporateHeroSectionFields;
};

export const Default = (props: BupaCorporateHeroSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles: paramStyles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;
  const ph = `bupa-corporate-hero-cards-${DynamicPlaceholderId ?? '1'}`;

  const desktopSrc = fields.BackgroundImage?.value?.src?.trim(); // full-bleed bg desktop
  const headerSrc = fields.HeaderImage?.value?.src?.trim();
  const hasMobileHeader = Boolean(headerSrc);
  return (
    <section
      key={id ?? props.rendering?.uid}
      className={[
        'component bupa-corporate-hero-section relative isolate z-0 box-border w-full',
        'bg-[#001a3d] px-4 pt-6 pb-8 sm:px-6 lg:px-8 lg:pt-10 lg:pb-12',
        paramStyles || '',
      ]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        style={
          desktopSrc
            ? {
                backgroundImage: `url("${desktopSrc.replace(/"/g, '\\"')}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }
            : undefined
        }
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden bg-[#00122b]/85 lg:block"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[min(96rem,calc(100vw-2rem))] flex-col gap-6 lg:gap-8">
        {hasMobileHeader ? (
          <div className="w-full min-w-0 overflow-hidden rounded-2xl lg:hidden">
            <SitecoreImage
              field={fields.HeaderImage}
              className="block aspect-4/3 w-full object-cover"
            />
          </div>
        ) : null}

        <div
          className={[
            'relative rounded-2xl border border-white/15 bg-white/10 px-5 py-6 shadow-lg backdrop-blur-md sm:px-7 sm:py-8',
            'lg:rounded-[1.75rem] lg:px-10 lg:py-8',
            hasMobileHeader ? '-mt-8 sm:-mt-10 lg:mt-0' : '',
          ].join(' ')}
        >
          <Text
            tag="h1"
            field={fields.Title}
            className="m-0 text-[1.75rem] leading-tight font-bold tracking-tight text-white sm:text-[2rem] lg:text-[2.35rem]"
          />
          <Text
            tag="p"
            field={fields.Subtitle}
            className="mt-3 max-w-3xl text-base leading-snug text-white/88 sm:text-[1.0625rem] lg:mt-4"
          />
        </div>

        <div
          className={[
            'rounded-2xl px-3 py-5 sm:px-5 sm:py-6',
            'lg:rounded-[1.75rem] lg:bg-[#e4e8ef] lg:px-6 lg:py-7 lg:shadow-[0_8px_28px_rgba(0,0,0,0.16)]',
          ].join(' ')}
        >
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            <BupaCorporateHeroDesktopBgProvider value>
              <Placeholder name={ph} rendering={props.rendering} />
            </BupaCorporateHeroDesktopBgProvider>
          </div>
        </div>
      </div>
    </section>
  );
};
