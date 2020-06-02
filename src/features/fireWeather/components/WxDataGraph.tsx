import React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
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

const sortByDatetime = (a: WxValue, b: WxValue) => {
  const a1 = new Date(a.datetime)
  const b1 = new Date(b.datetime)

  return a1 > b1 ? 1 : a1 < b1 ? -1 : 0
}

const getDateRangeAndToday = (wxData: WxValue[]) => {
  const dateRange: string[] = []
  const map: { [k: string]: boolean } = {}
  const today = datetimeInPDT(new Date().toISOString(), 'Do MMM')
  let todayDt: string | undefined = undefined

  wxData.forEach(v => {
    const dt = datetimeInPDT(v.datetime, 'Do MMM')
    if (!map[dt]) {
      map[dt] = true
      dateRange.push(v.datetime)
    }

    if (!todayDt && today === dt) {
      todayDt = v.datetime
    }
  })

  return { dateRange, todayDt }
}

type WxValue = ReadingValue | ModelValue

interface Props {
  modelValues: ModelValue[] | undefined
  readingValues: ReadingValue[] | undefined
}

const WxDataGraph = ({ modelValues = [], readingValues = [] }: Props) => {
  const classes = useStyles()
  const wxData: WxValue[] = [...readingValues, ...modelValues]

  wxData.sort(sortByDatetime)

  const { dateRange, todayDt } = getDateRangeAndToday(wxData)

  return (
    <div className={classes.graph} data-testid="weather-graph-by-station">
      <Typography className={classes.title} component="div" variant="subtitle2">
        Past 5 days of hourly readings and GDPS 3 hourly model with interpolated noon
        values (PDT, UTC-7):
      </Typography>

      <ResponsiveContainer width="100%" minHeight={300}>
        <LineChart margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
          <XAxis
            dataKey="datetime"
            type="category"
            allowDuplicatedCategory={false}
            ticks={dateRange}
            tickFormatter={formatXAxis}
          />
          <YAxis
            yAxisId="left"
            dataKey="temperature"
            orientation="left"
            unit="°"
            domain={[-10, 45]}
            label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis
            yAxisId="right"
            dataKey="relative_humidity"
            orientation="right"
            unit="%"
            domain={[0, 100]}
            label={{
              value: 'RH',
              angle: -270,
              position: 'insideRight'
            }}
          />
          <Tooltip labelFormatter={formatTooltipLabel} formatter={formatTooltipValue} />
          <Legend />
          <ReferenceLine
            x={todayDt}
            yAxisId="left"
            stroke="green"
            label="Today"
            strokeDasharray="3 3"
          />
          <Line
            strokeWidth={1.5}
            type="monotone"
            yAxisId="left"
            name="Temp"
            dataKey="temperature"
            stroke="crimson"
            data={readingValues}
          />
          <Line
            type="monotone"
            yAxisId="left"
            name="Model Temp"
            dataKey="temperature"
            stroke="indianred"
            data={modelValues}
          />
          <Line
            strokeWidth={1.5}
            type="monotone"
            yAxisId="right"
            name="RH"
            dataKey="relative_humidity"
            stroke="royalblue"
            data={readingValues}
          />
          <Line
            connectNulls
            type="monotone"
            yAxisId="right"
            name="Model RH"
            dataKey="relative_humidity"
            stroke="dodgerblue"
            data={modelValues}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(WxDataGraph)
