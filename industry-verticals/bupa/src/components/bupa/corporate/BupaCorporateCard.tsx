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

export interface BupaCorporateCardFields {
  Heading: TextField;
  Body: RichTextField;
  Cta: LinkField;
  Image: ImageField;
  /** Single-line: `image` | `collage` | `solid` */
  HeaderLayout: TextField;
}

const defaultFields: BupaCorporateCardFields = {
  Heading: { value: 'Bupa Group Annual Report and Accounts 2025' },
  Body: { value: '<p>We have published our 2025 Annual Report and Accounts.</p>' },
  Cta: { value: { href: '#', text: 'Download the report' } },
  Image: { value: { src: '', alt: '' } },
  HeaderLayout: { value: 'image' },
};

export type BupaCorporateCardProps = ComponentProps & {
  fields: BupaCorporateCardFields;
};

const contentPanelClass =
  'flex min-h-[260px] flex-1 flex-col justify-between overflow-hidden bg-[linear-gradient(180deg,transparent_0%,#4a8fb0_32%,#2B5D77_100%)] px-8 py-9 text-white md:min-h-[280px] md:px-10 md:py-10 lg:min-h-[300px]';

export const Default = (props: BupaCorporateCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  const headerImage = (
    <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-t-2xl md:h-auto md:min-h-[280px] md:w-[min(44%,480px)] md:rounded-t-none md:rounded-l-2xl md:rounded-r-none">
      <SitecoreImage
        field={fields.Image}
        className="h-full w-full rounded-t-2xl object-cover md:rounded-l-2xl"
        alt={fields.Image?.value?.alt ?? ''}
      />
    </div>
  );

  const bodyBlock = (
    <div
      className={`${contentPanelClass} rounded-b-2xl md:rounded-l-none md:rounded-r-2xl md:rounded-b-none`}
    >
      <div className="min-w-0 space-y-4 md:space-y-5">
        <Text
          tag="h3"
          field={fields.Heading}
          className="m-0 text-[1.375rem] leading-snug font-bold tracking-tight text-white md:text-[1.65rem] md:leading-tight"
        />
        <RichText
          field={fields.Body}
          className="m-0 max-w-none text-[0.9375rem] leading-relaxed text-white/95 [&_p]:m-0 [&_p+p]:mt-3"
        />
      </div>
      <div className="mt-8 md:mt-10">
        <SitecoreLink
          field={fields.Cta}
          className="inline-flex items-center gap-1 text-base font-normal text-[#009ee0] no-underline transition-colors hover:text-white"
        >
          <span>{fields.Cta?.value?.text}</span>
          <span aria-hidden="true" className="translate-y-px">
            &gt;
          </span>
        </SitecoreLink>
      </div>
    </div>
  );

  return (
    <article
      className={`component bupa-corporate-card isolate flex flex-col overflow-hidden shadow-sm ring-1 ring-black/5 md:flex-row ${styles || ''}`}
      id={id}
    >
      {headerImage}
      {bodyBlock}
    </article>
  );
};
