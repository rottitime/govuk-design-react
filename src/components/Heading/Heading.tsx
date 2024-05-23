import { sizes } from '@/const'
import { insertIf } from '@/utils/array.utils'
import type { HTMLAttributes } from 'react'

type Props = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: keyof typeof sizes
} & HTMLAttributes<HTMLHeadElement>

export default function Heading({
  level = 1,
  size = 'large',
  className,
  ...props
}: Props) {
  const H = `h${level}`
  const tagProps = {
    ...props,
    className: [`govuk-heading-${sizes[size]}`, ...insertIf(!!className, className)].join(
      ' '
    )
  }
  return <H {...tagProps} />
}
