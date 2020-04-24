import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Station } from 'api/stationAPI'
import { PageHeader } from 'components/PageHeader'
import { PageTitle } from 'components/PageTitle'
import { Container } from 'components/Container'
import { fetchWeatherStations } from 'features/weatherStations/slices/stationsSlice'
import { WeatherStationDropdown } from 'features/weatherStations/components/WeatherStationDropdown'
import { PercentileTextfield } from 'features/percentileCalculator/components/PercentileTextfield'
import {
  fetchPercentiles,
  resetPercentilesResult
} from 'features/percentileCalculator/slices/percentilesSlice'
import { PercentileActionButtons } from 'features/percentileCalculator/components/PercentileActionButtons'
import { PercentileResults } from 'features/percentileCalculator/components/PercentileResults'
import { TimeRangeSlider } from 'features/percentileCalculator/components/TimeRangeSlider'

const defaultTimeRange = 10
const defaultPercentile = 90

export const PercentileCalculatorPage = () => {
  const dispatch = useDispatch()

  const [selectedStations, setStations] = useState<Station[]>([])
  const [timeRange, setTimeRange] = useState<number>(defaultTimeRange)

  useEffect(() => {
    dispatch(fetchWeatherStations())
  }, [dispatch])

  const onStationsChange = (s: Station[]) => {
    setStations(s)
  }

  const onYearRangeChange = (timeRange: number) => {
    setTimeRange(timeRange)
  }

  const onCalculateClick = () => {
    const stationCodes = selectedStations.map(s => s.code)
    const currYear = new Date().getFullYear()
    const yearRange = {
      start: currYear - timeRange,
      end: currYear - 1
    }

    dispatch(fetchPercentiles(stationCodes, defaultPercentile, yearRange))
  }

  const onResetClick = () => {
    setStations([])
    setTimeRange(defaultTimeRange)
    dispatch(resetPercentilesResult())
  }

  return (
    <div data-testid="percentile-calculator-page">
      <PageHeader title="Predictive Services Unit" />
      <PageTitle title="Percentile Calculator" />
      <Container>
        <WeatherStationDropdown
          stations={selectedStations}
          onStationsChange={onStationsChange}
        />

        <TimeRangeSlider timeRange={timeRange} onYearRangeChange={onYearRangeChange} />

        <PercentileTextfield />

        <PercentileActionButtons
          stations={selectedStations}
          onCalculateClick={onCalculateClick}
          onResetClick={onResetClick}
        />

        <PercentileResults />
      </Container>
    </div>
  )
}
