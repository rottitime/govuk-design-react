import { sizes } from '@/const'
import type { Subset } from '@/types'
import type { ComponentProps } from 'react'

type Props = {
  size?: Subset<keyof typeof sizes, 'medium' | 'large' | 'extra-large'>
} & ComponentProps<'span'>

export default function Caption({ size = 'medium', ...props }: Props) {
  const sizeClass = !!size && size in sizes && sizes[size]
  return <span className={`govuk-caption-${sizeClass}`} {...props} />
}
