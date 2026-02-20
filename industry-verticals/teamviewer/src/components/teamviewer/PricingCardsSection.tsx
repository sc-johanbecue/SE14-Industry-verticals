'use client';

import React, { type JSX } from 'react';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {}

type PricingCardsSectionProps = ComponentProps & {
  fields?: Fields;
};

export const Default = (props: PricingCardsSectionProps): JSX.Element => {
  const { rendering, params } = props;

  return (
    <section
      style={{
        backgroundColor: '#f8f9fa',
        padding: '60px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            justifyItems: 'center',
          }}
        >
          <Placeholder
            name={`pricing-cards-${params?.DynamicPlaceholderId || '1'}`}
            rendering={rendering}
          />
        </div>
      </div>
    </section>
  );
};

