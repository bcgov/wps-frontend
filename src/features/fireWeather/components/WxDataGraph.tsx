import React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { datetimeInPDT } from 'utils/date'
import { ModelValue } from 'api/modelAPI'
import { MODEL_VALUE_DECIMAL } from 'utils/constants'
import { ReadingValue } from 'api/readingAPI'

const useStyles = makeStyles({
  graph: {
    paddingBottom: 16
  },
  title: {
    paddingBottom: 4
  }
})

const formatXAxis = (dt: string) => {
  return datetimeInPDT(dt, 'Do MMM')
}

const formatTooltipLabel = (dt: string | number) => {
  return datetimeInPDT(dt, 'h:mm a, dddd, MMM Do')
}

const formatTooltipValue = (
  value: string | number | (string | number)[],
  name: string
) => {
  if (typeof value === 'number') {
    if (name === 'RH') return Math.round(value)

    return value.toFixed(MODEL_VALUE_DECIMAL)
  }

  return value
}

const sortByDatetime = (a: WxData, b: WxData) => {
  const a1 = new Date(a.datetime)
  const b1 = new Date(b.datetime)
  return a1 > b1 ? 1 : a1 < b1 ? -1 : 0
}

const getDateRange = (data: WxData[]) => {
  const days: string[] = []
  const map: { [k: string]: boolean } = {}
  data.forEach(v => {
    const dt = datetimeInPDT(v.datetime, 'Do MMM')
    if (!map[dt]) {
      map[dt] = true
      days.push(v.datetime)
    }
  })

  return days
}

interface WxData {
  datetime: string
  temp?: number
  modelTemp?: number
  rh?: number
  modelRh?: number
}

interface Props {
  modelValues: ModelValue[] | undefined
  readingValues: ReadingValue[] | undefined
}

const WxDataGraph = ({ modelValues, readingValues }: Props) => {
  const classes = useStyles()
  const wxData: WxData[] = []

  if (!modelValues && !readingValues) {
    return null
  }

  if (readingValues && readingValues.length > 0) {
    readingValues.forEach(v => {
      wxData.push({
        datetime: v.datetime,
        temp: v.temperature,
        rh: v.relative_humidity
      })
    })
  }

  if (modelValues && modelValues.length > 0) {
    modelValues.forEach(v => {
      wxData.push({
        datetime: v.datetime,
        modelTemp: v.temperature,
        modelRh: v.relative_humidity
      })
    })
  }

  wxData.sort(sortByDatetime)

  const dateRange = getDateRange(wxData)

  return (
    <div className={classes.graph} data-testid="weather-graph-by-station">
      <Typography className={classes.title} component="div" variant="subtitle2">
        Past 5 days of hourly readings and GDPS 3 hourly model with interpolated noon
        values (PDT, UTC-7):
      </Typography>

      <ResponsiveContainer width="100%" minHeight={300}>
        <LineChart data={wxData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
          <XAxis
            allowDataOverflow
            dataKey="datetime"
            ticks={dateRange}
            tickFormatter={formatXAxis}
          />
          <YAxis
            yAxisId="left"
            allowDataOverflow
            orientation="left"
            type="number"
            unit="°"
            domain={['auto', 'auto']}
            label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis
            yAxisId="right"
            allowDataOverflow
            orientation="right"
            type="number"
            unit="%"
            domain={[0, 100]}
            label={{
              value: 'RH',
              angle: -270,
              position: 'insideRight'
            }}
          />
          <Line
            connectNulls
            strokeWidth={1.5}
            type="monotone"
            yAxisId="left"
            name="Temp"
            dataKey="temp"
            stroke="crimson"
          />
          <Line
            connectNulls
            strokeWidth={1.5}
            type="monotone"
            yAxisId="right"
            name="RH"
            dataKey="rh"
            stroke="royalblue"
          />
          <Line
            connectNulls
            type="monotone"
            yAxisId="left"
            name="Model Temp"
            dataKey="modelTemp"
            stroke="indianred"
          />
          <Line
            connectNulls
            type="monotone"
            yAxisId="right"
            name="Model RH"
            dataKey="modelRh"
            stroke="dodgerblue"
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
          <Tooltip labelFormatter={formatTooltipLabel} formatter={formatTooltipValue} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(WxDataGraph)
