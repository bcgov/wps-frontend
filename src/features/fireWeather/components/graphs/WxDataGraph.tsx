import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { ModelSummary, ModelValue } from 'api/modelAPI'
import { ReadingValue } from 'api/readingAPI'
import { NoonForecastValue, ForecastSummary } from 'api/forecastAPI'
import TempRHGraph from 'features/fireWeather/components/graphs/TempRHGraph'
import WxDataGraphToggles from 'features/fireWeather/components/graphs/WxDataGraphToggles'
import { useGraphToggles } from 'features/fireWeather/components/graphs/useGraphToggles'

const useStyles = makeStyles({
  display: {
    paddingTop: 8
  }
})

interface Props {
  readingValues: ReadingValue[] | undefined
  allModelValues: ModelValue[] | undefined
  modelSummaries: ModelSummary[] | undefined
  allForecasts: NoonForecastValue[] | undefined
  forecastSummaries: ForecastSummary[] | undefined
  allHighResModelValues: ModelValue[] | undefined
  highResModelSummaries: ModelSummary[] | undefined
}

const WxDataGraph = ({
  readingValues = [],
  allModelValues = [],
  modelSummaries = [],
  allForecasts = [],
  forecastSummaries = [],
  allHighResModelValues = [],
  highResModelSummaries = []
}: Props) => {
  const classes = useStyles()

  const noReadings = readingValues.length === 0
  const noModels = allModelValues.length === 0 && modelSummaries.length === 0
  const noForecasts = allForecasts.length === 0 && forecastSummaries.length === 0
  const noBiasAdjModels = allModelValues.length === 0
  const noHighResModels =
    allHighResModelValues.length === 0 && highResModelSummaries.length === 0

  const [toggleValues, setToggleValues] = useGraphToggles({
    showReadings: !noReadings,
    showModels: false,
    showForecasts: false,
    showBiasAdjModels: false,
    showHighResModels: false
  })

  if (noReadings && noForecasts && noModels && noBiasAdjModels && noHighResModels) {
    return null
  }

  const {
    showReadings,
    showModels,
    showForecasts,
    showBiasAdjModels,
    showHighResModels
  } = toggleValues

  return (
    <div className={classes.display}>
      <WxDataGraphToggles
        toggleValues={toggleValues}
        setToggleValues={setToggleValues}
        noReadings={noReadings}
        noForecasts={noForecasts}
        noModels={noModels}
        noBiasAdjModels={noBiasAdjModels}
        noHighResModels={noHighResModels}
      />

      <TempRHGraph
        readingValues={showReadings ? readingValues : []}
        modelValues={showModels ? allModelValues : []}
        modelSummaries={showModels ? modelSummaries : []}
        forecastValues={showForecasts ? allForecasts : []}
        forecastSummaries={showForecasts ? forecastSummaries : []}
        biasAdjModelValues={showBiasAdjModels ? allModelValues : []}
        highResModelValues={showHighResModels ? allHighResModelValues : []}
        highResModelSummaries={showHighResModels ? highResModelSummaries : []}
      />
    </div>
  )
}

export default React.memo(WxDataGraph)
