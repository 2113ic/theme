export const COLORS = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone', 'sand', 'olive', 'mauve'] as const
export type Colors = typeof COLORS[number]
export type ColorPalette = {
  '50'?: string;
  '100'?: string;
  '200'?: string;
  '300'?: string;
  '400'?: string;
  '500'?: string;
  '600'?: string;
  '700'?: string;
  '800'?: string;
  '900'?: string;
  '950'?: string;
}

export type ColorLevel = keyof ColorPalette
export type ColorsConfig = {
  [color: string]: {
    base: ColorLevel | { light: ColorLevel, dark: ColorLevel }
  } & ColorPalette
}

export interface ThemeConfig {
  prefix?: string
  white?: string
  black?: string
  primary?: Colors
  colors?: ColorsConfig,
  include?: Colors[]
  exclude?: Colors[]
}

export interface ToggleConfig {
  attr?: string
  token?: string
}
