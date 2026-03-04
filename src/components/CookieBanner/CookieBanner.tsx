// https://design-system.service.gov.uk/components/cookie-banner/

import type { ComponentProps, ReactNode } from 'react'

export type CookieBannerAction = {
  text: string
  type?: 'button' | 'link'
  href?: string
  onClick?: () => void
}

type Props = {
  heading?: string
  children: ReactNode
  actions?: CookieBannerAction[]
  hidden?: boolean
} & Omit<ComponentProps<'div'>, 'children'>

export default function CookieBanner({
  heading = 'Cookies on this service',
  children,
  actions,
  hidden,
  className,
  ...props
}: Props) {
  return (
    <div
      className={`govuk-cookie-banner ${className || ''}`.trim()}
      data-nosnippet
      role="region"
      aria-label="Cookie banner"
      hidden={hidden}
      {...props}
    >
      <div className="govuk-cookie-banner__message govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-cookie-banner__heading govuk-heading-m">
              {heading}
            </h2>
            <div className="govuk-cookie-banner__content">{children}</div>
          </div>
        </div>
        {actions && actions.length > 0 && (
          <div className="govuk-button-group">
            {actions.map((action, index) =>
              action.type === 'link' ? (
                <a
                  key={index}
                  className="govuk-link"
                  href={action.href || '#'}
                >
                  {action.text}
                </a>
              ) : (
                <button
                  key={index}
                  type="button"
                  className="govuk-button"
                  data-module="govuk-button"
                  onClick={action.onClick}
                >
                  {action.text}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
