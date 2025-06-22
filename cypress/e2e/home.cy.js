describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
    // Esperar a que termine de cargarse la lista
    cy.contains('Cargando personajes…').should('not.exist');
  });

  it('muestra el título principal en español', () => {
    cy.get('h1')
      .should('be.visible')
      .and('contain.text', 'Personajes de Rick & Morty');
  });

  it('lista al menos un personaje en la tabla', () => {
    cy.get('table tbody tr').its('length').should('be.gte', 1);
  });

  it('navega en la paginación correctamente', () => {
    // Página inicial
    cy.contains('Página 1 de').should('be.visible');

    // Avanzar
    cy.contains('Siguiente').click();
    cy.contains('Página 2 de').should('be.visible');

    // Retroceder
    cy.contains('Anterior').click();
    cy.contains('Página 1 de').should('be.visible');
  });

  it('lleva al formulario de contacto desde Home', () => {
    // El botón de Contacto está dentro de un Link
    cy.get('main').within(() => {
      cy.contains('Contacto').click();
    });
    cy.url().should('include', '/contacto');
  });

  it('hace click en el primer personaje y muestra su detalle', () => {
    cy.get('table tbody tr')
      .first()
      .find('a')
      .click();

    cy.location('pathname').should('match', /^\/character\/\d+$/);

    // Ahora buscamos el h1 con data-cy
    cy.get('[data-cy=detail-name]', { timeout: 10000 })
      .should('be.visible')
      .and('not.contain.text', 'Personajes de Rick & Morty');
  });
});
