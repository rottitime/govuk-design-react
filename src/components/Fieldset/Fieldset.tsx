// https://design-system.service.gov.uk/components/fieldset/

import { sizes } from '@/components/constants'
import { cx } from '@/utils/string.utils'
import type { ComponentProps, ReactNode } from 'react'

type Props = {
  /** Legend content describing the group of controls. */
  legend: ReactNode
  /** Legend size. Defaults to `medium`. */
  size?: keyof typeof sizes
  /** Wraps the legend in an `h1.govuk-fieldset__heading` (use once per page). */
  legendAsPageHeading?: boolean
  legendClassName?: string
  children?: ReactNode
} & ComponentProps<'fieldset'>

export default function Fieldset({
  legend,
  size = 'medium',
  legendAsPageHeading = false,
  legendClassName,
  children,
  className,
  ...props
}: Props) {
  return (
    <fieldset className={cx('govuk-fieldset', className)} {...props}>
      <legend
        className={cx(
          'govuk-fieldset__legend',
          `govuk-fieldset__legend--${sizes[size]}`,
          legendClassName
        )}
      >
        {legendAsPageHeading ? (
          <h1 className="govuk-fieldset__heading">{legend}</h1>
        ) : (
          legend
        )}
      </legend>
      {children}
    </fieldset>
  )
}
