import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'

export const timeRangeOptions = ['Last 10 Years']

export const TimeRangeOptionsDropdown = () => {
  return (
    <>
      <Autocomplete
        data-testid="time-range-dropdown"
        defaultValue={timeRangeOptions[0]}
        options={timeRangeOptions}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
            {...params}
            label="Time Range"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </>
  )
}
