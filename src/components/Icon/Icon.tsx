import { lazy, type ComponentType, type SVGProps } from 'react'
import type { ICONS } from './const'

type IconName = (typeof ICONS)[number]

export type Props = {
  icon: IconName
  title?: string
  size?: number
} & SVGProps<SVGSVGElement>

const iconComponents: Record<
  IconName,
  ReturnType<typeof lazy<ComponentType<SVGProps<SVGSVGElement>>>>
> = {
  Crest: lazy(() => import('@/components/Icon/icons/Crest')),
  CrownLogo: lazy(() => import('@/components/Icon/icons/CrownLogo'))
}

const Icon = ({ icon, size = 100, ...props }: Props) => {
  const Component = iconComponents[icon]
  return <Component {...props} style={{ fontSize: size ? `${size}px` : undefined }} />
}

export default Icon
