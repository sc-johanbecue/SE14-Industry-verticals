'use client';

import { ComponentProps, TextField, RichTextField, ImageField, LinkField, Text, RichText, SitecoreImage, Link } from '@sitecore-content-sdk/nextjs';

interface Fields {
  Badge: TextField;
  Image: ImageField;
  Heading: TextField;
  Description: RichTextField;
  Features: RichTextField;
  CTAText: TextField;
  CTALink: LinkField;
  BackgroundColor: TextField;
}

type AddOnCardProps = ComponentProps & {
  fields: Fields;
};

const defaultFields: Fields = {
  Badge: { value: 'All-add-on Bundle' },
  Image: { value: { src: '', alt: '' } },
  Heading: { value: 'Asset Management' },
  Description: { value: '<p>Discover and manage single device, endpoints, and network assets and ensure your teams have access to the most recent Benefit from</p>' },
  Features: { 
    value: '<ul><li>Asset discovery and inventory</li><li>Software management and compliance</li><li>In-depth insights and reporting</li></ul>' 
  },
  CTAText: { value: 'Learn more' },
  CTALink: { value: { href: '#', text: 'Learn more' } },
  BackgroundColor: { value: '#e8f5e9' },
};

export const Default = (props: AddOnCardProps): JSX.Element => {
  const fields = props.fields || defaultFields;
  const backgroundColor = fields.BackgroundColor?.value || '#e8f5e9';

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '380px',
      width: '100%',
    }}>
      {fields.Badge?.value && (
        <div style={{
          backgroundColor: '#2e7d32',
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: '700',
          padding: '6px 16px',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}>
          <Text field={fields.Badge} />
        </div>
      )}

      <div style={{
        backgroundColor: backgroundColor,
        height: '180px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <SitecoreImage field={fields.Image} style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }} />
      </div>

      <div style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        flex: 1,
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#001E50',
        }}>
          <Text field={fields.Heading} />
        </h3>

        <div style={{
          fontSize: '14px',
          color: '#555555',
          lineHeight: '1.6',
        }}>
          <RichText field={fields.Description} />
        </div>

        <div style={{
          fontSize: '14px',
          color: '#333333',
          lineHeight: '1.8',
        }}>
          <RichText field={fields.Features} />
        </div>

        <Link field={fields.CTALink} style={{
          color: '#4051D5',
          fontSize: '14px',
          fontWeight: '600',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: 'auto',
          cursor: 'pointer',
        }}>
          <Text field={fields.CTAText} />
          <span style={{ fontSize: '18px' }}>→</span>
        </Link>
      </div>
    </div>
  );
};
