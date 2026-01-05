'use client'

import { Sparkline } from '@/components/sparkline'

export function KpiCard({ label, value, unit = '', change, changeType, sparkline }) {
  const formattedValue = typeof value === 'number' ? value.toLocaleString() : value

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900/70">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {label}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tabular-nums text-gray-900 dark:text-gray-100">
              {formattedValue}
            </span>
            {unit && (
              <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
            )}
          </div>
        </div>
        {sparkline && <Sparkline data={sparkline} />}
      </div>
      {change && (
        <div className="flex items-center gap-1.5">
          <span
            className={`text-xs font-semibold ${
              changeType === 'positive'
                ? 'text-emerald-600 dark:text-emerald-400'
                : changeType === 'negative'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {change}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">vs prev period</span>
        </div>
      )}
    </div>
  )
}

