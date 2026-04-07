// https://design-system.service.gov.uk/styles/links/

import { cx, isExternalUrl } from '@/utils/string.utils'
import type { ComponentProps, ElementType } from 'react'

type Anchor = ComponentProps<'a'>
type Props = { href: string; button?: boolean; Component?: ElementType } & Anchor

export default function Link({
  button,
  children,
  className,
  Component = 'a',
  ...props
}: Props) {
  const { href } = props
  const classes = [button ? 'govuk-button' : 'govuk-link'].join('')
  const linkProps: Anchor = {
    className: classes,
    role: button ? 'button' : undefined,
    ...props
  }
  if (isExternalUrl(href)) {
    return (
      <Component
        {...linkProps}
        rel={linkProps.rel ?? 'noopener noreferrer'}
        className={cx(['govuk-link', className])}
      >
        {children}
      </Component>
    )
  }
  return <a {...linkProps}>{children}</a>
}
