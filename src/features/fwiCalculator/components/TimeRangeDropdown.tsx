import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'

export const TimeRangeOptionsDropdown = () => {
  const timeRangeOptions = ['Last 10 Years']

  return (
    <>
      <Autocomplete
        data-testid="time-range-dropdown"
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

export default TimeRangeOptionsDropdown
