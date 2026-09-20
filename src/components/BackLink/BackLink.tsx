// https://design-system.service.gov.uk/components/back-link/

import Link from '@/components/Link/Link'
import { cx } from '@/utils/string.utils'
import type { ComponentProps, ReactNode } from 'react'

type Props = {
  children?: ReactNode
  /** Destination of the link. Defaults to `#`. */
  href?: string
  /** Use the inverse style for dark backgrounds. */
  inverse?: boolean
} & ComponentProps<'a'>

export default function BackLink({
  children = 'Back',
  href = '#',
  inverse = false,
  className,
  ...props
}: Props) {
  return (
    <Link
      unstyled
      className={cx('govuk-back-link', inverse && 'govuk-back-link--inverse', className)}
      href={href}
      {...props}
    >
      {children}
    </Link>
  )
}
