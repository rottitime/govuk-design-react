import FormGroup from '@/components/FormGroup/FormGroup'
import Hint from '@/components/Hint/Hint'
import Label from '@/components/Label/Label'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import { mergeRefs } from '@/utils/refs.utils'
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
  children: ReactElement<AnyElementProps>
}

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

function resolveElementRef(element: ReactElement<AnyElementProps>): Ref<unknown> | undefined {
  // React 19: ref is a normal prop; avoid reading legacy `element.ref`
  return element.props.ref ?? (element as { ref?: Ref<unknown> }).ref
}

export default function FormField({
  label,
  hint,
  error,
  id: idProp,
  children,
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

  if (!isValidElement(children)) {
    throw new TypeError('FormField expects a single React element as children')
  }

  const childProps = children.props
  const existingDescribedBy =
    typeof childProps['aria-describedby'] === 'string'
      ? childProps['aria-describedby']
      : undefined
  const ariaDescribedby = joinAriaDescribedby(
    existingDescribedBy,
    describedByParts.length ? describedByParts.join(' ') : undefined
  )

  const mergedId =
    typeof childProps.id === 'string' ? childProps.id : fieldId
  const elementRef = resolveElementRef(children)

  const controlProps: Record<string, unknown> = {
    id: mergedId,
    'aria-describedby': ariaDescribedby,
    'aria-invalid': hasError ? true : undefined,
    ref: mergeRefs(elementRef)
  }

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
