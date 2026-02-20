'use client';

import React, { type JSX } from 'react';
import {
  TextField,
  Text,
  Placeholder,
  LinkField,
  Link as SitecoreLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Heading: TextField;
  LinkText: TextField;
  Link: LinkField;
}

const defaultFields: Fields = {
  Heading: { value: 'Integrated into your systems' },
  LinkText: { value: 'View all integrations' },
  Link: { value: { href: '#integrations' } },
};

export type IntegrationsSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: IntegrationsSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  const phIntegrationLogos = `integration-logos-${DynamicPlaceholderId}`;

  return (
    <section
      className={`component integrations-section bg-gray-50 py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 lg:mb-12 lg:text-3xl">
          <Text field={fields.Heading} />
        </h2>

        {/* Integration Logos */}
        <div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
          <Placeholder name={phIntegrationLogos} rendering={props.rendering} />
        </div>

        {/* View All Link */}
        <div className="text-center">
          <SitecoreLink
            field={fields.Link}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
          >
            <Text field={fields.LinkText} />
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </SitecoreLink>
        </div>
      </div>
    </section>
  );
};
