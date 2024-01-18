export type NameSpaceOptions = (string | string[] | Record<string, boolean>)[]
export type unBemFunction = (block: string, ...args: NameSpaceOptions) => string[]

export interface NameSpaceResult {
  (...args: NameSpaceOptions): string[];
  is: (...args: NameSpaceOptions) => string[];
  child: (child: string, ...args: NameSpaceOptions) => string[];
}

/**
 * Checks if the given value is a non-empty string.
 *
 * @param {any} v - The value to check.
 * @returns {boolean} True if the value is a non-empty string, false otherwise.
 */
const isString = (v: any): boolean => v && typeof v === 'string';

/**
 * Factory function that creates a BEM (Block Element Modifier) utility.
 *
 * @param {string} [prefix='_'] - The prefix for BEM modifiers.
 * @returns {BemFunction} A BEM utility function.
 */
export function Bem(prefix: string = '_'): unBemFunction {
  /**
   * BEM utility function.
   *
   * @param {string} block - The BEM block name.
   * @param {...NameSpaceOptions} args - BEM modifiers and states.
   * @returns {string[]} An array of generated class names.
   */
  return (block: string, ...args: NameSpaceOptions): string[] => {
    const classNames = [block];

    for (const arg of args) {
      if (isString(arg)) {
        if (arg === 'default') continue
        classNames.push(`${prefix}${arg}`);
      } else if (Array.isArray(arg)) {
        for (const modifier of arg) {
          if (modifier === 'default') continue;
          classNames.push(`${prefix}${modifier}`);
        }
      } else if (typeof arg === 'object') {
        for (const key in arg) {
          if (key !== 'default' && arg[key]) {
            classNames.push(`${prefix}${key}`);
          }
        }
      }
    }

    return classNames;
  };
}

/**
 * Default BEM utility with an underscore (_) prefix.
 */
export const unBem = Bem();

/**
 * Hook for creating a BEM namespace.
 *
 * @param {string} name - The name of the BEM block.
 * @param {string} [prefix='x'] - The prefix for the BEM block.
 * @returns {NameSpaceResult} A BEM namespace utility function.
 */
export function useNameSpace(name: string, prefix: string = 'x'): NameSpaceResult {
  const block = `${prefix.concat('-')}${name}`;

  /**
   * BEM namespace utility function.
   *
   * @param {...NameSpaceOptions} args - BEM modifiers and states.
   * @returns {string[]} An array of generated class names.
   */
  const nameSpace = (...args: NameSpaceOptions): string[] => unBem(block, ...args);

  /**
   * BEM utility function for 'is-' states.
   *
   * @param {...NameSpaceOptions} args - BEM modifiers and states.
   * @returns {string[]} An array of generated class names.
   */
  nameSpace.is = (...args: NameSpaceOptions): string[] => Bem('is-')('', ...args);

  /**
   * BEM utility function for child elements.
   *
   * @param {string} child - The name of the child element.
   * @param {...NameSpaceOptions} args - BEM modifiers and states.
   * @returns {string[]} An array of generated class names.
   */
  nameSpace.child = (child: string, ...args: NameSpaceOptions): string[] => {
    const childBlock = `${block}__${child}`;
    return unBem(childBlock, ...args);
  };

  return nameSpace;
}
