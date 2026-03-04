import { lazy, type ComponentType, type SVGProps } from 'react'
import { ICONS } from './const'

type IconName = (typeof ICONS)[number]
type IconComponents = Record<IconName, IconComponent>

export type Props = {
  icon: IconName
  title?: string
  size?: number
} & SVGProps<SVGSVGElement>

type IconComponent = ReturnType<typeof lazy<ComponentType<SVGProps<SVGSVGElement>>>>

const iconComponents: Record<IconName, IconComponent> = ICONS.reduce<IconComponents>(
  (acc, icon) => ({
    ...acc,
    [icon]: lazy(() => import(`@/components/Icon/icons/${icon}.tsx`))
  }),
  {} as IconComponents
)

const Icon = ({ icon, size = 100, ...props }: Props) => {
  const Component = iconComponents[icon]
  return <Component {...props} style={{ fontSize: size ? `${size}px` : undefined }} />
}

export default Icon
