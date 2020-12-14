import { TimeUnitLabelMapping } from '../interfaces'
import { TimeUnitLabelIndex, TimeUnits } from '../constants/time-unit'
import countdown from 'countdown'

type Format = countdown.Format

export function isFormatter(
  labelsOrFormatter: TimeUnitLabelMapping | Format['formatter']
): labelsOrFormatter is Format['formatter'] {
  return typeof labelsOrFormatter === 'function'
}

type SingularLabels = string
type PluralLabels = string
type AbbreviationLabels = string

export function timeUnitLabelsToCountdownLabels(
  labels: TimeUnitLabelMapping
): [SingularLabels, PluralLabels, AbbreviationLabels] {
  const timeUnitLabels = TimeUnits.map((t) => labels[t])
  const countdownLabels: [string[], string[], string[]] = [[], [], []]

  timeUnitLabels.forEach((t) => {
    countdownLabels[TimeUnitLabelIndex.Singular].push(' ' + t[TimeUnitLabelIndex.Singular])
    countdownLabels[TimeUnitLabelIndex.Plural].push(' ' + t[TimeUnitLabelIndex.Plural])
    countdownLabels[TimeUnitLabelIndex.Abbreviation].push(' ' + t[TimeUnitLabelIndex.Abbreviation])
  })

  return countdownLabels.map((t) => t.join('|')) as [SingularLabels, PluralLabels, AbbreviationLabels]
}
