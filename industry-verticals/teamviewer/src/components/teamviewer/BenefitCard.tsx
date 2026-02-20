'use client';

import type { JSX } from 'react';
import {
  TextField,
  Text,
  RichText,
  RichTextField,
  ImageField,
  Image as SitecoreImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Icon: ImageField;
  Heading: TextField;
  Description: RichTextField;
}

const defaultFields: Fields = {
  Icon: { value: { src: '/icon-visibility.svg', alt: 'Real-time visibility' } },
  Heading: { value: 'Real-time visibility' },
  Description: {
    value: '<p>Monitor your IT environment and historical data.</p>',
  },
};

export type BenefitCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: BenefitCardProps): JSX.Element | null => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  const hasContent = fields.Heading?.value;
  if (!hasContent) return null;

  return (
    <div className={`component benefit-card w-full ${styles || ''}`} id={id}>
      <div className="flex h-full flex-col items-center rounded-lg bg-white p-6 text-center">
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          <SitecoreImage field={fields.Icon} className="h-12 w-12 object-contain" />
        </div>

        {/* Heading */}
        <h3 className="mb-3 text-xl font-bold text-gray-900">
          <Text field={fields.Heading} />
        </h3>

        {/* Description */}
        <div className="benefit-description text-sm leading-relaxed text-gray-600">
          <RichText field={fields.Description} />
        </div>
      </div>
    </div>
  );
};

