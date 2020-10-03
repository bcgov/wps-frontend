const stationCode = 317

describe('MoreCast Page', () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', 'api/stations/', 'fixture:weather-stations.json').as('getStations')
    cy.visitProtectedPage('/fire-weather')
  })

  it('Fail', () => {
    cy.wait('@getStations')

    cy.selectStationByCode(stationCode)
    cy.getByTestId('get-wx-data-button').click()

    cy.checkErrorMessage('Error occurred (while fetching global models).')
    cy.checkErrorMessage('Error occurred (while fetching hourly readings).')
    cy.checkErrorMessage('Error occurred (while fetching global model summaries).')
    cy.checkErrorMessage('Error occurred (while fetching noon forecasts).')
    cy.checkErrorMessage('Error occurred (while fetching noon forecast summaries).')
  })

  it('Success', () => {
    cy.route('POST', 'api/hourlies/', 'fixture:weather-data/observed-actuals')
    cy.route('POST', 'api/models/GDPS/predictions/', 'fixture:weather-data/future-models')
    cy.route('POST', 'api/models/GDPS/predictions/historic/most_recent/', 'fixture:weather-data/past-most-recent-models') // prettier-ignore
    cy.route('POST', 'api/models/GDPS/predictions/summaries/', 'fixture:weather-data/past-model-summaries')
    cy.route('POST', 'api/noon_forecasts/', 'fixture:weather-data/past-future-forecasts')
    cy.route('POST', 'api/noon_forecasts/summaries/', 'fixture:weather-data/past-forecast-variations')
    cy.wait('@getStations')

    cy.selectStationByCode(stationCode)
    cy.getByTestId('get-wx-data-button').click()
  })
})
