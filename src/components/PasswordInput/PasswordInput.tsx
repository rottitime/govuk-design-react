// https://design-system.service.gov.uk/components/password-input/

import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import Hint from '@/components/Hint/Hint'
import Label from '@/components/Label/Label'
import { cx } from '@/utils/string.utils'
import { useId, useState, type ComponentProps, type ReactNode } from 'react'

type Props = {
  label: ReactNode
  hint?: ReactNode
  error?: ReactNode
  /** Text for the reveal button when the password is hidden. Defaults to `Show`. */
  showPasswordText?: string
  /** Text for the reveal button when the password is shown. Defaults to `Hide`. */
  hidePasswordText?: string
  /** aria-label for the reveal button when the password is hidden. Defaults to `Show password`. */
  showPasswordAriaLabel?: string
  /** aria-label for the reveal button when the password is shown. Defaults to `Hide password`. */
  hidePasswordAriaLabel?: string
} & Omit<ComponentProps<'input'>, 'type'>

export default function PasswordInput({
  label,
  hint,
  error,
  showPasswordText = 'Show',
  hidePasswordText = 'Hide',
  showPasswordAriaLabel = 'Show password',
  hidePasswordAriaLabel = 'Hide password',
  id: idProp,
  className,
  autoComplete = 'current-password',
  ...inputProps
}: Props) {
  const uid = useId()
  const inputId = idProp ?? uid
  const hintId = `${uid}-hint`
  const errorId = `${uid}-error`

  const [visible, setVisible] = useState(false)

  const hasHint = hint != null && hint !== ''
  const hasError = error != null && error !== ''

  const describedBy = cx(hasHint && hintId, hasError && errorId)

  return (
    <div className={cx('govuk-form-group', hasError && 'govuk-form-group--error')}>
      <Label htmlFor={inputId}>{label}</Label>
      {hasHint && <Hint id={hintId}>{hint}</Hint>}
      {hasError && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      <div
        className="govuk-input__wrapper govuk-password-input__wrapper"
        data-module="govuk-password-input"
      >
        <input
          {...inputProps}
          className={cx(
            'govuk-input',
            'govuk-password-input__input',
            'govuk-js-password-input-input',
            hasError && 'govuk-input--error',
            className
          )}
          id={inputId}
          type={visible ? 'text' : 'password'}
          spellCheck={false}
          autoCapitalize="none"
          autoComplete={autoComplete}
          aria-describedby={describedBy}
        />
        <button
          type="button"
          className="govuk-button govuk-button--secondary govuk-password-input__toggle govuk-js-password-input-toggle"
          data-module="govuk-button"
          aria-controls={inputId}
          aria-label={visible ? hidePasswordAriaLabel : showPasswordAriaLabel}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? hidePasswordText : showPasswordText}
        </button>
      </div>
    </div>
  )
}
