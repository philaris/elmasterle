import { SvelteMap } from "svelte/reactivity"

// letter clue: absent, misplaced, exact
export type ClueLetter = 'a' | 'm' | 'e'

export class ClueMap extends SvelteMap<string, ClueLetter> {}

export function clues(guess: string, target: string): string {
    const wordLength = guess.length
    let checkIndex: number[] = [...Array(wordLength).keys()]
    const clueArray: string[] = Array(wordLength).fill('a')
    for (let i = 0; i < wordLength; i++) {
        const letter = guess.charAt(i)
        if (letter === target.charAt(i)) {
            clueArray[i] = 'e'
            checkIndex = checkIndex.filter(index => index !== i)
        }
    }
    const copyIndex = checkIndex
    for (const i of copyIndex) {
        for (const j of checkIndex) {
            if (i === j) continue
            const letter = guess.charAt(i)
            if (letter === target.charAt(j)) {
                clueArray[i] = 'm'
                checkIndex = checkIndex.filter(index => index !== j)
                break
            }
        }
    }
    return clueArray.join('')
}

export function clueMapUpdate(guess: string, clues: string, clueMap: ClueMap): ClueMap {
    const wordLength = guess.length
    for (let i = 0; i < wordLength; i++) {
        const letter = guess.charAt(i)
        const clue: ClueLetter = clues.charAt(i) as ClueLetter
        if (clue === 'a') {
            if (!clueMap.get(letter)) {
                clueMap.set(letter, 'a')
            }
        } else if (clue === 'm') {
            if (clueMap.get(letter) !== 'e') {
                clueMap.set(letter, 'm')
            }
        } else { // clue === 'e'
            clueMap.set(letter, 'e')
        }
    }
    return clueMap
}