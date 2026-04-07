import type { ChangeEventHandler, ComponentProps, ReactNode } from 'react'

export type CheckboxesDivider = {
  divider: true
  /** Defaults to `or` */
  text?: string
}

type InputPassthrough = Omit<
  ComponentProps<'input'>,
  | 'type'
  | 'id'
  | 'name'
  | 'value'
  | 'defaultChecked'
  | 'checked'
  | 'onChange'
  | 'aria-describedby'
  | 'data-aria-controls'
  | 'data-behaviour'
>

export type CheckboxesOption = InputPassthrough & {
  divider?: false
  id: string
  label: ReactNode
  value: string
  /** Overrides the group `name` when set (e.g. independent names in one fieldset). */
  name?: string
  hint?: ReactNode
  /** Sets `data-behaviour="exclusive"` for a “none of these” style option. */
  exclusive?: boolean
  defaultChecked?: boolean
  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  /** Shown in a GOV.UK conditional panel; pair with govuk-frontend initialisation for reveal behaviour. */
  conditional?: ReactNode
  /** `id` of the conditional panel; defaults to `conditional-${id}`. */
  conditionalId?: string
}

export type CheckboxesItem = CheckboxesDivider | CheckboxesOption

export function isCheckboxesDivider(item: CheckboxesItem): item is CheckboxesDivider {
  return 'divider' in item && item.divider === true
}
