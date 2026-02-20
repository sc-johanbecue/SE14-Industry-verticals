'use client';

import React, { type JSX } from 'react';
import { TextField, Placeholder, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Heading: TextField;
}

type FAQSectionProps = ComponentProps & {
  fields: Fields;
};

const defaultFields: Fields = {
  Heading: { value: 'Pricing FAQ' },
};

export const Default = (props: FAQSectionProps): JSX.Element => {
  const fields = props.fields || defaultFields;
  const { rendering, params } = props;

  return (
    <section style={{
      backgroundColor: '#ffffff',
      padding: '80px 20px',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#001E50',
          textAlign: 'center',
          marginBottom: '48px',
        }}>
          <Text field={fields.Heading} />
        </h2>

        <div>
          <Placeholder
            name={`faq-cards-${params?.DynamicPlaceholderId || '1'}`}
            rendering={rendering}
          />
        </div>
      </div>
    </section>
  );
};
