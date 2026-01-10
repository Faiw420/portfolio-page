const UMAMI_API_URL = process.env.UMAMI_API_URL
const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID
const UMAMI_USERNAME = process.env.UMAMI_USERNAME
const UMAMI_PASSWORD = process.env.UMAMI_PASSWORD

// Cache the auth token
let cachedToken = null
let tokenExpiry = 0

/**
 * Get authentication token using username/password
 */
async function getAuthToken() {
  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && Date.now() < tokenExpiry - 300000) {
    return cachedToken
  }

  const response = await fetch(`${UMAMI_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: UMAMI_USERNAME,
      password: UMAMI_PASSWORD,
    }),
  })

  if (!response.ok) {
    throw new Error(`Umami auth failed: ${response.status}`)
  }

  const data = await response.json()
  cachedToken = data.token
  // Token typically valid for 24 hours, refresh after 23 hours
  tokenExpiry = Date.now() + 23 * 60 * 60 * 1000
  
  return cachedToken
}

async function fetchUmami(endpoint, options = {}) {
  const url = `${UMAMI_API_URL}/api${endpoint}`
  
  console.log('Fetching Umami:', url)
  
  const token = await getAuthToken()
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const text = await response.text()
    console.error('Umami API error:', response.status, text || '(empty response)')
    throw new Error(`Umami API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * Get the number of active visitors right now (Umami real-time)
 */
export async function getActiveVisitors() {
  const data = await fetchUmami(`/websites/${UMAMI_WEBSITE_ID}/active`)
  // Umami API returns { visitors: number }
  return data.visitors || 0
}

/**
 * Helper to extract value from Umami response
 * Umami v2+ returns values directly (e.g., { pageviews: 123 })
 * Older versions might return { pageviews: { value: 123 } }
 */
function extractValue(field) {
  if (field === null || field === undefined) return 0
  if (typeof field === 'number') return field
  if (typeof field === 'object' && 'value' in field) return field.value || 0
  return 0
}

/**
 * Get the number of sessions seen in the last N minutes
 * @param {number} minutes - Number of minutes to look back (default 30)
 */
export async function getRecentSessions(minutes = 30) {
  const now = Date.now()
  const startAt = now - minutes * 60 * 1000
  
  const params = new URLSearchParams({
    startAt: startAt.toString(),
    endAt: now.toString(),
  })
  
  const data = await fetchUmami(`/websites/${UMAMI_WEBSITE_ID}/stats?${params}`)
  
  // Return the number of unique visits (sessions) in the time period
  return extractValue(data.visits)
}

/**
 * Get aggregated stats for a time period
 * @param {number} startAt - Start timestamp in milliseconds
 * @param {number} endAt - End timestamp in milliseconds
 */
export async function getStats(startAt, endAt) {
  const params = new URLSearchParams({
    startAt: startAt.toString(),
    endAt: endAt.toString(),
  })
  
  const data = await fetchUmami(`/websites/${UMAMI_WEBSITE_ID}/stats?${params}`)
  
  const pageviews = extractValue(data.pageviews)
  const visitors = extractValue(data.visitors)
  const visits = extractValue(data.visits)
  const bounces = extractValue(data.bounces)
  const totalTime = extractValue(data.totaltime)
  
  return {
    pageviews,
    visitors,
    visits,
    bounces,
    totalTime,
    // Calculate bounce rate as percentage
    bounceRate: visits > 0 
      ? Math.round((bounces / visits) * 100) 
      : 0,
    // Calculate average visit duration in seconds
    avgDuration: visits > 0 
      ? Math.round(totalTime / visits) 
      : 0,
  }
}

/**
 * Get pageview/visitor time series data
 * @param {number} startAt - Start timestamp in milliseconds
 * @param {number} endAt - End timestamp in milliseconds
 * @param {string} unit - Time unit: 'hour', 'day', 'week', 'month'
 */
export async function getPageviews(startAt, endAt, unit = 'day') {
  const params = new URLSearchParams({
    startAt: startAt.toString(),
    endAt: endAt.toString(),
    unit,
  })
  
  const data = await fetchUmami(`/websites/${UMAMI_WEBSITE_ID}/pageviews?${params}`)
  
  return {
    pageviews: data.pageviews || [],
    sessions: data.sessions || [],
  }
}

/**
 * Get top pages by views
 * @param {number} startAt - Start timestamp in milliseconds
 * @param {number} endAt - End timestamp in milliseconds
 * @param {number} limit - Number of results to return
 */
export async function getTopPages(startAt, endAt, limit = 10) {
  const params = new URLSearchParams({
    startAt: startAt.toString(),
    endAt: endAt.toString(),
    type: 'path',
    limit: limit.toString(),
  })
  
  const data = await fetchUmami(`/websites/${UMAMI_WEBSITE_ID}/metrics?${params}`)
  
  return data.map(item => ({
    path: item.x,
    views: item.y,
  }))
}

/**
 * Get referrer sources
 * @param {number} startAt - Start timestamp in milliseconds
 * @param {number} endAt - End timestamp in milliseconds
 * @param {number} limit - Number of results to return
 */
export async function getReferrers(startAt, endAt, limit = 10) {
  const params = new URLSearchParams({
    startAt: startAt.toString(),
    endAt: endAt.toString(),
    type: 'referrer',
    limit: limit.toString(),
  })
  
  const data = await fetchUmami(`/websites/${UMAMI_WEBSITE_ID}/metrics?${params}`)
  
  return data.map(item => ({
    source: item.x || 'Direct',
    visits: item.y,
  }))
}

/**
 * Get visitor countries
 * @param {number} startAt - Start timestamp in milliseconds
 * @param {number} endAt - End timestamp in milliseconds
 * @param {number} limit - Number of results to return
 */
export async function getCountries(startAt, endAt, limit = 10) {
  const params = new URLSearchParams({
    startAt: startAt.toString(),
    endAt: endAt.toString(),
    type: 'country',
    limit: limit.toString(),
  })
  
  const data = await fetchUmami(`/websites/${UMAMI_WEBSITE_ID}/metrics?${params}`)
  
  return data.map(item => ({
    country: item.x,
    visitors: item.y,
  }))
}

/**
 * Get device types
 * @param {number} startAt - Start timestamp in milliseconds
 * @param {number} endAt - End timestamp in milliseconds
 */
export async function getDevices(startAt, endAt) {
  const params = new URLSearchParams({
    startAt: startAt.toString(),
    endAt: endAt.toString(),
    type: 'device',
  })
  
  const data = await fetchUmami(`/websites/${UMAMI_WEBSITE_ID}/metrics?${params}`)
  
  return data.map(item => ({
    device: item.x,
    count: item.y,
  }))
}

/**
 * Get browser breakdown
 * @param {number} startAt - Start timestamp in milliseconds
 * @param {number} endAt - End timestamp in milliseconds
 * @param {number} limit - Number of results to return
 */
export async function getBrowsers(startAt, endAt, limit = 5) {
  const params = new URLSearchParams({
    startAt: startAt.toString(),
    endAt: endAt.toString(),
    type: 'browser',
    limit: limit.toString(),
  })
  
  const data = await fetchUmami(`/websites/${UMAMI_WEBSITE_ID}/metrics?${params}`)
  
  return data.map(item => ({
    browser: item.x,
    count: item.y,
  }))
}

/**
 * Helper: Get time range timestamps
 * @param {string} range - '24h', '7d', '30d'
 */
export function getTimeRange(range) {
  const now = Date.now()
  const ranges = {
    '24h': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000,
  }
  
  const duration = ranges[range] || ranges['24h']
  
  return {
    startAt: now - duration,
    endAt: now,
    unit: range === '24h' ? 'hour' : 'day',
  }
}

/**
 * Format duration in seconds to human readable
 * @param {number} seconds
 */
export function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}s`
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins < 60) return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`
  const hours = Math.floor(mins / 60)
  const remainingMins = mins % 60
  return `${hours}h ${remainingMins}m`
}
