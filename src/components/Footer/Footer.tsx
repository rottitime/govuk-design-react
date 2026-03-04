// https://design-system.service.gov.uk/components/footer/

import type { ComponentProps, ReactNode } from 'react'

import { insertIf } from '@/utils/array.utils'

type FooterLink = {
  text: string
  href: string
}

type FooterNavSection = {
  title: string
  columns?: 1 | 2
  items: FooterLink[]
}

type Props = {
  navigation?: FooterNavSection[]
  meta?: {
    text?: string
    content?: ReactNode
    items?: FooterLink[]
  }
  contentLicence?: ReactNode
  copyright?: { text?: string; href?: string }
} & Omit<ComponentProps<'footer'>, 'children'>

export default function Footer({
  navigation,
  meta,
  contentLicence,
  copyright,
  className,
  ...props
}: Props) {
  return (
    <footer
      className={[
        'govuk-footer',
        ...insertIf(!!className, className as string)
      ].join(' ')}
      role="contentinfo"
      {...props}
    >
      <div className="govuk-width-container">
        {navigation && navigation.length > 0 && (
          <div className="govuk-footer__navigation">
            {navigation.map((section) => (
              <div
                key={section.title}
                className={[
                  'govuk-footer__section',
                  ...insertIf(
                    section.columns === 2,
                    'govuk-footer__section--two-thirds'
                  ),
                  ...insertIf(
                    section.columns !== 2,
                    'govuk-footer__section--one-third'
                  )
                ].join(' ')}
              >
                <h2 className="govuk-footer__heading govuk-heading-m">
                  {section.title}
                </h2>
                <ul
                  className={[
                    'govuk-footer__list',
                    ...insertIf(
                      section.columns === 2,
                      'govuk-footer__list--columns-2'
                    )
                  ].join(' ')}
                >
                  {section.items.map((item) => (
                    <li key={item.href} className="govuk-footer__list-item">
                      <a className="govuk-footer__link" href={item.href}>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <hr className="govuk-footer__section-break" />
        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            {meta && (
              <>
                {meta.items && meta.items.length > 0 && (
                  <h2 className="govuk-visually-hidden">Support links</h2>
                )}
                {meta.items && meta.items.length > 0 && (
                  <ul className="govuk-footer__inline-list">
                    {meta.items.map((item) => (
                      <li key={item.href} className="govuk-footer__inline-list-item">
                        <a className="govuk-footer__link" href={item.href}>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {meta.text && (
                  <span className="govuk-footer__licence-description">
                    {meta.text}
                  </span>
                )}
                {meta.content}
              </>
            )}
            {contentLicence ?? (
              <span className="govuk-footer__licence-description">
                All content is available under the{' '}
                <a
                  className="govuk-footer__link"
                  href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                  rel="license"
                >
                  Open Government Licence v3.0
                </a>
                , except where otherwise stated
              </span>
            )}
          </div>
          <div className="govuk-footer__meta-item">
            <a
              className="govuk-footer__link govuk-footer__copyright-logo"
              href={copyright?.href ?? 'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/'}
            >
              {copyright?.text ?? '© Crown copyright'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
