describe('Cypress', () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', 'api/stations/', 'fixture:weather-stations.json').as('getStations')
  })

  it('Test', () => {
    cy.visit('/')

    cy.wait('@getStations')

    // Select the first station in the dropdown list
    cy.get('[data-testid=weather-station-dropdown]')
      .click()
      .get('li')
      .first()
      .click()

    // Deselect the station that's previously selected
    cy.get('.MuiChip-deleteIcon').click()

    // Select the last station in the dropdown list
    cy.get('[data-testid=weather-station-dropdown]')
      .click()
      .get('li')
      .last()
      .click()
  })
})
