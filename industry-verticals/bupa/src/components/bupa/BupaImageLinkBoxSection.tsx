'use client';

import { type JSX } from 'react';
import { TextField, Text, Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * BupaImageLinkBoxSection — “Supporting your health” band with a responsive grid of
 * BupaImageLinkBoxCard renderings (1 col below lg, 3 cols from 1024px, equal row heights).
 *
 * Placeholder: `image-link-box-cards-{DynamicPlaceholderId}`
 */

export interface ImageLinkBoxSectionFields {
  Title: TextField;
}

const defaultFields: ImageLinkBoxSectionFields = {
  Title: { value: 'Supporting your health' },
};

export type ImageLinkBoxSectionProps = ComponentProps & {
  fields: ImageLinkBoxSectionFields;
};

export const Default = (props: ImageLinkBoxSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  const phCards = `image-link-box-cards-${DynamicPlaceholderId}`;

  return (
    <section
      key={id ?? props.rendering?.uid}
      className={`component image-link-box-section bg-[#f0f2f5] py-10 lg:py-14 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <h2 className="mx-auto mb-8 max-w-4xl text-center text-2xl leading-tight font-bold tracking-tight text-[#1a1a1a] md:mb-10 md:text-3xl lg:mb-12 lg:text-4xl">
          <Text field={fields.Title} />
        </h2>

        <div className="image-link-box-grid grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 [&>.image-link-box-ph>*]:h-full [&>.image-link-box-ph>*]:min-h-0 [&>.image-link-box-ph>*]:min-w-0">
          <div className="image-link-box-ph contents">
            <Placeholder name={phCards} rendering={props.rendering} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .image-link-box-grid > :global(.image-link-box-ph) > :global(code.scpm) {
          display: contents;
        }
      `}</style>
    </section>
  );
};
