import React from 'react'
import { Container } from 'components/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: 65,
    background: theme.palette.primary.main,
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: '#fcba19',
    paddingBottom: 10
  },
  logo: {
    marginTop: 10,
    width: 175
  },
  container: {
    display: 'flex'
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontSize: '1.7rem',
    marginTop: '1rem'
    // paddingBottom: '1rem',
    // paddingTop: '1rem'
  }
}))

interface Props {
  title: string
}

export const PageHeader = ({ title }: Props) => {
  const classes = useStyles()

  return (
    <nav className={classes.root}>
      <Container className={classes.container}>
        <a href="https://gov.bc.ca">
          <img
            className={classes.logo}
            src={process.env.PUBLIC_URL + '/images/BCID_H_rgb_rev.svg'}
            alt="B.C. Government logo"
          />
        </a>
        <div className={classes.title}>{title}</div>
      </Container>
    </nav>
  )
}
