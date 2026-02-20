'use client';

import React, { type JSX } from 'react';
import {
  TextField,
  Text,
  RichText,
  RichTextField,
  LinkField,
  Link as SitecoreLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Heading: TextField;
  Description: RichTextField;
  ButtonText: TextField;
  ButtonLink: LinkField;
}

const defaultFields: Fields = {
  Heading: { value: "Let's find the right solution for your business" },
  Description: {
    value:
      '<p>Connect with one of our customer success specialists and start defining your TeamViewer setup.</p>',
  },
  ButtonText: { value: 'Get in touch' },
  ButtonLink: { value: { href: '#contact' } },
};

export type CTASectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: CTASectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <section
      className={`component cta-section bg-linear-to-r from-blue-600 to-blue-700 py-16 text-white lg:py-20 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
          <Text field={fields.Heading} />
        </h2>

        <div className="cta-description mb-8 text-lg lg:text-xl">
          <RichText field={fields.Description} />
        </div>

        <SitecoreLink
          field={fields.ButtonLink}
          className="inline-flex items-center justify-center rounded-md bg-white px-8 py-4 text-base font-semibold text-blue-600 hover:bg-gray-100"
        >
          <Text field={fields.ButtonText} />
        </SitecoreLink>
      </div>
    </section>
  );
};
