'use client';

import type { JSX } from 'react';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export type BupaCorporateCardSectionProps = ComponentProps & {
  fields?: Record<string, unknown>;
};

export const Default = (props: BupaCorporateCardSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles, DynamicPlaceholderId } = props.params;
  const dph = DynamicPlaceholderId ?? '5';
  const ph = `bupa-corporate-cards-${dph}`;

  return (
    <section
      className={`component bupa-corporate-card-section bg-[#00335b] px-6 py-12 md:px-8 md:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:gap-8">
        <Placeholder name={ph} rendering={props.rendering} />
      </div>
    </section>
  );
};
