import { isTimeUnitLabelDefinition } from '../../helpers/hook-helpers'
import { TimeUnitLabelDefinition } from '../../interfaces'
import { TimeUnits } from '../../constants/time-unit'

test('checks whether the given is a time unit label definition', () => {
  const dummyTimeUnitLabelDefinition: Partial<TimeUnitLabelDefinition> = {}

  TimeUnits.forEach((timeUnit) => {
    dummyTimeUnitLabelDefinition[timeUnit] = [timeUnit, timeUnit, timeUnit]
  })

  const dummyObject = { foo: 'bar' }
  const dummyArray = ['foo', 'bar']
  const dummyFunction = (): void => undefined

  expect(isTimeUnitLabelDefinition(dummyTimeUnitLabelDefinition)).toBe(true)
  expect(isTimeUnitLabelDefinition(dummyFunction)).toBe(false)
  expect(isTimeUnitLabelDefinition(dummyObject)).toBe(false)
  expect(isTimeUnitLabelDefinition(dummyArray)).toBe(false)
})
