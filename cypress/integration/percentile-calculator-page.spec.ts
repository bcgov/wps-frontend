import { NOT_AVAILABLE } from '../../src/utils/strings'

describe('Percentile Calculator Page', () => {
  beforeEach(() => {
    cy.server()
  })

  describe('Weather station dropdown', () => {
    it('renders error message when fetching stations failed', () => {
      cy.route({ method: 'GET', url: 'api/stations/', status: 400, response: {} })
      cy.visit('/percentile-calculator/')

      cy.getByTestId('error-message').should('contain', 'Error occurred (while fetching weather stations).')
    })

    it('can select & deselect stations if successfully received stations', () => {
      cy.route('GET', 'api/stations/', 'fixture:weather-stations.json').as('getStations')
      cy.visit('/percentile-calculator/')
      cy.wait('@getStations')

      // Select the first station in the dropdown list
      cy.getByTestId('weather-station-dropdown')
        .click()
        .get('li')
        .first()
        .click()

      // Deselect the station that's previously selected
      cy.get('.MuiChip-deleteIcon').click()

      // Select two stations in the dropdown
      cy.getByTestId('weather-station-dropdown')
        .click()
        .get('li')
        .eq(1) // second station in the list
        .click()

      cy.getByTestId('weather-station-dropdown')
        .click()
        .get('li')
        .last() // last station in the list
        .click()

      // Check if two stations were actually selected
      cy.get('.MuiChip-deletable').should('have.length', 2)
    })
  })

  describe('Other inputs', () => {
    it('Time range slider can select the range between 10 and 50', () => {
      cy.visit('/percentile-calculator/')

      cy.getByTestId('time-range-slider')
        .find('[type=hidden]')
        .should('have.value', 10) // default value

      // Select 20 year and check if reflected
      cy.get('.MuiSlider-markLabel').contains(20).click() // prettier-ignore
      cy.getByTestId('time-range-slider')
        .find('[type=hidden]')
        .should('have.value', 20)

      // Select Full year and check if reflected
      cy.get('.MuiSlider-markLabel').contains('Full').click() // prettier-ignore
      cy.getByTestId('time-range-slider')
        .find('[type=hidden]')
        .should('have.value', 50)

      // Should do nothing if 0 was selected
      cy.get('.MuiSlider-markLabel').contains(0).click() // prettier-ignore
      cy.getByTestId('time-range-slider')
        .find('[type=hidden]')
        .should('have.value', 50)
    })

    it('Percentile textfield should have a value of 90', () => {
      cy.visit('/percentile-calculator/')

      cy.getByTestId('percentile-textfield')
        .find('[type=text]')
        .should('have.value', 90)
        .should('have.class', 'Mui-disabled')
    })
  })

  describe('Calculation result', () => {
    it('failed due to network error', () => {
      cy.route('GET', 'api/stations/', 'fixture:weather-stations.json').as('getStations')
      cy.route({ method: 'POST', url: 'api/percentiles/', status: 400, response: {} })
      cy.visit('/percentile-calculator/')

      // Calculate button should be disabled if no stations selected
      cy.getByTestId('calculate-percentiles-button').should('be.disabled')

      cy.getByTestId('weather-station-dropdown')
        .click()
        .get('li')
        .first()
        .click()

      // Check if the error message showed up
      cy.getByTestId('calculate-percentiles-button').should('not.be.disabled').click() // prettier-ignore
      cy.getByTestId('error-message').should('contain', 'Error occurred (while getting the calculation result).')
    })

    it('successful with one station', () => {
      const stationCode = 838
      cy.route('GET', 'api/stations/', 'fixture:weather-stations.json').as('getStations')
      cy.route('POST', 'api/percentiles/', 'fixture:percentile-result.json').as('getPercentiles')
      cy.visit('/percentile-calculator/')

      // Select a station
      cy.getByTestId('weather-station-dropdown')
        .click()
        .get('li')
        .contains(stationCode)
        .click()

      // Request for the percentile and check the request body
      cy.getByTestId('calculate-percentiles-button').click()
      cy.wait('@getPercentiles').then(xhr => {
        expect(xhr.requestBody).to.eql({
          stations: [stationCode],
          year_range: { start: 2010, end: 2019 },
          percentile: 90
        })
      })

      // Mean table shouldn't be shown
      cy.getByTestId('percentile-mean-result-table').should('not.exist')

      // One percentile table should be shown
      cy.getByTestId('percentile-station-result-table').should('have.length', 1)

      // Check values in the table
      cy.contains('Station Name').next().should('contain', `AKOKLI CREEK (${stationCode})`) // prettier-ignore
      cy.getByTestId('percentile-station-result-FFMC').should('contain', NOT_AVAILABLE)
      cy.getByTestId('percentile-station-result-BUI').should('contain', NOT_AVAILABLE)
      cy.getByTestId('percentile-station-result-ISI').should('contain', NOT_AVAILABLE)
    })

    it('successful with two stations', () => {
      const stationCodes = [322, 1275]
      cy.route('GET', 'api/stations/', 'fixture:weather-stations.json').as('getStations')
      cy.route('POST', 'api/percentiles/', 'fixture:two-percentiles-result.json').as('getPercentiles')
      cy.visit('/percentile-calculator/')

      // Select two weather stations
      cy.getByTestId('weather-station-dropdown')
        .click()
        .get('li')
        .contains(stationCodes[0])
        .click()
      cy.getByTestId('weather-station-dropdown')
        .click()
        .get('li')
        .contains(stationCodes[1])
        .click()

      // Request for the percentiles and check the request body
      cy.getByTestId('calculate-percentiles-button').click()
      cy.wait('@getPercentiles').then(xhr => {
        expect(xhr.requestBody).to.eql({
          stations: stationCodes,
          year_range: { start: 2010, end: 2019 },
          percentile: 90
        })
      })

      // Mean table & two percentile tables should be shown
      cy.getByTestId('percentile-mean-result-table')
      cy.getByTestId('percentile-station-result-table').should('have.length', 2)
    })
  })
})
