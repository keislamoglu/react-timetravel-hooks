import { renderHook } from '@testing-library/react-hooks'
import { useCountdown } from '../../hooks'
import { TimeUnitLabelDefinition } from '../../interfaces'
import countdown from 'countdown'

const dummyLabels: TimeUnitLabelDefinition = {
  millennia: ['binyıl', 'binyıl', 'by'],
  centuries: ['yüzyıl', 'yüzyıl', 'yy'],
  decades: ['onyıl', 'onyıl', 'oy'],
  years: ['yıl', 'yıl', 'y'],
  months: ['ay', 'ay', 'ay'],
  weeks: ['hafta', 'hafta', 'h'],
  days: ['gün', 'gün', 'g'],
  hours: ['saat', 'saat', 'sa'],
  minutes: ['dakika', 'dakika', 'dk'],
  seconds: ['saniye', 'saniye', 'sn'],
  milliseconds: ['milisaniye', 'milisaniye', 'ms'],
}

beforeEach(() => {
  countdown.resetFormat()
})

test('formats countdown with given labels', () => {
  const expectedFormat = {
    last: ' ',
    delim: ' ',
    singular: ' milisaniye| saniye| dakika| saat| gün| hafta| ay| yıl| onyıl| yüzyıl| binyıl',
    plural: ' milisaniye| saniye| dakika| saat| gün| hafta| ay| yıl| onyıl| yüzyıl| binyıl',
  }

  jest.spyOn(countdown, 'setFormat')
  const { result } = renderHook(() => useCountdown(dummyLabels))

  expect(countdown.setFormat).toHaveBeenCalledWith(expectedFormat)
  expect(countdown).toBe(result.current)
})

test('formats countdown with the abbreviation labels', () => {
  const expectedFormat = {
    last: ' ',
    delim: ' ',
    singular: ' ms| sn| dk| sa| g| h| ay| y| oy| yy| by',
    plural: ' ms| sn| dk| sa| g| h| ay| y| oy| yy| by',
  }

  jest.spyOn(countdown, 'setFormat')
  const { result } = renderHook(() => useCountdown(dummyLabels, true))

  expect(countdown.setFormat).toHaveBeenCalledWith(expectedFormat)
  expect(countdown).toBe(result.current)
})
