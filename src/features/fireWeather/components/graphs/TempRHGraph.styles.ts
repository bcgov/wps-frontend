import { makeStyles } from '@material-ui/core/styles'

const currLineColor = 'green'
const readingTempDotColor = 'crimson'
const readingRHDotColor = 'royalblue'
const historicTempAreaColor = '#ff91a5'
const historicRHAreaColor = '#87b1ff'
const modelTempDotColor = '#fc6f03'
const modelRHDotColor = '#03a1fc'
const forecastTempDotColor = '#ec03fc'
const forecastRHDotColor = '#5e03fc'
const historicTempLineColor = '#ec03fc'
const historicRHLineColor = '#5e03fc'

export const useStyles = makeStyles({
  // Give styling through classes for svg elements
  root: {
    '& .xAxisLabel': {
      textAnchor: 'start',
      font: '9px sans-serif'
    },
    '& .yAxisLabel': {
      textAnchor: 'middle',
      font: '9px sans-serif'
    },
    '& .currLine': {
      strokeWidth: 1,
      stroke: currLineColor,
      strokeDasharray: '4,4'
    },
    '& .currLabel': {
      font: '9px sans-serif',
      fill: currLineColor
    },
    '& .tooltipCursor': {
      strokeWidth: 1,
      stroke: 'gray',
      strokeDasharray: '1,1',
      opacity: 0
    },
    '& .tooltip': {
      pointerEvents: 'none',
      font: '8.5px sans-serif',

      '&--hidden': {
        display: 'none'
      }
    },
    '& .readingTempDot': {
      stroke: readingTempDotColor,
      fill: 'none',
      cursor: 'pointer'
    },
    '& .readingRHDot': {
      stroke: readingRHDotColor,
      fill: 'none',
      cursor: 'pointer'
    },
    '& .historicTempArea': {
      stroke: historicTempAreaColor,
      strokeWidth: 1,
      fill: historicTempAreaColor,
      opacity: 0.5
    },
    '& .historicRHArea': {
      stroke: historicRHAreaColor,
      strokeWidth: 1,
      fill: historicRHAreaColor,
      opacity: 0.5
    },
    '& .modelTempDot': {
      stroke: modelTempDotColor,
      fill: 'none',
      cursor: 'pointer'
    },
    '& .modelRHDot': {
      stroke: modelRHDotColor,
      fill: 'none',
      cursor: 'pointer'
    },
    '& .forecastTempDot': {
      stroke: forecastTempDotColor,
      fill: 'none',
      cursor: 'pointer'
    },
    '& .forecastRHDot': {
      stroke: forecastRHDotColor,
      fill: 'none',
      cursor: 'pointer'
    },
    '& .historicTempLine': {
      stroke: historicTempLineColor,
      strokeWidth: 1.5
    },
    '& .historicRHLine': {
      stroke: historicRHLineColor,
      strokeWidth: 1.5
    }
  }
})
