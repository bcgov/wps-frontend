// @ts-nocheck
import React from 'react'
import { storiesOf } from '@storybook/react'

import WxDataGraph from 'features/fireWeather/components/WxDataGraph'
import { ModelValues, ForecastValues, ReadingValues } from 'utils/stories.common'


storiesOf('WxDataGraph', module)
  .add('default', () => {
    const modelValues = ModelValues
    const forecastValues = ForecastValues
    const { readingValues } = ReadingValues

    return (
      <>
        <WxDataGraph modelValues={modelValues} readingValues={readingValues} forecastValues={forecastValues} />
        <h3>When only model values provided</h3>
        <WxDataGraph modelValues={modelValues} readingValues={[]} forecastValues={[]} />
      </>
    )
  })
  .add('with historic model', () => {
    const modelValues = ModelValues
    const forecastValues = ForecastValues
    const { readingValues, historicModels } = ReadingValues

    return (
      <WxDataGraph
        modelValues={modelValues}
        readingValues={readingValues}
        historicModels={historicModels}
        forecastValues={forecastValues}
      />
    )
  })
