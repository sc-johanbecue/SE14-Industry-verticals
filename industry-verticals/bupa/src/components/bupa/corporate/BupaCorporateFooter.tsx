'use client';

import type { JSX } from 'react';
import {
  ImageField,
  LinkField,
  TextField,
  Image as SitecoreImage,
  Link as SitecoreLink,
  Text,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/** Same field shape as BupaFooter; datasource can use Project/bupa/Footer/Footer template. */
interface CorporateFooterFields {
  Logo: ImageField;
  CopyrightLine: TextField;
  SocialLinkedinIcon: ImageField;
  SocialLinkedinLink: LinkField;
  SocialYoutubeIcon: ImageField;
  SocialYoutubeLink: LinkField;
  SocialXIcon: ImageField;
  SocialXLink: LinkField;
  SocialInstagramIcon: ImageField;
  SocialInstagramLink: LinkField;
  SocialTiktokIcon: ImageField;
  SocialTiktokLink: LinkField;
}

const defaults: CorporateFooterFields = {
  Logo: { value: { src: '', alt: 'Bupa' } },
  CopyrightLine: { value: '© Bupa 2026' },
  SocialLinkedinIcon: { value: {} },
  SocialLinkedinLink: { value: { href: '#', linktype: 'external' } },
  SocialInstagramIcon: { value: {} },
  SocialInstagramLink: { value: { href: '#', linktype: 'external' } },
  SocialTiktokIcon: { value: {} },
  SocialTiktokLink: { value: { href: '#', linktype: 'external' } },
  SocialYoutubeIcon: { value: {} },
  SocialYoutubeLink: { value: { href: '#', linktype: 'external' } },
  SocialXIcon: { value: {} },
  SocialXLink: { value: { href: '#', linktype: 'external' } },
};

export type BupaCorporateFooterProps = ComponentProps & {
  fields: CorporateFooterFields;
};

export const Default = (props: BupaCorporateFooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaults;
  const dph = DynamicPlaceholderId ?? '1';

  const ph = {
    impact: `bupa-corporate-footer-impact-${dph}`,
    company: `bupa-corporate-footer-company-${dph}`,
    news: `bupa-corporate-footer-news-${dph}`,
    financials: `bupa-corporate-footer-financials-${dph}`,
    utility: `bupa-corporate-footer-utility-${dph}`,
  };

  return (
    <footer
      key={id}
      className={`component bupa-corporate-footer bg-[#000814] pb-12 text-white lg:pb-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-12 md:px-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8 xl:gap-12">
          <div className="min-w-0 lg:col-span-4">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <div className="min-w-0">
                <Placeholder name={ph.impact} rendering={props.rendering} />
              </div>
              <div className="min-w-0">
                <Placeholder name={ph.company} rendering={props.rendering} />
              </div>
              <div className="min-w-0">
                <Placeholder name={ph.news} rendering={props.rendering} />
              </div>
              <div className="min-w-0">
                <Placeholder name={ph.financials} rendering={props.rendering} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 border-t border-white/10 pt-8 md:border-t-0 md:pt-0 lg:items-end lg:border-l lg:border-white/10 lg:pl-8">
            <p className="text-sm font-semibold text-white/90 lg:text-right">Follow us</p>
            <div className="flex flex-row flex-wrap gap-3 lg:justify-end">
              <SitecoreLink
                field={fields.SocialLinkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5 p-1.5 text-white transition hover:bg-white/10 [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
              >
                <SitecoreImage field={fields.SocialLinkedinIcon} alt="" />
              </SitecoreLink>
              <SitecoreLink
                field={fields.SocialXLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5 p-1.5 text-white transition hover:bg-white/10 [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
              >
                <SitecoreImage field={fields.SocialXIcon} alt="" />
              </SitecoreLink>
              <SitecoreLink
                field={fields.SocialYoutubeLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5 p-1.5 text-white transition hover:bg-white/10 [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
              >
                <SitecoreImage field={fields.SocialYoutubeIcon} alt="" />
              </SitecoreLink>
              <SitecoreLink
                field={fields.SocialInstagramLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5 p-1.5 text-white transition hover:bg-white/10 [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
              >
                <SitecoreImage field={fields.SocialInstagramIcon} alt="" />
              </SitecoreLink>
              <SitecoreLink
                field={fields.SocialTiktokLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5 p-1.5 text-white transition hover:bg-white/10 [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
              >
                <SitecoreImage field={fields.SocialTiktokIcon} alt="" />
              </SitecoreLink>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1440px] border-t border-white/15 px-6 pt-8 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SitecoreImage
            field={fields.Logo}
            className="h-10 w-auto object-contain opacity-95 md:h-12"
            alt={fields.Logo?.value?.alt || 'Bupa'}
          />

          <div className="flex min-w-0 flex-1 flex-col gap-3 text-[0.8125rem] leading-snug text-white/75 md:items-end">
            <div className="bupa-corporate-footer__utility w-full md:text-right">
              <Placeholder name={ph.utility} rendering={props.rendering} />
            </div>
            <Text tag="p" field={fields.CopyrightLine} className="m-0 text-white/60" />
          </div>
        </div>
      </div>
    </footer>
  );
};
