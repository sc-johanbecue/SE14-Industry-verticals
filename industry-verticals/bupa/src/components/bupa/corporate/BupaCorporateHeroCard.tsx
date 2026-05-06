'use client';

import type { JSX } from 'react';
import {
  TextField,
  ImageField,
  LinkField,
  RichTextField,
  Text,
  Image as SitecoreImage,
  Link as SitecoreLink,
  RichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { useBupaCorporateHeroDesktopBg } from '@/components/bupa/corporate/bupa-corporate-hero-desktop-bg-context';

export interface BupaCorporateHeroCardFields {
  Image: ImageField;
  Heading: TextField;
  Description: RichTextField;
  Cta: LinkField;
}

const defaultFields: BupaCorporateHeroCardFields = {
  Image: { value: { src: '', alt: '' } },
  Heading: { value: 'Card heading' },
  Description: { value: '<p>Short supporting description.</p>' },
  Cta: { value: { href: '#', text: 'Learn more' } },
};

export type BupaCorporateHeroCardProps = ComponentProps & {
  fields: BupaCorporateHeroCardFields;
};

export const Default = (props: BupaCorporateHeroCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles: paramStyles } = props.params;
  const fields = props.fields || defaultFields;
  const inTray = useBupaCorporateHeroDesktopBg();

  return (
    <div
      key={id ?? props.rendering?.uid}
      className={`component bupa-corporate-hero-card w-full min-w-0 ${paramStyles || ''}`.trim()}
      id={id}
    >
      <article
        className={
          inTray
            ? 'flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 lg:flex-row lg:items-center'
            : 'flex w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] lg:flex-row'
        }
      >
        <div
          className={
            inTray
              ? 'relative aspect-16/10 w-full shrink-0 overflow-hidden bg-[#dbe3eb] lg:aspect-4/3 lg:w-44 lg:rounded-l-xl'
              : 'relative aspect-16/10 w-full shrink-0 overflow-hidden bg-[#dbe3eb] lg:w-[42%]'
          }
        >
          <SitecoreImage
            field={fields.Image}
            className="block h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3 px-5 py-5 sm:px-6 sm:py-6 lg:py-5">
          <Text
            tag="h2"
            field={fields.Heading}
            className="m-0 text-lg font-bold text-[#00205b] sm:text-xl"
          />
          <RichText
            field={fields.Description}
            className="prose prose-sm max-w-none text-[#3d4450] [&_a]:text-[#0079c1]"
          />
          <div className="mt-auto pt-1">
            <SitecoreLink
              field={fields.Cta}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0079c1] no-underline hover:underline"
            >
              {fields.Cta?.value?.text}
            </SitecoreLink>
          </div>
        </div>
      </article>
    </div>
  );
};
