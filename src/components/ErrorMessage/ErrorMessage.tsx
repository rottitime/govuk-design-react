import type { ComponentProps } from 'react'

type Props = ComponentProps<'p'>

export default function ErrorMessage({ children, ...props }: Props) {
  return children ? (
    <p className="govuk-error-message" {...props}>
      <span className="govuk-visually-hidden">Error:</span> {children}
    </p>
  ) : null
}
