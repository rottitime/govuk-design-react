// https://design-system.service.gov.uk/components/skip-link/

import type { ComponentProps } from 'react'

type Props = {
  href?: string
} & ComponentProps<'a'>

export default function SkipLink({
  href = '#content',
  children = 'Skip to main content',
  className,
  ...props
}: Props) {
  return (
    <a
      href={href}
      className={`govuk-skip-link ${className || ''}`.trim()}
      data-module="govuk-skip-link"
      {...props}
    >
      {children}
    </a>
  )
}
