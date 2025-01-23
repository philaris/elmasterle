import { describe, expect, test } from 'vitest'

import { clues } from '$lib/clue'

describe('Clues from guess word and target word', () => {
    test('All absent', () => {
        expect(clues('ΠΙΣΤΑ', 'ΜΟΧΘΩ')).toEqual('aaaaa')
    })
    test('Two misplaced with same letter', () => {
        expect(clues('ΕΦΕΡΕ', 'ΠΕΣΕΙ')).toEqual('mamaa')
    })
    test('All clue types', () => {
        expect(clues('ΠΟΣΤΟ', 'ΠΟΤΟΥ')).toEqual('eeamm')
    })
    test('All clue types reflection', () => {
        expect(clues('ΠΟΤΟΥ', 'ΠΟΣΤΟ')).toEqual('eemma')
    })
    test('Half found', () => {
        expect(clues('ΕΠΕΣΕ', 'ΕΝΕΣΗ')).toEqual('eaeea')
    })
    test('Almost found', () => {
        expect(clues('ΠΟΣΤΟ', 'ΝΟΣΤΟ')).toEqual('aeeee')
    })
    test('All exact', () => {
        expect(clues('ΜΟΧΘΩ', 'ΜΟΧΘΩ')).toEqual('eeeee')
    })
    test('First absent and second occurrence exact', () => {
        expect(clues('ΠΟΡΠΗ', 'ΚΛΟΠΗ')).toEqual('amaee')
    })
})
