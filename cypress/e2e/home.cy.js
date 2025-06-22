describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('debería mostrar el título principal', () => {
    cy.get('h1')
      .should('be.visible')
      .and('contain.text', 'Rick & Morty Characters');
  });

  it('debería listar personajes al menos 1 elemento', () => {
    cy.get('ul li').its('length').should('be.gte', 1);
  });

  it('navega a la página siguiente y vuelve', () => {
    cy.contains('Siguiente').click();
    cy.contains('Página 2');
    cy.contains('Anterior').click();
    cy.contains('Página 1');
  });

  it('hace click en un personaje y muestra su detalle', () => {
    cy.get('ul li a').first().then($link => {
      const href = $link.attr('href');         // '/character/1'
      const characterName = $link.text();      // 'Rick Sanchez'

      cy.wrap($link).click();
      cy.url().should('include', href);

      cy.get('h1')
        .should('be.visible')
        .and('contain.text', characterName);
    });
  });
});
