import type { ChangeEventHandler, ComponentProps, ReactNode } from 'react'

export type RadiosDivider = {
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
>

export type RadiosOption = InputPassthrough & {
  divider?: false
  id: string
  label: ReactNode
  value: string
  hint?: ReactNode
  defaultChecked?: boolean
  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  /** Shown in a GOV.UK conditional panel; pair with govuk-frontend initialisation for reveal behaviour. */
  conditional?: ReactNode
  /** `id` of the conditional panel; defaults to `conditional-${id}`. */
  conditionalId?: string
}

export type RadiosItem = RadiosDivider | RadiosOption

export function isRadiosDivider(item: RadiosItem): item is RadiosDivider {
  return 'divider' in item && item.divider === true
}
