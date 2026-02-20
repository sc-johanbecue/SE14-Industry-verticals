'use client';

import React, { type JSX } from 'react';
import { TextField, Text, Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Heading: TextField;
}

const defaultFields: Fields = {
  Heading: { value: 'Industry leaders win with TeamViewer' },
};

export type IndustryLeadersSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: IndustryLeadersSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  const phTestimonials = `testimonials-${DynamicPlaceholderId}`;

  return (
    <section
      className={`component industry-leaders-section bg-white py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 lg:text-3xl">
          <Text field={fields.Heading} />
        </h2>

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Placeholder name={phTestimonials} rendering={props.rendering} />
        </div>

        {/* Discover More Button */}
        <div className="mt-8 text-center">
          <button className="rounded-md border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:border-gray-400">
            Discover more
          </button>
        </div>
      </div>
    </section>
  );
};

