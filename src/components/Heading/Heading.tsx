import { sizes } from '@/const'
import { insertIf } from '@/utils/array.utils'
import type { ComponentProps, ComponentPropsWithoutRef, ElementType } from 'react'
import Caption from '../Caption/Caption'

type HeadingOwnProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: keyof typeof sizes
  caption?: string
  captionSize?: ComponentProps<typeof Caption>['size']
}

export type HeadingProps<T extends ElementType = 'h1'> = HeadingOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof HeadingOwnProps | 'as'> & {
    as?: T
  }

export default function Heading<T extends ElementType = 'h1'>({
  as,
  level = 1,
  size = 'large',
  className,
  children,
  caption,
  captionSize,
  ...props
}: HeadingProps<T>) {
  const Component = (as || (`h${level}` as ElementType)) as ElementType
  const tagProps = {
    ...props,
    className: [`govuk-heading-${sizes[size]}`, ...insertIf(!!className, className)].join(
      ' '
    )
  }
  return (
    <Component {...tagProps}>
      {caption && <Caption size={captionSize}>{caption}</Caption>}
      {children}
    </Component>
  )
}
