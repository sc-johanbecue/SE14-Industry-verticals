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

export interface BupaCorporateThinkingCardFields {
  Eyebrow: TextField;
  Title: TextField;
  Body: RichTextField;
  Cta: LinkField;
  Image: ImageField;
}

const defaultFields: BupaCorporateThinkingCardFields = {
  Eyebrow: { value: 'Press release' },
  Title: { value: 'Bupa announces sponsorship of Women of the Future: 50 Rising Stars in ESG.' },
  Body: { value: '' },
  Cta: { value: { href: '#', text: 'Read the press release' } },
  Image: { value: { src: '', alt: '' } },
};

export type BupaCorporateThinkingCardProps = ComponentProps & {
  fields: BupaCorporateThinkingCardFields;
};

export const Default = (props: BupaCorporateThinkingCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;
  const imgSrc = fields.Image?.value?.src?.trim();

  return (
    <article
      className={`component bupa-corporate-thinking-card flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-[#001a3d] ring-1 ring-white/10 ${styles || ''}`}
      id={id}
    >
      {imgSrc ? (
        <div className="relative aspect-[16/11] w-full shrink-0 bg-black/20">
          <SitecoreImage field={fields.Image} className="h-full w-full object-cover" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 px-6 py-6 sm:px-7 sm:py-7">
        <Text
          tag="p"
          field={fields.Eyebrow}
          className="m-0 text-xs font-semibold tracking-wide text-[#7eb8e3] uppercase"
        />
        <Text
          tag="h3"
          field={fields.Title}
          className="m-0 text-lg leading-snug font-bold text-white sm:text-xl"
        />
        {fields.Body?.value ? (
          <RichText
            field={fields.Body}
            className="prose prose-invert prose-sm flex-1 text-white/85"
          />
        ) : null}
        <SitecoreLink
          field={fields.Cta}
          className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-white no-underline hover:underline"
        >
          {fields.Cta?.value?.text}
          <span aria-hidden>→</span>
        </SitecoreLink>
      </div>
    </article>
  );
};
