// @ts-nocheck
import React from 'react'
import { storiesOf } from '@storybook/react'

import WxDataGraph from 'features/fireWeather/components/graphs/WxDataGraph'
import {
  readingValues,
  modelValues,
  historicModels,
  forecastValues,
  historicForecasts
} from 'utils/storybook'

storiesOf('WxDataGraph', module).add('default', () => {
  return (
    <>
      <WxDataGraph
        modelValues={modelValues}
        readingValues={readingValues}
        historicModels={historicModels}
        forecastValues={forecastValues}
        historicForecasts={historicForecasts}
      />
    </>
  )
})
