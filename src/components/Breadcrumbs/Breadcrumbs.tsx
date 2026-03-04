// https://design-system.service.gov.uk/components/breadcrumbs/

import type { ComponentProps } from 'react'

export type BreadcrumbItem = {
  text: string
  href?: string
}

type Props = {
  items: BreadcrumbItem[]
  collapseOnMobile?: boolean
} & ComponentProps<'nav'>

export default function Breadcrumbs({
  items,
  collapseOnMobile,
  className,
  ...props
}: Props) {
  const classes = [
    'govuk-breadcrumbs',
    ...(collapseOnMobile ? ['govuk-breadcrumbs--collapse-on-mobile'] : [])
  ].join(' ')

  return (
    <nav
      className={`${classes} ${className || ''}`.trim()}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="govuk-breadcrumbs__list">
        {items.map((item, index) => (
          <li key={index} className="govuk-breadcrumbs__list-item">
            {item.href ? (
              <a className="govuk-breadcrumbs__link" href={item.href}>
                {item.text}
              </a>
            ) : (
              <span aria-current="page">{item.text}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
