// https://design-system.service.gov.uk/components/breadcrumbs/

import type { ComponentProps } from 'react'

import { insertIf } from '@/utils/array.utils'

export type BreadcrumbItem = {
  text: string
  href?: string
}

type Props = {
  items: BreadcrumbItem[]
  collapseOnMobile?: boolean
} & Omit<ComponentProps<'nav'>, 'children'>

export default function Breadcrumbs({
  items,
  collapseOnMobile = false,
  className,
  ...props
}: Props) {
  return (
    <nav
      className={[
        'govuk-breadcrumbs',
        ...insertIf(collapseOnMobile, 'govuk-breadcrumbs--collapse-on-mobile'),
        ...insertIf(!!className, className as string)
      ].join(' ')}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="govuk-breadcrumbs__list">
        {items.map((item) => (
          <li
            key={item.href || item.text}
            className="govuk-breadcrumbs__list-item"
            {...(!item.href ? { 'aria-current': 'page' as const } : {})}
          >
            {item.href ? (
              <a className="govuk-breadcrumbs__link" href={item.href}>
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
