// https://design-system.service.gov.uk/components/notification-banner/

import type { ComponentProps, ReactNode } from 'react'

type Props = {
  children: ReactNode
  title?: string
  type?: 'success'
  role?: string
} & Omit<ComponentProps<'div'>, 'children' | 'role'>

export default function NotificationBanner({
  children,
  title = 'Important',
  type,
  role,
  className,
  ...props
}: Props) {
  const isSuccess = type === 'success'
  const classes = [
    'govuk-notification-banner',
    ...(isSuccess ? ['govuk-notification-banner--success'] : [])
  ].join(' ')

  return (
    <div
      className={`${classes} ${className || ''}`.trim()}
      role={role || (isSuccess ? 'alert' : 'region')}
      aria-labelledby="govuk-notification-banner-title"
      data-module="govuk-notification-banner"
      {...props}
    >
      <div className="govuk-notification-banner__header">
        <h2
          className="govuk-notification-banner__title"
          id="govuk-notification-banner-title"
        >
          {isSuccess ? 'Success' : title}
        </h2>
      </div>
      <div className="govuk-notification-banner__content">{children}</div>
    </div>
  )
}
