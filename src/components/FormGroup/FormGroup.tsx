import type { ComponentProps } from 'react'

type Props = { error?: boolean } & ComponentProps<'div'>

export default function FormGroup({ error, ...props }: Props) {
  return (
    <div
      {...props}
      className={`govuk-form-group ${error ? 'govuk-form-group--error' : ''}`}
    />
  )
}
