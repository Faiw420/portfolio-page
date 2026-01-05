'use client'

import { useMemo } from 'react'

export function Sparkline({ data, width = 80, height = 24, strokeWidth = 1.5, className = '' }) {
  const path = useMemo(() => {
    if (!data || data.length < 2) return ''

    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * (height - 4) - 2
      return `${x},${y}`
    })

    return `M ${points.join(' L ')}`
  }, [data, width, height])

  const trend = useMemo(() => {
    if (!data || data.length < 2) return 'neutral'
    return data[data.length - 1] > data[0] ? 'up' : data[data.length - 1] < data[0] ? 'down' : 'neutral'
  }, [data])

  const strokeColor = trend === 'up' ? '#22c55e' : trend === 'down' ? '#ef4444' : '#6b7280'

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

