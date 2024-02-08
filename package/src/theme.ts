import { ThemeConfig, ToggleConfig, COLORS, Colors, ColorLevel } from './types'
import { getTemplates, replaceVariables } from './util'
import { format } from 'prettier'
import patterns from './patterns'
import * as sass from 'sass'

const templates = getTemplates('./template.md')

export class UseGenerator {
  op: Required<ThemeConfig>

  constructor(config: ThemeConfig = {}) {
    this.op = {
      prefix: 'x',
      white: '#fff',
      black: '#131416',
      primary: 'blue',
      include: [],
      exclude: [],
      colors: {},
      ...config,
    }
    this.op.include = [
      ...COLORS.filter(item => this.op.include.includes(item) && !this.op.exclude.includes(item)),
      ...Object.keys(this.op.colors) as Colors[]
    ]
  }

  scss() {
    let common = '', lightCarry = '', darkCarry = ''
    for (let item of this.op.include) {
      const val = this.op.colors[item] || patterns[item]
      if (this.op.primary === item) item = 'primary' as Colors

      common += `${item}: (`
      for (const [colorLevel, color] of Object.entries(val)) {
        if (colorLevel === 'base') {
          if (typeof color === 'object') {
            const { light, dark } = color
            lightCarry += `'${item}': #{get(${item}, ${light})},\n`
            darkCarry += `'${item}': #{get(${item}, ${dark})},\n`
            continue
          }

          common += `'': #{get(${item}, ${color})},\n`
          continue
        }
        common += `'${colorLevel}': ${color},\n`
      }
      common += '),\n'
    }

    const code = replaceVariables(
      templates.default, 
      {
        ...this.op,
        common,
        lightCarry,
        darkCarry
      }
    )

    return format(code, { parser: 'scss' })
  }

  async css() {
    const scssCode = await this.scss()
    return sass.compileString(scssCode)
  }
}

export function useTheme(config: ToggleConfig) {
  const op = { attr: 'class', token: 'theme', ...config }

  return () => {
    const html = document.documentElement
    const theme = html.getAttribute(op.attr)
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    html.setAttribute(op.attr, newTheme)
    localStorage.setItem(op.token, newTheme)
  }
}
