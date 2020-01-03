describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'test2',
            username: 'test2',
            password: 'test2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('blog app')
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('#username')
                .type('test2')
            cy.get('#password')
                .type('test2')
            cy.contains('login')
                .click()
        })

        it('name of the user is shown', function () {
            cy.contains('test2 logged in')
        })

        it('user can create new blog', function () {
            cy.contains('new blog')
                .click()
            cy.get('#title')
                .type('cypress test title')
            cy.get('#author')
                .type('cypress test author')
            cy.get('#url')
                .type('cypress test url')
            cy.contains('create')
                .click()
            cy.contains('cypress test title')
        })

        it('user can comment on note', function () {
            cy.contains('cypress test title')
                .click()
            cy.get('#comment')
                .type('cypress comment')
            cy.contains('add comment')
                .click()
            cy.contains('cypress comment')
        })

        it('user can navigate to user view', function () {
            cy.contains('users')
                .click()
            cy.get('#test2')
                .click()
            cy.contains('test2')
        })
    })
})