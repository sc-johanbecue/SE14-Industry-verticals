'use client';

import React, { useMemo, useRef, useState, JSX } from 'react';
import { Link, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Phone,
  Search,
  UserRound,
  X,
} from 'lucide-react';
import { useClickAway } from '@/hooks/useClickAway';
import { useStopResponsiveTransition } from '@/hooks/useStopResponsiveTransition';
import { extractMediaUrl } from '@/helpers/extractMediaUrl';
import {
  getLinkContent,
  getLinkField,
  isNavLevel,
  isNavRootItem,
  prepareFields,
} from '@/helpers/navHelpers';
import clsx from 'clsx';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from '@/shadcn/components/ui/drawer';

export interface NavItemFields {
  Id: string;
  DisplayName: string;
  Title: TextField;
  NavigationTitle: TextField;
  Href: string;
  Querystring: string;
  Children?: Array<NavItemFields>;
  Styles: string[];
}

interface NavigationListItemProps {
  fields: NavItemFields;
  handleClick: (event?: React.MouseEvent<HTMLElement>) => void;
  logoSrc?: string;
  isSimpleLayout?: boolean;
}

export interface NavigationProps extends ComponentProps {
  fields: Record<string, NavItemFields>;
}

const NavigationListItem: React.FC<NavigationListItemProps> = ({
  fields,
  handleClick,
  logoSrc,
  isSimpleLayout,
}) => {
  const { page } = useSitecore();
  const [isActiveLocal, setIsActiveLocal] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  useClickAway(dropdownRef, () => setIsActiveLocal(false));

  const isRootItem = isNavRootItem(fields);
  const isTopLevelPage = isNavLevel(fields, 1);

  const hasChildren = !!fields.Children?.length;
  const isLogoRootItem = isRootItem && logoSrc;
  const hasDropdownMenu = hasChildren && isTopLevelPage;

  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    handleClick(event);
    setIsActiveLocal(false);
  };

  const childrenMarkup = hasChildren
    ? fields.Children!.map((child) => (
        <NavigationListItem
          key={child.Id}
          fields={child}
          handleClick={clickHandler}
          isSimpleLayout={isSimpleLayout}
          logoSrc={logoSrc}
        />
      ))
    : null;

  return (
    <li
      ref={dropdownRef}
      tabIndex={0}
      role="menuitem"
      className={clsx(
        fields?.Styles?.join(' '),
        'relative flex flex-col gap-x-8 gap-y-4 xl:gap-x-14',
        isRootItem && 'lg:flex-row',
        isLogoRootItem && 'shrink-0 max-lg:hidden',
        isLogoRootItem && isSimpleLayout && 'lg:mr-auto'
      )}
    >
      <div className="">
        {hasDropdownMenu ? (
          // Drawer for items with children
          <Drawer
            open={isActiveLocal}
            onOpenChange={(open) => setIsActiveLocal(open)}
            direction="left"
          >
            <DrawerTrigger asChild>
              <button
                type="button"
                aria-label={`Open submenu for ${fields.DisplayName}`}
                className="navigation-item navigation-item-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setIsActiveLocal((a) => !a);
                }}
              >
                {getLinkContent(fields, logoSrc)}
              </button>
            </DrawerTrigger>

            <DrawerContent className="bg-background-accent flex flex-col p-5 max-lg:w-xl! max-lg:max-w-full!">
              <DrawerClose asChild className="hidden self-end lg:block">
                <button aria-label="Close submenu">
                  <X className="size-5" />
                </button>
              </DrawerClose>
              <DrawerClose asChild className="lg:hidden">
                <button aria-label="Close submenu">
                  <ArrowLeft className="size-5" />
                </button>
              </DrawerClose>
              <div className="px-12">
                {logoSrc && (
                  <img src={logoSrc} alt={fields.DisplayName} className="mt-14 mb-18 h-auto w-36" />
                )}

                <div className="text-foreground-light mb-6 text-sm font-medium">
                  {getLinkContent(fields, logoSrc)}
                </div>
                <nav aria-label={`${fields.DisplayName} submenu`}>
                  <ul className="flex flex-col gap-6">{childrenMarkup}</ul>
                </nav>
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          // Regular link for items without children
          <Link
            field={getLinkField(fields)}
            editable={page.mode.isEditing}
            onClick={clickHandler}
            className="navigation-item navigation-item-primary"
          >
            {getLinkContent(fields, logoSrc)}
          </Link>
        )}
      </div>
    </li>
  );
};

export const Default = ({ params, fields }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id, Logo: logoImage, SimpleLayout: simpleLayout } = params;

  useStopResponsiveTransition();

  if (!Object.values(fields).some((v) => !!v)) {
    return (
      <div className={`component navigation ${styles}`} id={id}>
        <div className="component-content">[Navigation]</div>
      </div>
    );
  }

  const handleToggleMenu = (event?: React.MouseEvent<HTMLElement>, forceState?: boolean) => {
    if (event && page.mode.isEditing) {
      event.preventDefault();
    }
    setIsMenuOpen(forceState ?? !isMenuOpen);
  };

  const isSimpleLayout = isParamEnabled(simpleLayout);
  const preparedFields = prepareFields(fields, !isSimpleLayout);
  const rootItem = Object.values(preparedFields).find((item) => isNavRootItem(item));
  const logoSrc = extractMediaUrl(logoImage);
  const hasLogoRootItem = rootItem && logoSrc;

  const navigationItems = Object.values(preparedFields)
    .filter((item): item is NavItemFields => !!item)
    .map((item) => (
      <NavigationListItem
        key={item.Id}
        fields={item}
        handleClick={(event) => handleToggleMenu(event, false)}
        logoSrc={logoSrc}
        isSimpleLayout={!!isSimpleLayout}
      />
    ));

  return (
    <div className={`component navigation ${styles}`} id={id}>
      {logoSrc && (
        <img
          src={logoSrc}
          alt={'logo'}
          className="mb-18 hidden h-auto w-36 in-[.drawer-content]:block"
        />
      )}

      <nav>
        <ul
          role="menubar"
          className={clsx(
            'container flex flex-row items-center gap-x-6 gap-y-4 text-lg lg:justify-center [.component.header_&]:px-0 in-[.drawer-content]:flex-col in-[.drawer-content]:items-start in-[.drawer-content]:px-0',
            isSimpleLayout && !hasLogoRootItem && 'lg:justify-end'
          )}
        >
          {navigationItems}
        </ul>
      </nav>
    </div>
  );
};

const bupaText = (item: NavItemFields): string =>
  item.NavigationTitle?.value?.toString() ||
  item.Title?.value?.toString() ||
  item.DisplayName ||
  '';

const bupaHref = (item: NavItemFields): string => {
  const href = item.Href?.trim();
  return href || '#';
};

const getBupaTopLevelItems = (fields: NavigationProps['fields']): NavItemFields[] => {
  const entries = Object.values(fields).filter(Boolean);
  if (!entries.length) {
    return [];
  }

  const rootItem = entries.find((item) => isNavRootItem(item));
  if (rootItem?.Children?.length) {
    return rootItem.Children;
  }

  return entries.filter((item) => isNavLevel(item, 1) || !isNavRootItem(item));
};

const getActiveBupaSectionId = (items: NavItemFields[]): string => {
  if (!items.length) {
    return '';
  }

  const currentPath = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';
  if (!currentPath) {
    return items[0].Id;
  }

  const match = items.find((item) => {
    const itemHref = bupaHref(item).toLowerCase();
    const childMatch = item.Children?.some((child) => {
      const childHref = bupaHref(child).toLowerCase();
      return childHref !== '#' && currentPath.startsWith(childHref);
    });

    return childMatch || (itemHref !== '#' && currentPath.startsWith(itemHref));
  });

  return match?.Id || items[0].Id;
};

export const BupaNavigation = ({ params, fields }: NavigationProps): JSX.Element => {
  const id = params.RenderingIdentifier;
  const topLevelItems = useMemo(() => getBupaTopLevelItems(fields), [fields]);
  const [activeSectionId, setActiveSectionId] = useState(() =>
    getActiveBupaSectionId(topLevelItems)
  );

  if (!topLevelItems.length) {
    return (
      <div className={`component navigation ${params.styles || ''}`} id={id}>
        <div className="component-content">[Bupa Navigation]</div>
      </div>
    );
  }

  const activeSection =
    topLevelItems.find((item) => item.Id === activeSectionId) || topLevelItems[0];
  const secondaryItems = activeSection.Children || [];

  return (
    <div className={`component bupa-navigation ${params.styles || ''}`} id={id}>
      <div className="hidden lg:block">
        <div className="bg-[#04123f] text-white">
          <div className="mx-auto flex w-full max-w-[min(96rem,100vw)] items-stretch justify-between px-3 xl:px-6">
            <ul className="flex min-w-0 items-stretch">
              {topLevelItems.map((item) => {
                const isActive = item.Id === activeSection.Id;
                return (
                  <li key={item.Id} className="min-w-0">
                    <a
                      href={bupaHref(item)}
                      onClick={() => setActiveSectionId(item.Id)}
                      className={[
                        'inline-flex h-13 items-center px-4 text-[0.95rem] font-medium no-underline transition-colors xl:px-5',
                        isActive ? 'bg-[#0a1b4d] text-white' : 'text-white hover:bg-[#0a1b4d]',
                      ].join(' ')}
                    >
                      {bupaText(item)}
                    </a>
                  </li>
                );
              })}
            </ul>

            <ul className="ml-5 flex shrink-0 items-stretch text-[0.95rem] font-medium">
              <li>
                <a
                  href="#"
                  className="inline-flex h-13 items-center gap-1.5 px-3 text-white no-underline hover:bg-[#0a1b4d]"
                >
                  <CircleHelp className="h-4 w-4" />
                  Help &amp; support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex h-13 items-center gap-1.5 px-3 text-white no-underline hover:bg-[#0a1b4d]"
                >
                  <Phone className="h-4 w-4" />
                  Contact us
                </a>
              </li>
              <li className="flex items-center border-l border-white/20 px-3">
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-1 rounded-md border border-[#8ea4c3] bg-white px-3 text-[0.93rem] text-[#0a376a]"
                >
                  <Search className="h-4 w-4" />
                  Search Bupa
                </button>
              </li>
              <li className="border-l border-white/20">
                <a
                  href="#"
                  className="inline-flex h-13 items-center gap-1.5 px-4 text-white no-underline hover:bg-[#0a1b4d]"
                >
                  <UserRound className="h-4 w-4" />
                  Sign In
                  <ChevronDown className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-b border-[#d5dbe3] bg-[#f3f4f6]">
          <div className="mx-auto flex w-full max-w-[min(96rem,100vw)] items-center gap-6 px-3 py-2 xl:px-6">
            <a href="/" className="inline-flex items-center gap-2.5 text-[#0079c1] no-underline">
              <div className="grid h-8 w-8 place-items-center rounded-[2px] bg-[#0079c1] text-xs font-bold text-white">
                B
              </div>
              <span className="text-[2.1rem] leading-none font-semibold tracking-tight italic">
                Bupa
              </span>
            </a>

            <ul className="flex min-w-0 flex-wrap items-center gap-x-7 gap-y-1 text-[1.02rem] text-[#2d2d2d]">
              {secondaryItems.map((item) => (
                <li key={item.Id}>
                  <a
                    href={bupaHref(item)}
                    className="whitespace-nowrap text-inherit no-underline hover:text-[#0079c1]"
                  >
                    {bupaText(item)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="overflow-x-auto border-b border-[#cfd6df] bg-[#eceff3] px-1 py-2">
          <ul className="flex min-w-max items-stretch gap-2">
            {topLevelItems.map((item) => {
              const isActive = item.Id === activeSection.Id;
              return (
                <li key={item.Id}>
                  <a
                    href={bupaHref(item)}
                    onClick={() => setActiveSectionId(item.Id)}
                    className={[
                      'inline-flex items-center px-3.5 py-2 text-[2rem] leading-none font-medium no-underline',
                      isActive
                        ? 'bg-[#0079c1] text-white'
                        : 'border border-[#d8dee6] bg-[#f3f4f6] text-[#0f2147]',
                    ].join(' ')}
                  >
                    {bupaText(item)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-[#f5f6f8]">
          <ul>
            {secondaryItems.map((item) => (
              <li key={item.Id} className="border-b border-[#d5dbe3]">
                <a
                  href={bupaHref(item)}
                  className="flex items-center justify-between px-5 py-4 text-[2rem] text-[#0f2147] no-underline"
                >
                  <span>{bupaText(item)}</span>
                  <ChevronRight className="h-7 w-7 stroke-[1.7] text-[#1f2b44]" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <a
              href="#"
              className="flex min-h-18 items-center gap-3 border-t border-white/40 bg-[#0079c1] px-5 text-white no-underline"
            >
              <UserRound className="h-7 w-7 stroke-[1.7]" />
              <span className="text-[2rem]">Sign in</span>
            </a>
            <a
              href="#"
              className="flex min-h-18 items-center gap-3 border-t border-white/40 bg-[#0079c1] px-5 text-white no-underline"
            >
              <CircleHelp className="h-7 w-7 stroke-[1.7]" />
              <span className="text-[2rem]">Help &amp; support</span>
            </a>
            <a
              href="#"
              className="flex min-h-18 items-center gap-3 border-t border-white/40 bg-[#0079c1] px-5 text-white no-underline"
            >
              <Phone className="h-7 w-7 stroke-[1.7]" />
              <span className="text-[2rem]">Contact us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
