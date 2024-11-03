import { useEffect } from "react"

export function useKey(key, action) {
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        setQuery('')
      }
    }

    document.addEventListener('keydown', callback)
    return () => document.addEventListener('keydown', callback)
  }, [action, key])
}