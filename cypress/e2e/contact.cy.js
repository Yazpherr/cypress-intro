describe('Página de Contacto', () => {
  beforeEach(() => {
    cy.visit('/contacto');
  });

  it('no envía con datos inválidos y muestra errores', () => {
    cy.get('[data-cy=submit-btn]').click();
    // El toast no debe aparecer
    cy.get('[data-cy=success-msg]').should('not.exist');
    // Deben mostrarse errores en cada campo obligatorio
    cy.get('[data-cy=error-name]').should('be.visible');
    cy.get('[data-cy=error-email]').should('be.visible');
    cy.get('[data-cy=error-phone]').should('be.visible');
    cy.get('[data-cy=error-subject]').should('be.visible');
    cy.get('[data-cy=error-message]').should('be.visible');
    cy.get('[data-cy=error-terms]').should('be.visible');
  });

  it('envía correctamente con todos los datos válidos', () => {
    cy.get('[data-cy=input-name]').type('Yazpher');
    cy.get('[data-cy=input-email]').type('yazpher@example.com');
    cy.get('[data-cy=input-phone]').type('987654321');
    cy.get('[data-cy=input-company]').type('MiEmpresa');
    cy.get('[data-cy=select-subject]').select('ventas');
    cy.get('[data-cy=input-message]').type('Hola, este es un mensaje de prueba completo.');
    cy.get('[data-cy=checkbox-terms]').check();
    cy.get('[data-cy=submit-btn]').click();

    // Verificamos el mensaje de éxito inline
    cy.get('[data-cy=success-msg]')
      .should('be.visible')
      .and('contain.text', '¡Mensaje enviado con éxito!');
  });
});
