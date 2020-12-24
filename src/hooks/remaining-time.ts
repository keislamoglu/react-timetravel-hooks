import { useCallback, useEffect, useState } from 'react'
import countdown from 'countdown'
import { RemainingTimeHookOptions } from '../interfaces'

export function useRemainingTime(endDate: Date, options: RemainingTimeHookOptions = {}): string {
  const { max = 2, units = countdown.DEFAULTS, tickDuration = 1000 } = options
  const calculateRemaining = useCallback(() => countdown(new Date(), endDate, units, max).toString(), [
    endDate,
    max,
    units,
  ])
  const [remaining, setRemaining] = useState<string>()

  useEffect(() => {
    setRemaining(calculateRemaining())
    const timer = setInterval(() => setRemaining(calculateRemaining()), tickDuration)
    return () => clearInterval(timer)
  }, [calculateRemaining, tickDuration])

  return remaining || ''
}
