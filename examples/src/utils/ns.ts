const isString = (v: unknown) => v && typeof v === 'string'

type NameSpaceOptions = (string | string[] | Record<string, boolean>)[]

export const unBem = Bem()

export function useNameSpace(name: string, perfix = 'x') {
  const block = `${perfix.concat('-')}${name}`
  const nameSpace = (...args: NameSpaceOptions) => unBem(block, ...args)

  nameSpace.is = (...args: NameSpaceOptions) => Bem('is-')('', ...args)
  nameSpace.child = (child: string, ...args: NameSpaceOptions) => {
    const childBlock = `${block}__${child}`
    return unBem(childBlock, ...args)
  }

  return nameSpace
}

export function Bem(prefix: string = '_') {
  return (block: string, ...args: NameSpaceOptions) => {
    const classNames = [block]

    for (const arg of args) {
      if (isString(arg)) {
        if (arg === 'default') continue
        classNames.push(`${prefix}${arg}`)
      }
      else if (Array.isArray(arg)) {
        for (const modifier of arg) {
          if (modifier === 'default') continue
          classNames.push(`${prefix}${modifier}`)
        }
      }
      else if (typeof arg === 'object') {
        for (const key in arg) {
          if (key !== 'default' && arg[key]) 
            classNames.push(`${prefix}${key}`)
        }
      }
    }

    return classNames
  }
}
