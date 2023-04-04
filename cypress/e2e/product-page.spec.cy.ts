describe('Product page', () => {
    before(() => {
        cy.fixture('login').then(login => {
            this.standard_user = login.standard_user
            this.problem_user = login.problem_user
        })
    })

    beforeEach(() => {
        cy.visit('/')
    })

    it('should validate a standard user flow', () => {
        cy.loginPageValidation()
        cy.login(this.standard_user.username, this.standard_user.password)
        cy.filterByPrice('Price (low to high)')
        cy.addToCartFromList(0)
        cy.validateCartQuantity(1)
        cy.viewItemDetails(1)
        cy.addToCartFromDetails()
        cy.validateCartQuantity(2)
        cy.validateCartItems(2)
        cy.goToCheckout()
        cy.fillCheckoutForm(this.standard_user.firstName, this.standard_user.lastName, this.standard_user.zip)
        cy.finishCheckout(2)
        cy.logout()
    })

    it('should validate a problem user flow', () => {
        cy.loginPageValidation()
        cy.login(this.problem_user.username, this.problem_user.password)
        // Commenting due to BUG 2 in the filter feature
        //cy.filterByPrice('Price (low to high)')
        cy.addAllItemsToCart()
        cy.validateCartQuantity(3)
        cy.validateCartItems(3)
        cy.goToCheckout()
        cy.fillCheckoutForm(this.problem_user.firstName, this.problem_user.lastName, this.problem_user.zip)
        cy.checkoutFormError()
        cy.resetAppState()
        cy.logout()
    })    
})