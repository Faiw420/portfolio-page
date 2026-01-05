'use client'

import { useEffect, useState, useMemo } from 'react'

const calculateAge = (birthDate) => {
  const now = new Date()
  const diffInMs = now.getTime() - birthDate.getTime()

  const seconds = Math.floor(diffInMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365.25)
  const months = Math.floor((days % 365.25) / 30.44)

  return {
    years,
    months,
    days: Math.floor(days % 30.44),
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60
  }
}

const AgeCounter = () => {
  const birthDate = useMemo(() => new Date('1998-09-21'), [])
  const [age, setAge] = useState(calculateAge(birthDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(calculateAge(birthDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [birthDate])

  return (
    <div className="mx-auto max-w-md rounded-md border border-gray-200 bg-white p-4 text-gray-900 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <h3 className="mb-4 text-center text-base font-semibold">Live age counter</h3>
      <div className="grid grid-cols-2 gap-3 text-sm font-medium">
        <span className="text-right text-gray-500 dark:text-gray-400">Years:</span>
        <span>{age.years}</span>
        <span className="text-right text-gray-500 dark:text-gray-400">Months:</span>
        <span>{age.months}</span>
        <span className="text-right text-gray-500 dark:text-gray-400">Days:</span>
        <span>{age.days}</span>
        <span className="text-right text-gray-500 dark:text-gray-400">Hours:</span>
        <span>{age.hours}</span>
        <span className="text-right text-gray-500 dark:text-gray-400">Minutes:</span>
        <span>{age.minutes}</span>
        <span className="text-right text-gray-500 dark:text-gray-400">Seconds:</span>
        <span>{age.seconds}</span>
      </div>
    </div>
  )
}

export default AgeCounter

