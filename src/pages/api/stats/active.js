import { getActiveVisitors, json } from '@/lib/umami'

export const prerender = false

export async function GET() {
  try {
    return json({ active: await getActiveVisitors(), timestamp: Date.now() })
  } catch (error) {
    console.error('Failed to fetch active visitors:', error)
    return json({ error: 'Failed to fetch active visitors', active: 0 }, 500)
  }
}
