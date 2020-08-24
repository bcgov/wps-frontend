import React, { useState } from 'react'

import { HistoricModel, ModelValue } from 'api/modelAPI'
import { ReadingValue } from 'api/readingAPI'
import { NoonForecastValue } from 'api/forecastAPI'
import TempRHGraph from 'features/fireWeather/components/TempRHGraph'
import WxDataGraphToggles from 'features/fireWeather/components/WxDataGraphToggles'

interface Props {
  readingValues: ReadingValue[] | undefined
  modelValues: ModelValue[] | undefined
  historicModels: HistoricModel[] | undefined
  forecastValues: NoonForecastValue[] | undefined
}

const WxDataGraph = ({
  readingValues = [],
  modelValues = [],
  historicModels = [],
  forecastValues = []
}: Props) => {
  const noReadings = readingValues.length === 0
  const noForecasts = forecastValues.length === 0
  const noModels = modelValues.length === 0
  const noHistoricModels = historicModels.length === 0
  const [showReadings, setShowReadings] = useState<boolean>(!noReadings)
  const [showModels, setShowModels] = useState<boolean>(!noModels)
  const [showForecasts, setShowForecasts] = useState<boolean>(!noForecasts)

  if (noReadings && noModels && noHistoricModels && noForecasts) {
    return null
  }

  return (
    <>
      <WxDataGraphToggles
        noReadings={noReadings}
        showReadings={showReadings}
        setShowReadings={setShowReadings}
        noModels={noModels}
        showModels={showModels}
        setShowModels={setShowModels}
        noForecasts={noForecasts}
        showForecasts={showForecasts}
        setShowForecasts={setShowForecasts}
      />

      <TempRHGraph
        modelValues={showModels ? modelValues : []}
        historicModels={showModels ? historicModels : []}
        readingValues={showReadings ? readingValues : []}
        forecastValues={showForecasts ? forecastValues : []}
      />
    </>
  )
}

export default React.memo(WxDataGraph)
