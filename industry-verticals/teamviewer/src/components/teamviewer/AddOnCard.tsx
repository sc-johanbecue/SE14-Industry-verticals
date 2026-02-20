'use client';

import React, { JSX } from 'react';
import {
  TextField,
  RichTextField,
  ImageField,
  Text,
  RichText,
  Link as JssLink,
  LinkField,
  Image as JssImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  badge: TextField;
  image: ImageField;
  heading: TextField;
  description: RichTextField;
  features: RichTextField;
  ctaText: TextField;
  ctaLink: LinkField;
  backgroundColor: TextField;
}

const defaultFields: Fields = {
  badge: { value: 'ADD-ON TO PREMIUM' },
  image: {
    value: {
      src: 'https://via.placeholder.com/200x120',
      alt: 'Add-on illustration',
    },
  },
  heading: { value: 'Asset Management' },
  description: {
    value:
      'Provision and manage single device, assets and warranties across your network. Benefit from:',
  },
  features: {
    value: `
      <ul>
        <li>Asset management and dashboards</li>
        <li>Asset discovery and inventory</li>
        <li>Remote management and provisioning</li>
        <li>In-depth insights and reporting</li>
      </ul>
    `,
  },
  ctaText: { value: 'Learn more' },
  ctaLink: { value: { href: '#' } },
  backgroundColor: { value: '#f0fdf4' },
};

export type AddOnCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: AddOnCardProps): JSX.Element => {
  const fields = props.fields || defaultFields;
  const bgColor = fields.backgroundColor?.value || '#f0fdf4';

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {fields.badge?.value && (
        <div
          style={{
            backgroundColor: '#10b981',
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: '700',
            padding: '0.5rem 1rem',
            textAlign: 'center',
          }}
        >
          <Text field={fields.badge} />
        </div>
      )}

      <div
        style={{
          backgroundColor: bgColor as string,
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '150px',
        }}
      >
        <JssImage field={fields.image} style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      <div
        style={{
          padding: '1.5rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#001840',
            marginBottom: '0.75rem',
          }}
        >
          <Text field={fields.heading} />
        </h3>

        <p
          style={{
            fontSize: '0.875rem',
            color: '#5a6c7d',
            marginBottom: '1rem',
            lineHeight: '1.6',
          }}
        >
          <Text field={fields.description} />
        </p>

        <div
          style={{
            fontSize: '0.875rem',
            color: '#001840',
            marginBottom: '1.5rem',
          }}
        >
          <RichText field={fields.features} />
        </div>

        <JssLink
          field={fields.ctaLink}
          style={{
            color: '#3251FF',
            fontSize: '0.875rem',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: 'auto',
          }}
        >
          <Text field={fields.ctaText} />
          <span>→</span>
        </JssLink>
      </div>
    </div>
  );
}
