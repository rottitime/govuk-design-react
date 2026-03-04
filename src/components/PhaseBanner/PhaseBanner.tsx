// https://design-system.service.gov.uk/components/phase-banner/

import type { ComponentProps, ReactNode } from 'react'

type Props = {
  tag: string
  children: ReactNode
} & Omit<ComponentProps<'div'>, 'children'>

export default function PhaseBanner({
  tag,
  children,
  className,
  ...props
}: Props) {
  return (
    <div className={`govuk-phase-banner ${className || ''}`.trim()} {...props}>
      <p className="govuk-phase-banner__content">
        <strong className="govuk-tag govuk-phase-banner__content__tag">
          {tag}
        </strong>
        <span className="govuk-phase-banner__text">{children}</span>
      </p>
    </div>
  )
}
