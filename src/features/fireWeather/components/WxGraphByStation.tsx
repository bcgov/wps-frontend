import React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import { datetimeInPDT, isNoonInPST } from 'utils/date'
import { ModelValue } from 'api/modelAPI'

interface Props {
  values: ModelValue[] | undefined
}

const formatXAxis = (dt: string) => {
  return datetimeInPDT(dt, 'hA')
}

const formatTooltipLabel = (dt: string | number) => {
  return datetimeInPDT(dt, 'h:mm a, ddd, MMM Do, YYYY')
}

const WxGraphByStation = ({ values }: Props) => {
  if (!values || values.length === 0) {
    return null
  }

  const xAxisTicks = values.map(v => v.datetime).filter(dt => isNoonInPST(dt))

  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <LineChart data={values} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
        <XAxis
          allowDataOverflow
          dataKey="datetime"
          ticks={xAxisTicks}
          tickFormatter={formatXAxis}
        />
        <YAxis
          yAxisId="left"
          allowDataOverflow
          orientation="left"
          type="number"
          unit="°C"
        />
        <YAxis
          yAxisId="right"
          allowDataOverflow
          orientation="right"
          type="number"
          unit="%"
        />
        <Line
          yAxisId="left"
          type="natural"
          name="Temperature"
          dataKey="temperature"
          stroke="#8884d8"
        />
        <Line
          yAxisId="right"
          type="natural"
          name="RH"
          dataKey="relative_humidity"
          stroke="#82ca9d"
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

        <Tooltip labelFormatter={formatTooltipLabel} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default React.memo(WxGraphByStation)
