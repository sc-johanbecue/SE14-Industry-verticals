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

/**
 * Brand footer — dark navy band. From `md` up, link columns span full width and
 * member help + social sit **below** them, **right-aligned**.
 * Member help and social **Link** / **Image** fields are always rendered so they stay editable in Sitecore.
 */

interface FooterFields {
  Logo: ImageField;
  CopyrightLine: TextField;
  MemberHelpIcon: ImageField;
  MemberHelpLink: LinkField;
  SocialFacebookIcon: ImageField;
  SocialFacebookLink: LinkField;
  SocialInstagramIcon: ImageField;
  SocialInstagramLink: LinkField;
  SocialTiktokIcon: ImageField;
  SocialTiktokLink: LinkField;
  SocialLinkedinIcon: ImageField;
  SocialLinkedinLink: LinkField;
  SocialYoutubeIcon: ImageField;
  SocialYoutubeLink: LinkField;
  SocialXIcon: ImageField;
  SocialXLink: LinkField;
}

const defaultFooterFields: FooterFields = {
  Logo: { value: { src: '', alt: 'Bupa' } },
  CopyrightLine: { value: '© Bupa 2026' },
  MemberHelpIcon: { value: {} },
  MemberHelpLink: {
    value: {
      href: '#',
      text: 'Member help and support',
    },
  },
  SocialFacebookIcon: { value: {} },
  SocialFacebookLink: { value: { href: '#', linktype: 'external' } },
  SocialInstagramIcon: { value: {} },
  SocialInstagramLink: { value: { href: '#', linktype: 'external' } },
  SocialTiktokIcon: { value: {} },
  SocialTiktokLink: { value: { href: '#', linktype: 'external' } },
  SocialLinkedinIcon: { value: {} },
  SocialLinkedinLink: { value: { href: '#', linktype: 'external' } },
  SocialYoutubeIcon: { value: {} },
  SocialYoutubeLink: { value: { href: '#', linktype: 'external' } },
  SocialXIcon: { value: {} },
  SocialXLink: { value: { href: '#', linktype: 'external' } },
};

export type BupaFooterProps = ComponentProps & {
  fields: FooterFields;
};

export const Default = (props: BupaFooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFooterFields;

  const dph = DynamicPlaceholderId ?? '';
  const ph = {
    health: `footer-nav-health-${dph}`,
    dental: `footer-nav-dental-${dph}`,
    mentalHealth: `footer-nav-mental-health-${dph}`,
    careHomes: `footer-nav-care-homes-${dph}`,
    healthInformation: `footer-nav-health-information-${dph}`,
    aboutBupa: `footer-nav-about-bupa-${dph}`,
    myBupa: `footer-nav-my-bupa-${dph}`,
    utility: `footer-utility-links-${dph}`,
  };

  return (
    <footer
      key={id ?? props.rendering?.uid}
      className={`component bupa-footer bg-[#0d1846] pb-14 text-white lg:pb-18 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-14 md:px-8 lg:pt-18">
        <div className="flex flex-col gap-8 md:gap-14">
          <div className="min-w-0">
            <div className="flex flex-col md:grid md:grid-cols-4 md:gap-x-8 lg:gap-x-12 xl:gap-x-16">
              <div className="flex flex-col md:gap-10">
                <Placeholder name={ph.health} rendering={props.rendering} />
                <Placeholder name={ph.dental} rendering={props.rendering} />
              </div>
              <div className="flex flex-col md:gap-10">
                <Placeholder name={ph.mentalHealth} rendering={props.rendering} />
                <Placeholder name={ph.careHomes} rendering={props.rendering} />
              </div>
              <div className="flex flex-col md:gap-10">
                <Placeholder name={ph.healthInformation} rendering={props.rendering} />
              </div>
              <div className="flex flex-col md:gap-10">
                <Placeholder name={ph.aboutBupa} rendering={props.rendering} />
                <Placeholder name={ph.myBupa} rendering={props.rendering} />
              </div>
            </div>
          </div>

          <aside className="bupa-footer__aside w-full min-w-0 border-t-0 pt-8 md:flex md:flex-col md:items-end md:border-t md:border-white/15 md:pt-10 lg:border-t-0 lg:pt-12">
            <div className="flex w-full max-w-full flex-col items-start gap-6 md:items-end md:gap-8 lg:gap-10">
              <SitecoreLink
                field={fields.MemberHelpLink}
                className="group inline-flex max-w-full items-center gap-4 rounded-md text-left text-[0.9375rem] font-bold text-white underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:ml-auto md:text-right"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[3px]">
                  <SitecoreImage
                    field={fields.MemberHelpIcon}
                    className="h-full w-full object-contain"
                    alt=""
                  />
                </span>
                <span>{fields.MemberHelpLink?.value?.text || 'Member help and support'}</span>
              </SitecoreLink>

              <div className="flex w-full max-w-full flex-row flex-wrap justify-start gap-3 md:ml-auto md:justify-end">
                <SitecoreLink
                  field={fields.SocialFacebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg p-0.5 text-white transition-opacity hover:opacity-90 md:h-11 md:w-11 [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
                >
                  <SitecoreImage
                    field={fields.SocialFacebookIcon}
                    className="h-full w-full object-contain"
                    alt=""
                  />
                </SitecoreLink>
                <SitecoreLink
                  field={fields.SocialInstagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg p-0.5 text-white transition-opacity hover:opacity-90 md:h-11 md:w-11 [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
                >
                  <SitecoreImage
                    field={fields.SocialInstagramIcon}
                    className="h-full w-full object-contain"
                    alt=""
                  />
                </SitecoreLink>
                <SitecoreLink
                  field={fields.SocialTiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg p-0.5 text-white transition-opacity hover:opacity-90 md:h-11 md:w-11 [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
                >
                  <SitecoreImage
                    field={fields.SocialTiktokIcon}
                    className="h-full w-full object-contain"
                    alt=""
                  />
                </SitecoreLink>
                <SitecoreLink
                  field={fields.SocialLinkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg p-0.5 text-white transition-opacity hover:opacity-90 md:h-11 md:w-11 [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
                >
                  <SitecoreImage
                    field={fields.SocialLinkedinIcon}
                    className="h-full w-full object-contain"
                    alt=""
                  />
                </SitecoreLink>
                <SitecoreLink
                  field={fields.SocialYoutubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg p-0.5 text-white transition-opacity hover:opacity-90 md:h-11 md:w-11 [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
                >
                  <SitecoreImage
                    field={fields.SocialYoutubeIcon}
                    className="h-full w-full object-contain"
                    alt=""
                  />
                </SitecoreLink>
                <SitecoreLink
                  field={fields.SocialXLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg p-0.5 text-white transition-opacity hover:opacity-90 md:h-11 md:w-11 [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
                >
                  <SitecoreImage
                    field={fields.SocialXIcon}
                    className="h-full w-full object-contain"
                    alt=""
                  />
                </SitecoreLink>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <hr className="mx-auto mt-16 mb-14 max-w-[1440px] border-0 border-t border-white/20 md:mt-16 md:mb-12 lg:mt-20 lg:mb-16 lg:border-t-0" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="order-3 flex shrink-0 items-center gap-3 md:order-1 md:gap-4">
            <SitecoreImage
              field={fields.Logo}
              className="h-12 w-12 shrink-0 object-contain md:h-14 md:w-14"
            />
          </div>

          <div className="order-1 w-full min-w-0 md:order-2 md:flex-1">
            <div className="bupa-footer__utility-row w-full min-w-0 text-[0.8125rem] leading-snug text-white/90">
              <div className="bupa-footer__utility-slot">
                <Placeholder name={ph.utility} rendering={props.rendering} />
              </div>
              <span className="bupa-footer__utility-meta">
                <span
                  aria-hidden="true"
                  className="bupa-footer__utility-copy-sep whitespace-nowrap select-none"
                >
                  |
                </span>
                <span className="bupa-footer__utility-copy-text whitespace-normal md:whitespace-nowrap">
                  <Text tag="span" field={fields.CopyrightLine} />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
