/// <reference types="cypress" />

context('Test: lightbox.html', () => {
    beforeEach(() => {
        cy.visit('../../lightbox.html')
    })

    it('Tester l ouverture de la lightbox', () => {
        cy.dataCy('overlay').click()
        cy.dataCy('overlay-content').should('be.visible')
    })

    it('Tester la fermeture de la lightbox', () => {
        cy.dataCy('overlay').click()
        cy.dataCy('overlay-content').should('be.visible')
        cy.get('body').click(0, 0) 
        cy.dataCy('overlay-content').should('not.be.visible')
    })

    it('Tester l’ajout de la mention “j’aime” et la mise à jour des compteurs sur l’overlay et la lightbox', () => {
        cy.dataCy('overlay').click()
        cy.dataCy('overlay-content').should('be.visible')
        cy.dataCy('like-counter').should('have.text', '0')
        cy.dataCy('unlike').click()
        cy.dataCy('like-counter').should('have.text', '1')
        cy.dataCy('overlay-like-count').should('have.text', '1')
        
    })

    it('Tester la supression de la mention “jaime” et la mise à jour des compteurs sur l’overlay et la lightbox', () => {
        cy.dataCy('overlay').click()
        cy.dataCy('overlay-content').should('be.visible')
        cy.dataCy('like-counter').should('have.text', '0')
        cy.dataCy('unlike').click()
        cy.dataCy('like-counter').should('have.text', '1')
        cy.dataCy('like').click()
        cy.dataCy('like-counter').should('have.text', '0')
        cy.dataCy('overlay-like-count').should('have.text', '0')
    })

    it('Tester l’ajout d’un commentaire - Exemple de commentaire : “Cypress is awesome!”', () => {
        cy.dataCy('overlay').click()
        cy.dataCy('overlay-content').should('be.visible')
        
        cy.dataCy('comment-input').type('Cypress is awesome!')
        cy.dataCy('comment-button').click()

        cy.dataCy('comment-list').should('contain', 'Cypress is awesome!')
    })

    it('Tester que l’ajout d’un commentaire vide soit impossible car le bouton “Publish” reste désactivé', () => {
        cy.dataCy('overlay').click()
        cy.dataCy('overlay-content').should('be.visible')
        
        cy.dataCy('comment-button').should('be.disabled')

    })

    it('Tester l’option qui cache les commentaires', () => {
        cy.dataCy('overlay').click()
        cy.dataCy('overlay-content').should('be.visible')

        cy.dataCy('comment-input').type('Cypress is awesome!')
        cy.dataCy('comment-button').click()
        
        cy.dataCy('hide-comments').click()
        cy.dataCy('comment-list').should('not.be.visible')

    })

    it('Tester les différents compteurs de commentaires sur l’overlay et la lightbox', () => {
        cy.dataCy('overlay').click()
        cy.dataCy('overlay-content').should('be.visible')

        cy.dataCy('unlike').click()

        cy.dataCy('comment-input').type('Cypress is awesome!')
        cy.dataCy('comment-button').click()
        
        cy.get('body').click(0, 0) 

        cy.dataCy('overlay-like-count').should('have.text', '1')
        cy.dataCy('overlay-comment-count').should('have.text', '1')

    })
    

    it('Tester le singulier/pluriel en fonction du nombre de commentaire.', () => {
        cy.dataCy('overlay').click()
        cy.dataCy('overlay-content').should('be.visible')

        cy.dataCy('comment-input').type('Cypress is awesome!')
        cy.dataCy('comment-button').click()
        cy.dataCy('hide-comments').contains('Hide 1 comment')

        cy.dataCy('comment-input').type('Cypress is awesome 2!')
        cy.dataCy('comment-button').click()
        cy.dataCy('hide-comments').contains('Hide 2 comments')

    })

    it('Écrire trois commentaires et tester la supression du second commentaire au clique sur la bonne croix', () => {
        cy.dataCy('overlay').click()
        cy.dataCy('overlay-content').should('be.visible')

        cy.dataCy('comment-input').type('Cypress is awesome!')
        cy.dataCy('comment-button').click()

        cy.dataCy('comment-input').type('Cypress is awesome 2!')
        cy.dataCy('comment-button').click()

        cy.dataCy('comment-input').type('Cypress is awesome 3!')
        cy.dataCy('comment-button').click()

        cy.dataCy('delete-comment').eq(1).click()
        cy.dataCy('comment-list').should('not.contain', 'Cypress is awesome 2!')
    })
})