// https://design-system.service.gov.uk/components/task-list/

import Tag from '@/components/Tag/Tag'
import { tagColors } from '@/const'
import { cx } from '@/utils/string.utils'
import { useId, type ComponentProps, type ReactNode } from 'react'

type TaskStatus = {
  text: string
  tagColour?: keyof typeof tagColors
}

type TaskItemBase = {
  title: ReactNode
  hint?: ReactNode
  description?: ReactNode
  status: TaskStatus
}

type TaskItemWithLink = TaskItemBase & {
  href: string
  id?: string
}

type TaskItemWithoutLink = TaskItemBase & {
  id: string
  href?: never
}

export type TaskItem = TaskItemWithLink | TaskItemWithoutLink

export type TaskListProps = {
  items: TaskItem[]
} & ComponentProps<'ul'>

const normaliseIdPart = (value: string) => value.replace(/[^a-zA-Z0-9_-]+/g, '-')

export default function TaskList({ items, className, ...props }: TaskListProps) {
  const listId = useId()

  return (
    <ul className={cx('govuk-task-list', className)} {...props}>
      {items.map((item) => {
        const itemKey = (item.id ?? item.href) as string
        const itemId = `${listId}-${normaliseIdPart(itemKey)}`
        const statusId = `${itemId}-status`
        const hint = item.description ?? item.hint
        const hintId = hint ? `${itemId}-hint` : undefined
        const describedBy = cx(hintId, statusId)

        return (
          <li
            key={itemKey}
            className={cx(
              'govuk-task-list__item',
              item.href && 'govuk-task-list__item--with-link'
            )}
          >
            <div className="govuk-task-list__name-and-hint">
              {item.href ? (
                <a
                  className="govuk-link govuk-task-list__link"
                  href={item.href}
                  aria-describedby={describedBy}
                >
                  {item.title}
                </a>
              ) : (
                <div>{item.title}</div>
              )}
              {hint && (
                <div id={hintId} className="govuk-task-list__hint">
                  {hint}
                </div>
              )}
            </div>
            <div className="govuk-task-list__status" id={statusId}>
              {item.status.tagColour ? (
                <Tag color={item.status.tagColour}>{item.status.text}</Tag>
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
