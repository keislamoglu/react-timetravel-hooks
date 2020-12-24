import { useEffect, useRef } from 'react'
import countdown from 'countdown'
import { FormatOptions, TimeUnitLabelDefinition } from '../interfaces'
import { isTimeUnitLabelDefinition, timeUnitLabelsToCountdownLabels } from '../helpers/hook-helpers'

type CountdownStatic = countdown.CountdownStatic
type Format = countdown.Format

export function useCountdown(
  labels: TimeUnitLabelDefinition,
  shortNotation?: boolean,
  formatOptions?: FormatOptions
): CountdownStatic

export function useCountdown(
  formatter: Format['formatter'],
  shortNotation?: boolean,
  formatOptions?: FormatOptions
): CountdownStatic

/**
 * We don't expect this hook to create a new instance of the countdown.
 * Since the countdownjs provides a static countdown instance, this hook just configures the static instance and returns it.
 * Hence, using the returned countdown by this hook will be the same as the imported one in a component.
 */
export function useCountdown(
  labelsOrFormatter: TimeUnitLabelDefinition | Format['formatter'],
  shortNotation = false,
  { last = ' ', delim = ' ' }: FormatOptions = {}
): CountdownStatic {
  const isCountdownFormatted = useRef(false)
  const format: Format = { last, delim }

  useEffect(() => {
    isCountdownFormatted.current = false
  }, [labelsOrFormatter, shortNotation])

  if (isTimeUnitLabelDefinition(labelsOrFormatter)) {
    const [singulars, plurals, abbreviations] = timeUnitLabelsToCountdownLabels(labelsOrFormatter)
    ;[format['singular'], format['plural']] = shortNotation ? [abbreviations, abbreviations] : [singulars, plurals]
  } else {
    format['formatter'] = labelsOrFormatter
  }

  if (!isCountdownFormatted.current) {
    countdown.setFormat(format)
    isCountdownFormatted.current = true
  }

  return countdown
}
