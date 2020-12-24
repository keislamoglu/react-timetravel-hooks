import { useCallback, useEffect, useRef, useState } from 'react'
import countdown from 'countdown'
import { RemainingTimeHookOptions } from '../interfaces'

export function useRemainingTime(endDate: Date, options: RemainingTimeHookOptions = {}): string {
  const { max = 2, units = countdown.DEFAULTS, tickDuration = 1000 } = options
  const isPast = useRef(false)
  const [remaining, setRemaining] = useState<string>()

  const calculateRemaining = useCallback(() => {
    const startDate = new Date()

    if (endDate.getTime() - startDate.getTime() < 0) {
      isPast.current = true
    }

    return isPast.current ? '' : countdown(startDate, endDate, units, max).toString()
  }, [endDate, max, units])

  useEffect(() => {
    if (isPast.current) {
      return
    }

    setRemaining(calculateRemaining())

    const timer = setInterval(() => setRemaining(calculateRemaining()), tickDuration)

    return () => clearInterval(timer)
  }, [calculateRemaining, tickDuration])

  return remaining || ''
}
