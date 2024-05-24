import { tagColors } from '@/const'
import { insertIf } from '@/utils/array.utils'
import { capitalizeFirstLetter } from '@/utils/string.utils'
import type { ComponentProps } from 'react'

type Props = {
  color?: keyof typeof tagColors
  capitalise?: boolean
  children: string
} & ComponentProps<'strong'>

export default function Tag({ capitalise, color, children, ...props }: Props) {
  const tagColor = !!color && color in tagColors && tagColors[color]
  const classes = ['govuk-tag', ...insertIf(!!color, `govuk-tag--${tagColor}`)].join(' ')
  return (
    <strong className={classes} {...props}>
      {capitalise ? capitalizeFirstLetter(children) : children}
    </strong>
  )
}
