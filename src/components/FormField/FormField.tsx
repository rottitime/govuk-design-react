import FormGroup from '@/components/FormGroup/FormGroup'
import Hint from '@/components/Hint/Hint'
import Label from '@/components/Label/Label'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import { useId, type ComponentProps, type ReactNode } from 'react'
import { cx } from '@/utils/string.utils'

type FormGroupProps = ComponentProps<typeof FormGroup>

/** Props to spread onto the control; `error` matches Input/Textarea (error styling). */
export type FormFieldRenderControlProps = {
  id: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  error: boolean
}

type Props = Omit<FormGroupProps, 'children' | 'error'> & {
  label: ReactNode
  hint?: ReactNode
  error?: ReactNode
  id?: string
  /** Extra ids to include in `aria-describedby` (merged with hint/error ids). */
  additionalAriaDescribedBy?: string
  /** Renders the control; spread the props onto Input/Textarea (or map `error` for custom fields). */
  renderControl: (props: FormFieldRenderControlProps) => ReactNode
}

/**
 * Wraps one form control with label, optional hint, and optional error (GOV.UK pattern).
 * Wires id, aria-describedby, and aria-invalid so screen readers link the control to hint/error.
 */
export default function FormField({
  label,
  hint,
  error,
  id: idProp,
  additionalAriaDescribedBy,
  renderControl,
  ...formGroupProps
}: Props) {
  const uid = useId()
  const fieldId = idProp ?? uid
  const hintId = `${uid}hint`
  const errorId = `${uid}error`

  const hasError = !!error,
    showHint = !!hint

  const describedByParts: string[] = []
  if (showHint) describedByParts.push(hintId)
  if (hasError) describedByParts.push(errorId)

  const controlProps: FormFieldRenderControlProps = {
    id: fieldId,
    'aria-describedby': cx(
      additionalAriaDescribedBy,
      describedByParts.length ? describedByParts.join(' ') : undefined
    ),
    'aria-invalid': hasError ? true : undefined,
    error: hasError
  }

  return (
    <FormGroup {...formGroupProps} error={hasError}>
      dekijdejiode
      <Label htmlFor={fieldId}>{label}</Label>
      {showHint ? <Hint id={hintId}>{hint}</Hint> : null}
      <ErrorMessage id={errorId}>{error}</ErrorMessage>
      {renderControl(controlProps)}
    </FormGroup>
  )
}
