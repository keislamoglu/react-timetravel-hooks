import { useCallback, useEffect, useRef, useState } from 'react'
import countdown from 'countdown'
import { TimeUnitLabelMapping } from '../interfaces/time-unit'
import { TimeUnitLabelIndex, TimeUnits } from '../constants/time-unit'

type CountdownStatic = countdown.CountdownStatic
type Format = countdown.Format
type FormatOptions = { last?: string; delim?: string }

export function useCountdown(
  shortNotation: boolean,
  labels: TimeUnitLabelMapping,
  formatOptions?: FormatOptions
): CountdownStatic

export function useCountdown(
  shortNotation: boolean,
  formatter: Format['formatter'],
  formatOptions?: FormatOptions
): CountdownStatic

export function useCountdown(
  shortNotation = false,
  labelsOrFormatter: TimeUnitLabelMapping | Format['formatter'],
  { last = ' ', delim = ' ' }: FormatOptions = {}
): CountdownStatic {
  const isCountdownFormatted = useRef(false)
  const format: Format = { last, delim }

  if (isFormatter(labelsOrFormatter)) {
    format['formatter'] = labelsOrFormatter
  } else {
    const [singulars, plurals, abbreviations] = timeUnitLabelsToCountdownLabels(labelsOrFormatter)
    ;[format['singular'], format['plural']] = shortNotation ? [abbreviations, abbreviations] : [singulars, plurals]
  }

  if (!isCountdownFormatted.current) {
    countdown.setFormat(format)
    isCountdownFormatted.current = true
  }

  return countdown
}

interface UseRemainingTimeOptions {
  max?: number
  units?: number
  tickDuration?: number
}

export function useRemainingTime(
  endDate: Date,
  countdown: CountdownStatic,
  options: UseRemainingTimeOptions = {}
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

function isFormatter(
  labelsOrFormatter: TimeUnitLabelMapping | Format['formatter']
): labelsOrFormatter is Format['formatter'] {
  return typeof labelsOrFormatter === 'function'
}

type SingularLabels = string
type PluralLabels = string
type AbbreviationLabels = string

function timeUnitLabelsToCountdownLabels(
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
