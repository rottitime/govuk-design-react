// https://design-system.service.gov.uk/components/radios/

import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import Hint from '@/components/Hint/Hint'
import { cx } from '@/utils/string.utils'
import { Fragment, useId, type ComponentProps, type ReactNode } from 'react'
import { isRadiosDivider, type RadiosItem, type RadiosOption } from './types'

export type RadiosProps = Omit<ComponentProps<'div'>, 'children'> & {
  /** Shared `name` for all radios in the group. */
  name: string
  legend: ReactNode
  /** Uses `govuk-fieldset__legend--l` and wraps the legend in `h1.govuk-fieldset__heading`. */
  legendAsPageHeading?: boolean
  hint?: ReactNode
  error?: ReactNode
  /** Renders the smaller radios variant. */
  small?: boolean
  /** Lays radios out inline (only when there is no conditional reveal). */
  inline?: boolean
  items: RadiosItem[]
  fieldsetClassName?: string
  /** Prefix for generated hint/error ids; a stable id when you need predictable anchors. */
  id?: string
}

function optionHintId(option: RadiosOption) {
  return `${option.id}-item-hint`
}

function conditionalPanelVisible(option: RadiosOption) {
  if (option.checked !== undefined) return option.checked
  if (option.defaultChecked !== undefined) return option.defaultChecked
  return false
}

export default function Radios({
  name: groupName,
  legend,
  legendAsPageHeading = false,
  hint,
  error,
  small,
  inline,
  items,
  className,
  fieldsetClassName,
  id: idProp,
  ...divProps
}: RadiosProps) {
  const reactId = useId()
  const baseId = idProp ?? `radios-${reactId.replace(/:/g, '')}`
  const hintId = `${baseId}-hint`
  const errorId = `${baseId}-error`

  const hasHint = hint != null && hint !== ''
  const hasError = error != null && error !== ''

  const fieldsetDescribedBy = cx(hasHint && hintId, hasError && errorId)

  return (
    <div
      {...divProps}
      className={cx('govuk-form-group', hasError && 'govuk-form-group--error', className)}
    >
      <fieldset
        className={cx('govuk-fieldset', fieldsetClassName)}
        aria-describedby={fieldsetDescribedBy}
      >
        <legend
          className={cx(
            'govuk-fieldset__legend',
            legendAsPageHeading && 'govuk-fieldset__legend--l'
          )}
        >
          {legendAsPageHeading ? (
            <h1 className="govuk-fieldset__heading">{legend}</h1>
          ) : (
            legend
          )}
        </legend>
        {hasHint && <Hint id={hintId}>{hint}</Hint>}
        {hasError && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
        <div
          className={cx(
            'govuk-radios',
            small && 'govuk-radios--small',
            inline && 'govuk-radios--inline'
          )}
          data-module="govuk-radios"
        >
          {items.map((item, index) => {
            if (isRadiosDivider(item)) {
              return (
                <div key={`divider-${index}`} className="govuk-radios__divider">
                  {item.text ?? 'or'}
                </div>
              )
            }

            const option = item
            const hintTextId = optionHintId(option)
            const hasItemHint = option.hint != null && option.hint !== ''
            const panelId = option.conditional
              ? (option.conditionalId ?? `conditional-${option.id}`)
              : undefined
            const showPanel = option.conditional && conditionalPanelVisible(option)

            const {
              id,
              label,
              value,
              hint: _itemHint,
              conditionalId: _cid,
              conditional: _conditional,
              defaultChecked,
              checked,
              onChange,
              className: inputClassName,
              ...inputRest
            } = option

            return (
              <Fragment key={id}>
                <div className="govuk-radios__item">
                  <input
                    {...inputRest}
                    className={cx('govuk-radios__input', inputClassName)}
                    id={id}
                    name={groupName}
                    type="radio"
                    value={value}
                    defaultChecked={defaultChecked}
                    checked={checked}
                    onChange={onChange}
                    aria-describedby={hasItemHint ? hintTextId : undefined}
                    data-aria-controls={panelId}
                  />
                  <label className="govuk-label govuk-radios__label" htmlFor={id}>
                    {label}
                  </label>
                  {hasItemHint && (
                    <div id={hintTextId} className="govuk-hint govuk-radios__hint">
                      {option.hint}
                    </div>
                  )}
                </div>
                {option.conditional != null && panelId != null && (
                  <div
                    className={cx(
                      'govuk-radios__conditional',
                      !showPanel && 'govuk-radios__conditional--hidden'
                    )}
                    id={panelId}
                  >
                    {option.conditional}
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}
