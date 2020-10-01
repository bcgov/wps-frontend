// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@cypress/code-coverage/support'

Cypress.Commands.add('getByTestId', value => {
  return cy.get(`[data-testid=${value}]`)
})

Cypress.Commands.add('selectStationByCode', code => {
  return cy
    .getByTestId('weather-station-dropdown')
    .click()
    .get('li')
    .contains(code)
    .click()
})
