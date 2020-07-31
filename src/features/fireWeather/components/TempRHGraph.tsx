import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { HistoricModel as _HistoricModel, ModelValue } from 'api/modelAPI'
import { ReadingValue } from 'api/readingAPI'
import { formatDateInPDT } from 'utils/date'

const useStyles = makeStyles({
  // Give styling through classes for svg elements
  root: {
    '& .xAxisLabel': {
      textAnchor: 'start',
      font: '9px sans-serif'
    },
    '& .yAxisLabel': {
      textAnchor: 'middle',
      font: '9px sans-serif'
    },
    '& .currLine': {
      strokeWidth: 1,
      stroke: 'green',
      strokeDasharray: '4,4'
    },
    '& .currLabel': {
      font: '9px sans-serif',
      fill: 'green'
    },
    '& .tooltipCursor': {
      strokeWidth: 1,
      stroke: 'gray',
      strokeDasharray: '1,1',
      opacity: 0
    },
    '& .tooltip': {
      pointerEvents: 'none',
      font: '8.5px sans-serif',

      '&--hidden': {
        display: 'none'
      }
    },
    '& .readingTempDot': {
      stroke: 'crimson',
      fill: 'none',
      cursor: 'pointer'
    },
    '& .readingRHDot': {
      stroke: 'royalblue',
      fill: 'none',
      cursor: 'pointer'
    },
    '& .readingTempArea': {
      fill: '#ffbac7',
      opacity: 0.5
    },
    '& .readingRHArea': {
      fill: '#8bb4ff',
      opacity: 0.5
    },
    '& .modelTempDot': {
      stroke: '#fc6f03',
      fill: 'none',
      cursor: 'pointer'
    },
    '& .modelRHDot': {
      stroke: '#03a1fc',
      fill: 'none',
      cursor: 'pointer'
    }
  },
  title: {
    paddingBottom: 6
  }
})

const getNearestBasedOnDate = (invertedDate: Date, arr: { date: Date }[]) => {
  // What is bisect: https://observablehq.com/@d3/d3-bisect
  const bisect = d3.bisector((d: { date: Date }) => d.date).left
  const index = bisect(arr, invertedDate, 1)
  const a = arr[index - 1]
  const b = arr[index]
  // Get the nearest value from the user's mouse position
  const value =
    b &&
    invertedDate.valueOf() - a.date.valueOf() > b.date.valueOf() - invertedDate.valueOf()
      ? b
      : a

  return value
}

const formatDate = d3.timeFormat('%b %d') as (
  value: Date | { valueOf(): number }
) => string

const storeEachDayLookup = (lookup: { [k: string]: Date }, datetime: string) => {
  const date = d3.isoParse(datetime) as Date
  const day = formatDate(date)
  if (!lookup[day]) {
    lookup[day] = new Date(date) //.setHours(0, 0, 0)
  }

  return date
}

interface WeatherValue {
  date: Date
  temp?: number
  rh?: number
  modelTemp?: number
  modelRH?: number
}
type HistoricModel = Omit<_HistoricModel, 'datetime'> & { date: Date }

interface Props {
  readingValues: ReadingValue[] | undefined
  modelValues: ModelValue[] | undefined
  historicModels: _HistoricModel[] | undefined
}

const TempRHGraph = ({
  readingValues: _readingValues = [],
  modelValues: _modelValues = [],
  historicModels: _historicModels = []
}: Props) => {
  const classes = useStyles()
  const svgRef = useRef(null)

  useEffect(() => {
    if (svgRef.current) {
      /* Prepare for data */
      const eachDayLookup: { [k: string]: Date } = {}
      // Lookup table storing all the wx data with key of each datetime
      const weatherLookup: { [k: string]: WeatherValue } = {}
      const readingValues = _readingValues.map(d => {
        const date = storeEachDayLookup(eachDayLookup, d.datetime)
        const reading = {
          date,
          temp: Number(d.temperature.toFixed(2)),
          rh: Math.round(d.relative_humidity)
        }
        weatherLookup[d.datetime] = reading

        return reading
      })
      const modelValues = _modelValues.map(d => {
        const date = storeEachDayLookup(eachDayLookup, d.datetime)
        const model = {
          date,
          modelTemp: Number(d.temperature.toFixed(2)),
          modelRH: Math.round(d.relative_humidity)
        }
        // combine with the existing reading value
        weatherLookup[d.datetime] = { ...weatherLookup[d.datetime], ...model }

        return model
      })
      const historicModels: HistoricModel[] = _historicModels.map(d => {
        const date = storeEachDayLookup(eachDayLookup, d.datetime)
        const hModel = { ...d, date }
        weatherLookup[d.datetime] = { ...weatherLookup[d.datetime], ...hModel }

        return hModel
      })
      const weatherValues = Object.values(weatherLookup)
      const xTickValues = Object.values(eachDayLookup)
        .sort((a, b) => a.valueOf() - b.valueOf()) // in ascending order
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
        .attr('viewBox', `0 0 ${widthValue} ${heightValue}`)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      /* Create scales for x and y axis */
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(weatherValues, d => d.date) as [Date, Date])
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
      const readingTempArea = d3
        .area<HistoricModel>()
        .curve(d3.curveNatural)
        .x(d => xScale(d.date))
        .y0(d => yTempScale(d.tmp_tgl_2_90th))
        .y1(d => yTempScale(d.tmp_tgl_2_5th))
      svg
        .append('path')
        .datum(historicModels)
        .attr('class', 'readingTempArea')
        .attr('d', readingTempArea)
      svg
        .selectAll('.readingTempDot')
        .data(readingValues)
        .enter()
        .append('circle')
        .attr('class', 'readingTempDot')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yTempScale(d.temp))
        .attr('r', 1)
      svg
        .selectAll('.modelTempDot')
        .data(modelValues)
        .enter()
        .append('circle')
        .attr('class', 'modelTempDot')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yTempScale(d.modelTemp))
        .attr('r', 1)

      /* Render area and dots for RH */
      const readingRHArea = d3
        .area<HistoricModel>()
        .curve(d3.curveNatural)
        .x(d => xScale(d.date))
        .y0(d => yRHScale(d.rh_tgl_2_90th))
        .y1(d => yRHScale(d.rh_tgl_2_5th))
      svg
        .append('path')
        .datum(historicModels)
        .attr('class', 'readingRHArea')
        .attr('d', readingRHArea)
      svg
        .selectAll('.readingRHDot')
        .data(readingValues)
        .enter()
        .append('circle')
        .attr('class', 'readingRHDot')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yRHScale(d.rh))
        .attr('r', 1)
      svg
        .selectAll('.modelRHDot')
        .data(modelValues)
        .enter()
        .append('circle')
        .attr('class', 'modelRHDot')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yRHScale(d.modelRH))
        .attr('r', 1)

      /* Render the current time reference line */
      const scaledCurrTime = xScale(new Date())
      svg
        .append('line')
        .attr('x1', scaledCurrTime)
        .attr('y1', 0)
        .attr('x2', scaledCurrTime)
        .attr('y2', height)
        .attr('class', 'currLine')
      svg
        .append('text')
        .attr('y', -12)
        .attr('x', scaledCurrTime)
        .attr('dy', '1em')
        .attr('dx', '-1em')
        .attr('class', 'currLabel')
        .text('Now')

      /* Render the X & Y axis and labels */
      svg // X axis
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickFormat(formatDate)
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

      /* Render tooltip and attach its listeners https://observablehq.com/@d3/line-chart-with-tooltip */
      // High order function
      const createTooltipCallout = (dir?: 'right' | 'left') => (
        g: typeof svg,
        value: string
      ) => {
        if (!value) return g.attr('class', 'tooltip--hidden')

        g.attr('class', 'tooltip')

        const path = g
          .selectAll('path')
          .data([null])
          .join('path')
          .attr('fill', 'white')
          .attr('stroke', 'black')

        const text = g
          .selectAll('text')
          .data([null])
          .join('text')
          .call(txt =>
            txt
              .selectAll('tspan')
              .data((value + '').split(/\n/))
              .join('tspan')
              .attr('x', 0)
              .attr('y', (d, i) => `${i * 1.5}em`)
              .text(d => d)
          )

        const { y: textY, width: w, height: h } = (text.node() as SVGSVGElement).getBBox()
        const padding = 8
        const xStart = 13
        let translateX = xStart
        let HMove = xStart + padding + w
        let MX = xStart - padding
        if (dir === 'left') {
          translateX = -w - xStart
          HMove = -xStart + padding
          MX = -xStart - padding - w
        }
        text.attr('transform', `translate(${translateX}, ${textY})`)
        path.attr(
          'd',
          `M ${MX}, ${textY - 2 * padding}
             H${HMove}
             v${h + 2 * padding}
             h-${w + 2 * padding}
             z
            `
        )
      }
      // Draw a rectangular that covers the whole svg space so that
      // the listener can react to user's mouseover in anywhere within the graph
      svg
        .append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', 'transparent')

      const tooltipCursor = svg
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', height)
        .attr('class', 'tooltipCursor')
      const tooltip = svg.append('g')
      svg.on('touchmove mousemove', function() {
        const mx = d3.mouse(this)[0]
        const invertedDate = xScale.invert(mx)
        const nearest = getNearestBasedOnDate(invertedDate, weatherValues)
        const nearestX = xScale(nearest.date)
        const whichDirection = width / 2 > nearestX ? 'right' : 'left'
        const tooltipText = Object.entries(nearest)
          .map(([key, value]) => {
            if (key === 'date') {
              return formatDateInPDT(value, 'h:mm a, dddd, MMM Do')
            } else if (key === 'temp') {
              return `Temp: ${value} (°C)`
            } else if (key === 'modelTemp') {
              return `Model Temp: ${value} (°C)`
            } else if (key === 'rh') {
              return `RH: ${value} (%)`
            } else if (key === 'modelRH') {
              return `Model RH: ${value} (%)`
            }
            return ''
          })
          .join('\n') // new line after each text
        tooltip
          .attr('transform', `translate(${nearestX}, ${height / 3})`)
          .call(createTooltipCallout(whichDirection), tooltipText)
        tooltipCursor.attr('transform', `translate(${nearestX}, 0)`).style('opacity', 1)
      })
      svg.on('touchend mouseleave', () => {
        tooltipCursor.style('opacity', 0)
        tooltip.call(createTooltipCallout(), null)
      })
    }
  }, [_readingValues, _modelValues, _historicModels])

  return (
    <div className={classes.root} data-testid="weather-graph-by-station">
      <Typography className={classes.title} component="div" variant="subtitle2">
        Past 5 days of hourly readings and GDPS 3 hourly model with interpolated noon
        values (PDT, UTC-7):
      </Typography>
      <svg ref={svgRef} />
    </div>
  )
}

export default TempRHGraph
