import { cx } from '@/utils/string.utils'
import { type ComponentProps, forwardRef } from 'react'

type Props = {
  error?: boolean
  options: { label: string; value: string }[]
} & ComponentProps<'select'>

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ error, className, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cx('govuk-select', className, !!error && 'govuk-select--error')}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
)
Select.displayName = 'Select'

export default Select
