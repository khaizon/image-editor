import { useEffect, useRef } from 'react'

/**
 * Custom React Hook that listen to channel. When a new message arrives `listener` would be called with `listener(event, args...)`
 * @param {string} channel - The name of the channel
 * @param {Function} listener - The handler function
 */
const useIpcListener = (channel, listener): void => {
  const savedHandler: { current?: (s: string, ...args) => void } = useRef()
  useEffect(() => {
    savedHandler.current = listener
  }, [listener])
  useEffect(() => {
    if (!window.api) throw new Error('api functions not available')
    const eventHandler = (event, ...rest): void => savedHandler.current?.(event, ...rest)
    window.api.on(channel, eventHandler)
    return () => {
      window.api.removeListener(channel, eventHandler)
    }
  }, [channel])
}

export default useIpcListener
