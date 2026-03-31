// https://design-system.service.gov.uk/components/task-list/

import type { ComponentProps, ReactNode } from 'react'

import { insertIf } from '@/utils/array.utils'

type TaskStatus = {
  text: string
  tagColour?: 'grey' | 'blue' | 'light-blue' | 'turquoise' | 'green' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow'
}

export type TaskItem = {
  title: ReactNode
  href?: string
  hint?: string
  status: TaskStatus
}

type Props = {
  items: TaskItem[]
} & ComponentProps<'ul'>

export default function TaskList({
  items,
  className,
  ...props
}: Props) {
  return (
    <ul
      className={[
        'govuk-task-list',
        ...insertIf(!!className, className)
      ].join(' ')}
      {...props}
    >
      {items.map((item, index) => {
        const nameId = `task-list-${index}-name`
        const statusId = `task-list-${index}-status`
        const hintId = item.hint ? `task-list-${index}-hint` : undefined

        return (
          <li key={index} className="govuk-task-list__item govuk-task-list__item--with-link">
            <div className="govuk-task-list__name-and-hint">
              {item.href ? (
                <a
                  className="govuk-link govuk-task-list__link"
                  href={item.href}
                  aria-describedby={[hintId, statusId].filter(Boolean).join(' ')}
                >
                  {item.title}
                </a>
              ) : (
                <div id={nameId}>{item.title}</div>
              )}
              {item.hint && (
                <div id={hintId} className="govuk-task-list__hint">
                  {item.hint}
                </div>
              )}
            </div>
            <div
              className="govuk-task-list__status"
              id={statusId}
            >
              {item.status.tagColour ? (
                <strong className={`govuk-tag govuk-tag--${item.status.tagColour}`}>
                  {item.status.text}
                </strong>
              ) : (
                item.status.text
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
