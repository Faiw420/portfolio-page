import { NextResponse } from 'next/server'
import {
  getActiveVisitors,
  getStats,
  getTopPages,
  getReferrers,
  getCountries,
  getDevices,
  getBrowsers,
  getTimeRange,
} from '@/lib/umami'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '24h'
    
    const { startAt, endAt } = getTimeRange(range)
    
    // Fetch all data in parallel
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
    
    return NextResponse.json({
      activeVisitors,
      stats,
      topPages,
      referrers,
      countries,
      devices,
      browsers,
      range,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('Failed to fetch stats overview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats overview' },
      { status: 500 }
    )
  }
}
