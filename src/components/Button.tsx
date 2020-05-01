import React from 'react'
import { Button as B, ButtonProps, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

interface CustomProps {
  loading?: boolean
}

type Props = CustomProps & ButtonProps

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  spinner: {
    color: theme.palette.primary.light,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

export const Button = ({ loading, ...rest }: Props) => {
  const classes = useStyles()

  return (
    <span className={classes.root}>
      <B {...rest} />
      {loading && <CircularProgress size={24} className={classes.spinner} />}
    </span>
  )
}
