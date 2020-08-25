import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles({
  formControlLabel: {
    marginLeft: -5
  },
  label: {
    marginLeft: 2
  }
})

interface Props {
  noReadings: boolean
  showReadings: boolean
  setShowReadings: (checked: boolean) => void
  noModels: boolean
  showModels: boolean
  setShowModels: (checked: boolean) => void
  noHistoricModels: boolean
  showHistoricModels: boolean
  setShowHistoricModels: (checked: boolean) => void
  noForecasts: boolean
  showForecasts: boolean
  setShowForecasts: (checked: boolean) => void
  noHistoricForecasts: boolean
  showHistoricForecasts: boolean
  setShowHistoricForecasts: (checked: boolean) => void
}

const WxDataToggles = ({
  noReadings,
  showReadings,
  setShowReadings,
  noModels,
  showModels,
  setShowModels,
  noHistoricModels,
  showHistoricModels,
  setShowHistoricModels,
  noForecasts,
  showForecasts,
  setShowForecasts,
  noHistoricForecasts,
  showHistoricForecasts,
  setShowHistoricForecasts
}: Props) => {
  const classes = useStyles()

  return (
    <FormGroup row>
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showReadings"
            data-testid="wx-data-reading-toggle"
            checked={showReadings}
            disabled={noReadings}
            size="small"
            onChange={(_, checked) => {
              setShowReadings(checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            Hourly Reading
          </Typography>
        }
      />
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showModels"
            data-testid="wx-data-model-toggle"
            checked={showModels}
            disabled={noModels}
            size="small"
            onChange={(_, checked) => {
              setShowModels(checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            Model Prediction
          </Typography>
        }
      />
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showHistoricModels"
            data-testid="wx-data-historic-model-toggle"
            checked={showHistoricModels}
            disabled={noHistoricModels}
            size="small"
            onChange={(_, checked) => {
              setShowHistoricModels(checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            Historic Model
          </Typography>
        }
      />
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showForecasts"
            data-testid="wx-data-forecast-toggle"
            checked={showForecasts}
            disabled={noForecasts}
            size="small"
            onChange={(_, checked) => {
              setShowForecasts(checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            Noon Forecast
          </Typography>
        }
      />
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showHistoricForecasts"
            data-testid="wx-data-historic-forecast-toggle"
            checked={showHistoricForecasts}
            disabled={noHistoricForecasts}
            size="small"
            onChange={(_, checked) => {
              setShowHistoricForecasts(checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            Historic Noon Forecast
          </Typography>
        }
      />
    </FormGroup>
  )
}

export default React.memo(WxDataToggles)
