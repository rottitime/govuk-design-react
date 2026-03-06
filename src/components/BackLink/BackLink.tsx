// https://design-system.service.gov.uk/components/back-link/

import type { ComponentProps } from 'react'

type Props = {
  href?: string
} & ComponentProps<'a'>

export default function BackLink({
  href = '#',
  children = 'Back',
  className,
  ...props
}: Props) {
  return (
    <a
      href={href}
      className={`govuk-back-link ${className || ''}`.trim()}
      {...props}
    >
      {children}
    </a>
  )
}
