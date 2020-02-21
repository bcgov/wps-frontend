import React from 'react'
import { Container } from 'components/Container'

interface Props {
  title: string
}

export const PageHeader = () => {
  return (
    <nav>
      <Container>
        <a href="https://www2.gov.bc.ca">
          <img
            src={process.env.PUBLIC_URL + '/images/bcid-logo-rev-en.svg'}
            width="181"
            height="44"
            alt="B.C. Government logo"
          />
        </a>
      </Container>
    </nav>
  )
}
