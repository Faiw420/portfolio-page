import { getOverview, json, RANGES } from '@/lib/umami'

export const prerender = false

export async function GET({ url }) {
  const range = RANGES.includes(url.searchParams.get('range')) ? url.searchParams.get('range') : '24h'
  try {
    return json(await getOverview(range))
  } catch (error) {
    console.error('Failed to fetch stats overview:', error)
    return json({ error: 'Failed to fetch stats overview' }, 500)
  }
}
