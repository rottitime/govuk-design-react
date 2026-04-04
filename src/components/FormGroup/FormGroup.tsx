import { cx } from '@/utils/string.utils'
import type { ComponentProps } from 'react'

type Props = { error?: boolean } & ComponentProps<'div'>

export default function FormGroup({ error, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={cx('govuk-form-group', error && 'govuk-form-group--error', className)}
    />
  )
}
