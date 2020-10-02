describe('MoreCast Page', () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', 'api/stations/', 'fixture:weather-stations.json').as('getStations')
    cy.visitProtectedPage('/fire-weather')
  })

  it('Test', () => {
    cy.wait('@getStations')

    cy.selectStationByCode(322)
    cy.getByTestId('get-wx-data-button').click()

    cy.checkErrorMessage('Error occurred (while fetching global models).')
    cy.checkErrorMessage('Error occurred (while fetching hourly readings).')
    cy.checkErrorMessage('Error occurred (while fetching global model summaries).')
    cy.checkErrorMessage('Error occurred (while fetching noon forecasts).')
    cy.checkErrorMessage('Error occurred (while fetching noon forecast summaries).')
  })
})
