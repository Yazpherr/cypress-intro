// cypress.config.js
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // Url base para todas las llamadas a cy.visit() sin tener que repetir el host
    baseUrl: 'http://localhost:5173',

    // Patrón de búsqueda de tus specs E2E
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Fichero de soporte global (comandos, hooks, etc.)
    supportFile: 'cypress/support/e2e.js',

    // Tiempo máximo para comandos de cy.visit() o cy.request()
    defaultCommandTimeout: 8000,

    setupNodeEvents(on, config) {
      // Aquí podrías añadir plugins o listeners de node si los necesitas
    },
  },

  // Si en el futuro habilitas Component Testing, podrías configurarlo aquí
  // component: { ... }
});
