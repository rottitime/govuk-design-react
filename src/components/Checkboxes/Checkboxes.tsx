import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import Hint from '@/components/Hint/Hint'
import { cx } from '@/utils/string.utils'
import { Fragment, useId, useRef, type ChangeEvent, type ComponentProps } from 'react'
import { isCheckboxesDivider, type CheckboxesItem, type CheckboxesOption } from './types'
import './Checkboxes.module.css'

export type CheckboxesProps = Omit<ComponentProps<'div'>, 'children'> & {
  /** Shared `name` for all checkboxes; omit per-item only when an option sets `name`. */
  name: string
  legend: React.ReactNode
  /** Uses `govuk-fieldset__legend--l` and wraps the legend in `h1.govuk-fieldset__heading`. */
  legendAsPageHeading?: boolean
  hint?: React.ReactNode
  error?: React.ReactNode
  small?: boolean
  items: CheckboxesItem[]
  fieldsetClassName?: string
  /** Prefix for generated hint/error ids; a stable id when you need predictable anchors. */
  id?: string
}

function optionHintId(option: CheckboxesOption) {
  return `${option.id}-item-hint`
}

function conditionalPanelVisible(option: CheckboxesOption) {
  if (option.checked !== undefined) return option.checked
  if (option.defaultChecked !== undefined) return option.defaultChecked
  return false
}

/** Mirrors govuk-frontend checkboxes: exclusive vs non-exclusive within the same name + form owner. */
function syncExclusiveBehaviour(root: HTMLElement | null, changed: HTMLInputElement) {
  if (!root || changed.type !== 'checkbox' || !changed.checked) return

  const name = changed.name
  const isExclusive = changed.getAttribute('data-behaviour') === 'exclusive'

  const peers = Array.from(root.querySelectorAll('input[type="checkbox"]')).filter(
    (el): el is HTMLInputElement =>
      el instanceof HTMLInputElement && el.name === name && el.form === changed.form
  )

  if (isExclusive) {
    for (const el of peers) {
      if (el !== changed) el.checked = false
    }
    return
  }

  for (const el of peers) {
    if (el.getAttribute('data-behaviour') === 'exclusive') el.checked = false
  }
}

export default function Checkboxes({
  name: groupName,
  legend,
  legendAsPageHeading = false,
  hint,
  error,
  small,
  items,
  className,
  fieldsetClassName,
  id: idProp,
  ...divProps
}: CheckboxesProps) {
  const reactId = useId()
  const baseId = idProp ?? `checkboxes-${reactId.replace(/:/g, '')}`
  const hintId = `${baseId}-hint`
  const errorId = `${baseId}-error`

  const hasHint = hint != null && hint !== ''
  const hasError = error != null && error !== ''

  const fieldsetDescribedBy = cx(hasHint && hintId, hasError && errorId)
  const checkboxesRootRef = useRef<HTMLDivElement>(null)

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
          ref={checkboxesRootRef}
          className={cx('govuk-checkboxes', small && 'govuk-checkboxes--small')}
          data-module="govuk-checkboxes"
        >
          {items.map((item, index) => {
            if (isCheckboxesDivider(item)) {
              return (
                <div key={`divider-${index}`} className="govuk-checkboxes__divider">
                  {item.text ?? 'or'}
                </div>
              )
            }

            const option = item
            const inputName = option.name ?? groupName
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
              name: _n,
              hint: itemHint,
              exclusive: _exclusive,
              conditionalId: _cid,
              defaultChecked,
              checked,
              onChange,
              className: inputClassName,
              ...inputRest
            } = option

            const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
              syncExclusiveBehaviour(checkboxesRootRef.current, e.currentTarget)
              onChange?.(e)
            }

            return (
              <Fragment key={id}>
                <div className={cx('govuk-checkboxes__item')}>
                  <input
                    {...inputRest}
                    className={cx('govuk-checkboxes__input', inputClassName)}
                    id={id}
                    name={inputName}
                    type="checkbox"
                    value={value}
                    defaultChecked={defaultChecked}
                    checked={checked}
                    onChange={handleChange}
                    aria-describedby={hasItemHint ? hintTextId : undefined}
                    data-aria-controls={panelId}
                    data-behaviour={_exclusive ? 'exclusive' : undefined}
                  />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor={id}>
                    {label}
                  </label>
                  {hasItemHint && (
                    <div id={hintTextId} className="govuk-hint govuk-checkboxes__hint">
                      {itemHint}
                    </div>
                  )}
                </div>
                {option.conditional != null && panelId != null && (
                  <div
                    className={cx(
                      'govuk-checkboxes__conditional',
                      !showPanel && 'govuk-checkboxes__conditional--hidden'
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
