'use client';

import React, { type JSX } from 'react';
import {
  TextField,
  RichTextField,
  LinkField,
  Text,
  RichText,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Badge: TextField;
  PlanName: TextField;
  PlanSubtext: TextField;
  Price: TextField;
  Currency: TextField;
  PriceNote: TextField;
  AdditionalInfo: TextField;
  FeatureHeading: TextField;
  CTAText: TextField;
  CTALink: LinkField;
  Features: RichTextField;
  SecondaryLink: TextField;
  HighlightColor: TextField;
}

type PricingCardProps = ComponentProps & {
  fields: Fields;
};

const defaultFields: Fields = {
  Badge: { value: 'Recommended' },
  PlanName: { value: 'TeamViewer Premium' },
  PlanSubtext: { value: 'For single users' },
  Price: { value: '61.52' },
  Currency: { value: '€' },
  PriceNote: { value: 'per month (billed annually)' },
  AdditionalInfo: { value: 'Additional concurrent connections' },
  FeatureHeading: { value: 'DEX Essentials' },
  CTAText: { value: 'Buy now' },
  CTALink: { value: { href: '#', text: 'Buy now' } },
  Features: {
    value:
      '<ul><li>10 licensed users</li><li>1 concurrent connection (standard)</li><li>Unlimited connections for personal use</li><li>200 managed devices</li><li>Phone support (50 languages)</li></ul>',
  },
  SecondaryLink: { value: 'Support for mobile devices' },
  HighlightColor: { value: '#4051D5' },
};

export const Default = (props: PricingCardProps): JSX.Element => {
  const fields = props.fields || defaultFields;
  const highlightColor = (fields.HighlightColor?.value as string) || '#4051D5';

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '400px',
        width: '100%',
      }}
    >
      {fields.Badge?.value && (
        <div
          style={{
            backgroundColor: highlightColor,
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '700',
            padding: '4px 12px',
            borderRadius: '4px',
            alignSelf: 'flex-start',
            textTransform: 'uppercase',
          }}
        >
          <Text field={fields.Badge} />
        </div>
      )}

      <div>
        <h3
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#001E50',
            marginBottom: '4px',
          }}
        >
          <Text field={fields.PlanName} />
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: '#666666',
          }}
        >
          <Text field={fields.PlanSubtext} />
        </p>
      </div>

      <div
        style={{
          borderTop: '1px solid #e0e0e0',
          borderBottom: '1px solid #e0e0e0',
          padding: '20px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#001E50',
            }}
          >
            <Text field={fields.Currency} />
          </span>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#001E50',
            }}
          >
            <Text field={fields.Price} />
          </span>
        </div>
        <p
          style={{
            fontSize: '12px',
            color: '#666666',
            marginBottom: '4px',
          }}
        >
          <Text field={fields.PriceNote} />
        </p>
        {fields.AdditionalInfo?.value && (
          <div
            style={{
              backgroundColor: '#f0f4ff',
              padding: '12px',
              borderRadius: '4px',
              marginTop: '12px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: '#001E50',
              }}
            >
              <Text field={fields.AdditionalInfo} />
            </p>
          </div>
        )}
      </div>

      {fields.FeatureHeading?.value && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#001E50',
            }}
          >
            <Text field={fields.FeatureHeading} />
          </span>
          <span
            style={{
              backgroundColor: highlightColor,
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '600',
              padding: '2px 8px',
              borderRadius: '12px',
            }}
          >
            NEW
          </span>
        </div>
      )}

      <Link
        field={fields.CTALink}
        style={{
          backgroundColor: highlightColor,
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '600',
          padding: '14px 24px',
          borderRadius: '4px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'block',
          cursor: 'pointer',
          border: 'none',
        }}
      >
        <Text field={fields.CTAText} />
      </Link>

      <div
        style={{
          fontSize: '14px',
          color: '#333333',
          lineHeight: '1.6',
        }}
      >
        <RichText field={fields.Features} />
      </div>

      {fields.SecondaryLink?.value && (
        <div
          style={{
            fontSize: '14px',
            color: highlightColor,
            textDecoration: 'underline',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          <Text field={fields.SecondaryLink} />
        </div>
      )}
    </div>
  );
};
