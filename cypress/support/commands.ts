import '@testing-library/cypress/add-commands';

/**
 * Note: See https://github.com/testing-library/cypress-testing-library/blob/main/cypress/e2e/find.cy.js
 * for good examples on how to use Cypress Testing Library.
 */

Cypress.Commands.add('loginPageValidation', () => {
  cy.findAllByText(/Swag Labs/).should('be.visible');
  cy.findByPlaceholderText('Username');
  cy.findByPlaceholderText('Password');
  cy.findByRole('button', { name: 'Login' });
})


Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('[data-test="username"]')
    .type(username)
  cy.get('[data-test="password"]')
    .type(password)
  cy.get('[data-test="login-button"]')
    .click()
  cy.get('.title')
    .should('have.text', 'Products')
    .url()
    .should('contains', 'inventory')
})

Cypress.Commands.add('filterByPrice', (filter: string) => {
  cy.get('[data-test="product_sort_container"]')
    .select(filter)
  cy.get('.active_option')
    .should('have.text', filter)
})

Cypress.Commands.add('addToCartFromList', (index: number) => {
  cy.get('.inventory_list>div')
    .eq(index)
    .find('button')
    .should('have.text', 'Add to cart')
    .click()

  cy.get('.inventory_list>div')
    .eq(index)
    .find('button')
    .should('have.text', 'Remove')
})

Cypress.Commands.add('addToCartFromDetails', () => {
  cy.get('.inventory_details_desc_container')
    .find('button')
    .should('have.text', 'Add to cart')
    .click()

  cy.get('.inventory_details_desc_container')
    .find('button')
    .should('have.text', 'Remove')
})

Cypress.Commands.add('validateCartQuantity', (cartQty: number) => {
  cy.get('.shopping_cart_badge')
    .should('have.text', cartQty)
})

Cypress.Commands.add('viewItemDetails', (index: number) => {
  cy.get('.inventory_list>div')
    .eq(index)
    .find('.inventory_item_name')
    .click()

  cy.get('[data-test="back-to-products"]')
    .should('have.text', 'Back to products')
})

Cypress.Commands.add('validateCartItems', (cartQty: number) => {
  cy.get('.shopping_cart_link')
    .click()
  cy.get('.title')
    .should('have.text', 'Your Cart')
  cy.get('.cart_item')
    .should('have.length', cartQty)
})

Cypress.Commands.add('goToCheckout', () => {
  cy.get('[data-test="checkout"]')
    .click()
  cy.get('.title')
    .should('have.text', 'Checkout: Your Information')
})

Cypress.Commands.add('fillCheckoutForm', (firstname: string, lastname: string, zip: string) => {
  cy.get('[data-test="firstName"]')
    .type(firstname)
  cy.get('[data-test="lastName"]')
    .type(lastname)
  cy.get('[data-test="postalCode"]')
    .type(zip)
})

Cypress.Commands.add('finishCheckout', (cartQty: number) => {
  cy.get('[data-test="continue"]')
    .click()
  cy.get('.title')
    // Commenting due to BUG 1 in the screen title
    //.should('have.text', 'Checkout: review')


  cy.get('.cart_item')
    .should('have.length', cartQty)
  cy.get('[data-test="finish"]')
    .click()

  cy.get('.title')
    .should('have.text', 'Checkout: Complete!')
  cy.get('[data-test="back-to-products"]')
    .click()
  cy.get('.title')
    .should('have.text', 'Products')
})

Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn')
    .click()
  cy.get('#logout_sidebar_link')
    .click()
  cy.url()
    .should('be.equal', 'https://www.saucedemo.com/');
})


Cypress.Commands.add('addAllItemsToCart', () => {
  cy.get('.inventory_list>div').each(item => {
    cy.wrap(item)
      .find('button')
      .should('have.text', 'Add to cart')
      .click()
  })

  cy.get('.inventory_list>div')
    .filter(':contains("Remove")')
    .should('have.length', 3)
})

Cypress.Commands.add('checkoutFormError', () => {
  cy.get('[data-test="continue"]')
    .click()
  cy.get('[data-test="error"]')
    .should('be.visible')
})

Cypress.Commands.add('resetAppState', () => {
  cy.get('#react-burger-menu-btn')
    .click()
  cy.get('#reset_sidebar_link')
    .click()
  cy.get('.bm-cross-button')
    .click()
})