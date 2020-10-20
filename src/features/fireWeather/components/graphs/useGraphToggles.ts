// Custom React Hook for the temp & rh graph toggle state
import { useState } from 'react'

export type GraphTimeOption = 'past' | 'future' | 'all'
export interface ToggleValues {
  showReadings: boolean
  showModels: boolean
  showForecasts: boolean
  showBiasAdjustedModels: boolean
  showHighResModels: boolean
  timeOfInterest: GraphTimeOption
}

export type SetToggleValues = (
  key: keyof ToggleValues,
  value: ValueOf<ToggleValues>
) => void

export const useGraphToggles = (
  initialValues: ToggleValues
): [ToggleValues, SetToggleValues] => {
  const [values, setValues] = useState(initialValues)

  return [
    values,
    (key, value) => {
      setValues({
        ...values,
        [key]: value
      })
    }
  ]
}
