// https://design-system.service.gov.uk/components/skip-link/

import { cx } from '@/utils/string.utils'
import type { ComponentProps, ReactNode } from 'react'

type Props = {
  children?: ReactNode
  /** Target of the skip link. Defaults to `#main-content`. */
  href?: string
} & ComponentProps<'a'>

export default function SkipLink({
  children = 'Skip to main content',
  href = '#main-content',
  className,
  ...props
}: Props) {
  return (
    <a
      className={cx('govuk-skip-link', className)}
      href={href}
      data-module="govuk-skip-link"
      {...props}
    >
      {children}
    </a>
  )
}
