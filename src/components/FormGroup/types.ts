import type { ComponentProps, ReactNode } from 'react'

export type Props = ComponentProps<'div'> & {
  /**
   * Wrapper: adds `govuk-form-group--error` when true.
   * With `renderControl`: boolean forces error styling; a ReactNode is the error message (and implies error styling).
   */
  error?: boolean | ReactNode
  label?: ReactNode
  hint?: ReactNode
  id?: string
  /** Extra ids merged into the control’s `aria-describedby` (field mode). */
  additionalAriaDescribedBy?: string
  /** Field mode: render the input/textarea and spread the provided props. */
  renderControl?: (props: FormGroupRenderControlProps) => ReactNode
}

export type FormGroupRenderControlProps = {
  id: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  error: boolean
}
