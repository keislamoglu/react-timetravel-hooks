import { useCallback, useEffect, useState } from 'react'
import countdown from 'countdown'
import { RemainingTimeHookOptions } from '../interfaces'

type CountdownStatic = countdown.CountdownStatic

export function useRemainingTime(
  endDate: Date,
  countdown: CountdownStatic,
  options: RemainingTimeHookOptions = {}
): string {
  const { max = 2, units = countdown.DEFAULTS, tickDuration = 1000 } = options
  const calculateRemaining = useCallback(() => countdown(new Date(), endDate, units, max).toString(), [
    countdown,
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
