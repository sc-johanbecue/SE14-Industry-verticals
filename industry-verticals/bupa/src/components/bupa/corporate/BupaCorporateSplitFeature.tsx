'use client';

import type { JSX } from 'react';
import {
  TextField,
  ImageField,
  LinkField,
  RichTextField,
  Text,
  Image as SitecoreImage,
  Link as SitecoreLink,
  RichText,
} from '@sitecore-content-sdk/nextjs';
import { Play } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';

export interface BupaCorporateSplitFeatureFields {
  Heading: TextField;
  Body: RichTextField;
  Cta: LinkField;
  Image: ImageField;
  /** When set, shows play overlay and links here (e.g. video lightbox URL). */
  MediaLink: LinkField;
}

const defaultFields: BupaCorporateSplitFeatureFields = {
  Heading: {
    value: 'Bupa and the All Blacks are encouraging people to share their health stories.',
  },
  Body: { value: '' },
  Cta: { value: { href: '#', text: 'Share your story' } },
  Image: { value: { src: '', alt: '' } },
  MediaLink: { value: { href: '#', text: 'Play video' } },
};

export type BupaCorporateSplitFeatureProps = ComponentProps & {
  fields: BupaCorporateSplitFeatureFields;
};

export const Default = (props: BupaCorporateSplitFeatureProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;
  const hasVideo = Boolean(fields.MediaLink?.value?.href);

  return (
    <section
      className={`component bupa-corporate-split-feature bg-[#001a3d] px-6 py-12 text-white lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto grid max-w-[min(96rem,calc(100vw-3rem))] gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div className="min-w-0">
          <Text
            tag="h2"
            field={fields.Heading}
            className="m-0 text-2xl leading-tight font-bold sm:text-3xl lg:text-[2rem] lg:leading-[1.15]"
          />
          {fields.Body?.value ? (
            <RichText
              field={fields.Body}
              className="prose prose-invert mt-5 max-w-xl text-base text-white/85"
            />
          ) : null}
          <div className="mt-8">
            <SitecoreLink
              field={fields.Cta}
              className="inline-flex min-h-12 items-center justify-center rounded bg-[#0079c1] px-8 py-3 text-base font-semibold text-white no-underline hover:bg-[#0065a3]"
            >
              {fields.Cta?.value?.text}
            </SitecoreLink>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-black/30 shadow-2xl ring-1 ring-white/10">
            <SitecoreImage field={fields.Image} className="h-full w-full object-cover" />
            {hasVideo ? (
              <SitecoreLink
                field={fields.MediaLink}
                className="absolute inset-0 grid place-items-center bg-black/20 no-underline transition hover:bg-black/30"
                aria-label={fields.MediaLink?.value?.text || 'Play video'}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0079c1] text-white shadow-lg">
                  <Play className="ml-1 h-8 w-8 fill-current" />
                </span>
              </SitecoreLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
