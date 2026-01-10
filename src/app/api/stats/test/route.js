import { NextResponse } from 'next/server'

const UMAMI_API_URL = process.env.UMAMI_API_URL
const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID
const UMAMI_USERNAME = process.env.UMAMI_USERNAME
const UMAMI_PASSWORD = process.env.UMAMI_PASSWORD

export const dynamic = 'force-dynamic'

export async function GET() {
  const results = {
    config: {
      apiUrl: UMAMI_API_URL,
      websiteId: UMAMI_WEBSITE_ID,
      hasUsername: !!UMAMI_USERNAME,
      hasPassword: !!UMAMI_PASSWORD,
    },
    steps: [],
  }

  try {
    // Step 1: Test authentication
    const authRes = await fetch(`${UMAMI_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: UMAMI_USERNAME,
        password: UMAMI_PASSWORD,
      }),
    })
    
    const authText = await authRes.text()
    results.steps.push({
      step: 'auth',
      status: authRes.status,
      ok: authRes.ok,
      response: authText.slice(0, 500),
    })

    if (!authRes.ok) {
      return NextResponse.json(results)
    }

    const authData = JSON.parse(authText)
    const token = authData.token

    // Step 2: List all websites
    const websitesRes = await fetch(`${UMAMI_API_URL}/api/websites`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    
    const websitesText = await websitesRes.text()
    results.steps.push({
      step: 'list-websites',
      status: websitesRes.status,
      ok: websitesRes.ok,
      response: websitesText.slice(0, 1000),
    })

    // Step 3: Try to get active visitors for the configured website
    const activeRes = await fetch(`${UMAMI_API_URL}/api/websites/${UMAMI_WEBSITE_ID}/active`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    
    const activeText = await activeRes.text()
    results.steps.push({
      step: 'active-visitors',
      status: activeRes.status,
      ok: activeRes.ok,
      response: activeText.slice(0, 500),
    })

    return NextResponse.json(results)
  } catch (error) {
    results.error = error.message
    return NextResponse.json(results, { status: 500 })
  }
}
