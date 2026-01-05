'use client'

import { memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRightIcon, AtSignIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export const NavigationLink = memo(({ href, label, icon, shortcutNumber }) => {
  const pathname = usePathname()
  const iconCmp = icon ?? <AtSignIcon size={16} />

  const isInternal = href.startsWith('/')
  if (!isInternal) {
    return (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        <span className="inline-flex items-center gap-2 font-medium">
          {iconCmp} {label}
        </span>
        <ArrowUpRightIcon size={16} />
      </a>
    )
  }

  let isActive = false
  if (pathname?.length > 0) {
    const splittedPathname = pathname.split('/')
    const currentPathname = splittedPathname[1] ?? ''
    isActive = currentPathname === href.split('/')[1]
  }

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        'group flex items-center justify-between rounded-lg p-2',
        isActive ? 'bg-black text-white dark:bg-gray-100 dark:text-gray-900' : 'hover:bg-gray-200 dark:hover:bg-gray-800'
      )}
    >
      <span className="flex items-center gap-2">
        {iconCmp}
        <span className="font-medium">{label}</span>
      </span>
      {shortcutNumber && (
        <span
          className={cn(
            'hidden h-5 w-5 place-content-center rounded border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-300 transition-colors duration-200 group-hover:border-gray-300 dark:group-hover:border-gray-700 lg:grid',
            isActive && 'border-gray-600 bg-gray-700 text-gray-200 group-hover:border-gray-600 dark:border-gray-300 dark:bg-gray-200 dark:text-gray-800 dark:group-hover:border-gray-300'
          )}
          title={`Shortcut key: ${shortcutNumber}`}
        >
          {shortcutNumber}
        </span>
      )}
    </Link>
  )
})
