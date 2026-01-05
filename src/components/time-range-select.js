'use client'

export function TimeRangeSelect({ value, onChange, options }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            value === option.id
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

