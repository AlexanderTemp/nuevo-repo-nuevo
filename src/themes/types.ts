import {
  ComponentsOverrides,
  ComponentsProps,
  ComponentsVariants,
  Theme,
} from '@mui/material/styles'

export type ComponentKey = keyof ComponentsOverrides<Theme>

export interface ComponentOverride<T extends ComponentKey = ComponentKey> {
  defaultProps?: ComponentsProps[T]
  styleOverrides?: ComponentsOverrides<Theme>[T]
  variants?: ComponentsVariants[T]
}
