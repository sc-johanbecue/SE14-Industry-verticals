'use client';

import type { JSX } from 'react';
import { ImageField, Image as SitecoreImage } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Logo: ImageField;
}

const defaultFields: Fields = {
  Logo: { value: { src: '/partner-logo.svg', alt: 'Partner' } },
};

export type LogoCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: LogoCardProps): JSX.Element | null => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  if (!fields.Logo?.value) return null;

  return (
    <div className={`component logo-card ${styles || ''}`} id={id}>
      <div className="flex h-full items-center justify-center p-4">
        <SitecoreImage
          field={fields.Logo}
          className="h-12 w-auto object-contain grayscale transition-all hover:grayscale-0 lg:h-16"
        />
      </div>
    </div>
  );
};
