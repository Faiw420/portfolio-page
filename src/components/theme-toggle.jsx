'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunMediumIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { syncInitialTheme, toggleThemePreference, getIsDarkFromDom } from '@/lib/theme'

// Renders a menu entry that toggles the theme while matching other shortcut items
export function ThemeToggle({ className, shortcutKey = '0', ...props }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const initialDark = syncInitialTheme()
    setTheme(initialDark ? 'dark' : 'light')

    if (typeof window === 'undefined') {
      return () => {}
    }

    const handleThemeChange = (event) => {
      const next = typeof event.detail?.isDark === 'boolean' ? event.detail.isDark : getIsDarkFromDom()
      setTheme(next ? 'dark' : 'light')
    }

    window.addEventListener('themechange', handleThemeChange)
    return () => {
      window.removeEventListener('themechange', handleThemeChange)
    }
  }, [])

  const onToggle = () => {
    const next = toggleThemePreference()
    setTheme(next ? 'dark' : 'light')
  }

  const isDark = theme === 'dark'
  const actionLabel = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'
  const displayLabel = isDark ? 'Dark Mode' : 'Light Mode'
  const shortcutDisplay = String(shortcutKey ?? '').trim().slice(-1)
  const Icon = theme === 'dark' ? MoonIcon : SunMediumIcon

  const { ['aria-label']: ariaLabelProp, ...buttonProps } = props
  const ariaLabel = ariaLabelProp ?? actionLabel

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={ariaLabel}
      className={cn(
        'group flex w-full items-center justify-between rounded-lg p-2 text-left text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-gray-200 dark:focus-visible:ring-offset-gray-950',
        isDark
          ? 'bg-black text-white dark:bg-gray-100 dark:text-gray-900'
          : 'hover:bg-gray-200 dark:hover:bg-gray-800',
        className
      )}
      {...buttonProps}
    >
      <span className="flex items-center gap-2">
        <Icon size={16} aria-hidden />
        <span key={displayLabel} className="whitespace-nowrap font-medium">{displayLabel}</span>
      </span>
      <span
        className={cn(
          'hidden size-5 place-content-center rounded border border-gray-200 bg-gray-100 text-xs font-medium text-gray-500 transition-colors duration-200 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 lg:grid',
          isDark && 'border-gray-600 bg-gray-700 text-gray-200 dark:border-gray-300 dark:bg-gray-200 dark:text-gray-800'
        )}
        title={`Shortcut key: ${shortcutKey}`}
        aria-hidden
      >
        {shortcutDisplay}
      </span>
    </button>
  )
}



