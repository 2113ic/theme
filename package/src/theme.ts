/**
 * Hook for toggling between dark and light themes.
 *
 * @returns A function to toggle the theme.
 */
export function useTheme() {
  const html = document.documentElement

  return () => {
    const theme = html.getAttribute('data-theme')
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }
}
