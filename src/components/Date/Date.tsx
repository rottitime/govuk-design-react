import { useEffect, useId, useState, type ChangeEvent } from 'react'
import Input from '../Input/Input'
import FormGroup from '../FormGroup/FormGroup'
import Label from '../Label/Label'
import type { DateDigit } from '../../types'
import { labelsDate } from '../constants'

type Props = {
  anchorId?: string
  onChange?: (value: string) => void
  format?: `${DateDigit}/${DateDigit}/${DateDigit}` | `${DateDigit}/${DateDigit}`
  hideLabels?: boolean
  value?: string
  separator?: string
  error?: boolean
  /** First segment only; use with FormGroup `renderControl` (e.g. `aria-describedby`). */
  'aria-describedby'?: string
  'aria-invalid'?: boolean | 'true' | 'false'
}

export default function Date({
  format = 'dd/mm/yyyy',
  hideLabels,
  anchorId,
  value,
  separator = '/',
  onChange,
  error,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid
}: Props) {
  const id = useId()

  const arrFormat = format.toLowerCase().split('/') as DateDigit[]
  const [date, setDate] = useState<string[]>(String(value || '').split(separator))

  useEffect(() => {
    if (!value) setDate([])
  }, [value])

  const setValue = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value || ''
    const newDate: string[] = arrFormat.map((_digit, i) => date[i] || '')
    newDate[index] = value.trim()
    setDate(newDate)
    if (typeof onChange === 'function') onChange(newDate.join(separator))
  }

  const renderInput = (digit: DateDigit, index: number) => {
    const idInput = anchorId && index === 0 ? anchorId : `${id}${digit}`
    const label = labelsDate[digit]
    return (
      <div className="govuk-date-input__item" key={idInput}>
        <FormGroup>
          {!hideLabels && (
            <Label className="govuk-label govuk-date-input__label" htmlFor={idInput}>
              {label}
            </Label>
          )}
          <Input
            characters={digit.length > 2 ? 4 : 2}
            error={!!error}
            id={idInput}
            aria-describedby={index === 0 ? ariaDescribedBy : undefined}
            aria-invalid={index === 0 ? ariaInvalid : undefined}
            aria-label={hideLabels ? label : undefined}
            name={digit}
            type="text"
            inputMode="numeric"
            value={date[index] || ''}
            onChange={(e) => setValue(index, e)}
          />
        </FormGroup>
      </div>
    )
  }

  return <div className="govuk-date-input">{arrFormat.map(renderInput)}</div>
}
