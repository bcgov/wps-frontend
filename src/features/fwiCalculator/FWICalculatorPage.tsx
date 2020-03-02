import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Station } from 'api/stationAPI'
import { PageTitle } from 'components/PageTitle'
import { Container } from 'components/Container'
import { fetchStations } from 'features/fwiCalculator/slices/stationsSlice'
import { WeatherStationsDropdown } from 'features/fwiCalculator/components/StationsDropdown'
import { PercentileTextfield } from 'features/fwiCalculator/components/PercentileTextfield'
import {
  fetchPercentiles,
  resetPercentilesResult
} from 'features/fwiCalculator/slices/percentilesSlice'
import { PercentileActionButtons } from 'features/fwiCalculator/components/PercentileActionButtons'
import { FWICalculatorResults } from 'features/fwiCalculator/FWICalculatorResults'
import { TimeRangeSlider } from './components/TimeRangeSlider'
import { YearRange } from 'api/percentileAPI'

export const FWICalculatorPage = () => {
  const dispatch = useDispatch()
  const timeRangeInitialState: YearRange = {
    start: new Date().getFullYear() - 10,
    end: new Date().getFullYear() - 1
  }

  const [stations, setStations] = useState<Station[]>([])
  const [timeRange, setTimeRange] = useState<YearRange>(timeRangeInitialState)

  useEffect(() => {
    dispatch(fetchStations())
  }, [dispatch])

  const onStationsChange = (s: Station[]) => {
    if (s.length > 3) {
      return
    }
    setStations(s)
  }

  const onYearRangeChange = (yearRangeNumber: YearRange) => {
    setTimeRange(yearRangeNumber)
  }

  const onCalculateClick = () => {
    const stationCodes = stations.map(s => s.code)
    const percentile = 90
    const yearRange = timeRange
    dispatch(fetchPercentiles(stationCodes, percentile, yearRange))
  }

  const onResetClick = () => {
    setStations([])
    dispatch(resetPercentilesResult())
    setTimeRange(timeRangeInitialState)
  }

  return (
    <>
      <PageTitle title="FWI Calculator" />
      <Container>
        <WeatherStationsDropdown
          stations={stations}
          onStationsChange={onStationsChange}
        />

        <TimeRangeSlider
          timeRange={timeRange}
          onYearRangeChange={onYearRangeChange}
        />

        <PercentileTextfield />

        <PercentileActionButtons
          stations={stations}
          onCalculateClick={onCalculateClick}
          onResetClick={onResetClick}
        />

        <FWICalculatorResults />
      </Container>
    </>
  )
}
