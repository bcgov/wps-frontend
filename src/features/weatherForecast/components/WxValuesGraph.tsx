import React from 'react'
import { useSelector } from 'react-redux'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import { selectForecasts } from 'app/rootReducer'
import { ForecastWxValue } from 'api/forecastAPI'

export const ForecastWxValuesGraph = () => {
  const { error, forecasts } = useSelector(selectForecasts)
  let values: ForecastWxValue[] = []
  forecasts.map(f => {
    values = [...values, ...f.values]
  })

  if (values.length === 0) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <LineChart data={values} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
        <XAxis allowDataOverflow dataKey="datetime" />
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
          name="Temp"
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

        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}
