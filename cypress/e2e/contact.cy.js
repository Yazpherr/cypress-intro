describe('Página de Contacto', () => {
  beforeEach(() => {
    cy.visit('/contacto');
  });

  it('no envía con datos inválidos', () => {
    cy.get('[data-cy=submit-btn]').click();
    // No debe aparecer el mensaje de éxito
    cy.get('[data-cy=success-msg]').should('not.exist');
  });

  it('envía correctamente con datos válidos', () => {
    cy.get('[data-cy=input-name]').type('Yazpher');
    cy.get('[data-cy=input-email]').type('yazpher@example.com');
    cy.get('[data-cy=input-message]').type('Hola, este es un mensaje de prueba para Cypress.');
    cy.get('[data-cy=submit-btn]').click();
    // Verificamos el mensaje de éxito
    cy.get('[data-cy=success-msg]')
      .should('be.visible')
      .and('contain.text', '¡Mensaje enviado con éxito!');
  });
});
