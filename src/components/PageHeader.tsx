import React from 'react'
import { Container } from 'components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { FIDER_LINK } from 'utils/constants'

const useStyles = makeStyles(theme => ({
  root: {
    height: 65,
    background: theme.palette.primary.main,
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: 175
  },
  container: {
    display: 'flex'
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontSize: '1.7rem'
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },
  contact: {
    color: 'white',
    fontStyle: 'bold',
    fontSize: '1.1em',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
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
        <div className={classes.titleWrapper}>
          <div className={classes.title}>{title}</div>
          <a
            className={classes.contact}
            href={FIDER_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </div>
      </Container>
    </nav>
  )
}
