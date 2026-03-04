// https://design-system.service.gov.uk/components/pagination/

import type { ComponentProps } from 'react'

export type PaginationItem =
  | { type: 'page'; number: number; href: string; current?: boolean }
  | { type: 'ellipsis' }

type Props = {
  items?: PaginationItem[]
  previous?: { href: string; labelText?: string }
  next?: { href: string; labelText?: string }
} & ComponentProps<'nav'>

export default function Pagination({
  items,
  previous,
  next,
  className,
  ...props
}: Props) {
  return (
    <nav
      className={`govuk-pagination ${className || ''}`.trim()}
      aria-label="Pagination"
      {...props}
    >
      {previous && (
        <div className="govuk-pagination__prev">
          <a
            className="govuk-link govuk-pagination__link"
            href={previous.href}
            rel="prev"
          >
            <svg
              className="govuk-pagination__icon govuk-pagination__icon--prev"
              xmlns="http://www.w3.org/2000/svg"
              height="13"
              width="15"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 15 13"
            >
              <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z" />
            </svg>
            <span className="govuk-pagination__link-title">
              Previous
              {previous.labelText && (
                <span className="govuk-visually-hidden">:</span>
              )}
            </span>
            {previous.labelText && (
              <span className="govuk-pagination__link-label">
                {previous.labelText}
              </span>
            )}
          </a>
        </div>
      )}

      {items && items.length > 0 && (
        <ul className="govuk-pagination__list">
          {items.map((item, index) =>
            item.type === 'ellipsis' ? (
              <li
                key={`ellipsis-${index}`}
                className="govuk-pagination__item govuk-pagination__item--ellipses"
              >
                ⋯
              </li>
            ) : (
              <li
                key={item.number}
                className={`govuk-pagination__item${item.current ? ' govuk-pagination__item--current' : ''}`}
              >
                <a
                  className="govuk-link govuk-pagination__link"
                  href={item.href}
                  aria-label={`Page ${item.number}`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.number}
                </a>
              </li>
            )
          )}
        </ul>
      )}

      {next && (
        <div className="govuk-pagination__next">
          <a
            className="govuk-link govuk-pagination__link"
            href={next.href}
            rel="next"
          >
            <span className="govuk-pagination__link-title">
              Next
              {next.labelText && (
                <span className="govuk-visually-hidden">:</span>
              )}
            </span>
            {next.labelText && (
              <span className="govuk-pagination__link-label">
                {next.labelText}
              </span>
            )}
            <svg
              className="govuk-pagination__icon govuk-pagination__icon--next"
              xmlns="http://www.w3.org/2000/svg"
              height="13"
              width="15"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 15 13"
            >
              <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z" />
            </svg>
          </a>
        </div>
      )}
    </nav>
  )
}
