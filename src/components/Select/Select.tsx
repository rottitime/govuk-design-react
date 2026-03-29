// https://design-system.service.gov.uk/components/select/

import type { ComponentProps } from 'react'

import { insertIf } from '@/utils/array.utils'

type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

type Props = {
  id: string
  name: string
  label: string
  options: SelectOption[]
  hint?: string
  errorMessage?: string
} & Omit<ComponentProps<'select'>, 'id' | 'children'>

export default function Select({
  id,
  name,
  label,
  options,
  hint,
  errorMessage,
  className,
  ...props
}: Props) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = errorMessage ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div
      className={[
        'govuk-form-group',
        ...insertIf(!!errorMessage, 'govuk-form-group--error')
      ].join(' ')}
    >
      <label className="govuk-label" htmlFor={id}>
        {label}
      </label>
      {hint && (
        <div id={hintId} className="govuk-hint">
          {hint}
        </div>
      )}
      {errorMessage && (
        <p id={errorId} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {errorMessage}
        </p>
      )}
      <select
        className={[
          'govuk-select',
          ...insertIf(!!errorMessage, 'govuk-select--error'),
          ...insertIf(!!className, className)
        ].join(' ')}
        id={id}
        name={name}
        aria-describedby={describedBy}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
