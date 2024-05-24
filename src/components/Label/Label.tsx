import { sizes } from '@/const'
import type { Subset } from '@/types'
import { insertIf } from '@/utils/array.utils'
import type { ComponentProps } from 'react'

type Props = {
  size?: Subset<keyof typeof sizes, 'small' | 'medium' | 'large'>
} & ComponentProps<'label'>

export default function Label({ size, ...props }: Props) {
  const sizeClass = !!size && size in sizes && sizes[size]
  const classes = ['govuk-label', ...insertIf(!!size, `govuk-label--${sizeClass}`)].join(
    ' '
  )
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  return <label className={classes} {...props} />
}
