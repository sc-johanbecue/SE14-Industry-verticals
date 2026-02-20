'use client';

import type { JSX } from 'react';
import { RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Quote: RichTextField;
}

const defaultFields: Fields = {
  Quote: {
    value: '<p>Beyondsoft uses TeamViewer to strengthen its global aftercare support.</p>',
  },
};

export type TestimonialCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: TestimonialCardProps): JSX.Element | null => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  const hasContent = fields.Quote?.value;
  if (!hasContent) return null;

  return (
    <div className={`component testimonial-card w-full ${styles || ''}`} id={id}>
      <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 lg:p-8">
        <div className="testimonial-quote text-base text-gray-700 lg:text-lg">
          <RichText field={fields.Quote} />
        </div>
      </div>
    </div>
  );
};
