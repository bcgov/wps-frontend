import React from 'react'
import { storiesOf } from '@storybook/react'

import WxGraphByStation from 'features/fireWeather/components/WxDataGraph'
import { ModelValue } from 'api/modelAPI'
import { ReadingValue } from 'api/readingAPI'

storiesOf('WxGraphByStation', module).add('default', () => {
  return (
    <>
      <WxGraphByStation
        modelValues={modelValues as ModelValue[]}
        readingValues={readingValues as ReadingValue[]}
      />
      <WxGraphByStation modelValues={modelValues as ModelValue[]} readingValues={[]} />
    </>
  )
})

const modelValues = [
  {
    datetime: '2020-05-29T00:00:00+00:00',
    temperature: 13.2,
    dew_point: 5.8,
    relative_humidity: 61.0,
    wind_speed: 2.0,
    wind_direction: 172.0,
    total_precipitation: 0.0
  },
  {
    datetime: '2020-05-29T03:00:00+00:00',
    temperature: 14.7,
    dew_point: 2.7,
    relative_humidity: 44.0,
    wind_speed: 10.0,
    wind_direction: 100.0,
    total_precipitation: 0.0
  },
  {
    datetime: '2020-05-29T06:00:00+00:00',
    temperature: 11.9,
    dew_point: 2.5,
    relative_humidity: 52.0,
    wind_speed: 7.0,
    wind_direction: 84.0,
    total_precipitation: 0.0
  },
  {
    datetime: '2020-05-29T09:00:00+00:00',
    temperature: 10.6,
    dew_point: 2.5,
    relative_humidity: 57.0,
    wind_speed: 6.0,
    wind_direction: 79.0,
    total_precipitation: 0.0
  },
  {
    datetime: '2020-05-29T12:00:00+00:00',
    temperature: 9.5,
    dew_point: 3.0,
    relative_humidity: 64.0,
    wind_speed: 4.0,
    wind_direction: 47.0,
    total_precipitation: 0.13
  },
  {
    datetime: '2020-05-29T15:00:00+00:00',
    temperature: 11.8,
    dew_point: 5.1,
    relative_humidity: 63.0,
    wind_speed: 7.0,
    wind_direction: 71.0,
    total_precipitation: 0.36
  },
  {
    datetime: '2020-05-29T18:00:00+00:00',
    temperature: 15.5,
    dew_point: 4.8,
    relative_humidity: 49.0,
    wind_speed: 9.0,
    wind_direction: 81.0,
    total_precipitation: 0.43
  },
  {
    datetime: '2020-05-29T20:00:00+00:00',
    temperature: 17.099999999999998,
    dew_point: 4.733333333333333,
    relative_humidity: 44.333333333333336,
    wind_speed: 9.666666666666666,
    wind_direction: 77.66666666666667,
    total_precipitation: 0.45666666666666667
  },
  {
    datetime: '2020-05-29T21:00:00+00:00',
    temperature: 17.9,
    dew_point: 4.7,
    relative_humidity: 42.0,
    wind_speed: 10.0,
    wind_direction: 76.0,
    total_precipitation: 0.47
  },
  {
    datetime: '2020-05-30T00:00:00+00:00',
    temperature: 18.3,
    dew_point: 4.9,
    relative_humidity: 41.0,
    wind_speed: 12.0,
    wind_direction: 84.0,
    total_precipitation: 0.47
  },
  {
    datetime: '2020-05-30T03:00:00+00:00',
    temperature: 16.7,
    dew_point: 5.6,
    relative_humidity: 48.0,
    wind_speed: 8.0,
    wind_direction: 100.0,
    total_precipitation: 0.47
  },
  {
    datetime: '2020-05-30T06:00:00+00:00',
    temperature: 14.2,
    dew_point: 5.8,
    relative_humidity: 57.0,
    wind_speed: 6.0,
    wind_direction: 79.0,
    total_precipitation: 0.49
  },
  {
    datetime: '2020-05-30T09:00:00+00:00',
    temperature: 12.8,
    dew_point: 6.2,
    relative_humidity: 64.0,
    wind_speed: 4.0,
    wind_direction: 41.0,
    total_precipitation: 0.53
  },
  {
    datetime: '2020-05-30T12:00:00+00:00',
    temperature: 11.6,
    dew_point: 7.5,
    relative_humidity: 76.0,
    wind_speed: 4.0,
    wind_direction: 28.0,
    total_precipitation: 0.7
  },
  {
    datetime: '2020-05-30T15:00:00+00:00',
    temperature: 13.2,
    dew_point: 7.6,
    relative_humidity: 69.0,
    wind_speed: 5.0,
    wind_direction: 63.0,
    total_precipitation: 0.7
  },
  {
    datetime: '2020-05-30T18:00:00+00:00',
    temperature: 14.8,
    dew_point: 7.6,
    relative_humidity: 62.0,
    wind_speed: 6.0,
    wind_direction: 71.0,
    total_precipitation: 0.7
  },
  {
    datetime: '2020-05-30T20:00:00+00:00',
    temperature: 15.866666666666665,
    dew_point: 8.2,
    relative_humidity: 60.666666666666664,
    wind_speed: 4.666666666666667,
    wind_direction: 51.0,
    total_precipitation: 0.7
  },
  {
    datetime: '2020-05-30T21:00:00+00:00',
    temperature: 16.4,
    dew_point: 8.5,
    relative_humidity: 60.0,
    wind_speed: 4.0,
    wind_direction: 41.0,
    total_precipitation: 0.7
  },
  {
    datetime: '2020-05-31T00:00:00+00:00',
    temperature: 17.3,
    dew_point: 8.4,
    relative_humidity: 56.0,
    wind_speed: 2.0,
    wind_direction: 193.0,
    total_precipitation: 0.7
  },
  {
    datetime: '2020-05-31T03:00:00+00:00',
    temperature: 15.7,
    dew_point: 9.7,
    relative_humidity: 67.0,
    wind_speed: 8.0,
    wind_direction: 282.0,
    total_precipitation: 0.86
  },
  {
    datetime: '2020-05-31T06:00:00+00:00',
    temperature: 10.5,
    dew_point: 9.6,
    relative_humidity: 94.0,
    wind_speed: 9.0,
    wind_direction: 314.0,
    total_precipitation: 4.14
  },
  {
    datetime: '2020-05-31T09:00:00+00:00',
    temperature: 10.0,
    dew_point: 9.3,
    relative_humidity: 95.0,
    wind_speed: 6.0,
    wind_direction: 292.0,
    total_precipitation: 5.48
  },
  {
    datetime: '2020-05-31T12:00:00+00:00',
    temperature: 9.7,
    dew_point: 8.7,
    relative_humidity: 93.0,
    wind_speed: 6.0,
    wind_direction: 287.0,
    total_precipitation: 6.53
  },
  {
    datetime: '2020-05-31T15:00:00+00:00',
    temperature: 10.6,
    dew_point: 6.2,
    relative_humidity: 74.0,
    wind_speed: 9.0,
    wind_direction: 273.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-05-31T18:00:00+00:00',
    temperature: 13.2,
    dew_point: 4.8,
    relative_humidity: 57.0,
    wind_speed: 11.0,
    wind_direction: 279.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-05-31T20:00:00+00:00',
    temperature: 14.733333333333333,
    dew_point: 3.933333333333333,
    relative_humidity: 49.0,
    wind_speed: 13.0,
    wind_direction: 278.3333333333333,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-05-31T21:00:00+00:00',
    temperature: 15.5,
    dew_point: 3.5,
    relative_humidity: 45.0,
    wind_speed: 14.0,
    wind_direction: 278.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-01T00:00:00+00:00',
    temperature: 15.0,
    dew_point: 2.0,
    relative_humidity: 41.0,
    wind_speed: 18.0,
    wind_direction: 281.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-01T03:00:00+00:00',
    temperature: 13.2,
    dew_point: 0.6,
    relative_humidity: 42.0,
    wind_speed: 16.0,
    wind_direction: 281.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-01T06:00:00+00:00',
    temperature: 11.0,
    dew_point: 1.4,
    relative_humidity: 51.0,
    wind_speed: 13.0,
    wind_direction: 278.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-01T09:00:00+00:00',
    temperature: 10.1,
    dew_point: 0.1,
    relative_humidity: 50.0,
    wind_speed: 13.0,
    wind_direction: 281.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-01T12:00:00+00:00',
    temperature: 8.6,
    dew_point: -0.1,
    relative_humidity: 54.0,
    wind_speed: 10.0,
    wind_direction: 276.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-01T15:00:00+00:00',
    temperature: 9.6,
    dew_point: -0.5,
    relative_humidity: 49.0,
    wind_speed: 10.0,
    wind_direction: 277.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-01T18:00:00+00:00',
    temperature: 12.4,
    dew_point: -0.3,
    relative_humidity: 42.0,
    wind_speed: 8.0,
    wind_direction: 273.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-01T20:00:00+00:00',
    temperature: 13.933333333333334,
    dew_point: -0.03333333333333327,
    relative_humidity: 38.666666666666664,
    wind_speed: 7.333333333333333,
    wind_direction: 275.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-01T21:00:00+00:00',
    temperature: 14.7,
    dew_point: 0.1,
    relative_humidity: 37.0,
    wind_speed: 7.0,
    wind_direction: 276.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-02T00:00:00+00:00',
    temperature: 14.7,
    dew_point: 0.0,
    relative_humidity: 37.0,
    wind_speed: 10.0,
    wind_direction: 268.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-02T03:00:00+00:00',
    temperature: 13.3,
    dew_point: 0.2,
    relative_humidity: 41.0,
    wind_speed: 8.0,
    wind_direction: 256.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-02T06:00:00+00:00',
    temperature: 11.0,
    dew_point: 0.4,
    relative_humidity: 48.0,
    wind_speed: 7.0,
    wind_direction: 243.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-02T09:00:00+00:00',
    temperature: 9.9,
    dew_point: -0.3,
    relative_humidity: 49.0,
    wind_speed: 11.0,
    wind_direction: 245.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-02T12:00:00+00:00',
    temperature: 8.5,
    dew_point: -0.3,
    relative_humidity: 54.0,
    wind_speed: 8.0,
    wind_direction: 239.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-02T15:00:00+00:00',
    temperature: 9.8,
    dew_point: -0.9,
    relative_humidity: 47.0,
    wind_speed: 7.0,
    wind_direction: 226.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-02T18:00:00+00:00',
    temperature: 12.7,
    dew_point: 0.3,
    relative_humidity: 43.0,
    wind_speed: 5.0,
    wind_direction: 187.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-02T20:00:00+00:00',
    temperature: 13.233333333333333,
    dew_point: 0.8333333333333335,
    relative_humidity: 43.0,
    wind_speed: 6.333333333333333,
    wind_direction: 191.0,
    total_precipitation: 6.65
  },
  {
    datetime: '2020-06-02T21:00:00+00:00',
    temperature: 13.5,
    dew_point: 1.1,
    relative_humidity: 43.0,
    wind_speed: 7.0,
    wind_direction: 193.0,
    total_precipitation: 6.65
  }
]

const readingValues = [
  {
    datetime: '2020-05-28T00:00:00+00:00',
    temperature: 16.9,
    relative_humidity: 18.0,
    wind_speed: 9.0,
    wind_direction: 184.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T01:00:00+00:00',
    temperature: 16.0,
    relative_humidity: 23.0,
    wind_speed: 5.5,
    wind_direction: 119.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T02:00:00+00:00',
    temperature: 15.4,
    relative_humidity: 27.0,
    wind_speed: 1.9,
    wind_direction: 118.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T03:00:00+00:00',
    temperature: 14.2,
    relative_humidity: 33.0,
    wind_speed: 0.0,
    wind_direction: 91.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T04:00:00+00:00',
    temperature: 10.2,
    relative_humidity: 55.0,
    wind_speed: 0.0,
    wind_direction: 84.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T05:00:00+00:00',
    temperature: 6.4,
    relative_humidity: 72.0,
    wind_speed: 0.0,
    wind_direction: 124.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T06:00:00+00:00',
    temperature: 4.3,
    relative_humidity: 78.0,
    wind_speed: 0.0,
    wind_direction: 305.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T07:00:00+00:00',
    temperature: 2.9,
    relative_humidity: 83.0,
    wind_speed: 0.0,
    wind_direction: 129.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T08:00:00+00:00',
    temperature: 1.6,
    relative_humidity: 85.0,
    wind_speed: 1.6,
    wind_direction: 176.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T09:00:00+00:00',
    temperature: 0.8,
    relative_humidity: 90.0,
    wind_speed: 0.0,
    wind_direction: 12.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T10:00:00+00:00',
    temperature: 0.0,
    relative_humidity: 88.0,
    wind_speed: 2.2,
    wind_direction: 224.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T11:00:00+00:00',
    temperature: -0.7,
    relative_humidity: 91.0,
    wind_speed: 2.2,
    wind_direction: 158.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T12:00:00+00:00',
    temperature: 0.9,
    relative_humidity: 89.0,
    wind_speed: 3.2,
    wind_direction: 161.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T13:00:00+00:00',
    temperature: 7.0,
    relative_humidity: 68.0,
    wind_speed: 1.7,
    wind_direction: 224.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T14:00:00+00:00',
    temperature: 10.8,
    relative_humidity: 50.0,
    wind_speed: 6.9,
    wind_direction: 344.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T15:00:00+00:00',
    temperature: 13.5,
    relative_humidity: 41.0,
    wind_speed: 4.3,
    wind_direction: 338.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T16:00:00+00:00',
    temperature: 13.8,
    relative_humidity: 41.0,
    wind_speed: 5.3,
    wind_direction: 279.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T17:00:00+00:00',
    temperature: 14.8,
    relative_humidity: 43.0,
    wind_speed: 5.2,
    wind_direction: 279.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T18:00:00+00:00',
    temperature: 15.5,
    relative_humidity: 46.0,
    wind_speed: 8.2,
    wind_direction: 353.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T19:00:00+00:00',
    temperature: 15.0,
    relative_humidity: 42.0,
    wind_speed: 11.1,
    wind_direction: 357.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T20:00:00+00:00',
    temperature: 15.0,
    relative_humidity: 45.0,
    wind_speed: 2.8,
    wind_direction: 177.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T21:00:00+00:00',
    temperature: 12.4,
    relative_humidity: 61.0,
    wind_speed: 19.3,
    wind_direction: 195.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T22:00:00+00:00',
    temperature: 12.6,
    relative_humidity: 66.0,
    wind_speed: 10.4,
    wind_direction: 136.0,
    precipitation: 0.2,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-28T23:00:00+00:00',
    temperature: 13.8,
    relative_humidity: 64.0,
    wind_speed: 9.8,
    wind_direction: 158.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T00:00:00+00:00',
    temperature: 15.5,
    relative_humidity: 49.0,
    wind_speed: 11.9,
    wind_direction: 107.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T01:00:00+00:00',
    temperature: 16.0,
    relative_humidity: 44.0,
    wind_speed: 13.4,
    wind_direction: 129.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T02:00:00+00:00',
    temperature: 14.6,
    relative_humidity: 53.0,
    wind_speed: 12.5,
    wind_direction: 158.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T03:00:00+00:00',
    temperature: 12.3,
    relative_humidity: 63.0,
    wind_speed: 2.5,
    wind_direction: 144.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T04:00:00+00:00',
    temperature: 9.4,
    relative_humidity: 80.0,
    wind_speed: 0.0,
    wind_direction: 192.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T05:00:00+00:00',
    temperature: 7.1,
    relative_humidity: 89.0,
    wind_speed: 1.8,
    wind_direction: 168.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T06:00:00+00:00',
    temperature: 6.7,
    relative_humidity: 91.0,
    wind_speed: 0.0,
    wind_direction: 180.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T07:00:00+00:00',
    temperature: 6.6,
    relative_humidity: 89.0,
    wind_speed: 0.0,
    wind_direction: 213.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T08:00:00+00:00',
    temperature: 6.0,
    relative_humidity: 94.0,
    wind_speed: 0.0,
    wind_direction: 52.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T09:00:00+00:00',
    temperature: 5.5,
    relative_humidity: 95.0,
    wind_speed: 1.9,
    wind_direction: 325.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T10:00:00+00:00',
    temperature: 3.7,
    relative_humidity: 94.0,
    wind_speed: 3.7,
    wind_direction: 237.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T11:00:00+00:00',
    temperature: 4.0,
    relative_humidity: 96.0,
    wind_speed: 1.6,
    wind_direction: 84.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T12:00:00+00:00',
    temperature: 4.4,
    relative_humidity: 96.0,
    wind_speed: 5.0,
    wind_direction: 252.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T13:00:00+00:00',
    temperature: 7.8,
    relative_humidity: 95.0,
    wind_speed: 2.6,
    wind_direction: 263.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T14:00:00+00:00',
    temperature: 13.4,
    relative_humidity: 57.0,
    wind_speed: 5.0,
    wind_direction: 348.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  },
  {
    datetime: '2020-05-29T15:00:00+00:00',
    temperature: 15.0,
    relative_humidity: 51.0,
    wind_speed: 6.7,
    wind_direction: 211.0,
    precipitation: 0.0,
    ffmc: null,
    isi: null,
    fwi: null
  }
]
