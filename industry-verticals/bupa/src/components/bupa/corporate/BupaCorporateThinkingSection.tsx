'use client';

import type { JSX } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TextField, Text, Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface BupaCorporateThinkingSectionFields {
  TitlePrefix: TextField;
  TitleHighlight: TextField;
}

const defaultFields: BupaCorporateThinkingSectionFields = {
  TitlePrefix: { value: 'Our latest' },
  TitleHighlight: { value: 'Thinking' },
};

export type BupaCorporateThinkingSectionProps = ComponentProps & {
  fields: BupaCorporateThinkingSectionFields;
};

function getSlideStep(track: HTMLElement): number {
  const cards = [...track.querySelectorAll('[data-thinking-card]')] as HTMLElement[];
  if (cards.length >= 2) {
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }
  if (cards.length === 1) {
    return cards[0].offsetWidth;
  }
  return track.clientWidth;
}

export const Default = (props: BupaCorporateThinkingSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier ?? props.rendering?.uid;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;
  const dph = DynamicPlaceholderId ?? '1';
  const ph = `bupa-corporate-thinking-cards-${dph}`;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const refreshSlides = useCallback(() => {
    const root = scrollRef.current;
    if (!root) return;
    const cards = root.querySelectorAll('[data-thinking-card]');
    setSlideCount(cards.length);
  }, []);

  useEffect(() => {
    refreshSlides();
    const root = scrollRef.current;
    if (!root || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => refreshSlides());
    ro.observe(root);
    const mo = new MutationObserver(() => refreshSlides());
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [refreshSlides, props.rendering?.uid]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const n = el.querySelectorAll('[data-thinking-card]').length;
      const step = getSlideStep(el) || 1;
      const idx = n <= 1 ? 0 : Math.min(n - 1, Math.max(0, Math.round(el.scrollLeft / step)));
      setActiveIndex(idx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [slideCount]);

  /** Desktop grid must not keep a horizontal scroll offset from the mobile carousel. */
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const clearScroll = () => {
      if (mq.matches && scrollRef.current) {
        scrollRef.current.scrollLeft = 0;
      }
    };
    clearScroll();
    mq.addEventListener('change', clearScroll);
    return () => mq.removeEventListener('change', clearScroll);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getSlideStep(el);
    el.scrollTo({ left: index * step, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  return (
    <section
      className={`component bupa-corporate-thinking-section relative overflow-hidden bg-[#00335b] px-6 py-16 text-white md:px-8 md:py-20 lg:py-24 ${styles || ''}`}
      id={id}
    >
      {/* Subtle starfield */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] md:opacity-[0.28]"
        style={{
          backgroundImage: [
            'radial-gradient(circle at 10% 12%, rgba(255,255,255,0.55) 0.5px, transparent 1.2px)',
            'radial-gradient(circle at 78% 8%, rgba(255,255,255,0.45) 0.5px, transparent 1.2px)',
            'radial-gradient(circle at 42% 22%, rgba(255,255,255,0.35) 0.5px, transparent 1.2px)',
            'radial-gradient(circle at 88% 34%, rgba(255,255,255,0.4) 0.5px, transparent 1.2px)',
            'radial-gradient(circle at 18% 48%, rgba(255,255,255,0.3) 0.5px, transparent 1.2px)',
            'radial-gradient(circle at 62% 58%, rgba(255,255,255,0.42) 0.5px, transparent 1.2px)',
            'radial-gradient(circle at 30% 72%, rgba(255,255,255,0.28) 0.5px, transparent 1.2px)',
            'radial-gradient(circle at 92% 78%, rgba(255,255,255,0.38) 0.5px, transparent 1.2px)',
            'radial-gradient(circle at 52% 88%, rgba(255,255,255,0.32) 0.5px, transparent 1.2px)',
          ].join(', '),
          backgroundSize:
            'min(100%, 1200px) min(100%, 800px), min(100%, 1200px) min(100%, 800px), min(100%, 1200px) min(100%, 800px), min(100%, 1200px) min(100%, 800px), min(100%, 1200px) min(100%, 800px), min(100%, 1200px) min(100%, 800px), min(100%, 1200px) min(100%, 800px), min(100%, 1200px) min(100%, 800px), min(100%, 1200px) min(100%, 800px)',
        }}
      />

      <div className="relative mx-auto max-w-[1440px]">
        <header className="mx-auto mb-12 max-w-4xl text-center md:mb-16 lg:mb-20">
          <Text
            tag="span"
            field={fields.TitlePrefix}
            className="mb-2 block text-lg font-normal tracking-tight text-white md:text-xl"
          />
          <Text
            tag="span"
            field={fields.TitleHighlight}
            className="block text-[clamp(2.75rem,7.5vw,4.5rem)] leading-[1.02] font-bold tracking-tight text-white"
          />
        </header>

        <div className="mx-auto max-w-[min(96rem,calc(100vw-3rem))] md:max-w-none">
          {/* Mobile: flex + scroll-snap. md+: 3-column grid, no horizontal scroll or snap. */}
          <div
            ref={scrollRef}
            className={[
              'bupa-corporate-thinking-section__track',
              // Mobile: horizontal carousel on this element. Sitecore may output one wrapper — make it a row
              // so total width > viewport and this track scrolls.
              'max-md:flex max-md:snap-x max-md:snap-mandatory max-md:flex-row max-md:gap-6 max-md:overflow-x-auto max-md:pb-2',
              'max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden',
              'max-md:*:first:flex max-md:*:first:w-max max-md:*:first:shrink-0 max-md:*:first:flex-row max-md:*:first:gap-6',
              'max-md:**:data-thinking-card:min-w-[min(100%,calc(100vw-3rem))] max-md:**:data-thinking-card:shrink-0 max-md:**:data-thinking-card:snap-start',
              // Desktop: 3 equal columns (minmax prevents col-12 / width quirks from blowing the row).
              'md:grid! md:snap-none md:auto-rows-fr md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0',
              // EE: Sitecore chrome <code> sits between renderings — take it out of the layout flow so only cards form the 3 columns.
              'md:[&>code.scpm]:contents',
              // Single wrapper around all cards (some pipelines): promote inner cards to this grid.
              'md:*:only:contents',
              'md:*:min-w-0',
            ].join(' ')}
          >
            <Placeholder name={ph} rendering={props.rendering} />
          </div>

          {slideCount > 1 ? (
            <div
              className="mt-6 flex justify-center gap-2 md:hidden"
              role="tablist"
              aria-label="Thinking articles"
            >
              {Array.from({ length: slideCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Show article ${i + 1} of ${slideCount}`}
                  className={[
                    'h-2 w-2 rounded-full border-0 p-0 transition-colors',
                    i === activeIndex ? 'bg-white' : 'bg-white/35 hover:bg-white/55',
                  ].join(' ')}
                  onClick={() => scrollToIndex(i)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
