import { getPageviews, getTimeRange, json, RANGES } from '@/lib/umami'

export const prerender = false

export async function GET({ url }) {
  const range = RANGES.includes(url.searchParams.get('range')) ? url.searchParams.get('range') : '24h'
  try {
    const { startAt, endAt, unit } = getTimeRange(range)
    const data = await getPageviews(startAt, endAt, unit)
    return json({ ...data, range, unit, timestamp: Date.now() })
  } catch (error) {
    console.error('Failed to fetch timeseries:', error)
    return json({ error: 'Failed to fetch timeseries' }, 500)
  }
}
