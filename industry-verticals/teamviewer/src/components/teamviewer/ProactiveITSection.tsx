'use client';

import React, { type JSX } from 'react';
import { TextField, Text, Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Heading: TextField;
}

const defaultFields: Fields = {
  Heading: { value: 'The pinnacle of proactive IT' },
};

export type ProactiveITSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: ProactiveITSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  const phBenefitCards = `benefit-cards-${DynamicPlaceholderId}`;

  return (
    <section
      className={`component proactive-it-section bg-gray-50 py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 lg:text-3xl">
          <Text field={fields.Heading} />
        </h2>

        {/* Benefits Grid - 3 columns on desktop */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Placeholder name={phBenefitCards} rendering={props.rendering} />
        </div>
      </div>
    </section>
  );
};
