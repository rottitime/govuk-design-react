// https://design-system.service.gov.uk/components/textarea/
// https://design-system.service.gov.uk/components/character-count/

import { cx } from '@/utils/string.utils'
import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type HTMLProps,
  type ReactNode
} from 'react'

export type TextareaProps = {
  error?: boolean
  maxWords?: number
  threshold?: number
  countMessageClassName?: string
} & Omit<HTMLProps<HTMLTextAreaElement>, 'maxLength'> & {
    maxLength?: number
  }

const countWords = (text: string): number =>
  text.trim() ? text.trim().split(/\s+/).length : 0

const pluralise = (count: number, unit: 'character' | 'word') =>
  `${unit}${count === 1 ? '' : 's'}`

const textValue = (value: ReactNode): string => {
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  return ''
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      countMessageClassName,
      error,
      maxLength,
      maxWords,
      threshold = 0,
      id: providedId,
      value,
      defaultValue,
      children,
      onChange,
      'aria-describedby': describedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId ?? generatedId
    const hasCharacterCount = maxLength !== undefined || maxWords !== undefined
    const limit = maxWords ?? maxLength
    const unit = maxWords !== undefined ? 'word' : 'character'
    const initialValue = textValue(value ?? defaultValue ?? children)
    const [currentValue, setCurrentValue] = useState(initialValue)
    const visibleValue = value !== undefined ? textValue(value) : currentValue
    const currentCount =
      maxWords !== undefined ? countWords(visibleValue) : visibleValue.length
    const remaining = (limit ?? 0) - currentCount
    const isOverLimit = hasCharacterCount && remaining < 0
    const thresholdReached =
      !hasCharacterCount ||
      threshold <= 0 ||
      currentCount >= ((limit ?? 0) * threshold) / 100
    const countMessageId = `${id}-info`
    const characterCountMessage = isOverLimit
      ? `You have ${Math.abs(remaining)} ${pluralise(Math.abs(remaining), unit)} too many`
      : `You have ${remaining} ${pluralise(remaining, unit)} remaining`
    const fallbackMessage = `You can enter up to ${limit} ${pluralise(limit ?? 0, unit)}`

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) setCurrentValue(event.target.value)
      onChange?.(event)
    }

    const textarea = (
      <textarea
        {...props}
        ref={ref}
        id={id}
        className={cx(
          'govuk-textarea',
          hasCharacterCount && 'govuk-js-character-count',
          (error || isOverLimit) && 'govuk-textarea--error',
          className
        )}
        aria-describedby={cx(hasCharacterCount && countMessageId, describedBy)}
        value={value}
        defaultValue={
          value === undefined ? (defaultValue ?? textValue(children)) : undefined
        }
        onChange={handleChange}
      />
    )

    if (!hasCharacterCount) return textarea

    return (
      <div
        className="govuk-character-count"
        data-module="govuk-character-count"
        data-maxlength={maxLength}
        data-maxwords={maxWords}
        data-threshold={threshold > 0 ? threshold : undefined}
      >
        {textarea}
        <div
          id={countMessageId}
          className={cx(
            'govuk-hint',
            'govuk-character-count__message',
            thresholdReached &&
              isOverLimit &&
              'govuk-character-count__message--over-limit',
            !thresholdReached && 'govuk-character-count__message--disabled',
            countMessageClassName
          )}
          aria-live="polite"
          aria-hidden={thresholdReached ? undefined : true}
        >
          {thresholdReached ? characterCountMessage : fallbackMessage}
        </div>
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export default Textarea
