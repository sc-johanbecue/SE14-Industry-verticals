'use client';

import type { JSX } from 'react';
import {
  TextField,
  LinkField,
  RichTextField,
  Text,
  Link as SitecoreLink,
  RichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/** Two-column strip: large label on the left, summary + CTA on the right (financial update pattern). */
export interface BupaCorporateFinancialStripFields {
  LeftTitle: TextField;
  Heading: TextField;
  Body: RichTextField;
  Cta: LinkField;
}

const defaultFields: BupaCorporateFinancialStripFields = {
  LeftTitle: { value: 'Financial update' },
  Heading: { value: 'Bupa Group full year results for 2023' },
  Body: { value: '<p>Summary of our annual performance.</p>' },
  Cta: { value: { href: '#', text: 'Read the full announcement' } },
};

export type BupaCorporateFinancialStripProps = ComponentProps & {
  fields: BupaCorporateFinancialStripFields;
};

export const Default = (props: BupaCorporateFinancialStripProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <section
      className={`component bupa-corporate-financial-strip bg-[#0a2347] py-6 text-white sm:py-8 lg:py-0 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-[min(96rem,calc(100vw-3rem))]">
        <div className="grid overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10 lg:min-h-[18rem] lg:grid-cols-2">
          <div className="flex items-center bg-[#001a3d] px-6 py-8 sm:px-8 lg:px-10">
            <Text
              tag="p"
              field={fields.LeftTitle}
              className="m-0 text-3xl leading-tight font-bold sm:text-4xl lg:max-w-xs"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 bg-[#1e5aa0] px-6 py-8 sm:px-8 lg:py-10">
            <Text
              tag="h3"
              field={fields.Heading}
              className="m-0 text-xl leading-snug font-bold sm:text-2xl"
            />
            <RichText
              field={fields.Body}
              className="prose prose-invert prose-sm max-w-none text-white/90"
            />
            <SitecoreLink
              field={fields.Cta}
              className="mt-2 inline-flex items-center gap-2 self-start font-semibold text-white no-underline hover:underline"
            >
              {fields.Cta?.value?.text}→
            </SitecoreLink>
          </div>
        </div>
      </div>
    </section>
  );
};
