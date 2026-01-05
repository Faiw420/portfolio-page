import { useEffect } from 'react'

const interactiveTags = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'])

export function useKeyPress(callback, keyCodes) {
  useEffect(() => {
    const handler = (event) => {
      if (
        keyCodes.includes(event.code) &&
        !event.shiftKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        const target = event.target
        if (target instanceof HTMLElement) {
          if (target.isContentEditable) return
          if (interactiveTags.has(target.tagName)) return
        }
        callback(event)
      }
    }

    window.addEventListener('keydown', handler, { passive: true })
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [callback, keyCodes])
}

