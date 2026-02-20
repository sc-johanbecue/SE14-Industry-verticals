'use client';

import type { JSX } from 'react';
import {
  TextField,
  Text,
  RichText,
  RichTextField,
  ImageField,
  LinkField,
  Link as SitecoreLink,
  Image as SitecoreImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Heading: TextField;
  Description: RichTextField;
  LinkText: TextField;
  Link: LinkField;
  Image: ImageField;
}

const defaultFields: Fields = {
  Heading: { value: 'IT access and support' },
  Description: {
    value: '<p>Fix issues remotely. Free for personal use.</p>',
  },
  LinkText: { value: 'Learn more' },
  Link: { value: { href: '#' } },
  Image: { value: { src: '/feature-image.jpg', alt: 'Feature' } },
};

export type FeatureCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: FeatureCardProps): JSX.Element | null => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  const hasContent = fields.Heading?.value;
  if (!hasContent) return null;

  return (
    <div className={`component feature-card w-full ${styles || ''}`} id={id}>
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        {/* Content */}
        <div className="flex-1 p-6">
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            <Text field={fields.Heading} />
          </h3>
          <div className="feature-description mb-4 text-sm text-gray-600">
            <RichText field={fields.Description} />
          </div>
          <SitecoreLink
            field={fields.Link}
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            <Text field={fields.LinkText} />
          </SitecoreLink>
        </div>

        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <SitecoreImage field={fields.Image} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
};
