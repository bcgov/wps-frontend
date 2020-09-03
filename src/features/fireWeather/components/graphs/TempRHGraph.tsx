import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

import { useStyles } from 'features/fireWeather/components/graphs/TempRHGraph.styles'
import { ReadingValue } from 'api/readingAPI'
import { HistoricModel as _HistoricModel, ModelValue } from 'api/modelAPI'
import { ForecastSummary as _ForecastSummary, NoonForecastValue } from 'api/forecastAPI'
import { formatDateInPDT } from 'utils/date'
import * as d3Utils from 'utils/d3'

interface WeatherValue {
  date: Date
  temp?: number
  rh?: number
  modelTemp?: number
  modelRH?: number
  forecastTemp?: number
  forecastRH?: number
}
type HistoricModel = Omit<_HistoricModel, 'datetime'> & { date: Date }
type ForecastSummary = Omit<_ForecastSummary, 'datetime'> & { date: Date }

interface Props {
  readingValues: ReadingValue[]
  modelValues: ModelValue[]
  historicModels: _HistoricModel[]
  forecastValues: NoonForecastValue[]
  forecastSummaries: _ForecastSummary[]
}

const TempRHGraph: React.FunctionComponent<Props> = ({
  readingValues: _readingValues = [],
  modelValues: _modelValues = [],
  historicModels: _historicModels = [],
  forecastValues: _forecastValues = [],
  forecastSummaries: _forecastSummaries = []
}: Props) => {
  const classes = useStyles()
  const svgRef = useRef(null)

  useEffect(() => {
    if (svgRef.current) {
      /* Clear previous svg before rendering a new one */
      d3.select(svgRef.current)
        .selectAll('*')
        .remove()

      /* Prepare for data */
      const daysLookup: { [k: string]: Date } = {} // will help to create the date label on x axis
      const allDates: Date[] = [] // will be used to determine x axis range
      const weatherValueByDatetime: { [k: string]: WeatherValue } = {}
      const readingValues = _readingValues.map(d => {
        const date = d3Utils.storeDaysLookup(daysLookup, d.datetime)
        const reading = {
          date,
          temp: Number(d.temperature.toFixed(2)),
          rh: Math.round(d.relative_humidity)
        }
        weatherValueByDatetime[d.datetime] = reading
        allDates.push(date)

        return reading
      })
      const modelValues = _modelValues.map(d => {
        const date = d3Utils.storeDaysLookup(daysLookup, d.datetime)
        const model = {
          date,
          modelTemp: Number(d.temperature.toFixed(2)),
          modelRH: Math.round(d.relative_humidity)
        }
        // combine with the existing reading value
        weatherValueByDatetime[d.datetime] = {
          ...weatherValueByDatetime[d.datetime],
          ...model
        }
        allDates.push(date)

        return model
      })
      const historicModels: HistoricModel[] = _historicModels.map(d => {
        const date = d3Utils.storeDaysLookup(daysLookup, d.datetime)
        allDates.push(date)

        return { ...d, date }
      })
      const forecastValues = _forecastValues.map(d => {
        const date = d3Utils.storeDaysLookup(daysLookup, d.datetime)
        const forecast = {
          date,
          forecastTemp: Number(d.temperature.toFixed(2)),
          forecastRH: Math.round(d.relative_humidity)
        }
        // combine with existing readings and models values
        weatherValueByDatetime[d.datetime] = {
          ...weatherValueByDatetime[d.datetime],
          ...forecast
        }
        allDates.push(date)

        return forecast
      })
      const forecastSummaries: ForecastSummary[] = _forecastSummaries.map(d => {
        const date = d3Utils.storeDaysLookup(daysLookup, d.datetime)
        allDates.push(date)

        return { ...d, date }
      })
      // weather values without percentile summaries
      const weatherValues = Object.values(weatherValueByDatetime).sort(
        (a, b) => a.date.valueOf() - b.date.valueOf()
      )
      const minAndMaxDate = d3.extent(allDates) as [Date, Date]
      const xTickValues = Object.values(daysLookup)
        .sort((a, b) => a.valueOf() - b.valueOf()) // sort in ascending order
        .map((day, idx) => {
          if (idx === 0) {
            // Return the first day as it is
            return day
          }
          // Return the rest with 0h 0m 0s set
          return new Date(day).setHours(0, 0, 0)
        })

      /* Set the dimensions and margins of the graph */
      const margin = { top: 10, right: 40, bottom: 40, left: 40 }
      const widthValue = 600
      const heightValue = 150
      const width = widthValue - margin.left - margin.right
      const height = heightValue - margin.top - margin.bottom
      const svg = d3
        .select(svgRef.current)
        // Make it responsive: https://medium.com/@louisemoxy/a-simple-way-to-make-d3-js-charts-svgs-responsive-7afb04bc2e4b
        .attr('viewBox', `0 0 ${widthValue} ${heightValue}`)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      /* Create scales for x and y axis */
      const xScale = d3
        .scaleTime()
        .domain(minAndMaxDate)
        .range([0, width])
      const yTempScale = d3
        .scaleLinear()
        .domain([-10, 45])
        .range([height, 0])
      const yRHScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([height, 0])

      /* Render area and dots for temperature */
      d3Utils.drawArea({
        svg,
        x: d => xScale(d.date),
        y0: d => yTempScale(d.tmp_tgl_2_90th),
        y1: d => yTempScale(d.tmp_tgl_2_5th),
        datum: historicModels,
        className: 'historicTempArea',
        testId: 'historic-model-temp-area'
      })
      d3Utils.drawDots({
        svg,
        data: readingValues,
        className: 'readingTempDot',
        cx: d => xScale(d.date),
        cy: d => yTempScale(d.temp),
        testId: 'hourly-reading-temp-dot'
      })
      d3Utils.drawDots({
        svg,
        data: modelValues,
        className: 'modelTempDot',
        cx: d => xScale(d.date),
        cy: d => yTempScale(d.modelTemp),
        testId: 'model-temp-dot'
      })
      d3Utils.drawDots({
        svg,
        data: forecastValues,
        className: 'forecastTempDot',
        cx: d => xScale(d.date),
        cy: d => yTempScale(d.forecastTemp),
        testId: 'forecast-temp-dot'
      })
      forecastSummaries.forEach(forecast => {
        svg // Historic forecast temp min & max vertical lines
          .append('line')
          .attr('x1', xScale(forecast.date))
          .attr('y1', yTempScale(forecast.tmp_min))
          .attr('x2', xScale(forecast.date))
          .attr('y2', yTempScale(forecast.tmp_max))
          .attr('class', 'forecastSummaryTempLine')
          .attr('data-testid', 'forecast-summary-temp-line')
      })

      /* Render area and dots for RH */
      d3Utils.drawDots({
        svg,
        data: readingValues,
        className: 'readingRHDot',
        cx: d => xScale(d.date),
        cy: d => yRHScale(d.rh)
      })
      d3Utils.drawDots({
        svg,
        data: modelValues,
        className: 'modelRHDot',
        cx: d => xScale(d.date),
        cy: d => yRHScale(d.modelRH)
      })
      d3Utils.drawArea({
        svg,
        x: d => xScale(d.date),
        y0: d => yRHScale(d.rh_tgl_2_90th),
        y1: d => yRHScale(d.rh_tgl_2_5th),
        datum: historicModels,
        className: 'historicRHArea'
      })
      d3Utils.drawDots({
        svg,
        data: forecastValues,
        className: 'forecastRHDot',
        cx: d => xScale(d.date),
        cy: d => yRHScale(d.forecastRH)
      })
      forecastSummaries.forEach(forecast => {
        svg // Historic forecast temp min & max vertical lines
          .append('line')
          .attr('x1', xScale(forecast.date))
          .attr('y1', yRHScale(forecast.rh_min))
          .attr('x2', xScale(forecast.date))
          .attr('y2', yRHScale(forecast.rh_max))
          .attr('class', 'forecastSummaryRHLine')
      })

      /* Render the current time reference line */
      const currDate = new Date()
      const isCurrDateInXAxisRange =
        minAndMaxDate[0] &&
        minAndMaxDate[1] &&
        minAndMaxDate[0].valueOf() < currDate.valueOf() &&
        minAndMaxDate[1].valueOf() > currDate.valueOf()
      if (isCurrDateInXAxisRange) {
        const scaledCurrDate = xScale(currDate)
        svg
          .append('line')
          .attr('x1', scaledCurrDate)
          .attr('y1', 0)
          .attr('x2', scaledCurrDate)
          .attr('y2', height)
          .attr('class', 'currLine')
        svg
          .append('text')
          .attr('y', -12)
          .attr('x', scaledCurrDate)
          .attr('dy', '1em')
          .attr('dx', '-1em')
          .attr('class', 'currLabel')
          .text('Now')
      }

      /* Render the X & Y axis and labels */
      svg // X axis
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickFormat(d3Utils.formatDateInMonthAndDay)
            .tickValues(xTickValues)
        )
        .selectAll('text')
        .attr('y', 0)
        .attr('x', 0)
        .attr('dy', '1em')
        .attr('dx', '0.5em')
        .attr('transform', 'rotate(45)')
        .attr('class', 'xAxisLabel')

      // Y axis
      svg.append('g').call(d3.axisLeft(yTempScale).tickValues([-10, 5, 20, 35, 45]))
      svg
        .append('g')
        .attr('transform', `translate(${width}, 0)`)
        .call(d3.axisRight(yRHScale).tickValues([0, 25, 50, 75, 100]))

      svg // Temperature label
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - height / 2)
        .attr('dy', '1.3em')
        .attr('class', 'yAxisLabel')
        .text('Temp (°C)')
      svg // RH label
        .append('text')
        .attr('transform', 'rotate(-270)')
        .attr('y', 0 - width - margin.left)
        .attr('x', height / 2)
        .attr('dy', '1.3em')
        .attr('class', 'yAxisLabel')
        .text('RH (%)')

      d3Utils.attachTooltip({
        svg,
        xScale,
        width,
        height,
        data: weatherValues,
        getInnerText: ([key, value]) => {
          if (key === 'date') {
            return `${formatDateInPDT(value, 'h:mm a, ddd, MMM Do')} (PDT, UTC-7)`
          } else if (key === 'temp') {
            return `Temp: ${value} (°C)`
          } else if (key === 'modelTemp') {
            return `Model Temp: ${value} (°C)`
          } else if (key === 'forecastTemp') {
            return `Forecast Temp: ${value} (°C)`
          } else if (key === 'rh') {
            return `RH: ${value} (%)`
          } else if (key === 'modelRH') {
            return `Model RH: ${value} (%)`
          } else if (key === 'forecastRH') {
            return `Forecast RH: ${value} (%)`
          }
          return ''
        }
      })
    }
  }, [
    classes.root,
    _readingValues,
    _modelValues,
    _historicModels,
    _forecastValues,
    _forecastSummaries
  ])

  return (
    <div className={classes.root}>
      <svg data-testid="temp-rh-graph" ref={svgRef} />
    </div>
  )
}

export default React.memo(TempRHGraph)
