describe('MoreCast Page', () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', 'api/stations/', 'fixture:weather-stations.json').as('getStations')
    const visitUrl = 'fire-weather'
    const userJsonFilename = 'fake-user'
    cy.kcFakeLogin(userJsonFilename, visitUrl)
  })

  it('Test', () => {
    cy.wait('@getStations')

    cy.selectStationByCode(322)
  })
})
