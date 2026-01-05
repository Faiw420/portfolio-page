'use client'

export function SegmentToggle({ value, onChange, segments }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
      {segments.map((segment) => (
        <button
          key={segment.id}
          onClick={() => onChange(segment.id)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            value === segment.id
              ? 'bg-gray-900 text-white shadow-sm dark:bg-gray-100 dark:text-gray-900'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {segment.label}
        </button>
      ))}
    </div>
  )
}

