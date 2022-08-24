describe('main', () => {
  beforeEach(() => cy.visit('/iframe.html?id=nxwelcomecomponent--primary'));
  it('should render the component', () => {
    cy.get('help-line-nx-welcome').should('exist');
  });
});
