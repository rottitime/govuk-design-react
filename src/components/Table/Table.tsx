// https://design-system.service.gov.uk/components/table/

import type { ComponentProps, ReactNode } from 'react'

import { insertIf } from '@/utils/array.utils'

type TableHeader = {
  text: ReactNode
  format?: 'numeric'
}

type TableCell = {
  text: ReactNode
  format?: 'numeric'
}

type Props = {
  caption?: string
  captionSize?: 's' | 'm' | 'l' | 'xl'
  head?: TableHeader[]
  rows: TableCell[][]
  firstCellIsHeader?: boolean
} & Omit<ComponentProps<'table'>, 'children'>

export default function Table({
  caption,
  captionSize = 'm',
  head,
  rows,
  firstCellIsHeader = false,
  className,
  ...props
}: Props) {
  return (
    <table
      className={[
        'govuk-table',
        ...insertIf(!!className, className as string)
      ].join(' ')}
      {...props}
    >
      {caption && (
        <caption
          className={`govuk-table__caption govuk-table__caption--${captionSize}`}
        >
          {caption}
        </caption>
      )}
      {head && (
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            {head.map((header, index) => (
              <th
                key={index}
                scope="col"
                className={[
                  'govuk-table__header',
                  ...insertIf(
                    header.format === 'numeric',
                    'govuk-table__header--numeric'
                  )
                ].join(' ')}
              >
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className="govuk-table__body">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="govuk-table__row">
            {row.map((cell, cellIndex) =>
              firstCellIsHeader && cellIndex === 0 ? (
                <th
                  key={cellIndex}
                  scope="row"
                  className={[
                    'govuk-table__header',
                    ...insertIf(
                      cell.format === 'numeric',
                      'govuk-table__header--numeric'
                    )
                  ].join(' ')}
                >
                  {cell.text}
                </th>
              ) : (
                <td
                  key={cellIndex}
                  className={[
                    'govuk-table__cell',
                    ...insertIf(
                      cell.format === 'numeric',
                      'govuk-table__cell--numeric'
                    )
                  ].join(' ')}
                >
                  {cell.text}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
