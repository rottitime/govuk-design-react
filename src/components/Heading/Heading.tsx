import { sizes } from '@/const'
import { insertIf } from '@/utils/array.utils'
import type { ComponentProps, HTMLAttributes } from 'react'
import Caption from '../Caption/Caption'

type Props = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: keyof typeof sizes
  caption?: string
  captionSize?: ComponentProps<typeof Caption>['size']
} & HTMLAttributes<HTMLHeadElement>

export default function Heading({
  level = 1,
  size = 'large',
  className,
  children,
  caption,
  captionSize,
  ...props
}: Props) {
  const H = `h${level}`
  const tagProps = {
    ...props,
    className: [`govuk-heading-${sizes[size]}`, ...insertIf(!!className, className)].join(
      ' '
    )
  }
  return (
    <H {...tagProps}>
      {caption && <Caption size={captionSize}>{caption}</Caption>}
      {children}
    </H>
  )
}
