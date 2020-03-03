import React from 'react'
import IOSSlider from 'features/fwiCalculator/components/IOSSlider'
import { InputLabel, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    marginTop: 20
  }
})

interface Props {
  timeRange: number
  onYearRangeChange: (yearRangeNumber: number) => void
}

const TIME_RANGE_OPTIONS = [
  {
    value: 0,
    label: '0'
  },
  {
    value: 10,
    label: '10'
  },
  {
    value: 20,
    label: '20'
  },
  {
    value: 50,
    label: 'Full'
  }
]

export const TimeRangeSlider = (props: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.root} data-testid="time-range-slider">
      <InputLabel>Time Range (years)</InputLabel>
      <IOSSlider
        aria-label="Time Range"
        marks={TIME_RANGE_OPTIONS}
        max={50}
        min={0}
        onChange={(_, timeRange) => {
          if (typeof timeRange === 'number') {
            if (timeRange === 0) return
            props.onYearRangeChange(timeRange)
          }
        }}
        step={null}
        value={props.timeRange}
      />
    </div>
  )
}
