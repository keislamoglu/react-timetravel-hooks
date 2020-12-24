import { useRemainingTime } from '../../hooks'
import { RemainingTimeHookOptions } from '../../interfaces'
import { renderHook } from '@testing-library/react-hooks'

test('calculates and returns remaining time in string format', () => {
  const endDate = new Date()

  endDate.setDate(endDate.getDate() + 1)
  endDate.setHours(endDate.getHours() + 3)
  endDate.setMinutes(endDate.getMinutes() + 15)

  const options: RemainingTimeHookOptions = {
    max: 3,
  }
  const { result } = renderHook(() => useRemainingTime(endDate, options))
  const remaining = result.current

  expect(remaining).toEqual('1 day, 3 hours and 15 minutes')
})

test('returns empty string when the remaining time is up', () => {
  const endDate = new Date()

  endDate.setSeconds(endDate.getSeconds() - 1)

  const { result } = renderHook(() => useRemainingTime(endDate))
  const remaining = result.current

  expect(remaining).toEqual('')
})
