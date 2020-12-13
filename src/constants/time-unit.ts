import { TimeUnit } from '../interfaces/time-unit'

export enum TimeUnitLabelIndex {
  Singular = 0,
  Plural = 1,
  Abbreviation = 2,
}

export const TimeUnits: TimeUnit[] = [
  'milliseconds',
  'seconds',
  'minutes',
  'hours',
  'days',
  'weeks',
  'months',
  'years',
  'decades',
  'centuries',
  'millennia',
]
