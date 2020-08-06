// @ts-nocheck
import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment'

import WxDataGraph from 'features/fireWeather/components/WxDataGraph'
import DailyWeatherDisplay from 'features/fireWeather/components/DailyWeatherDisplay'

const getModelValues = () => {
  const modelValues = []
  const days = 3
  const first = moment()
    .utc()
    .set({ hour: 0, minute: 0, second: 0 })
  const last = moment(first).add(days, 'days')
  const hourInterval = 3

  while (last.diff(first, 'days') >= 0) {
    for (let length = 0; length < 24 / hourInterval; length++) {
      modelValues.push({
        datetime: moment(first)
          .add(hourInterval * length, 'hours')
          .utc()
          .format(),
        temperature: Math.random() * 25,
        dew_point: Math.random() * 10,
        relative_humidity: Math.random() * 101,
        wind_speed: Math.random() * 10,
        wind_direction: Math.random() * 100,
        total_precipitation: Math.random()
      })
    }

    first.add(1, 'days')
  }

  return modelValues
}

const getReadingValues = () => {
  const readingValues = []
  const days = 2
  const first = moment()
    .utc()
    .set({ hour: 0, minute: 0, second: 0 })
    .subtract(days, 'days')
  const last = moment(first).add(days, 'days')

  while (last.diff(first, 'days') >= 0) {
    for (let length = 0; length < 24; length++) {
      readingValues.push({
        datetime: moment(first)
          .add(length, 'hours')
          .utc()
          .format(),
        temperature: Math.random() * 30,
        dew_point: Math.random() * 10,
        relative_humidity: Math.random() * 101,
        wind_speed: Math.random() * 10,
        wind_direction: Math.random() * 100,
        total_precipitation: Math.random(),
        ffmc: null,
        isi: null,
        fwi: null
      })
    }

    first.add(1, 'days')
  }

  return readingValues
}

const getForecastValues = () => {
  const forecastValues = []
  const days = 2
  const first = moment()
    .utc()
    .set({ hour: 19, minute: 0, second: 0 })
    .subtract(days, 'days')
  const last = moment(first).add(days, 'days')

  while (last.diff(first, 'days') >= 0) {
    forecastValues.push({
      datetime: moment(first).utc().format(),
      temperature: Math.random() * 30,
      relative_humidity: Math.random() * 101,
      wind_speed: Math.random() * 10,
      wind_direction: Math.random() * 100,
      total_precipitation: Math.random() * 10,
      gc: null,
      ffmc: null,
      dmc: null,
      dc: null,
      isi: null,
      bui: null,
      fwi: null,
      danger_rating: 2
    })

    first.add(1, 'days')
  }
  return forecastValues
}

storiesOf('WxDataGraph', module).add('default', () => {
  const modelValues = getModelValues()
  const readingValues = getReadingValues()
  const forecastValues = getForecastValues()

  return (
    <>
      <WxDataGraph modelValues={modelValues} readingValues={readingValues} forecastValues={forecastValues} />
      <h3>When only model values provided</h3>
      <WxDataGraph modelValues={modelValues} readingValues={[]} forecastValues={[]} />
    </>
  )
})

storiesOf('DailyWeatherDisplay', module).add('default', () => {
  const modelValues = getModelValues()
  const forecastValues = getForecastValues()
  const modelTableMetadata = {
    testid: '',
    title: 'Model Values (UTC Timezone)'
  }
  const forecastTableMetadata = {
    testid: '',
    title: 'Noon Forecast Values (UTC Timezone)'
  }

  return (
    <>
      <DailyWeatherDisplay values={modelValues} tableMetadata={modelTableMetadata} />
      <DailyWeatherDisplay values={forecastValues} tableMetadata={forecastTableMetadata} />
    </>
  )
})
