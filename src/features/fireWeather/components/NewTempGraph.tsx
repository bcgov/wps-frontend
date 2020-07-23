import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/core/styles'

import { HistoricModel as _HistoricModel } from 'api/modelAPI'
import { ReadingValue as _ReadingValue } from 'api/readingAPI'

const useStyles = makeStyles({
  root: {
    '& .tmpDot': {
      stroke: 'crimson',
      fill: 'none',
      cursor: 'pointer'
    },
    '& .tempArea': {
      fill: '#ffcfd8'
    },
    '& .tooltip': {
      // color: 'white',
      position: 'absolute',
      textAlign: 'center',
      width: '120px',
      // height: '30px',
      padding: '5px',
      font: '12px sans-serif',
      background: 'white',
      border: '1px solid black',
      borderRadius: '5px',
      pointerEvents: 'none'
    }
  }
})

type HistoricModel = Omit<_HistoricModel, 'datetime'> & { date: Date }
type ReadingValue = Omit<_ReadingValue, 'datetime'> & { date: Date }

interface Props {
  readingValues: _ReadingValue[]
  historicModels: _HistoricModel[]
}

const TempExample = ({
  readingValues: _readingValues,
  historicModels: _historicModels
}: Props) => {
  const classes = useStyles()
  const svgRef = useRef(null)

  useEffect(() => {
    if (_readingValues && _historicModels && svgRef.current) {
      // Prepare for data
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

      // Set the dimensions and margins of the graph
      const margin = { top: 10, right: 30, bottom: 30, left: 30 }
      const widthValue = 600
      const heightValue = 150
      const width = widthValue - margin.left - margin.right
      const height = heightValue - margin.top - margin.bottom
      const svg = d3
        .select(svgRef.current)
        .attr('viewBox', `0 0 ${widthValue} ${heightValue}`)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      // Define the div for the tooltip
      const div = d3
        .select(`.${classes.root}`)
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

      // Create scales
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(readingValues, d => d.date) as [Date, Date])
        .range([0, width])
      const yTmpScale = d3
        .scaleLinear()
        .domain([-10, 45])
        .range([height, 0])

      // Add area for temperature percentiles
      const area = d3
        .area<HistoricModel>()
        .curve(d3.curveNatural)
        .x(d => xScale(d.date))
        .y0(d => yTmpScale(d.tmp_2m_90th))
        .y1(d => yTmpScale(d.tmp_2m_5th))
      svg
        .append('path')
        .datum(historicModels)
        .attr('class', 'tempArea') // Assign a class for styling
        .attr('d', area)

      // In case we need to display lines
      // const line = d3
      //   .line<DatedRV>()
      //   .x(d => {
      //     return x(d.datetime)
      //   })
      //   .y(d => {
      //     return y(d.temperature)
      //   })
      //   .curve(d3.curveNatural)

      // svg
      //   .append('path')
      //   .data([readingValues])
      //   .attr('fill', 'none')
      //   .attr('class', 'line')
      //   .attr('d', line)

      // Add dots for temperature values
      svg
        .selectAll('.tmpDot')
        .data(readingValues)
        .enter()
        .append('circle')
        .attr('class', 'tmpDot') // Assign a class for styling
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yTmpScale(d.temperature))
        .attr('r', 1.5)
      // .on('mouseover', function({ date, temperature }) {
      //   d3.select(this).style('fill', 'crimson')
      //   div
      //     .transition()
      //     .duration(200)
      //     .style('opacity', 0.9)
      //   div
      //     .text(`${d3.timeFormat('%I%p, %a, %b %dth')(date)} Temp: ${temperature}`)
      //     // .html(timeFormat(d.datetime) + '<br/>' + d.temperature)
      //     .style('left', d3.event.pageX + 'px')
      //     .style('top', d3.event.pageY - 28 + 'px')
      // })
      // .on('mouseout', function() {
      //   d3.select(this).style('fill', 'none')
      //   div
      //     .transition()
      //     .duration(200)
      //     .style('opacity', 0)
      // })

      // Add the X Axis
      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickFormat(formatDate)
            .tickValues(Object.values(eachDay))
        )
      // Add the Y Axis
      svg.append('g').call(d3.axisLeft(yTmpScale).tickValues([-10, 5, 20, 45]))

      const callout = (g: typeof svg, value: string) => {
        if (!value) return g.style('display', 'none')

        g.style('display', null)
          .style('pointer-events', 'none')
          .style('font', '10px sans-serif')

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
              .attr('y', (d, i) => `${i * 1.1}em`)
              .style('font-weight', (_, i) => (i ? null : 'bold'))
              .text(d => d)
          )

        const { x, y, width: w, height: h } = (text.node() as SVGSVGElement).getBBox()

        text.attr('transform', `translate(${-w / 2},${15 - y})`)
        path.attr(
          'd',
          `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
        )
      }

      svg
        .append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', 'transparent')
      const tooltip = svg.append('g')

      svg.on('touchmove mousemove', function() {
        const mx = d3.mouse(this)[0]
        const inverted = xScale.invert(mx)
        const bisect = d3.bisector((d: { date: Date }) => d.date).left
        const index = bisect(readingValues, inverted, 1)
        const a = readingValues[index - 1]
        const b = readingValues[index]
        const value =
          b &&
          inverted.valueOf() - a.date.valueOf() > b.date.valueOf() - inverted.valueOf()
            ? b
            : a
        const { date, temperature } = value
        tooltip
          .attr('transform', `translate(${xScale(date)},${yTmpScale(temperature) + 2})`)
          .call(callout, `Temp: ${temperature}`)
      })
      svg.on('touchend mouseleave', () => tooltip.call(callout, null))
    }
  }, [_readingValues, _historicModels, svgRef.current])

  return (
    <div className={classes.root}>
      <svg ref={svgRef} />
    </div>
  )
}

export default TempExample
