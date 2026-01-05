// Synthetic/demo data for the Data Playground
// All metrics here are illustrative examples, not real data

export const BIRTHDATE = new Date('1998-09-21')

export function calculateAgeMetrics(birthDate = BIRTHDATE) {
  const now = new Date()
  const diffMs = now.getTime() - birthDate.getTime()

  const totalSeconds = Math.floor(diffMs / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = Math.floor(totalDays / 30.44)
  const totalYears = Math.floor(totalDays / 365.25)

  // Next birthday countdown
  const nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate())
  if (nextBirthday <= now) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
  }
  const daysUntilBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24))

  return {
    years: totalYears,
    months: totalMonths,
    weeks: totalWeeks,
    days: totalDays,
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
    daysUntilBirthday,
    nextBirthdayAge: totalYears + 1
  }
}

// Generate synthetic time-series data for sparklines
function generateSparklineData(length, min, max, trend = 'up') {
  const data = []
  let value = min + (max - min) * 0.3
  for (let i = 0; i < length; i++) {
    const noise = (Math.random() - 0.5) * (max - min) * 0.3
    const trendFactor = trend === 'up' ? 0.5 : trend === 'down' ? -0.5 : 0
    value = Math.max(min, Math.min(max, value + noise + trendFactor))
    data.push(Math.round(value))
  }
  return data
}

// Demo KPI data with sparklines
export const demoKpis = {
  daily: [
    {
      id: 'queries',
      label: 'SQL Queries Executed',
      value: 847,
      unit: '',
      change: '+12%',
      changeType: 'positive',
      sparkline: generateSparklineData(12, 600, 900, 'up')
    },
    {
      id: 'dashboards',
      label: 'Dashboard Views',
      value: 2341,
      unit: '',
      change: '+8%',
      changeType: 'positive',
      sparkline: generateSparklineData(12, 1800, 2500, 'up')
    },
    {
      id: 'latency',
      label: 'Avg Query Latency',
      value: 142,
      unit: 'ms',
      change: '-15%',
      changeType: 'positive',
      sparkline: generateSparklineData(12, 120, 200, 'down')
    }
  ],
  weekly: [
    {
      id: 'queries',
      label: 'SQL Queries Executed',
      value: 5892,
      unit: '',
      change: '+18%',
      changeType: 'positive',
      sparkline: generateSparklineData(12, 4000, 6500, 'up')
    },
    {
      id: 'dashboards',
      label: 'Dashboard Views',
      value: 16420,
      unit: '',
      change: '+22%',
      changeType: 'positive',
      sparkline: generateSparklineData(12, 12000, 18000, 'up')
    },
    {
      id: 'latency',
      label: 'Avg Query Latency',
      value: 128,
      unit: 'ms',
      change: '-8%',
      changeType: 'positive',
      sparkline: generateSparklineData(12, 100, 160, 'down')
    }
  ],
  monthly: [
    {
      id: 'queries',
      label: 'SQL Queries Executed',
      value: 24150,
      unit: '',
      change: '+31%',
      changeType: 'positive',
      sparkline: generateSparklineData(12, 18000, 26000, 'up')
    },
    {
      id: 'dashboards',
      label: 'Dashboard Views',
      value: 68340,
      unit: '',
      change: '+45%',
      changeType: 'positive',
      sparkline: generateSparklineData(12, 45000, 72000, 'up')
    },
    {
      id: 'latency',
      label: 'Avg Query Latency',
      value: 118,
      unit: 'ms',
      change: '-22%',
      changeType: 'positive',
      sparkline: generateSparklineData(12, 90, 140, 'down')
    }
  ]
}

// Segment-based filtering demo
export const segments = [
  { id: 'all', label: 'All Users' },
  { id: 'power', label: 'Power Users' },
  { id: 'casual', label: 'Casual Users' }
]

export const segmentMultipliers = {
  all: 1,
  power: 0.15,
  casual: 0.85
}

