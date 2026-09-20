import { insertIf } from '@/utils/array.utils'
import { forwardRef, type HTMLProps } from 'react'

type Props = { error?: boolean } & HTMLProps<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, error, ...props }, ref) => (
    <textarea
      {...props}
      ref={ref}
      className={[
        'govuk-textarea',
        ...insertIf(!!error, 'govuk-textarea--error'),
        ...insertIf(!!className, className)
      ]
        .join(' ')
        .trim()}
    />
  )
)
Textarea.displayName = 'Textarea'

export default Textarea
