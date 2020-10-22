describe('HFI Calculator Page', () => {
  beforeEach(() => {
    cy.server()
    cy.visitProtectedPage('/hfi-calculator/')
  })

  it('Basic Page', () => {
    cy.contains('Hello World!')
  })
})
