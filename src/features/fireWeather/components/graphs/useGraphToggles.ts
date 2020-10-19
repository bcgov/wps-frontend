import { useState } from 'react'

export interface ToggleValues {
  showReadings: boolean
  showModels: boolean
  showPastModels: boolean
  showForecasts: boolean
  showPastForecasts: boolean
  showBiasAdjustedPredictions: boolean
  showHighResModels: boolean
}

export type SetToggleValues = (key: keyof ToggleValues, value: boolean) => void

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
