import { ScrollArea } from "@/components/scroll-area"
import { FloatingHeader } from "@/components/floating-header"
import { PageTitle } from "@/components/page-title"
import { GradientBg3 } from "@/components/gradient-bg"
import { StatsDashboard } from "@/components/stats-dashboard"
import {
  getActiveVisitors,
  getStats,
  getTopPages,
  getReferrers,
  getCountries,
  getDevices,
  getBrowsers,
  getTimeRange,
} from "@/lib/umami"

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getInitialStats() {
  try {
    const { startAt, endAt } = getTimeRange('24h')
    
    const [
      activeVisitors,
      stats,
      topPages,
      referrers,
      countries,
      devices,
      browsers,
    ] = await Promise.all([
      getActiveVisitors(),
      getStats(startAt, endAt),
      getTopPages(startAt, endAt, 5),
      getReferrers(startAt, endAt, 5),
      getCountries(startAt, endAt, 10),
      getDevices(startAt, endAt),
      getBrowsers(startAt, endAt, 5),
    ])
    
    return {
      activeVisitors,
      stats,
      topPages,
      referrers,
      countries,
      devices,
      browsers,
      range: '24h',
      timestamp: Date.now(),
    }
  } catch (error) {
    console.error('Failed to fetch initial stats:', error)
    return null
  }
}

export default async function StatsPage() {
  const initialData = await getInitialStats()

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg3 />
      <FloatingHeader scrollTitle="Live Analytics" />
      <div className="content-wrapper">
        <div className="content space-y-8">
          <PageTitle title="Live Analytics" />
          <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400">
            Real-time insights into how visitors discover and explore this site.
            Powered by self-hosted Umami analytics.
          </p>
          <StatsDashboard initialData={initialData} />
        </div>
      </div>
    </ScrollArea>
  )
}
