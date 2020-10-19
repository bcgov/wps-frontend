import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import {
  ToggleValues,
  SetToggleValues
} from 'features/fireWeather/components/graphs/useGraphToggles'

const useStyles = makeStyles({
  formControlLabel: {
    marginLeft: -5
  },
  label: {
    marginLeft: 2
  }
})

interface Props {
  toggleValues: ToggleValues
  setToggleValues: SetToggleValues
  noReadings: boolean
  noModels: boolean
  noHistoricModels: boolean
  noForecasts: boolean
  noPastForecasts: boolean
  noBiasAdjustedPredictions: boolean
  noHighResModels: boolean
}

const WxDataToggles = ({
  toggleValues,
  setToggleValues,
  noReadings,
  noModels,
  noHistoricModels,
  noForecasts,
  noPastForecasts,
  noBiasAdjustedPredictions,
  noHighResModels
}: Props) => {
  const classes = useStyles()

  return (
    <FormGroup row>
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showReadings"
            data-testid="wx-graph-reading-toggle"
            checked={toggleValues.showReadings}
            disabled={noReadings}
            size="small"
            onChange={(e, checked) => {
              setToggleValues(e.target.name as 'showReadings', checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            Observations
          </Typography>
        }
      />
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showPastModels"
            data-testid="wx-graph-model-summary-toggle"
            checked={toggleValues.showPastModels}
            disabled={noHistoricModels}
            size="small"
            onChange={(e, checked) => {
              setToggleValues(e.target.name as 'showPastModels', checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            Historic Models
          </Typography>
        }
      />
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showPastForecasts"
            data-testid="wx-graph-forecast-summary-toggle"
            checked={toggleValues.showPastForecasts}
            disabled={noPastForecasts}
            size="small"
            onChange={(e, checked) => {
              setToggleValues(e.target.name as 'showPastForecasts', checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            Historic Noon Forecasts
          </Typography>
        }
      />
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showModels"
            data-testid="wx-graph-model-toggle"
            checked={toggleValues.showModels}
            disabled={noModels}
            size="small"
            onChange={(e, checked) => {
              setToggleValues(e.target.name as 'showModels', checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            Models
          </Typography>
        }
      />
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showForecasts"
            data-testid="wx-graph-forecast-toggle"
            checked={toggleValues.showForecasts}
            disabled={noForecasts}
            size="small"
            onChange={(e, checked) => {
              setToggleValues(e.target.name as 'showForecasts', checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            Noon Forecasts
          </Typography>
        }
      />
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showBiasAdjustedPredictions"
            data-testid="wx-graph-bias-toggle"
            checked={toggleValues.showBiasAdjustedPredictions}
            disabled={noBiasAdjustedPredictions}
            size="small"
            onChange={(e, checked) => {
              setToggleValues(e.target.name as 'showBiasAdjustedPredictions', checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            Bias Adjusted Models
          </Typography>
        }
      />
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Switch
            name="showHighResModels"
            data-testid="wx-graph-high-res-model-toggle"
            checked={toggleValues.showHighResModels}
            disabled={noHighResModels}
            size="small"
            onChange={(e, checked) => {
              setToggleValues(e.target.name as 'showHighResModels', checked)
            }}
          />
        }
        label={
          <Typography className={classes.label} variant="body2">
            High Resolution Models
          </Typography>
        }
      />
    </FormGroup>
  )
}

export default React.memo(WxDataToggles)
