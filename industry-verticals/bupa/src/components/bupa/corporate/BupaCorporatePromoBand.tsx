'use client';

import type { JSX } from 'react';
import { TextField, LinkField, Text, Link as SitecoreLink } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface BupaCorporatePromoBandFields {
  Title: TextField;
  Tagline: TextField;
  Cta: LinkField;
}

const defaultFields: BupaCorporatePromoBandFields = {
  Title: { value: 'blua.' },
  Tagline: { value: 'Digital health by Bupa' },
  Cta: { value: { href: '#', text: 'Learn more about Blua' } },
};

export type BupaCorporatePromoBandProps = ComponentProps & {
  fields: BupaCorporatePromoBandFields;
};

export const Default = (props: BupaCorporatePromoBandProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <section
      className={`component bupa-corporate-promo-band bg-[#00122b] px-6 py-12 text-center text-white lg:py-14 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4">
        <Text
          tag="p"
          field={fields.Title}
          className="m-0 text-5xl font-semibold tracking-tight sm:text-6xl"
        />
        <Text tag="p" field={fields.Tagline} className="m-0 text-lg text-white/85 sm:text-xl" />
        <SitecoreLink
          field={fields.Cta}
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded bg-[#0079c1] px-8 py-3 text-base font-semibold text-white no-underline transition hover:bg-[#0065a3]"
        >
          {fields.Cta?.value?.text}
        </SitecoreLink>
      </div>
    </section>
  );
};
