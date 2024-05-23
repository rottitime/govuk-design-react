import { sizes } from '@/const'
import type { Subset } from '@/types'
import { insertIf } from '@/utils/array.utils'

type Props = {
  size?: Subset<keyof typeof sizes, 'medium' | 'large' | 'extra-large'>
  invisible?: boolean
}

export default function HR({ size, invisible, ...props }: Props) {
  const sizeClass = !!size && size in sizes && sizes[size]
  const classes = [
    'govuk-section-break',
    ...insertIf(!!sizeClass, `govuk-section-break--${sizeClass}`),
    ...insertIf(!invisible, 'govuk-section-break--visible')
  ].join(' ')
  return <hr className={classes} {...props} />
}
