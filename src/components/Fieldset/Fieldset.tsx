// https://design-system.service.gov.uk/components/fieldset/

import type { ComponentProps, ReactNode } from 'react'

import { insertIf } from '@/utils/array.utils'

type Props = {
  legend: string
  legendSize?: 's' | 'm' | 'l' | 'xl'
  legendIsHeading?: boolean
  children: ReactNode
} & ComponentProps<'fieldset'>

export default function Fieldset({
  legend,
  legendSize = 'l',
  legendIsHeading = false,
  children,
  className,
  ...props
}: Props) {
  const legendContent = legendIsHeading ? (
    <h1 className="govuk-fieldset__heading">{legend}</h1>
  ) : (
    legend
  )

  return (
    <fieldset
      className={[
        'govuk-fieldset',
        ...insertIf(!!className, className)
      ].join(' ')}
      {...props}
    >
      <legend
        className={`govuk-fieldset__legend govuk-fieldset__legend--${legendSize}`}
      >
        {legendContent}
      </legend>
      {children}
    </fieldset>
  )
}
