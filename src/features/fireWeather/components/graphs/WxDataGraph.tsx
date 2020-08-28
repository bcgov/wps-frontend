import React, { useState } from 'react'

import { HistoricModel, ModelValue } from 'api/modelAPI'
import { ReadingValue } from 'api/readingAPI'
import { NoonForecastValue, HistoricForecast } from 'api/forecastAPI'
import TempRHGraph from 'features/fireWeather/components/graphs/TempRHGraph'
import WxDataGraphToggles from 'features/fireWeather/components/graphs/WxDataGraphToggles'

interface Props {
  readingValues: ReadingValue[] | undefined
  modelValues: ModelValue[] | undefined
  historicModels: HistoricModel[] | undefined
  forecastValues: NoonForecastValue[] | undefined
  historicForecasts: HistoricForecast[] | undefined
}

const WxDataGraph = ({
  readingValues = [],
  modelValues = [],
  historicModels = [],
  forecastValues = [],
  historicForecasts = []
}: Props) => {
  const noReadings = readingValues.length === 0
  const noForecasts = forecastValues.length === 0
  const noModels = modelValues.length === 0
  const noHistoricModels = historicModels.length === 0
  const noHistoricForecasts = historicForecasts.length === 0
  // Show hourly readings and models initially, and let users manipulate the view
  const [showReadings, setShowReadings] = useState<boolean>(!noReadings)
  const [showModels, setShowModels] = useState<boolean>(!noModels)
  const [showHistoricModels, setShowHistoricModels] = useState<boolean>(!noHistoricModels)
  const [showForecasts, setShowForecasts] = useState<boolean>(!noForecasts)
  const [showHistoricForecasts, setShowHistoricForecasts] = useState<boolean>(
    !noHistoricForecasts
  )

  if (noReadings && noModels && noHistoricModels && noForecasts && noHistoricForecasts) {
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
        noHistoricModels={noModels}
        showHistoricModels={showHistoricModels}
        setShowHistoricModels={setShowHistoricModels}
        noForecasts={noForecasts}
        showForecasts={showForecasts}
        setShowForecasts={setShowForecasts}
        noHistoricForecasts={noHistoricForecasts}
        showHistoricForecasts={showHistoricForecasts}
        setShowHistoricForecasts={setShowHistoricForecasts}
      />

      <TempRHGraph
        readingValues={showReadings ? readingValues : []}
        modelValues={showModels ? modelValues : []}
        historicModels={showHistoricModels ? historicModels : []}
        forecastValues={showForecasts ? forecastValues : []}
        HistoricForecasts={showHistoricForecasts ? historicForecasts : []}
      />
    </>
  )
}

export default React.memo(WxDataGraph)
