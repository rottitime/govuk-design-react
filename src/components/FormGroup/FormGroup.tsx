import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import Hint from '@/components/Hint/Hint'
import Label from '@/components/Label/Label'
import { cx } from '@/utils/string.utils'
import { useId } from 'react'
import type { FormGroupRenderControlProps, Props } from './type'

export default function FormGroup({
  error,
  className,
  label,
  hint,
  id: idProp,
  additionalAriaDescribedBy,
  renderControl,
  children,
  ...divProps
}: Props) {
  const uid = useId(),
    hasError = !!error,
    fieldId = idProp ?? uid,
    hintId = `${uid}hint`,
    errorId = `${uid}error`

  const controlProps: FormGroupRenderControlProps = {
    id: fieldId,
    'aria-describedby': cx(
      additionalAriaDescribedBy,
      !!hint && hintId,
      !!hasError && errorId
    ),
    'aria-invalid': hasError || undefined,
    error: hasError
  }

  return (
    <div
      {...divProps}
      className={cx('govuk-form-group', hasError && 'govuk-form-group--error', className)}
    >
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      {hint && <Hint id={hintId}>{hint}</Hint>}
      {!!error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      {renderControl && renderControl(controlProps)}
      {children}
    </div>
  )
}
