'use client';

import type { JSX } from 'react';
import {
  TextField,
  ImageField,
  LinkField,
  Text,
  Image as SitecoreImage,
  Link as SitecoreLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface BupaCorporateThinkingCardFields {
  Title: TextField;
  Cta: LinkField;
  Image: ImageField;
  /** One tag per line, or separate with | */
  Tags: TextField;
}

function parseTags(raw: TextField | undefined): string[] {
  const v = String(raw?.value ?? '').trim();
  if (!v) return [];
  return v
    .split(/\r?\n|\|/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

const defaultFields: BupaCorporateThinkingCardFields = {
  Title: { value: 'Bupa announces sponsorship of Women of the Future: 50 Rising Stars in ESG.' },
  Cta: { value: { href: '#', text: 'Read the press release' } },
  Image: { value: { src: '', alt: '' } },
  Tags: { value: 'Working at Bupa|Sustainability|Partnerships' },
};

export type BupaCorporateThinkingCardProps = ComponentProps & {
  fields: BupaCorporateThinkingCardFields;
};

export const Default = (props: BupaCorporateThinkingCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;
  const tags = parseTags(fields.Tags);
  const ctaHref = fields.Cta?.value?.href?.trim();
  const hasCta = Boolean(ctaHref && ctaHref !== '#');

  const bodyBlock = (
    <div className="flex flex-1 flex-col gap-5 px-6 pt-7 pb-6 sm:px-7 sm:pt-8 sm:pb-7">
      <Text
        tag="h3"
        field={fields.Title}
        className="m-0 text-[1.0625rem] leading-snug font-bold tracking-tight text-white sm:text-lg sm:leading-snug"
      />
      <ul className="flex flex-wrap gap-2">
        {tags.map((label) => (
          <li key={label}>
            <span className="inline-block rounded-full bg-[#2f6fad] px-3 py-1.5 text-xs leading-none font-medium text-white">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const mediaHeader = (
    <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-[#00152e]">
      <SitecoreImage
        field={fields.Image}
        className="h-full w-full object-cover"
        alt={fields.Image?.value?.alt ?? ''}
      />
    </div>
  );

  return (
    <article
      data-thinking-card
      className={[
        'component bupa-corporate-thinking-card group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-[#061f42] shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
        styles || '',
        // Sitecore often adds col-12 via GridParameters — that forces one card per row. Reset inside the thinking 3-up layout (parent sets md:grid).
        'min-w-0 md:col-span-1! md:w-full md:max-w-none',
      ]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      {hasCta ? (
        <SitecoreLink
          field={fields.Cta}
          className="flex min-h-0 flex-1 flex-col text-inherit no-underline outline-offset-4 focus-visible:outline-2 focus-visible:outline-white/80"
          aria-label={String(fields.Cta?.value?.text || fields.Title?.value || 'Read more')}
        >
          {mediaHeader}
          {bodyBlock}
        </SitecoreLink>
      ) : (
        <>
          {mediaHeader}
          {bodyBlock}
        </>
      )}
    </article>
  );
};
