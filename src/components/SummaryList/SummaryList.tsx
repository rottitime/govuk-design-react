// https://design-system.service.gov.uk/components/summary-list/

import type { ComponentProps, ReactNode } from 'react'

import { insertIf } from '@/utils/array.utils'

type SummaryAction = {
  text: string
  href: string
  visuallyHiddenText?: string
}

export type SummaryListRow = {
  key: string
  value: ReactNode
  actions?: SummaryAction[]
}

type Props = {
  rows: SummaryListRow[]
  noBorder?: boolean
} & Omit<ComponentProps<'dl'>, 'children'>

export default function SummaryList({
  rows,
  noBorder = false,
  className,
  ...props
}: Props) {
  const hasActions = rows.some((row) => row.actions && row.actions.length > 0)

  return (
    <dl
      className={[
        'govuk-summary-list',
        ...insertIf(noBorder, 'govuk-summary-list--no-border'),
        ...insertIf(!!className, className as string)
      ].join(' ')}
      {...props}
    >
      {rows.map((row) => (
        <div key={row.key} className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{row.key}</dt>
          <dd className="govuk-summary-list__value">{row.value}</dd>
          {hasActions && (
            <dd className="govuk-summary-list__actions">
              {row.actions && row.actions.length > 0 && (
                <ul className="govuk-summary-list__actions-list">
                  {row.actions.map((action, index) => (
                    <li
                      key={index}
                      className="govuk-summary-list__actions-list-item"
                    >
                      <a className="govuk-link" href={action.href}>
                        {action.text}
                        {action.visuallyHiddenText && (
                          <span className="govuk-visually-hidden">
                            {' '}
                            {action.visuallyHiddenText}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </dd>
          )}
        </div>
      ))}
    </dl>
  )
}
