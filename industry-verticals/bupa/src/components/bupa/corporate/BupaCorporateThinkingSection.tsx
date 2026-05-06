'use client';

import type { JSX } from 'react';
import { TextField, Text, Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface BupaCorporateThinkingSectionFields {
  TitlePrefix: TextField;
  TitleHighlight: TextField;
}

const defaultFields: BupaCorporateThinkingSectionFields = {
  TitlePrefix: { value: 'Our latest' },
  TitleHighlight: { value: 'Thinking' },
};

export type BupaCorporateThinkingSectionProps = ComponentProps & {
  fields: BupaCorporateThinkingSectionFields;
};

export const Default = (props: BupaCorporateThinkingSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;
  const ph = `bupa-corporate-thinking-cards-${DynamicPlaceholderId ?? '1'}`;

  return (
    <section
      className={`component bupa-corporate-thinking-section bg-[#00122b] px-6 py-14 text-white lg:py-18 ${styles || ''}`}
      id={id}
    >
      <h2 className="mx-auto mb-10 max-w-4xl text-center text-3xl font-bold sm:text-4xl lg:mb-14">
        <Text tag="span" field={fields.TitlePrefix} className="text-white/90" />{' '}
        <Text tag="span" field={fields.TitleHighlight} className="text-white" />
      </h2>

      <div className="mx-auto grid max-w-[min(96rem,calc(100vw-3rem))] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <Placeholder name={ph} rendering={props.rendering} />
      </div>
    </section>
  );
};
