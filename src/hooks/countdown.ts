import { useRef } from 'react'
import countdown from 'countdown'
import { FormatOptions, TimeUnitLabelMapping } from '../interfaces'
import { isFormatter, timeUnitLabelsToCountdownLabels } from '../helpers/hook-helpers'

type CountdownStatic = countdown.CountdownStatic
type Format = countdown.Format

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
