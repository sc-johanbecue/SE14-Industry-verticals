'use client';

import React, { useState, type JSX } from 'react';
import { TextField, RichTextField, Text, RichText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Question: TextField;
  Answer: RichTextField;
}

type FAQCardProps = ComponentProps & {
  fields: Fields;
};

const defaultFields: Fields = {
  Question: { value: 'How does TeamViewer\'s pricing model work?' },
  Answer: { value: '<p>TeamViewer offers flexible pricing plans based on the number of users and features you need. Our plans are billed annually and provide unlimited remote connections.</p>' },
};

export const Default = (props: FAQCardProps): JSX.Element => {
  const fields = props.fields || defaultFields;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      borderBottom: '1px solid #e0e0e0',
      padding: '24px 0',
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          padding: '0',
        }}
      >
        <span style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#001E50',
          paddingRight: '20px',
        }}>
          <Text field={fields.Question} />
        </span>
        
        <span style={{
          fontSize: '24px',
          fontWeight: '300',
          color: '#001E50',
          flexShrink: 0,
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div style={{
          marginTop: '16px',
          fontSize: '15px',
          color: '#555555',
          lineHeight: '1.6',
          paddingRight: '44px',
        }}>
          <RichText field={fields.Answer} />
        </div>
      )}
    </div>
  );
};
