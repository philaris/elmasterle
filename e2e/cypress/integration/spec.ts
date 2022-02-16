function enterWord(word: string) {
  cy.wait(400)
  word.split('').forEach((letter) => {
    cy.wait(100)
    cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: letter})
  })
  cy.wait(100)
  cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: 'Enter'})
}

it('win_el', () => {
  cy.clock(Date.UTC(2022, 2-1, 5))
  cy.visit('/el')

  cy.wait(1000)
  cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: 'Enter'})

  enterWord('αστρο')
  enterWord('τεφρα')
  enterWord('ταφρε')
  cy.contains('Κέρδισες')
})

it('loss_el', () => {
  cy.clock(Date.UTC(2022, 2-1, 5))
  cy.visit('/el')

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

it('win_en', () => {
  cy.clock(Date.UTC(2022, 2-1, 16))
  cy.visit('/en')

  cy.wait(1000)
  cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: 'Enter'})

  enterWord('tears')
  enterWord('abbey')
  enterWord('bogey')
  cy.contains('Κέρδισες')
})

it('loss_en', () => {
  cy.clock(Date.UTC(2022, 2-1, 16))
  cy.visit('/en')

  cy.wait(1000)
  cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: 'Enter'})

  enterWord('aloft')
  enterWord('abbey')
  enterWord('paint')
  enterWord('black')
  enterWord('below')
  enterWord('begin')
  cy.contains('Έχασες')
})

it('win_hu', () => {
  cy.clock(Date.UTC(2022, 2-1, 15))
  cy.visit('/hu')

  cy.wait(1000)
  cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: 'Enter'})

  enterWord('pesti')
  enterWord('börze')
  cy.contains('Κέρδισες')
})

it('loss_hu', () => {
  cy.clock(Date.UTC(2022, 2-1, 15))
  cy.visit('/hu')

  cy.wait(1000)
  cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: 'Enter'})

  enterWord('pesti')
  enterWord('gyors')
  enterWord('fürge')
  enterWord('sebes')
  enterWord('lassú')
  enterWord('bögre')
  cy.contains('Έχασες')
})

it('win_it', () => {
  cy.clock(Date.UTC(2022, 2-1, 15))
  cy.visit('/it')

  cy.wait(1000)
  cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: 'Enter'})

  enterWord('carne')
  enterWord('perdi')
  enterWord('berrò')
  cy.contains('Κέρδισες')
})

it('loss_it', () => {
  cy.clock(Date.UTC(2022, 2-1, 15))
  cy.visit('/it')

  cy.wait(1000)
  cy.document().trigger('keyup', {eventConstructor: 'KeyboardEvent', key: 'Enter'})

  enterWord('dallo')
  enterWord('carne')
  enterWord('gente')
  enterWord('perdi')
  enterWord('certo')
  enterWord('verrò')
  cy.contains('Έχασες')
})
