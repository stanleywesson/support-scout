describe('Navigation and Ticket Views', () => {
    it('successfully loads the active tickets view and sees a ticket', () => {
        cy.visit('/');
        cy.get('main h2').should('have.text', 'Active Tickets');
        cy.get('main').should('contain', 'UI button is misaligned');
    })

    it('can navigate to the archived page', () => {
        cy.visit('/');
        cy.contains('nav a', 'Archived').click();
        cy.url().should('include', '/archive');
        cy.get('main h2').should('have.text', 'Archived Tickets');
        cy.get('main').should('not.contain', 'UI button is misaligned');
    })
})