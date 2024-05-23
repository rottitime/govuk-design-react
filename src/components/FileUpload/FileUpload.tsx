import { insertIf } from '@/utils/array.utils'
import { type ComponentProps, forwardRef, useId } from 'react'
import FormGroup from '../FormGroup/FormGroup'
import Label from '../Label/Label'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

type Props = {
  error?: string
  label: string
} & ComponentProps<'input'>

const FileUpload = forwardRef<HTMLInputElement, Props>(
  ({ error, label, ...props }, ref) => {
    const id = useId()
    const fieldId = props.id || id
    const errorId = `${id}error`

    const classes = [
      'govuk-file-upload',
      ...insertIf(!!error, `govuk-input--error`)
    ].join(' ')

    return (
      <FormGroup error={!!error}>
        <Label htmlFor={fieldId}>{label}</Label>
        <ErrorMessage id={errorId}>{error}</ErrorMessage>
        <input
          aria-describedby={error ? errorId : undefined}
          {...props}
          ref={ref}
          id={fieldId}
          className={classes}
          type="file"
        />
      </FormGroup>
    )
  }
)

export default FileUpload
