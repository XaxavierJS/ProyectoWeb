/**
 * @file test.cy.ts
 * @brief Pruebas E2E básicas de la aplicación CiberEscudo.
 *   Verifica redirección a login y renderizado del formulario.
 */

describe('Aplicación CiberEscudo', () => {
  it('redirige a la página de inicio de sesión', () => {
    cy.visit('/')
    cy.url().should('include', '/login')
  })

  it('muestra el formulario de inicio de sesión', () => {
    cy.visit('/login')
    cy.contains('Iniciar Sesión')
    cy.get('input[id="login-email"]').should('exist')
    cy.get('input[id="login-password"]').should('exist')
  })
})
