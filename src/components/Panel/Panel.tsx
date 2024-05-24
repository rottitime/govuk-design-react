//https://design-system.service.gov.uk/components/panel/

import type { ComponentProps, ReactNode } from 'react'

type Props = {
  title: string
  children?: ReactNode
} & Omit<ComponentProps<'div'>, 'children'>

export default function Panel({ title, children, ...props }: Props) {
  return (
    <div className="govuk-panel govuk-panel--confirmation" {...props}>
      <h1 className="govuk-panel__title">{title}</h1>
      {children && <div className="govuk-panel__body">{children}</div>}
    </div>
  )
}
