// https://design-system.service.gov.uk/components/radios/

import type { ComponentProps, ReactNode } from 'react'

import { insertIf } from '@/utils/array.utils'

type RadioItem =
  | { type?: 'radio'; value: string; label: string; hint?: string; disabled?: boolean; conditional?: ReactNode }
  | { type: 'divider'; text: string }

type Props = {
  name: string
  items: RadioItem[]
  inline?: boolean
  small?: boolean
  errorMessage?: string
  fieldset?: { legend: string; legendSize?: 's' | 'm' | 'l' | 'xl'; legendIsHeading?: boolean }
  hint?: string
} & ComponentProps<'div'>

export default function Radios({
  name,
  items,
  inline = false,
  small = false,
  errorMessage,
  fieldset,
  hint,
  className,
  ...props
}: Props) {
  const hintId = hint ? `${name}-hint` : undefined
  const errorId = errorMessage ? `${name}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  const radiosContent = (
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
          'govuk-radios',
          ...insertIf(inline, 'govuk-radios--inline'),
          ...insertIf(small, 'govuk-radios--small')
        ].join(' ')}
        data-module="govuk-radios"
      >
        {items.map((item, index) => {
          if ('type' in item && item.type === 'divider') {
            return (
              <div key={`divider-${index}`} className="govuk-radios__divider">
                {item.text}
              </div>
            )
          }

          const radioItem = item as Extract<RadioItem, { type?: 'radio' }>
          const itemId = `${name}-${index}`
          const itemHintId = radioItem.hint ? `${itemId}-hint` : undefined

          return (
            <div key={radioItem.value} className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id={itemId}
                name={name}
                type="radio"
                value={radioItem.value}
                disabled={radioItem.disabled}
                aria-describedby={itemHintId}
              />
              <label
                className="govuk-label govuk-radios__label"
                htmlFor={itemId}
              >
                {radioItem.label}
              </label>
              {radioItem.hint && (
                <div
                  id={itemHintId}
                  className="govuk-hint govuk-radios__hint"
                >
                  {radioItem.hint}
                </div>
              )}
              {radioItem.conditional && (
                <div className="govuk-radios__conditional">
                  {radioItem.conditional}
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
      {fieldset ? (
        <fieldset
          className="govuk-fieldset"
          aria-describedby={describedBy}
        >
          <legend
            className={`govuk-fieldset__legend govuk-fieldset__legend--${fieldset.legendSize || 'l'}`}
          >
            {fieldset.legendIsHeading ? (
              <h1 className="govuk-fieldset__heading">{fieldset.legend}</h1>
            ) : (
              fieldset.legend
            )}
          </legend>
          {radiosContent}
        </fieldset>
      ) : (
        radiosContent
      )}
    </div>
  )
}
