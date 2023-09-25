declare module '@2113ic/theme' {
  export function useTheme(): {
    /**
     * Toggle the theme between 'dark' and 'light'.
     */
    toggleTheme: () => void
  }
}
