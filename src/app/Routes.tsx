import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { FWICalculatorPage } from 'features/fwiCalculator/FWICalculatorPage'
import { PercentileCalculatorPageWithDisclaimer } from 'features/percentileCalculator/pages/PercentileCalculatorPageWithDisclaimer'
import { HIDE_DISCLAIMER } from 'utils/constants'

const shouldShowDisclaimer = HIDE_DISCLAIMER === undefined

const NoMatch = () => <div>Page not found.</div>

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/percentile-calculator" />

        <Route path="/percentile-calculator">
          <PercentileCalculatorPageWithDisclaimer showDisclaimer={shouldShowDisclaimer} />
        </Route>

        <Route path="/fwi-calculator">
          <FWICalculatorPage />
        </Route>

        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}
