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
        ...insertIf(!!className, className)
      ].join(' ')}
      {...props}
      role="contentinfo"
    >
      <div className="govuk-width-container">
        {navigation && navigation.length > 0 && (
          <div className="govuk-footer__navigation">
            {navigation.map((section, index) => (
              <div
                key={`${section.title}-${index}`}
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
                  {section.items.map((item, itemIndex) => (
                    <li key={`${item.href}-${itemIndex}`} className="govuk-footer__list-item">
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
                  <>
                    <h2 className="govuk-visually-hidden">Support links</h2>
                    <ul className="govuk-footer__inline-list">
                    {meta.items.map((item, itemIndex) => (
                      <li key={`${item.href}-${itemIndex}`} className="govuk-footer__inline-list-item">
                        <a className="govuk-footer__link" href={item.href}>
                          {item.text}
                        </a>
                      </li>
                    ))}
                    </ul>
                  </>
                )}
                {meta.text && (
                  <span className="govuk-footer__licence-description">
                    {meta.text}
                  </span>
                )}
                {meta.content}
              </>
            )}
            {contentLicence !== undefined && contentLicence}
          </div>
          <div className="govuk-footer__meta-item">
            {copyright && (
              <a
                className="govuk-footer__link govuk-footer__copyright-logo"
                href={copyright.href}
              >
                {copyright.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
