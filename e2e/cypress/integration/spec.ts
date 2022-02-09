function enterWord(word: string) {
  cy.wait(400)
  word.split('').forEach((letter) => {
    cy.wait(100)
    cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: letter})
  })
  cy.wait(100)
  cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: 'Enter'})
}

it('win', () => {
  cy.clock(Date.UTC(2022, 2-1, 5))
  cy.visit('/')

  cy.wait(1000)
  cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: 'Enter'})
  
  enterWord('αστρο')
  enterWord('τεφρα')
  enterWord('ταφρε')
  cy.contains('Κέρδισες')
})

it('loss', () => {
  cy.clock(Date.UTC(2022, 2-1, 5))
  cy.visit('/')

  cy.wait(1000)
  cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: 'Enter'})
  
  enterWord('αβαθη')
  enterWord('ταγος')
  enterWord('φυλλο')
  enterWord('εφερε')
  enterWord('αστρο')
  enterWord('τεφρα')
  cy.contains('Έχασες')
})
