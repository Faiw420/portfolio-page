'use client'

import { useState, useEffect, useCallback } from 'react'
import { KpiCard } from '@/components/kpi-card'
import { TimeRangeSelect } from '@/components/time-range-select'
import { formatDuration } from '@/lib/umami'

const TIME_RANGE_OPTIONS = [
  { id: '24h', label: '24h' },
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
]

const COUNTRY_NAMES = {
  US: 'United States',
  GB: 'United Kingdom',
  DE: 'Germany',
  FR: 'France',
  CA: 'Canada',
  AU: 'Australia',
  NL: 'Netherlands',
  BR: 'Brazil',
  IN: 'India',
  JP: 'Japan',
  ES: 'Spain',
  IT: 'Italy',
  PL: 'Poland',
  SE: 'Sweden',
  CH: 'Switzerland',
  AT: 'Austria',
  BE: 'Belgium',
  DK: 'Denmark',
  NO: 'Norway',
  FI: 'Finland',
}

function getCountryName(code) {
  return COUNTRY_NAMES[code] || code
}

function getCountryFlag(code) {
  if (!code || code.length !== 2) return '🌍'
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

export function StatsDashboard({ initialData }) {
  const [range, setRange] = useState('24h')
  const [data, setData] = useState(initialData)
  const [timeseries, setTimeseries] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [overviewRes, timeseriesRes] = await Promise.all([
        fetch(`/api/stats/overview?range=${range}`),
        fetch(`/api/stats/timeseries?range=${range}`),
      ])
      
      if (!overviewRes.ok || !timeseriesRes.ok) {
        throw new Error('Failed to fetch stats')
      }
      
      const [overviewData, timeseriesData] = await Promise.all([
        overviewRes.json(),
        timeseriesRes.json(),
      ])
      
      setData(overviewData)
      setTimeseries(timeseriesData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [range])

  // Fetch data when range changes
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Refresh data every 60 seconds
  useEffect(() => {
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [fetchData])

  const pageviewSparkline = timeseries?.pageviews?.map(p => p.y) || []
  const sessionSparkline = timeseries?.sessions?.map(s => s.y) || []

  if (error && !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load analytics data. Please check your Umami configuration.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header with controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {data?.activeVisitors ?? 0} online now
            </span>
          </div>
          {loading && (
            <span className="text-xs text-gray-400">Updating...</span>
          )}
        </div>
        <TimeRangeSelect
          value={range}
          onChange={setRange}
          options={TIME_RANGE_OPTIONS}
        />
      </div>

      {/* Main KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Pageviews"
          value={data?.stats?.pageviews ?? 0}
          sparkline={pageviewSparkline.length > 1 ? pageviewSparkline : undefined}
        />
        <KpiCard
          label="Unique Visitors"
          value={data?.stats?.visitors ?? 0}
          sparkline={sessionSparkline.length > 1 ? sessionSparkline : undefined}
        />
        <KpiCard
          label="Bounce Rate"
          value={data?.stats?.bounceRate ?? 0}
          unit="%"
        />
        <KpiCard
          label="Avg. Duration"
          value={formatDuration(data?.stats?.avgDuration ?? 0)}
        />
      </div>

      {/* Detailed sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Pages */}
        <section className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/70">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Top Pages
          </h3>
          {data?.topPages?.length > 0 ? (
            <ul className="space-y-3">
              {data.topPages.map((page, index) => (
                <li key={page.path} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-gray-100 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      {index + 1}
                    </span>
                    <span className="truncate text-sm text-gray-700 dark:text-gray-300">
                      {page.path === '/' ? 'Home' : page.path}
                    </span>
                  </div>
                  <span className="shrink-0 text-sm font-medium tabular-nums text-gray-900 dark:text-gray-100">
                    {page.views.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No data available</p>
          )}
        </section>

        {/* Referrers */}
        <section className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/70">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Traffic Sources
          </h3>
          {data?.referrers?.length > 0 ? (
            <ul className="space-y-3">
              {data.referrers.map((ref, index) => (
                <li key={ref.source || index} className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm text-gray-700 dark:text-gray-300">
                    {ref.source || 'Direct / None'}
                  </span>
                  <span className="shrink-0 text-sm font-medium tabular-nums text-gray-900 dark:text-gray-100">
                    {ref.visits.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No data available</p>
          )}
        </section>

        {/* Countries */}
        <section className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/70">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Visitor Countries
          </h3>
          {data?.countries?.length > 0 ? (
            <ul className="space-y-3">
              {data.countries.slice(0, 6).map((country) => (
                <li key={country.country} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-base">{getCountryFlag(country.country)}</span>
                    <span className="truncate text-sm text-gray-700 dark:text-gray-300">
                      {getCountryName(country.country)}
                    </span>
                  </div>
                  <span className="shrink-0 text-sm font-medium tabular-nums text-gray-900 dark:text-gray-100">
                    {country.visitors.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No data available</p>
          )}
        </section>

        {/* Devices & Browsers */}
        <section className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/70">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Devices & Browsers
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 text-xs font-medium text-gray-400">Devices</h4>
              {data?.devices?.length > 0 ? (
                <ul className="space-y-2">
                  {data.devices.map((device) => (
                    <li key={device.device} className="flex items-center justify-between gap-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {device.device || 'Unknown'}
                      </span>
                      <span className="text-sm font-medium tabular-nums text-gray-900 dark:text-gray-100">
                        {device.count.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No data</p>
              )}
            </div>
            <div>
              <h4 className="mb-2 text-xs font-medium text-gray-400">Browsers</h4>
              {data?.browsers?.length > 0 ? (
                <ul className="space-y-2">
                  {data.browsers.map((browser) => (
                    <li key={browser.browser} className="flex items-center justify-between gap-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {browser.browser || 'Unknown'}
                      </span>
                      <span className="text-sm font-medium tabular-nums text-gray-900 dark:text-gray-100">
                        {browser.count.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No data</p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-500">
        Analytics powered by Umami • Data refreshes every 60 seconds
      </p>
    </div>
  )
}
