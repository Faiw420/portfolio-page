'use client'

import { useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { ScrollArea } from '@/components/scroll-area'
import { useKeyPress } from '@/hooks/useKeyPress'
import { cn } from '@/lib/utils'
import { toggleThemePreference } from '@/lib/theme'
import { KEYBOARD_SHORTCUTS, THEME_TOGGLE_KEY } from '@/lib/constants'

const shortcutKeys = Object.keys(KEYBOARD_SHORTCUTS)
const handledKeys = [...shortcutKeys, THEME_TOGGLE_KEY]

export const SideMenu = ({ children, title, isInner }) => {
  const router = useRouter()
  const pathname = usePathname()

  const onKeyPress = useCallback(
    (event) => {
      const key = event.code
      if (key === THEME_TOGGLE_KEY) {
        toggleThemePreference()
        return
      }
      const targetPathname = KEYBOARD_SHORTCUTS[key]
      if (targetPathname && targetPathname !== pathname) {
        router.push(targetPathname)
      }
    },
    [pathname, router]
  )

  useKeyPress(onKeyPress, handledKeys)

  return (
    <ScrollArea
      className={cn(
        'hidden bg-zinc-50 dark:bg-zinc-900 lg:flex lg:flex-col lg:border-r dark:lg:border-gray-800',
        isInner ? 'lg:w-80 xl:w-96' : 'lg:w-60 xl:w-72'
      )}
    >
      {title && (
        <div className="sticky top-0 z-10 border-b border-transparent bg-zinc-50 px-5 py-3 dark:border-gray-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-tight">{title}</span>
          </div>
        </div>
      )}
      <div className="bg-zinc-50 p-3 dark:bg-zinc-900">{children}</div>
    </ScrollArea>
  )
}

