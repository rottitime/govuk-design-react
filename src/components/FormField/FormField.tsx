import FormGroup from '@/components/FormGroup/FormGroup'
import Hint from '@/components/Hint/Hint'
import Label from '@/components/Label/Label'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import { mergeRefs } from '@/utils/component.utils'
import {
  cloneElement,
  isValidElement,
  useId,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
  type Ref
} from 'react'

type AnyElementProps = { ref?: Ref<unknown>; [key: string]: unknown }

type FormGroupProps = ComponentProps<typeof FormGroup>

type Props = Omit<FormGroupProps, 'children' | 'error'> & {
  label: ReactNode
  hint?: ReactNode
  error?: ReactNode
  id?: string
  /** The input, textarea, select, or custom field component (exactly one element). */
  children: ReactElement<AnyElementProps>
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

/** Reads the child's ref whether it was passed as a prop (React 19) or legacy element.ref. */
function resolveElementRef(
  element: ReactElement<AnyElementProps>
): Ref<unknown> | undefined {
  return element.props.ref ?? (element as { ref?: Ref<unknown> }).ref
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
  children,
  ...formGroupProps
}: Props) {
  // Stable unique prefix for this field instance (ids must not clash on the page).
  const uid = useId()
  const fieldId = idProp ?? uid
  const hintId = `${uid}hint`
  const errorId = `${uid}error`

  const hasError = Boolean(error)
  const showHint = Boolean(hint)

  // Hint and error nodes get these ids; the control's aria-describedby points at them.
  const describedByParts: string[] = []
  if (showHint) describedByParts.push(hintId)
  if (hasError) describedByParts.push(errorId)

  if (!isValidElement(children))
    throw new TypeError('FormField expects a single React element as children')

  const childProps = children.props
  // Keep any aria-describedby already on the child (e.g. extra help) and add hint/error ids.
  const existingDescribedBy =
    typeof childProps['aria-describedby'] === 'string'
      ? childProps['aria-describedby']
      : undefined
  const ariaDescribedby = joinAriaDescribedby(
    existingDescribedBy,
    describedByParts.length ? describedByParts.join(' ') : undefined
  )

  // Prefer the child's id if set; otherwise use id prop or generated fieldId (matches <Label htmlFor>).
  const mergedId = typeof childProps.id === 'string' ? childProps.id : fieldId
  const elementRef = resolveElementRef(children)

  const controlProps: Record<string, unknown> = {
    id: mergedId,
    'aria-describedby': ariaDescribedby,
    'aria-invalid': hasError ? true : undefined,
    // cloneElement replaces ref — merge so the original ref still runs.
    ref: mergeRefs(elementRef)
  }

  // Custom components often accept an `error` prop for styling; DOM tags do not.
  if (hasError && typeof children.type !== 'string') {
    controlProps.error = true
  }

  const control = cloneElement(children, controlProps)

  return (
    <FormGroup {...formGroupProps} error={hasError}>
      <Label htmlFor={mergedId}>{label}</Label>
      {showHint ? <Hint id={hintId}>{hint}</Hint> : null}
      <ErrorMessage id={errorId}>{error}</ErrorMessage>
      {control}
    </FormGroup>
  )
}
