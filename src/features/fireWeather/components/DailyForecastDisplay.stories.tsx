// @ts-nocheck
import React from 'react'
import { storiesOf } from '@storybook/react'

import DailyForecastDisplay from 'features/fireWeather/components/DailyForecastDisplay'
import { ForecastValues, ModelValues } from 'utils/storybook'

storiesOf('DailyForecastDisplay', module).add('default', () => {
  const modelValues = ModelValues
  const forecastValues = ForecastValues
  const modelTableTitle = 'Model Values'
  const forecastTableTitle = 'Noon Forecast Values'

  return (
    <>
      <DailyForecastDisplay values={modelValues} title={modelTableTitle} testId="" />
      <DailyForecastDisplay
        values={forecastValues}
        title={forecastTableTitle}
        testId=""
      />
    </>
  )
})
