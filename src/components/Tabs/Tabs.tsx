// https://design-system.service.gov.uk/components/tabs/

import type { ComponentProps, ReactNode } from 'react'

import { insertIf } from '@/utils/array.utils'

export type TabItem = {
  id: string
  label: string
  content: ReactNode
}

type Props = {
  title: string
  items: TabItem[]
} & ComponentProps<'div'>

export default function Tabs({
  title,
  items,
  className,
  ...props
}: Props) {
  return (
    <div
      className={[
        'govuk-tabs',
        ...insertIf(!!className, className as string)
      ].join(' ')}
      data-module="govuk-tabs"
      {...props}
    >
      <h2 className="govuk-tabs__title">{title}</h2>
      <ul className="govuk-tabs__list">
        {items.map((item) => (
          <li
            key={item.id}
            className="govuk-tabs__list-item"
          >
            <a className="govuk-tabs__tab" href={`#${item.id}`}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      {items.map((item) => (
        <div
          key={item.id}
          className="govuk-tabs__panel"
          id={item.id}
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}
