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
export interface BupaCorporateHorizontalFeatureFields {
  Heading: TextField;
  Body: RichTextField;
  Cta: LinkField;
  Image: ImageField;
}

const defaultFields: BupaCorporateHorizontalFeatureFields = {
  Heading: { value: 'Bupa Group Annual Report and Accounts 2023' },
  Body: {
    value: '<p>Our performance, governance, and outlook.</p>',
  },
  Cta: { value: { href: '#', text: 'Read the full report' } },
  Image: { value: { src: '', alt: '' } },
};

export type BupaCorporateHorizontalFeatureProps = ComponentProps & {
  fields: BupaCorporateHorizontalFeatureFields;
};

export const Default = (props: BupaCorporateHorizontalFeatureProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <section
      className={`component bupa-corporate-horizontal-feature bg-[#0b3d7a] py-6 text-white sm:py-8 lg:py-0 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-[min(96rem,calc(100vw-3rem))]">
        <div className="grid grid-cols-1 overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10 lg:min-h-[18rem] lg:grid-cols-2">
          <div className="relative min-h-48 bg-[#2563aa] lg:order-1 lg:min-h-full">
            <SitecoreImage
              field={fields.Image}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 bg-[#1e5aa0] px-6 py-8 sm:px-8 lg:order-2 lg:py-10">
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
              {fields.Cta?.value?.text}
              <span aria-hidden>→</span>
            </SitecoreLink>
          </div>
        </div>
      </div>
    </section>
  );
};
