import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { MODEL_VALUE_DECIMAL } from 'utils/constants'
import { datetimeInPDT } from 'utils/date'
import { ModelValue } from 'api/modelAPI'
import { NoonForecastValue } from 'api/forecastAPI'

const useStyles = makeStyles({
  display: {
    paddingBottom: 16
  },
  table: {
    minWidth: 650
  },
  title: {
    paddingBottom: 4
  }
})

interface TableMetadata {
  testId: string
  title: string
}

const DailyWeatherDisplay = (props: {
  values: (ModelValue | NoonForecastValue)[] | undefined
  tableMetadata: TableMetadata
}) => {
  const classes = useStyles()

  if (!props.values) {
    return null
  }

  return (
    <div className={classes.display} data-testid={props.tableMetadata.testId}>
      <Typography className={classes.title} variant="subtitle2" component="div">
        {props.tableMetadata.title}
      </Typography>
      <Paper elevation={1}>
        <TableContainer>
          <Table className={classes.table} size="small" aria-label="weather data table">
            <TableBody>
              <TableRow>
                <TableCell>Date</TableCell>
                {props.values.map(v => (
                  <TableCell key={v.datetime}>{datetimeInPDT(v.datetime)}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Temp (°C)</TableCell>
                {props.values.map(v => (
                  <TableCell key={v.datetime}>
                    {v.temperature.toFixed(MODEL_VALUE_DECIMAL)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>RH (%)</TableCell>
                {props.values.map(v => (
                  <TableCell key={v.datetime}>
                    {Math.round(v.relative_humidity)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Wind Dir</TableCell>
                {props.values.map(v => (
                  <TableCell key={v.datetime}>
                    {v.wind_direction != null && Math.round(v.wind_direction)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Wind Spd (km/h)</TableCell>
                {props.values.map(v => (
                  <TableCell key={v.datetime}>
                    {v.wind_speed?.toFixed(MODEL_VALUE_DECIMAL)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Precip (mm/cm)</TableCell>
                {props.values.map(v => (
                  <TableCell key={v.datetime}>
                    {v.total_precipitation?.toFixed(MODEL_VALUE_DECIMAL)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default React.memo(DailyWeatherDisplay)
