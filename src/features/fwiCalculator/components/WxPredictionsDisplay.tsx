import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { selectWxPredictionReducer } from 'app/rootReducer'
import { ErrorMessage } from 'components/ErrorMessage'

const useStyles = makeStyles({
  display: {
    maxHeight: 400,
    overflowY: 'auto'
  }
})

export const WxPredictionsDisplay = () => {
  const classes = useStyles()
  const { error, wxPredictions, isLoading } = useSelector(selectWxPredictionReducer)

  if (error) {
    return <ErrorMessage context="while fetching weather data" />
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  if (wxPredictions.length === 0) {
    return null
  }

  return <pre className={classes.display}>{JSON.stringify(wxPredictions, null, 2)}</pre>
}
