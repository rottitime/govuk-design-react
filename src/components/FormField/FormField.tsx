import FormGroup from '@/components/FormGroup/FormGroup'
import Hint from '@/components/Hint/Hint'
import Label from '@/components/Label/Label'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import { useId, type ComponentProps, type ReactNode } from 'react'

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

/** Combines several aria-describedby values into one string, without duplicate ids. */
function joinAriaDescribedby(...parts: (string | undefined)[]): string | undefined {
  const seen = new Set<string>()
  const ids: string[] = []
  for (const part of parts) {
    if (!part?.trim()) continue
    for (const id of part.trim().split(/\s+/)) {
      if (id && !seen.has(id)) {
        seen.add(id)
        ids.push(id)
      }
    }
  }
  return ids.length ? ids.join(' ') : undefined
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

  const hasError = Boolean(error)
  const showHint = Boolean(hint)

  const describedByParts: string[] = []
  if (showHint) describedByParts.push(hintId)
  if (hasError) describedByParts.push(errorId)

  const ariaDescribedby = joinAriaDescribedby(
    additionalAriaDescribedBy,
    describedByParts.length ? describedByParts.join(' ') : undefined
  )

  const controlProps: FormFieldRenderControlProps = {
    id: fieldId,
    'aria-describedby': ariaDescribedby,
    'aria-invalid': hasError ? true : undefined,
    error: hasError
  }

  return (
    <FormGroup {...formGroupProps} error={hasError}>
      <Label htmlFor={fieldId}>{label}</Label>
      {showHint ? <Hint id={hintId}>{hint}</Hint> : null}
      <ErrorMessage id={errorId}>{error}</ErrorMessage>
      {renderControl(controlProps)}
    </FormGroup>
  )
}
