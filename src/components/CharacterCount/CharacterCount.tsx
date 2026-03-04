// https://design-system.service.gov.uk/components/character-count/

import { type ChangeEvent, type ComponentProps, useId, useState } from 'react'

import { insertIf } from '@/utils/array.utils'

type CountMode =
  | { maxLength: number; maxWords?: never; threshold?: number }
  | { maxWords: number; maxLength?: never; threshold?: number }

type Props = {
  label: string
  name: string
  hint?: string
  errorMessage?: string
  rows?: number
  defaultValue?: string
} & CountMode &
  Omit<ComponentProps<'textarea'>, 'children' | 'maxLength'>

function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

export default function CharacterCount({
  label,
  name,
  hint,
  errorMessage,
  maxLength,
  maxWords,
  threshold = 0,
  rows = 5,
  defaultValue = '',
  className,
  id: providedId,
  onChange,
  ...props
}: Props) {
  const autoId = useId()
  const id = providedId ?? autoId
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const infoId = `${id}-info`

  const [value, setValue] = useState(defaultValue)

  const limit = maxLength ?? maxWords ?? 0
  const current = maxLength !== undefined ? value.length : countWords(value)
  const remaining = limit - current
  const isOverLimit = remaining < 0
  const unit = maxLength !== undefined ? 'character' : 'word'

  const thresholdReached = threshold > 0 ? current >= (limit * threshold) / 100 : true

  const message = isOverLimit
    ? `You have ${Math.abs(remaining)} ${unit}${Math.abs(remaining) !== 1 ? 's' : ''} too many`
    : `You have ${remaining} ${unit}${remaining !== 1 ? 's' : ''} remaining`

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    onChange?.(e)
  }

  return (
    <div
      className={[
        'govuk-character-count',
        ...insertIf(!!className, className as string)
      ].join(' ')}
      data-module="govuk-character-count"
      data-maxlength={maxLength?.toString()}
      data-maxwords={maxWords?.toString()}
      {...(threshold > 0 ? { 'data-threshold': threshold.toString() } : {})}
    >
      <div
        className={[
          'govuk-form-group',
          ...insertIf(!!errorMessage, 'govuk-form-group--error')
        ].join(' ')}
      >
        <label className="govuk-label" htmlFor={id}>
          {label}
        </label>
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
        <textarea
          className={[
            'govuk-textarea',
            'govuk-js-character-count',
            ...insertIf(!!errorMessage, 'govuk-textarea--error'),
            ...insertIf(isOverLimit, 'govuk-textarea--error')
          ].join(' ')}
          id={id}
          name={name}
          rows={rows}
          aria-describedby={[
            infoId,
            ...insertIf(!!hint, hintId),
            ...insertIf(!!errorMessage, errorId)
          ].join(' ')}
          value={value}
          onChange={handleChange}
          {...props}
        />
      </div>
      <div
        id={infoId}
        className={[
          'govuk-hint',
          'govuk-character-count__message',
          ...insertIf(thresholdReached && isOverLimit, 'govuk-character-count__message--over-limit'),
          ...insertIf(!thresholdReached, 'govuk-character-count__message--disabled')
        ].join(' ')}
        aria-live="polite"
        aria-hidden={!thresholdReached}
      >
        {thresholdReached ? message : `You can enter up to ${limit} ${unit}s`}
      </div>
    </div>
  )
}
