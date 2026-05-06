'use client';

import type { JSX } from 'react';
import {
  TextField,
  ImageField,
  LinkField,
  RichTextField,
  Text,
  Link as SitecoreLink,
  RichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface BupaCorporateStatsSectionFields {
  Eyebrow: TextField;
  Title: TextField;
  Body: RichTextField;
  Cta: LinkField;
  BackgroundImage: ImageField;
  Stat1Value: TextField;
  Stat1Description: TextField;
  Stat2Value: TextField;
  Stat2Description: TextField;
  Stat3Value: TextField;
  Stat3Description: TextField;
}

const defaultFields: BupaCorporateStatsSectionFields = {
  Eyebrow: { value: 'Creating a' },
  Title: { value: 'Better World' },
  Body: {
    value: '<p>We are committed to improving global health while caring for our planet.</p>',
  },
  Cta: { value: { href: '#', text: 'View our strategy' } },
  BackgroundImage: { value: { src: '', alt: '' } },
  Stat1Value: { value: '2040' },
  Stat1Description: { value: 'Our Net Zero target for a healthy future.' },
  Stat2Value: { value: '500' },
  Stat2Description: { value: 'Innovation start-ups engaged by 2025.' },
  Stat3Value: { value: '1m' },
  Stat3Description: { value: 'People supported by 2025.' },
};

export type BupaCorporateStatsSectionProps = ComponentProps & {
  fields: BupaCorporateStatsSectionFields;
};

export const Default = (props: BupaCorporateStatsSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;
  const bg = fields.BackgroundImage?.value?.src?.trim();

  const stats = [
    { value: fields.Stat1Value, desc: fields.Stat1Description },
    { value: fields.Stat2Value, desc: fields.Stat2Description },
    { value: fields.Stat3Value, desc: fields.Stat3Description },
  ] as const;

  return (
    <section
      className={`component bupa-corporate-stats-section relative isolate overflow-hidden bg-[#00122b] py-14 text-white lg:py-20 ${styles || ''}`}
      id={id}
    >
      {bg ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `url("${bg.replace(/"/g, '\\"')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          }}
          aria-hidden
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-[#00122b] via-[#00122b]/90 to-[#00122b]/80"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-[min(96rem,calc(100vw-3rem))] gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <Text
            tag="p"
            field={fields.Eyebrow}
            className="m-0 text-sm font-semibold tracking-wide text-white/75"
          />
          <Text
            tag="h2"
            field={fields.Title}
            className="mt-2 text-4xl leading-tight font-bold sm:text-5xl lg:text-[3.25rem]"
          />
          <RichText
            field={fields.Body}
            className="prose prose-invert mt-6 max-w-xl text-base text-white/85"
          />
          <SitecoreLink
            field={fields.Cta}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded bg-[#0079c1] px-8 py-3 text-base font-semibold text-white no-underline hover:bg-[#0065a3]"
          >
            {fields.Cta?.value?.text}
          </SitecoreLink>
        </div>

        <ul className="m-0 flex list-none flex-col gap-8 p-0 lg:justify-center">
          {stats.map((s, i) => (
            <li key={i} className="border-l-2 border-[#0079c1] pl-6">
              <Text
                tag="p"
                field={s.value}
                className="m-0 text-5xl leading-none font-bold sm:text-6xl"
              />
              <Text tag="p" field={s.desc} className="m-0 mt-3 max-w-sm text-base text-white/80" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
