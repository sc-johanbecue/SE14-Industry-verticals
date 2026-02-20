'use client';

import React, { type JSX } from 'react';
import {
  TextField,
  Text,
  RichText,
  RichTextField,
  Placeholder,
  LinkField,
  Link as SitecoreLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Badge: TextField;
  Description: RichTextField;
  LinkText: TextField;
  Link: LinkField;
}

const defaultFields: Fields = {
  Badge: { value: 'TEAMVIEWER FOR ENTERPRISE' },
  Description: {
    value:
      '<p>Secure, scalable, and flexible. TeamViewer solutions are built for the complex needs of global enterprises.</p>',
  },
  LinkText: { value: 'Learn more' },
  Link: { value: { href: '#enterprise' } },
};

export type EnterpriseFeatureSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: EnterpriseFeatureSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  const phFeatureCards = `enterprise-feature-cards-${DynamicPlaceholderId}`;

  return (
    <section
      className={`component enterprise-feature-section bg-[#001846] py-12 text-white lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold tracking-wide uppercase">
            <Text field={fields.Badge} />
          </div>
          <div className="enterprise-section-description mx-auto max-w-3xl text-lg">
            <RichText field={fields.Description} />
          </div>
        </div>

        {/* Feature Cards Placeholder */}
        <div className="mb-8">
          <Placeholder name={phFeatureCards} rendering={props.rendering} />
        </div>

        {/* Learn More Link */}
        <div className="text-center">
          <SitecoreLink
            field={fields.Link}
            className="inline-flex items-center gap-2 font-semibold text-white hover:underline"
          >
            <Text field={fields.LinkText} />
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </SitecoreLink>
        </div>
      </div>
    </section>
  );
};

