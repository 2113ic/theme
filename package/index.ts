import './base.scss'

export function useTheme() {
  const html = document.documentElement
  const toggleTheme = () => {
    const theme = html.getAttribute('data-theme')
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return { toggleTheme }
}
