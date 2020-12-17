import { TimeUnit, TimeUnitLabelDefinition } from '../interfaces'
import { TimeUnitLabelIndex, TimeUnits } from '../constants/time-unit'

export function isTimeUnitLabelDefinition(value: unknown): value is TimeUnitLabelDefinition {
  return value != null && TimeUnits.every((t: TimeUnit) => !!(value as TimeUnitLabelDefinition)[t])
}

type SingularLabels = string
type PluralLabels = string
type AbbreviationLabels = string

export function timeUnitLabelsToCountdownLabels(
  labels: TimeUnitLabelDefinition
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
