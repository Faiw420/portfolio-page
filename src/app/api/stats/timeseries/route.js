import { NextResponse } from 'next/server'
import { getPageviews, getTimeRange } from '@/lib/umami'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '24h'
    
    const { startAt, endAt, unit } = getTimeRange(range)
    
    const data = await getPageviews(startAt, endAt, unit)
    
    return NextResponse.json({
      pageviews: data.pageviews,
      sessions: data.sessions,
      range,
      unit,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('Failed to fetch timeseries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch timeseries' },
      { status: 500 }
    )
  }
}
