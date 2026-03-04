// https://design-system.service.gov.uk/components/warning-text/

import type { ComponentProps, ReactNode } from 'react'

type Props = {
  children: ReactNode
  assistiveText?: string
} & Omit<ComponentProps<'div'>, 'children'>

export default function WarningText({
  children,
  assistiveText = 'Warning',
  className,
  ...props
}: Props) {
  return (
    <div
      className={`govuk-warning-text ${className || ''}`.trim()}
      {...props}
    >
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong className="govuk-warning-text__text">
        <span className="govuk-visually-hidden">{assistiveText}</span>
        {children}
      </strong>
    </div>
  )
}
