'use client';

import React, { type JSX } from 'react';
import { TextField, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Heading: TextField;
  Subheading: TextField;
  Tab1Label: TextField;
  Tab2Label: TextField;
  Tab3Label: TextField;
}

type PricingHeroSectionProps = ComponentProps & {
  fields: Fields;
};

const defaultFields: Fields = {
  Heading: { value: 'Select your license' },
  Subheading: {
    value:
      'Get a discount for your first year with a new TeamViewer Premium or Corporate license purchase',
  },
  Tab1Label: { value: 'For single users' },
  Tab2Label: { value: 'For teams' },
  Tab3Label: { value: 'For enterprise' },
};

export const Default = (props: PricingHeroSectionProps): JSX.Element => {
  const fields = props.fields || defaultFields;

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        padding: '60px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#001E50',
            marginBottom: '16px',
            lineHeight: '1.2',
          }}
        >
          <Text field={fields.Heading} />
        </h1>

        <p
          style={{
            fontSize: '16px',
            color: '#555555',
            marginBottom: '40px',
            maxWidth: '800px',
            margin: '0 auto 40px',
          }}
        >
          <Text field={fields.Subheading} />
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <button
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#001E50',
              backgroundColor: '#ffffff',
              border: '2px solid #001E50',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Text field={fields.Tab1Label} />
          </button>

          <button
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#555555',
              backgroundColor: '#ffffff',
              border: '1px solid #cccccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Text field={fields.Tab2Label} />
          </button>

          <button
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#555555',
              backgroundColor: '#ffffff',
              border: '1px solid #cccccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Text field={fields.Tab3Label} />
          </button>
        </div>
      </div>
    </section>
  );
};
