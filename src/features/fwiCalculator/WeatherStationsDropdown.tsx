import React, { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'

import { Station } from 'api/stationAPI'
import { RootState } from 'app/rootReducer'

interface Props {
  onStationChange: (station: Station | null) => void
}

export const WeatherStationsDropdown = (props: Props) => {
  const { stations, error } = useSelector((state: RootState) => state.stations)
  const onChange = (e: ChangeEvent<{}>, s: Station | null) => {
    props.onStationChange(s)
  }

  return (
    <>
      <Autocomplete
        id="weather-station-dropdown"
        options={stations}
        getOptionLabel={option => option.name}
        onChange={onChange}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
            {...params}
            label="Weather Stations"
            variant="outlined"
            fullWidth
          />
        )}
      />
      {error && (
        <div>Something went wrong while fetching stations... {error}</div>
      )}
    </>
  )
}
