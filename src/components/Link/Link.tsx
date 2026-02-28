// https://design-system.service.gov.uk/styles/links/

import { isExternalUrl } from '@/utils/string.utils'
import type { ComponentProps } from 'react'

type Anchor = ComponentProps<'a'>
type Props = Anchor & { href: string; button?: boolean }

export default function Link({ button, children, ...props }: Props) {
  const { href } = props
  const classes = [button ? 'govuk-button' : 'govuk-link'].join('')
  const linkProps: Anchor = {
    className: classes,
    role: button ? 'button' : undefined,
    ...props
  }
  if (isExternalUrl(href)) {
    return (
      <a {...linkProps} rel={linkProps.rel ?? 'noopener noreferrer'}>
        {children}
      </a>
    )
  }
  return <a {...linkProps}>{children}</a>
}
