import React from 'react'
import { Slider, withStyles, Typography } from '@material-ui/core'
import { YearRange } from 'api/percentileAPI'

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
    width: 300
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus,&:hover,&$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow
      }
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000'
    }
  },
  track: {
    height: 5
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf'
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor'
  }
})(Slider)

interface Props {
  timeRange: YearRange
  onYearRangeChange: (yearRange: YearRange) => void
}

const TIME_RANGE_OPTIONS = [
  {
    value: 0,
    label: '0'
  },
  {
    value: 9,
    label: '10'
  },
  {
    value: 19,
    label: '20'
  },
  {
    value: 49,
    label: 'Full'
  }
]

export const TimeRangeSlider = (props: Props) => {
  return (
    <div>
      <Typography gutterBottom>Time Range (years)</Typography>
      <IOSSlider
        aria-label="Time Range"
        marks={TIME_RANGE_OPTIONS}
        max={49}
        min={0}
        onChange={(_, timeRange) => {
          if (typeof timeRange === 'number') {
            if (timeRange === 0) {
              return
            }
            const maxYear = new Date().getFullYear() - 1
            props.onYearRangeChange({
              start: maxYear - timeRange,
              end: maxYear
            })
          }
        }}
        step={null}
        value={props.timeRange.end - props.timeRange.start}
      />
    </div>
  )
}
