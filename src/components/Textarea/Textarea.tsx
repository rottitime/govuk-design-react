import { forwardRef, type HTMLProps } from 'react'

type Props = HTMLProps<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...props }, ref) => (
    <textarea
      {...props}
      ref={ref}
      className={`govuk-textarea ${className || ''}`.trim()}
    />
  )
)
Textarea.displayName = 'Textarea'

export default Textarea
