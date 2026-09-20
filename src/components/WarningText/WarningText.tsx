// https://design-system.service.gov.uk/components/warning-text/

import { cx } from '@/utils/string.utils'
import type { ComponentProps, ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Visually hidden text that prefixes the warning for screen readers. Defaults to `Warning`. */
  iconFallbackText?: string
} & ComponentProps<'div'>

export default function WarningText({
  children,
  iconFallbackText = 'Warning',
  className,
  ...props
}: Props) {
  return (
    <div className={cx('govuk-warning-text', className)} {...props}>
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong className="govuk-warning-text__text">
        <span className="govuk-visually-hidden">{iconFallbackText}</span>
        {children}
      </strong>
    </div>
  )
}
