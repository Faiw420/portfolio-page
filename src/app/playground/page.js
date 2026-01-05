'use client'

import { useState, useMemo } from 'react'

import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { GradientBg4 } from '@/components/gradient-bg'
import { KpiCard } from '@/components/kpi-card'
import { TimeRangeSelect } from '@/components/time-range-select'
import { SegmentToggle } from '@/components/segment-toggle'
import { LiveAgeDashboard } from '@/components/live-age-dashboard'
import { demoKpis, segments, segmentMultipliers } from '@/data/playground'

const timeRanges = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' }
]

export default function PlaygroundPage() {
  const [timeRange, setTimeRange] = useState('daily')
  const [segment, setSegment] = useState('all')

  const filteredKpis = useMemo(() => {
    const baseKpis = demoKpis[timeRange]
    const multiplier = segmentMultipliers[segment]

    return baseKpis.map((kpi) => ({
      ...kpi,
      value: Math.round(kpi.value * multiplier),
      sparkline: kpi.sparkline.map((v) => Math.round(v * multiplier))
    }))
  }, [timeRange, segment])

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg4 />
      <FloatingHeader scrollTitle="Data Playground" />
      <div className="content-wrapper">
        <div className="content space-y-10">
          <PageTitle title="Data Playground" />

          <p className="max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            An interactive showcase of data visualization concepts. The age metrics below are real and update live;
            the analytics dashboard uses{' '}
            <span className="font-medium text-amber-600 dark:text-amber-400">synthetic demo data</span> to
            illustrate filtering and KPI patterns.
          </p>

          <section className="space-y-6">
            <LiveAgeDashboard />
          </section>

          <hr className="border-gray-200 dark:border-gray-800" />

          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Analytics Dashboard (Demo)
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <TimeRangeSelect value={timeRange} onChange={setTimeRange} options={timeRanges} />
                <SegmentToggle value={segment} onChange={setSegment} segments={segments} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {filteredKpis.map((kpi) => (
                <KpiCard
                  key={kpi.id}
                  label={kpi.label}
                  value={kpi.value}
                  unit={kpi.unit}
                  change={kpi.change}
                  changeType={kpi.changeType}
                  sparkline={kpi.sparkline}
                />
              ))}
            </div>

            <p className="text-center text-xs text-gray-400 dark:text-gray-500">
              ↑ All metrics above are synthetic and for demonstration purposes only.
            </p>
          </section>
        </div>
      </div>
    </ScrollArea>
  )
}

