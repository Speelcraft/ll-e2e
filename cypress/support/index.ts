export {};

// Adding types for Custom Commands by extending
// to the global Cypress Chainable interface.
// refer to cypress documentation:
// https://docs.cypress.io/guides/tooling/typescript-support#Types-for-Custom-Commands
declare global {
  namespace Cypress {
    interface Chainable {
      loginPageValidation(): Chainable<void>;
      login(email: string, password: string): Chainable<void>;
      filterByPrice(filter: string): Chainable<void>;
      addToCartFromList(index: number): Chainable<void>;
      addToCartFromDetails(): Chainable<void>;
      validateCartQuantity(cartQty: number): Chainable<void>;
      viewItemDetails(index: number): Chainable<void>;
      validateCartItems(cartQty: number): Chainable<void>;
      goToCheckout(): Chainable<void>;
      fillCheckoutForm(firstname: string, lastname: string, zip: string): Chainable<void>;
      finishCheckout(cartQty: number): Chainable<void>;
      logout(): Chainable<void>;
      addAllItemsToCart(): Chainable<void>;
      checkoutFormError(): Chainable<void>;
      resetAppState(): Chainable<void>;
    }
  }
}
