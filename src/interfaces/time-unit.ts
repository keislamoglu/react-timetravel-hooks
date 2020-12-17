type SingularLabel = string
type PluralLabel = string
type AbbreviationLabel = string

export type TimeUnit =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years'
  | 'decades'
  | 'centuries'
  | 'millennia'

export type TimeUnitLabelDefinition = Record<TimeUnit, [SingularLabel, PluralLabel, AbbreviationLabel]>
