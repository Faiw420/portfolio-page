const THEME_KEY = 'theme'

function readStoredTheme() {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(THEME_KEY)
  } catch (error) {
    return null
  }
}

function storeThemePreference(isDark) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
  } catch (error) {
    // Ignore write failures (e.g., Safari private mode)
  }
}

export function getPreferredTheme() {
  if (typeof window === 'undefined') return false

  const stored = readStoredTheme()
  if (stored === 'light' || stored === 'dark') {
    return stored === 'dark'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function getIsDarkFromDom() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

export function applyTheme(isDark) {
  if (typeof document === 'undefined') return isDark
  document.documentElement.classList.toggle('dark', isDark)
  storeThemePreference(isDark)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('themechange', { detail: { isDark } }))
  }
  return isDark
}

export function syncInitialTheme() {
  const preferred = getPreferredTheme()
  applyTheme(preferred)
  return preferred
}

export function toggleThemePreference() {
  const next = !getIsDarkFromDom()
  applyTheme(next)
  return next
}
