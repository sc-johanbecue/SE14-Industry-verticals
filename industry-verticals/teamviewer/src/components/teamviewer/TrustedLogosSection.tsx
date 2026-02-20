'use client';

import React, { type JSX } from 'react';
import { TextField, Text, Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Heading: TextField;
}

const defaultFields: Fields = {
  Heading: { value: 'Trusted by 7 teams around the world' },
};

export type TrustedLogosSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: TrustedLogosSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  const phLogos = `trusted-logos-${DynamicPlaceholderId}`;

  return (
    <section
      className={`component trusted-logos-section bg-white py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-lg font-semibold text-gray-600 lg:mb-12">
          <Text field={fields.Heading} />
        </h2>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <Placeholder name={phLogos} rendering={props.rendering} />
        </div>
      </div>
    </section>
  );
};
