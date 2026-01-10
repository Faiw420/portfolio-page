'use client'

import { useEffect, useState, useMemo } from 'react'
import { calculateAgeMetrics, BIRTHDATE } from '@/data/playground'

export function LiveAgeDashboard() {
  const [metrics, setMetrics] = useState(() => calculateAgeMetrics(BIRTHDATE))

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(calculateAgeMetrics(BIRTHDATE))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const tiles = useMemo(
    () => [
      { label: 'Years', value: metrics.years, accent: true },
      { label: 'Months', value: metrics.months.toLocaleString() },
      { label: 'Weeks', value: metrics.weeks.toLocaleString() },
      { label: 'Days', value: metrics.days.toLocaleString() },
      { label: 'Hours', value: metrics.hours.toLocaleString() },
      { label: 'Seconds', value: metrics.seconds.toLocaleString(), live: true }
    ],
    [metrics]
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Time Alive Since Sep 21, 1998
        </h3>
        <span className="animate-pulse text-xs text-emerald-500">● LIVE</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className={`flex flex-col items-center gap-1 rounded-xl border p-4 transition-shadow ${
              tile.accent
                ? 'border-teal-300 bg-teal-50/80 dark:border-teal-500/30 dark:bg-teal-900/20'
                : 'border-gray-200 bg-white/80 dark:border-gray-800 dark:bg-gray-900/70'
            }`}
          >
            <span
              className={`text-xl font-bold tabular-nums ${
                tile.accent
                  ? 'text-teal-700 dark:text-teal-300'
                  : tile.live
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {tile.value}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{tile.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-200 text-lg dark:bg-amber-500/30">
          🎂
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
            {metrics.daysUntilBirthday} days until birthday #{metrics.nextBirthdayAge}
          </span>
          <span className="text-xs text-amber-600 dark:text-amber-300/70">
            {metrics.daysUntilBirthday === 1 ? "It's almost here!" : 'The countdown continues...'}
          </span>
        </div>
      </div>
    </div>
  )
}

