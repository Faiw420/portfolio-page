'use client'

import { useState, useEffect } from 'react'

export function LiveVisitors({ initialCount = 0, className = '' }) {
  const [count, setCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function fetchActiveVisitors() {
      try {
        const response = await fetch('/api/stats/active')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        if (mounted) {
          setCount(data.active || 0)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Failed to fetch active visitors:', error)
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    // Initial fetch
    fetchActiveVisitors()

    // Poll every 45 seconds
    const interval = setInterval(fetchActiveVisitors, 45000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
        {isLoading ? (
          <span className="inline-block w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700">&nbsp;</span>
        ) : (
          <>
            <span className="tabular-nums">{count}</span>
            {' '}online now
          </>
        )}
      </span>
    </div>
  )
}
