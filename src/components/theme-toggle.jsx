'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunMediumIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

// Simple toggle that switches the `dark` class on <html> and persists preference
export function ThemeToggle({ className, ...props }) {
  const [isDark, setIsDark] = useState(false)
  const labelledBy = props['aria-labelledby']
  const ariaLabel = props['aria-label'] ?? (labelledBy ? undefined : 'Toggle dark mode')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const classList = document.documentElement.classList
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialDark = stored === 'dark' || (!stored && prefersDark)
    classList.toggle('dark', initialDark)
    setIsDark(initialDark)
  }, [])

  const onToggle = () => {
    const next = !isDark
    setIsDark(next)
    const classList = document.documentElement.classList
    classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={ariaLabel}
      onClick={onToggle}
      className={cn(
        'inline-flex h-7 w-12 items-center rounded-full border border-transparent bg-gray-200 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:bg-gray-700 dark:focus-visible:ring-gray-200 dark:focus-visible:ring-offset-gray-950',
        isDark && 'bg-indigo-500 hover:bg-indigo-400 dark:bg-indigo-400 dark:hover:bg-indigo-300',
        !isDark && 'hover:bg-gray-300 dark:hover:bg-gray-600',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'ml-0.5 inline-flex h-6 w-6 translate-x-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-transform duration-300 dark:bg-gray-950 dark:text-gray-200',
          isDark && 'translate-x-5'
        )}
      >
        {isDark ? <MoonIcon size={14} /> : <SunMediumIcon size={14} />}
      </span>
    </button>
  )
}
