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
  modelValues: ModelValue[] | undefined
  modelSummaries: ModelSummary[] | undefined
  forecastValues: NoonForecastValue[] | undefined
  pastForecastValues: NoonForecastValue[] | undefined
  forecastSummaries: ForecastSummary[] | undefined
  recentHistoricModelValues: ModelValue[] | undefined
  biasAdjustedModelValues: ModelValue[] | undefined
  highResModelValues: ModelValue[] | undefined
}

const WxDataGraph = ({
  readingValues = [],
  modelValues = [],
  modelSummaries = [],
  forecastValues = [],
  pastForecastValues = [],
  forecastSummaries = [],
  recentHistoricModelValues = [],
  biasAdjustedModelValues = [],
  highResModelValues = []
}: Props) => {
  const classes = useStyles()

  const noReadings = readingValues.length === 0
  const noForecasts = forecastValues.length === 0
  const noModels = modelValues.length === 0
  const noModelSummaries = modelSummaries.length === 0
  const noRecentHistoricModels = recentHistoricModelValues.length === 0
  const noPastForecasts =
    pastForecastValues.length === 0 && forecastSummaries.length === 0
  const noBiasAdjustedPredictions = biasAdjustedModelValues.length === 0
  const noHighResModels = highResModelValues.length === 0

  const [toggleValues, setToggleValues] = useGraphToggles({
    showReadings: !noReadings,
    showPastForecasts: false,
    showPastModels: false, //!noModelSummaries || !noRecentHistoricModels,
    showModels: false,
    showForecasts: false,
    showBiasAdjustedPredictions: false,
    showHighResModels: false
  })

  if (
    noReadings &&
    noForecasts &&
    noPastForecasts &&
    noModels &&
    noModelSummaries &&
    noRecentHistoricModels &&
    noBiasAdjustedPredictions
  ) {
    return null
  }

  return (
    <div className={classes.display}>
      <WxDataGraphToggles
        toggleValues={toggleValues}
        setToggleValues={setToggleValues}
        noReadings={noReadings}
        noModels={noModels}
        noHistoricModels={noModelSummaries && noRecentHistoricModels}
        noForecasts={noForecasts}
        noPastForecasts={noPastForecasts}
        noBiasAdjustedPredictions={noBiasAdjustedPredictions}
        noHighResModels={noHighResModels}
      />

      <TempRHGraph
        readingValues={toggleValues.showReadings ? readingValues : []}
        modelValues={toggleValues.showModels ? modelValues : []}
        modelSummaries={toggleValues.showPastModels ? modelSummaries : []}
        forecastValues={toggleValues.showForecasts ? forecastValues : []}
        pastForecastValues={toggleValues.showPastForecasts ? pastForecastValues : []}
        forecastSummaries={toggleValues.showPastForecasts ? forecastSummaries : []}
        recentHistoricModelValues={
          toggleValues.showPastModels ? recentHistoricModelValues : []
        }
        biasAdjustedModelValues={
          toggleValues.showBiasAdjustedPredictions ? biasAdjustedModelValues : []
        }
        highResModelValues={toggleValues.showHighResModels ? highResModelValues : []}
      />
    </div>
  )
}

export default React.memo(WxDataGraph)
