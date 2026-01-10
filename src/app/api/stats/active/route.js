import { NextResponse } from 'next/server'
import { getActiveVisitors } from '@/lib/umami'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    // Get real-time active visitors from Umami
    const activeVisitors = await getActiveVisitors()
    
    return NextResponse.json({
      active: activeVisitors,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('Failed to fetch active visitors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch active visitors', active: 0 },
      { status: 500 }
    )
  }
}
