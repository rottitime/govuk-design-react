// https://design-system.service.gov.uk/components/inset-text/

import type { ComponentProps, ReactNode } from 'react'

type Props = {
  children: ReactNode
} & Omit<ComponentProps<'div'>, 'children'>

export default function InsetText({
  children,
  className,
  ...props
}: Props) {
  return (
    <div className={`govuk-inset-text ${className || ''}`.trim()} {...props}>
      {children}
    </div>
  )
}
