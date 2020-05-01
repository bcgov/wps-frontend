import React from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LaunchIcon from '@material-ui/icons/Launch'

import { Station } from 'api/stationAPI'
import { selectStationsReducer } from 'app/rootReducer'
import { WEATHER_STATION_MAP_LINK } from 'utils/constants'
import { ErrorMessage } from 'components/ErrorMessage'

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  viewMapLabel: {
    fontSize: 14
  },
  mapButton: {
    display: 'flex',
    marginBottom: 10
  }
})

interface Props {
  stations: Station[]
  onStationsChange: (stations: Station[]) => void
}

export const WeatherStationsDropdown = (props: Props) => {
  const classes = useStyles()
  const { stations, error } = useSelector(selectStationsReducer)

  const onMapIconClick = () => {
    window.open(WEATHER_STATION_MAP_LINK, '_blank')
  }

  return (
    <>
      <div className={classes.wrapper}>
        <Button
          color="primary"
          aria-label="directions"
          onClick={onMapIconClick}
          className={classes.mapButton}
          data-testid="launch-map-button"
        >
          <span className={classes.viewMapLabel}>Navigate to Weather Stations Map</span>
          <LaunchIcon />
        </Button>
      </div>
      <div className={classes.wrapper}>
        <Autocomplete
          data-testid="weather-station-dropdown"
          className={classes.root}
          multiple
          options={stations}
          getOptionLabel={option => `${option.name} (${option.code})`}
          onChange={(_, stations) => {
            props.onStationsChange(stations)
          }}
          value={props.stations}
          renderInput={params => (
            <TextField
              {...params}
              label="Weather Stations"
              variant="outlined"
              fullWidth
              size="small"
              helperText="Can select up to 3 weather stations."
            />
          )}
        />
      </div>
      {error && <ErrorMessage message={error} when="while fetching weather stations" />}
    </>
  )
}
