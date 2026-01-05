'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export const ListItem = ({ title, description, path }) => {
  const pathname = usePathname()
  const isActive = pathname === path

  return (
    <Link
      href={path}
      className={cn(
        'flex flex-col gap-1 rounded-lg p-2 transition-colors duration-300 [&>*]:transition-colors [&>*]:duration-300',
        isActive
          ? 'bg-black text-white dark:bg-gray-100 dark:text-gray-900'
          : 'hover:bg-gray-200 dark:hover:bg-gray-800'
      )}
    >
      <span className={cn('font-medium', isActive && 'text-white dark:text-gray-900')}>{title}</span>
      {description && (
        <span className={cn(isActive ? 'text-slate-300 dark:text-gray-700' : 'text-slate-500 dark:text-gray-400')}>
          {description}
        </span>
      )}
    </Link>
  )
}
