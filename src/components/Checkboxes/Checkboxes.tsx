// https://design-system.service.gov.uk/components/checkboxes/

import { type ComponentProps, type ReactNode, useId } from 'react'

import { insertIf } from '@/utils/array.utils'

type CheckboxItem = {
  value: string
  label: ReactNode
  hint?: string
  checked?: boolean
  disabled?: boolean
  conditional?: ReactNode
  divider?: never
}

type DividerItem = {
  divider: string
}

type Item = CheckboxItem | DividerItem

type Props = {
  name: string
  items: Item[]
  fieldsetLegend?: string
  fieldsetLegendIsPageHeading?: boolean
  hint?: string
  errorMessage?: string
  small?: boolean
} & ComponentProps<'div'>

function isDivider(item: Item): item is DividerItem {
  return 'divider' in item && item.divider !== undefined
}

export default function Checkboxes({
  name,
  items,
  fieldsetLegend,
  fieldsetLegendIsPageHeading = false,
  hint,
  errorMessage,
  small = false,
  className,
  ...props
}: Props) {
  const autoId = useId()
  const hintId = `${autoId}-hint`
  const errorId = `${autoId}-error`

  const describedBy = [
    ...insertIf(!!hint, hintId),
    ...insertIf(!!errorMessage, errorId)
  ].join(' ') || undefined

  const checkboxesMarkup = (
    <>
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
      <div
        className={[
          'govuk-checkboxes',
          ...insertIf(small, 'govuk-checkboxes--small')
        ].join(' ')}
        data-module="govuk-checkboxes"
      >
        {items.map((item, index) => {
          if (isDivider(item)) {
            return (
              <div key={`divider-${index}`} className="govuk-checkboxes__divider">
                {item.divider}
              </div>
            )
          }

          const itemId = `${autoId}-${index}`
          const itemHintId = `${itemId}-hint`

          return (
            <div key={item.value} className="govuk-checkboxes__item">
              <input
                className="govuk-checkboxes__input"
                id={itemId}
                name={name}
                type="checkbox"
                value={item.value}
                defaultChecked={item.checked}
                disabled={item.disabled}
                aria-describedby={item.hint ? itemHintId : undefined}
                {...(item.conditional
                  ? { 'data-aria-controls': `conditional-${itemId}` }
                  : {})}
              />
              <label
                className="govuk-label govuk-checkboxes__label"
                htmlFor={itemId}
              >
                {item.label}
              </label>
              {item.hint && (
                <div
                  id={itemHintId}
                  className="govuk-hint govuk-checkboxes__hint"
                >
                  {item.hint}
                </div>
              )}
              {item.conditional && (
                <div
                  className="govuk-checkboxes__conditional"
                  id={`conditional-${itemId}`}
                >
                  {item.conditional}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )

  return (
    <div
      className={[
        'govuk-form-group',
        ...insertIf(!!errorMessage, 'govuk-form-group--error'),
        ...insertIf(!!className, className)
      ].join(' ')}
      {...props}
    >
      {fieldsetLegend ? (
        <fieldset
          className="govuk-fieldset"
          aria-describedby={describedBy}
        >
          <legend className="govuk-fieldset__legend">
            {fieldsetLegendIsPageHeading ? (
              <h1 className="govuk-fieldset__heading">{fieldsetLegend}</h1>
            ) : (
              fieldsetLegend
            )}
          </legend>
          {checkboxesMarkup}
        </fieldset>
      ) : (
        checkboxesMarkup
      )}
    </div>
  )
}
