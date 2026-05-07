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
  FollowUsTitle: TextField;
  MemberHelpLink: LinkField;
  SocialLinkedinIcon: ImageField;
  SocialLinkedinLink: LinkField;
  SocialYoutubeIcon: ImageField;
  SocialYoutubeLink: LinkField;
  SocialInstagramIcon: ImageField;
  SocialInstagramLink: LinkField;
  SocialTiktokIcon: ImageField;
  SocialTiktokLink: LinkField;
}

const defaults: CorporateFooterFields = {
  Logo: { value: { src: '', alt: 'Bupa' } },
  FollowUsTitle: { value: 'Follow us' },
  MemberHelpLink: {
    value: { href: '#', text: 'Contact us at Bupa Group' },
  },
  SocialLinkedinIcon: { value: {} },
  SocialLinkedinLink: { value: { href: '#', linktype: 'external' } },
  SocialInstagramIcon: { value: {} },
  SocialInstagramLink: { value: { href: '#', linktype: 'external' } },
  SocialTiktokIcon: { value: {} },
  SocialTiktokLink: { value: { href: '#', linktype: 'external' } },
  SocialYoutubeIcon: { value: {} },
  SocialYoutubeLink: { value: { href: '#', linktype: 'external' } },
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
  const socialLinkClass =
    'inline-flex items-center justify-center transition-opacity hover:opacity-80';
  const socialImageClass = 'h-7 w-7 object-contain';

  return (
    <footer
      key={id}
      className={`component bupa-corporate-footer bg-[#00335b] pb-12 text-white lg:pb-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-10 md:px-8 md:pt-12 lg:pt-14">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12 lg:grid-cols-6 lg:gap-x-8 xl:gap-x-10">
          <div className="min-w-0">
            <SitecoreImage
              field={fields.Logo}
              className="h-20 w-20 object-contain md:h-24 md:w-24"
              alt={fields.Logo?.value?.alt || 'Bupa'}
            />
          </div>

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

          <div className="min-w-0">
            <Text
              tag="p"
              field={fields.FollowUsTitle}
              className="link-list__corporate-footer-title bupa-corporate-footer__follow-us-title"
            />
            <div className="mt-4 flex flex-row flex-wrap items-center gap-3">
              <SitecoreLink
                field={fields.SocialInstagramLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={socialLinkClass}
              >
                <SitecoreImage
                  field={fields.SocialInstagramIcon}
                  className={socialImageClass}
                  alt=""
                />
              </SitecoreLink>
              <SitecoreLink
                field={fields.SocialLinkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={socialLinkClass}
              >
                <SitecoreImage
                  field={fields.SocialLinkedinIcon}
                  className={socialImageClass}
                  alt=""
                />
              </SitecoreLink>
              <SitecoreLink
                field={fields.SocialYoutubeLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className={socialLinkClass}
              >
                <SitecoreImage
                  field={fields.SocialYoutubeIcon}
                  className={socialImageClass}
                  alt=""
                />
              </SitecoreLink>
              <SitecoreLink
                field={fields.SocialTiktokLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className={socialLinkClass}
              >
                <SitecoreImage
                  field={fields.SocialTiktokIcon}
                  className={socialImageClass}
                  alt=""
                />
              </SitecoreLink>
            </div>
            <div className="mt-4">
              <SitecoreLink
                field={fields.MemberHelpLink}
                className="text-lg text-white no-underline hover:text-white/85 hover:no-underline"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[1440px] border-t border-white/15 px-6 pt-6 md:mt-12 md:px-8 md:pt-7">
        <div className="bupa-corporate-footer__utility text-[0.8125rem] leading-snug text-white/75">
          <div className="w-full">
            <Placeholder name={ph.utility} rendering={props.rendering} />
          </div>
        </div>
      </div>
    </footer>
  );
};
