/// <reference types="cypress" />

context('Test: caesar.html', () => {
    beforeEach(() => {
      cy.visit('../../caesar.html')
    })
  
    it('Should cypher Hello to Khoor', () => {

        cy.dataCy('cypher-input').clear().type('Hello')

        cy.get('input[type=number]').clear().type('3')

        cy.dataCy('cypher-form').submit()

        cy.dataCy('cypher-result').should('have.text', 'Khoor')
    
        
      })
  
  })