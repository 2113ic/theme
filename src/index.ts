import './styles/index.scss'

export function useTheme() {
  const html = document.documentElement
  const toggleTheme = () => {
    const theme = html.getAttribute('theme')
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    html.setAttribute('theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return { toggleTheme }
}
