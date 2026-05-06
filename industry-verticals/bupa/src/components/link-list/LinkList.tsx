'use client';

import React, { useSyncExternalStore } from 'react';
import { Link as ContentSdkLink, Text, LinkField, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

export interface LinkListProps extends ComponentProps {
  fields: {
    /**
     * The Integrated graphQL query result. This illustrates the way to access the datasource children.
     */
    data: {
      datasource: {
        children: {
          results: Array<{
            field: {
              link: LinkField;
            };
          }>;
        };
        field: {
          title: TextField;
        };
      };
    };
  };
}

const LinkListItem = ({
  index,
  total,
  field,
  className,
}: {
  index: number;
  total: number;
  field: LinkField;
  className?: string;
}) => {
  const classNames = [
    `item${index}`,
    index % 2 === 0 ? 'odd' : 'even',
    index === 0 ? 'first' : '',
    index === total - 1 ? 'last' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li className={classNames}>
      <div className={`field-link`}>
        <ContentSdkLink field={field} className={className} />
      </div>
    </li>
  );
};

export const Default = (props: LinkListProps) => {
  const { params, fields } = props;
  const rawStyles = params.styles || '';
  const datasource = fields?.data?.datasource;
  const styles = `component link-list ${rawStyles}`.trim();
  const id = params.RenderingIdentifier;

  const renderContent = () => {
    if (!datasource) {
      return <h3>Link List</h3>;
    }

    const links = datasource.children.results
      .filter((element) => element?.field?.link)
      .map((element, index) => (
        <LinkListItem
          key={`${index}-${element.field?.link}`}
          index={index}
          total={datasource.children.results.length}
          field={element.field.link}
        />
      ));

    return (
      <>
        <Text tag="h3" field={datasource.field?.title} />
        <ul>{links}</ul>
      </>
    );
  };

  return (
    <div className={styles} id={id}>
      <div className="component-content">{renderContent()}</div>
    </div>
  );
};

export const SecondaryNavigation = ({ params, fields }: LinkListProps) => {
  const datasource = fields?.data?.datasource;
  const styles = `component link-list ${params.styles || ''}`.trim();
  const id = params.RenderingIdentifier;

  const renderContent = () => {
    if (!datasource) {
      return <h3>Link List</h3>;
    }

    const links = datasource.children.results
      .filter((element) => element?.field?.link)
      .map((element, index) => (
        <LinkListItem
          key={`${index}-${element.field?.link}`}
          index={index}
          total={datasource.children.results.length}
          field={element.field.link}
          className="navigation-item"
        />
      ));

    return <ul className="flex gap-x-6 gap-y-4 text-xs in-[.drawer-content]:flex-col!">{links}</ul>;
  };

  return (
    <div className={styles} id={id}>
      <div className="component-content">{renderContent()}</div>
    </div>
  );
};

/**
 * Footer utility row: horizontal links separated by pipes, no title (ignores datasource title).
 */
export const UtilityFooter = ({ params, fields }: LinkListProps) => {
  const datasource = fields?.data?.datasource;
  const styles = `component link-list link-list--utility-footer ${params.styles || ''}`.trim();
  const id = params.RenderingIdentifier;

  const renderContent = () => {
    if (!datasource) {
      return <h3>Link List</h3>;
    }

    const results = datasource.children.results.filter((element) => element?.field?.link);
    const total = results.length;

    const links = results.map((element, index) => {
      const classNames = [
        `item${index}`,
        index % 2 === 0 ? 'odd' : 'even',
        index === 0 ? 'first' : '',
        index === total - 1 ? 'last' : '',
      ]
        .filter(Boolean)
        .join(' ');
      const isLast = index === total - 1;
      return (
        <li key={`${index}-${element.field?.link}`} className={classNames}>
          <span className="link-list__utility-footer-pair">
            <div className="field-link">
              <ContentSdkLink
                field={element.field.link}
                className="link-list__utility-footer-link"
              />
            </div>
            {!isLast ? (
              <span className="link-list__utility-footer-pipe" aria-hidden>
                |
              </span>
            ) : null}
          </span>
        </li>
      );
    });

    return (
      <ul className="link-list__utility-footer" role="navigation" aria-label="Site footer">
        {links}
      </ul>
    );
  };

  return (
    <div className={styles} id={id}>
      <div className="component-content">{renderContent()}</div>
    </div>
  );
};

function subscribeMd(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }
  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getMdSnapshot(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia('(min-width: 768px)').matches;
}

function getMdServerSnapshot(): boolean {
  return false;
}

function useMdUp() {
  return useSyncExternalStore(subscribeMd, getMdSnapshot, getMdServerSnapshot);
}

/**
 * Bupa footer nav column: below the `md` breakpoint, native accordion (`details` / summary + “+”).
 * From `md` upward, a normal heading + list (no accordion) for the multi-column layout.
 */
export const Footer = ({ params, fields }: LinkListProps) => {
  const datasource = fields?.data?.datasource;
  const styles = `component link-list link-list--footer-link-list ${params.styles || ''}`.trim();
  const id = params.RenderingIdentifier;
  const isMdUp = useMdUp();

  if (!datasource) {
    return (
      <div className={styles} id={id}>
        <div className="component-content">
          <h3>Link List</h3>
        </div>
      </div>
    );
  }

  const results = datasource.children.results.filter((element) => element?.field?.link);
  const total = results.length;

  const links = results.map((element, index) => (
    <LinkListItem
      key={`${index}-${element.field?.link}`}
      index={index}
      total={total}
      field={element.field.link}
    />
  ));

  const list = <ul className="link-list__footer-link-list-links">{links}</ul>;

  return (
    <div className={styles} id={id}>
      <div className="component-content">
        {isMdUp ? (
          <>
            <Text
              tag="h3"
              field={datasource.field?.title}
              className="link-list__footer-link-list-title"
            />
            {list}
          </>
        ) : (
          <details className="link-list__footer-link-list-details">
            <summary className="link-list__footer-link-list-summary">
              <Text
                tag="span"
                field={datasource.field?.title}
                className="link-list__footer-link-list-summary-text"
              />
              <span className="link-list__footer-link-list-chevron" aria-hidden />
            </summary>
            {list}
          </details>
        )}
      </div>
    </div>
  );
};
