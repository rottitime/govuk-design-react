import { insertIf } from '@/utils/array.utils'
import type { ComponentProps } from 'react'

type Props = {
  warning?: boolean
  secondary?: boolean
  href?: string
} & ComponentProps<'button'>

export default function Button({ warning, secondary, ...props }: Props) {
  const className = [
    'govuk-button',
    ...insertIf(!!warning, 'govuk-button--warning'),
    ...insertIf(!!secondary, 'govuk-button--secondary')
  ].join(' ')

  return <button className={className} {...props} />
}
