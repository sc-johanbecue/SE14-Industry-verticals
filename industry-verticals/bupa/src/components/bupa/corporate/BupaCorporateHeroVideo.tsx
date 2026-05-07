'use client';

import type { CSSProperties, JSX } from 'react';
import { LinkField, Link as SitecoreLink } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface BupaCorporateHeroVideoFields {
  /** Video URL: Vimeo or YouTube page/embed, or direct file (e.g. .mp4) for HTML5 video. */
  VideoUrl: LinkField;
  /** Bottom-centre CTA pill (label + optional navigation target). */
  Cta: LinkField;
}

const defaultFields: BupaCorporateHeroVideoFields = {
  VideoUrl: { value: { href: '', text: '' } },
  Cta: { value: { href: '#', text: 'Learn about Blua' } },
};

export type BupaCorporateHeroVideoProps = ComponentProps & {
  fields: BupaCorporateHeroVideoFields;
};

function extractYouTubeId(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '').split('/')[0];
      return id || null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = u.searchParams.get('v');
      if (v) return v;
      const m = u.pathname.match(/\/embed\/([^/]+)/);
      if (m?.[1]) return m[1];
      const s = u.pathname.match(/\/shorts\/([^/]+)/);
      if (s?.[1]) return s[1];
    }
  } catch {
    return null;
  }
  return null;
}

function extractVimeoId(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'player.vimeo.com') {
      const m = u.pathname.match(/\/video\/(\d+)/);
      if (m?.[1]) return m[1];
    }
    if (host === 'vimeo.com') {
      const embed = u.pathname.match(/\/video\/(\d+)/);
      if (embed?.[1]) return embed[1];
      const last = u.pathname.match(/\/(\d+)\/?$/);
      if (last?.[1]) return last[1];
    }
  } catch {
    return null;
  }
  return null;
}

function vimeoPlayerSrc(videoId: string, sourceUrl: string): string {
  const params = new URLSearchParams();
  params.set('background', '1');
  params.set('muted', '1');
  params.set('loop', '1');
  try {
    const u = new URL(sourceUrl);
    u.searchParams.forEach((value, key) => {
      params.set(key, value);
    });
  } catch {
    /* ignore */
  }
  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
}

function videoPresentation(
  href: string | undefined
):
  | { mode: 'vimeo'; id: string; sourceUrl: string }
  | { mode: 'youtube'; id: string }
  | { mode: 'direct'; src: string }
  | null {
  const h = href?.trim();
  if (!h) return null;
  const vimeoId = extractVimeoId(h);
  if (vimeoId) return { mode: 'vimeo', id: vimeoId, sourceUrl: h };
  const yt = extractYouTubeId(h);
  if (yt) return { mode: 'youtube', id: yt };
  return { mode: 'direct', src: h };
}

export const Default = (props: BupaCorporateHeroVideoProps): JSX.Element => {
  const renderingIdentifier = (props.params.RenderingIdentifier as string | undefined)?.trim();
  const sectionId = renderingIdentifier ?? props.rendering?.uid;
  const videoFrameId = renderingIdentifier || 'banner-corporate-hero';
  const { styles } = props.params;
  const fields = props.fields || defaultFields;
  const href = fields.VideoUrl?.value?.href?.trim();
  const presentation = videoPresentation(href);
  const ctaText = fields.Cta?.value?.text?.trim();
  const hasCta = Boolean(ctaText);
  const vimeoTitleSlug = `${videoFrameId}-video`.toLowerCase();

  /** 16:9 band capped by viewport height — avoids min-height fighting aspect-ratio (letterboxing). */
  const mediaStageClass = 'relative w-full overflow-hidden bg-black [height:min(56.25vw,85vh)]';

  /** Iframe scaled like object-cover so ultrawide viewports do not show top/bottom bars. */
  const iframeCoverStyle: CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '177.78vh',
    height: '56.25vw',
    minWidth: '100%',
    minHeight: '100%',
    transform: 'translate(-50%, -50%)',
    border: 0,
    maxWidth: 'none',
  };

  return (
    <section
      className={`component bupa-corporate-hero-video relative isolate w-screen max-w-[100vw] bg-black ${styles || ''}`}
      style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
      id={presentation?.mode === 'vimeo' ? undefined : sectionId}
    >
      <div className={mediaStageClass}>
        {presentation?.mode === 'vimeo' ? (
          <iframe
            data-video-frame
            id={videoFrameId}
            title={`Vimeo Video Of ${vimeoTitleSlug}`}
            className="pointer-events-none"
            style={iframeCoverStyle}
            src={vimeoPlayerSrc(presentation.id, presentation.sourceUrl)}
            frameBorder={0}
            allow="autoplay; fullscreen"
          />
        ) : presentation?.mode === 'youtube' ? (
          <iframe
            title={fields.Cta?.value?.text || 'Bupa video'}
            style={iframeCoverStyle}
            src={`https://www.youtube-nocookie.com/embed/${presentation.id}?rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : presentation?.mode === 'direct' ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={presentation.src}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[#001a3d] px-6 text-center text-sm text-white/80">
            Add a video URL in the Video Url field.
          </div>
        )}

        {hasCta ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-8 sm:pb-10 md:pb-12">
            <SitecoreLink
              field={fields.Cta}
              className="pointer-events-auto inline-flex min-h-12 items-center justify-center border-2 border-transparent bg-[#0079C8] px-8 py-3 text-base font-bold tracking-tight text-white no-underline transition-colors duration-200 hover:border-[#0079C8] hover:bg-white hover:text-[#0079C8]"
            >
              {fields.Cta?.value?.text}
            </SitecoreLink>
          </div>
        ) : null}
      </div>
    </section>
  );
};
