type ConfigMap<T = string> = Record<string, T>

export type ModuleVariant =
  | 'responsive'
  | 'hover'
  | 'focus'
  | 'focus-within'
  | 'active'
  | 'group-hover'

export interface Modules {
  appearance?: false | ModuleVariant[]
  backgroundAttachment?: false | ModuleVariant[]
  backgroundColors?: false | ModuleVariant[]
  backgroundPosition?: false | ModuleVariant[]
  backgroundRepeat?: false | ModuleVariant[]
  backgroundSize?: false | ModuleVariant[]
  borderCollapse?: false | ModuleVariant[]
  borderColors?: false | ModuleVariant[]
  borderRadius?: false | ModuleVariant[]
  borderStyle?: false | ModuleVariant[]
  borderWidths?: false | ModuleVariant[]
  cursor?: false | ModuleVariant[]
  display?: false | ModuleVariant[]
  flexbox?: false | ModuleVariant[]
  float?: false | ModuleVariant[]
  fonts?: false | ModuleVariant[]
  fontWeights?: false | ModuleVariant[]
  height?: false | ModuleVariant[]
  leading?: false | ModuleVariant[]
  lists?: false | ModuleVariant[]
  margin?: false | ModuleVariant[]
  maxHeight?: false | ModuleVariant[]
  maxWidth?: false | ModuleVariant[]
  minHeight?: false | ModuleVariant[]
  minWidth?: false | ModuleVariant[]
  negativeMargin?: false | ModuleVariant[]
  objectFit?: false | ModuleVariant[]
  objectPosition?: false | ModuleVariant[]
  opacity?: false | ModuleVariant[]
  outline?: false | ModuleVariant[]
  overflow?: false | ModuleVariant[]
  padding?: false | ModuleVariant[]
  pointerEvents?: false | ModuleVariant[]
  position?: false | ModuleVariant[]
  resize?: false | ModuleVariant[]
  shadows?: false | ModuleVariant[]
  svgFill?: false | ModuleVariant[]
  svgStroke?: false | ModuleVariant[]
  tableLayout?: false | ModuleVariant[]
  textAlign?: false | ModuleVariant[]
  textColors?: false | ModuleVariant[]
  textSizes?: false | ModuleVariant[]
  textStyle?: false | ModuleVariant[]
  tracking?: false | ModuleVariant[]
  userSelect?: false | ModuleVariant[]
  verticalAlign?: false | ModuleVariant[]
  visibility?: false | ModuleVariant[]
  whitespace?: false | ModuleVariant[]
  width?: false | ModuleVariant[]
  zIndex?: false | ModuleVariant[]
}

export interface Options {
  important: boolean
  prefix: string
  separator: string
}

export interface Config {
  backgroundColors?: ConfigMap
  backgroundSize?: ConfigMap
  borderColors?: ConfigMap
  borderRadius?: ConfigMap
  borderWidths?: ConfigMap
  colors?: ConfigMap
  fonts?: ConfigMap<string[]>
  fontWeights?: ConfigMap
  height?: ConfigMap
  leading?: ConfigMap
  margin?: ConfigMap
  maxHeight?: ConfigMap
  maxWidth?: ConfigMap
  minHeight?: ConfigMap
  minWidth?: ConfigMap
  negativeMargin?: ConfigMap
  opacity?: ConfigMap
  padding?: ConfigMap
  screens?: ConfigMap
  shadows?: ConfigMap
  svgFill?: ConfigMap
  svgStroke?: ConfigMap
  textColors?: ConfigMap
  textSizes?: ConfigMap
  tracking?: ConfigMap
  width?: ConfigMap
  zIndex?: ConfigMap
  modules: Modules
}
