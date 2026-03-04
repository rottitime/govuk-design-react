// https://design-system.service.gov.uk/components/password-input/

import { type ComponentProps, useId, useState } from 'react'

import { insertIf } from '@/utils/array.utils'

type Props = {
  label: string
  name: string
  hint?: string
  errorMessage?: string
  showPasswordText?: string
  hidePasswordText?: string
  showPasswordAriaLabel?: string
  hidePasswordAriaLabel?: string
} & Omit<ComponentProps<'input'>, 'type'>

export default function PasswordInput({
  label,
  name,
  hint,
  errorMessage,
  showPasswordText = 'Show',
  hidePasswordText = 'Hide',
  showPasswordAriaLabel = 'Show password',
  hidePasswordAriaLabel = 'Hide password',
  className,
  id: providedId,
  ...props
}: Props) {
  const autoId = useId()
  const id = providedId ?? autoId
  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      className={[
        'govuk-form-group',
        'govuk-password-input',
        ...insertIf(!!errorMessage, 'govuk-form-group--error'),
        ...insertIf(!!className, className as string)
      ].join(' ')}
      data-module="govuk-password-input"
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
      <div className="govuk-input__wrapper govuk-password-input__wrapper">
        <input
          className={[
            'govuk-input',
            'govuk-password-input__input',
            'govuk-js-password-input-input',
            ...insertIf(!!errorMessage, 'govuk-input--error')
          ].join(' ')}
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          spellCheck={false}
          autoComplete="current-password"
          autoCapitalize="none"
          aria-describedby={[
            ...insertIf(!!hint, hintId),
            ...insertIf(!!errorMessage, errorId)
          ].join(' ') || undefined}
          {...props}
        />
        <button
          type="button"
          className="govuk-button govuk-button--secondary govuk-password-input__toggle govuk-js-password-input-toggle"
          aria-controls={id}
          aria-label={showPassword ? hidePasswordAriaLabel : showPasswordAriaLabel}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? hidePasswordText : showPasswordText}
        </button>
      </div>
    </div>
  )
}
