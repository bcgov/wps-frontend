import { PercentilesResponse } from 'api/percentileAPI'

export const mockStations = [
  { code: 1, name: 'Station 1', lat: 1, long: 1 },
  { code: 2, name: 'Station 2', lat: 2, long: 2 }
]

export const mockPercentilesResponse: PercentilesResponse = {
  stations: {
    [mockStations[0].code]: {
      ffmc: 94.2121,
      isi: 15.4124,
      bui: 157.2321,
      season: { start_month: 5, start_day: 1, end_month: 8, end_day: 31 },
      years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      station: { ...mockStations[0] }
    },
    [mockStations[1].code]: {
      ffmc: null,
      isi: null,
      bui: null,
      season: { start_month: 5, start_day: 1, end_month: 8, end_day: 31 },
      years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      station: { ...mockStations[1] }
    }
  },
  mean_values: {
    ffmc: 94.2121,
    isi: 15.4124,
    bui: 157.2321
  },
  year_range: { start: 2010, end: 2019 },
  percentile: 90
}

export const mockNullPercentilesResponse: PercentilesResponse = {
  stations: {
    [mockStations[0].code]: {
      ffmc: null,
      isi: null,
      bui: null,
      season: { start_month: 5, start_day: 1, end_month: 8, end_day: 31 },
      years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      station: { ...mockStations[1] }
    },
    [mockStations[1].code]: {
      ffmc: null,
      isi: null,
      bui: null,
      season: { start_month: 5, start_day: 1, end_month: 8, end_day: 31 },
      years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      station: { ...mockStations[1] }
    }
  },
  mean_values: {
    ffmc: null,
    isi: null,
    bui: null
  },
  year_range: { start: 2010, end: 2019 },
  percentile: 90
}
