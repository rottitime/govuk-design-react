// https://design-system.service.gov.uk/components/skip-link/

import type { ComponentProps } from 'react'

import { insertIf } from '@/utils/array.utils'

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
      className={[
        'govuk-skip-link',
        ...insertIf(!!className, className as string)
      ].join(' ')}
      {...props}
      data-module="govuk-skip-link"
    >
      {children}
    </a>
  )
}
