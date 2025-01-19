import { ClueMap, clueMapUpdate } from '../lib/clue'

describe('Update keyboard clue map', () => {
    test('All absent in first guess', () => {
        const emptyMap = new ClueMap()
        const result = clueMapUpdate('ΠΙΣΤΑ', 'aaaaa', emptyMap)
        const expected = new ClueMap([
            ['Π', 'a'], ['Ι', 'a'], ['Σ', 'a'], ['Τ', 'a'], ['Α', 'a'] 
        ])
        expect(result).toEqual(expected)
    })
    test('All exact in first guess', () => {
        const emptyMap = new ClueMap()
        const result = clueMapUpdate('ΠΙΣΤΑ', 'eeeee', emptyMap)
        const expected = new ClueMap([
            ['Π', 'e'], ['Ι', 'e'], ['Σ', 'e'], ['Τ', 'e'], ['Α', 'e'] 
        ])
        expect(result).toEqual(expected)
    })
    test('One misplaced in first guess', () => {
        const emptyMap = new ClueMap()
        const result = clueMapUpdate('ΚΛΟΠΗ', 'aaama', emptyMap)
        const expected = new ClueMap[
            ['Κ', 'a'], ['Λ', 'a'], ['Ο', 'a'], ['Π', 'm'], ['Η', 'a']
        ])
        expect(result).toEqual(expected)
    })
    test('Misplaced does not change exact', () => {
        const map1 = new ClueMap([
            ['Π', 'e'], ['Α', 'm'], ['Κ', 'a'], ['Ο', 'a'], ['Σ', 'm']
        ])
        const result = clueMapUpdate('ΚΛΟΠΗ', 'aaame', map1)
        const expected = new ClueMap([
            ['Π', 'e'], ['Α', 'm'], ['Κ', 'a'], ['Ο', 'a'], ['Σ', 'm'],
            ['Λ', 'a'], ['Η', 'e']
        ])
        expect(result).toEqual(expected)
    })
})
