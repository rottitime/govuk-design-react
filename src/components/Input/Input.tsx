import { layout } from '@/const'
import { insertIf } from '@/utils/array.utils'
import { forwardRef, type HTMLProps } from 'react'

type Props = {
  error?: boolean
  characters?: 2 | 3 | 4 | 5 | 10 | 20
  width?: keyof typeof layout
} & HTMLProps<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>(
  ({ width, error, className, characters, ...props }, ref) => {
    const widthClass = !!width && width in layout && layout[width]
    const classes = [
      'govuk-input',
      ...insertIf(!!className, className),
      ...insertIf(!!widthClass, `govuk-!-width-${widthClass}`),
      ...insertIf(!!error, `govuk-input--error`),
      ...insertIf(!!characters, `govuk-input--width-${characters}`)
    ].join(' ')

    return <input ref={ref} className={classes} {...props} />
  }
)

export default Input
