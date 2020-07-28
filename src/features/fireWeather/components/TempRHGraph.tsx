import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/core/styles'

import { HistoricModel as _HistoricModel } from 'api/modelAPI'
import { ReadingValue as _ReadingValue } from 'api/readingAPI'
import { formatDateInPDT } from 'utils/date'

const useStyles = makeStyles({
  root: {
    '& .axisLabel': {
      textAnchor: 'middle',
      fontSize: '0.6em'
    },
    '& .tooltipCursor': {
      strokeWidth: 1,
      stroke: 'gray',
      strokeDasharray: '1, 1',
      opacity: 0
    },
    '& .tooltip': {
      pointerEvents: 'none',
      font: '9px sans-serif'
    },
    '& .tooltip--hidden': {
      display: 'none'
    },
    '& .tempDot': {
      stroke: 'crimson',
      fill: 'none',
      cursor: 'pointer'
    },
    '& .rhDot': {
      stroke: 'royalblue',
      fill: 'none',
      cursor: 'pointer'
    },
    '& .tempArea': {
      fill: '#ffcfd8',
      opacity: 0.5
    },
    '& .rhArea': {
      fill: '#8bb4ff',
      opacity: 0.5
    }
  }
})

type HistoricModel = Omit<_HistoricModel, 'datetime'> & { date: Date }
type ReadingValue = Omit<_ReadingValue, 'datetime'> & { date: Date }

interface Props {
  readingValues: _ReadingValue[]
  historicModels: _HistoricModel[]
}

const TempRHGraph = ({
  readingValues: _readingValues,
  historicModels: _historicModels
}: Props) => {
  const classes = useStyles()
  const svgRef = useRef(null)

  useEffect(() => {
    if (_readingValues && _historicModels && svgRef.current) {
      /* Prepare for data */
      const formatDate = d3.timeFormat('%b %d') as (
        value: Date | { valueOf(): number }
      ) => string
      const eachDay: { [k: string]: Date } = {}
      const readingValues: ReadingValue[] = _readingValues.map(d => {
        const date = d3.isoParse(d.datetime) as Date
        const day = formatDate(date)

        if (!eachDay[day]) {
          eachDay[day] = date
        }

        return {
          ...d,
          temperature: Number(d.temperature.toFixed(2)),
          relative_humidity: Number(d.relative_humidity.toFixed(2)),
          date
        }
      })
      const historicModels: HistoricModel[] = _historicModels.map(d => {
        return {
          ...d,
          date: d3.isoParse(d.datetime) as Date
        }
      })

      /* Set the dimensions and margins of the graph */
      const margin = { top: 10, right: 40, bottom: 30, left: 40 }
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
        .domain(d3.extent(readingValues, d => d.date) as [Date, Date])
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
      const tempArea = d3
        .area<HistoricModel>()
        .curve(d3.curveNatural)
        .x(d => xScale(d.date))
        .y0(d => yTempScale(d.tmp_2m_90th))
        .y1(d => yTempScale(d.tmp_2m_5th))
      svg
        .append('path')
        .datum(historicModels)
        .attr('class', 'tempArea')
        .attr('d', tempArea)
      svg
        .selectAll('.tempDot')
        .data(readingValues)
        .enter()
        .append('circle')
        .attr('class', 'tempDot')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yTempScale(d.temperature))
        .attr('r', 1.5)

      /* Render area and dots for RH */
      const rhArea = d3
        .area<HistoricModel>()
        .curve(d3.curveNatural)
        .x(d => xScale(d.date))
        .y0(d => yRHScale(d.rh_2m_90th))
        .y1(d => yRHScale(d.rh_2m_5th))
      svg
        .append('path')
        .datum(historicModels)
        .attr('class', 'rhArea')
        .attr('d', rhArea)
      svg
        .selectAll('.rhDot')
        .data(readingValues)
        .enter()
        .append('circle')
        .attr('class', 'rhDot')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yRHScale(d.relative_humidity))
        .attr('r', 1.5)

      /* Render the X & Y axis and labels */
      svg // X axis
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickFormat(formatDate)
            .tickValues(Object.values(eachDay))
        )
        .selectAll('text')
        .attr('y', 0)
        .attr('x', 0)
        .attr('dy', '1em')
        .attr('dx', '0.5em')
        .attr('transform', 'rotate(45)')
        .style('text-anchor', 'start')

      // Y axis
      svg.append('g').call(d3.axisLeft(yTempScale).tickValues([-10, 5, 20, 45]))
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
        .attr('class', 'axisLabel')
        .text('Temp (°C)')
      svg // RH label
        .append('text')
        .attr('transform', 'rotate(-270)')
        .attr('y', 0 - width - margin.left)
        .attr('x', height / 2)
        .attr('dy', '1.3em')
        .attr('class', 'axisLabel')
        .text('RH (%)')

      /* Render tooltip and attach its listeners https://observablehq.com/@d3/line-chart-with-tooltip */
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
          .call(text =>
            text
              .selectAll('tspan')
              .data((value + '').split(/\n/))
              .join('tspan')
              .attr('x', 0)
              .attr('y', (d, i) => `${i * 1.5}em`)
              .text(d => d)
          )

        const { y: textY, width: w, height: h } = (text.node() as SVGSVGElement).getBBox()
        const padding = 8
        const xStart = 12
        if (dir === 'right') {
          text.attr('transform', `translate(${xStart}, ${textY})`)
          path.attr(
            'd',
            `M ${xStart - padding}, ${textY - 2 * padding}
             H${xStart + padding + w}
             v${h + 2 * padding}
             h-${w + 2 * padding}
             z
            `
          )
        } else {
          text.attr('transform', `translate(${-w - xStart}, ${textY})`)
          path.attr(
            'd',
            `M ${-w - xStart - padding}, ${textY - 2 * padding}
             H${0 - xStart + padding}
             v${h + 2 * padding}
             h-${w + 2 * padding}
             z
            `
          )
        }
      }
      // Draw a rectangular that covers the whole space so that
      // the listener can react to mouseover anywhere within the graph
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
        const inverted = xScale.invert(mx)
        const bisect = d3.bisector((d: { date: Date }) => d.date).left
        const index = bisect(readingValues, inverted, 1)
        const a = readingValues[index - 1]
        const b = readingValues[index]
        // get the nearest value from the user's mouse position
        const value =
          b &&
          inverted.valueOf() - a.date.valueOf() > b.date.valueOf() - inverted.valueOf()
            ? b
            : a
        const { date, temperature, relative_humidity } = value
        const formattedDate = formatDateInPDT(date, 'h:mm a, dddd, MMM Do')
        const scaledDate = xScale(date)
        tooltipCursor.attr('transform', `translate(${scaledDate}, 0)`).style('opacity', 1)
        tooltip
          .attr('transform', `translate(${scaledDate}, ${yTempScale(temperature)})`)
          .call(
            createTooltipCallout(width / 2 > scaledDate ? 'right' : 'left'),
            `${formattedDate} \n Temp: ${temperature} (°C) \n RH: ${relative_humidity} (%)`
          )
      })
      svg.on('touchend mouseleave', () => {
        tooltipCursor.style('opacity', 0)
        tooltip.call(createTooltipCallout(), null)
      })
    }
  }, [_readingValues, _historicModels, svgRef.current])

  return (
    <div className={classes.root}>
      <svg ref={svgRef} />
    </div>
  )
}

export default TempRHGraph
