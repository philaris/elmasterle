<script lang="ts">
    import Rand from 'seedrandom'
    import wordsByLanguage from "$lib/wordsByLanguage"
    import { browser } from '$app/environment'
    import { ClueMap } from "$lib/clue"
    import type { ClueLetter } from '$lib/clue'
    import { clues, clueMapUpdate } from '$lib/clue'

    import ShowWord from "$lib/ShowWord.svelte"
    import Keyboard from "$lib/Keyboard.svelte"
    import { Button, Container, Row, Toast, Modal, ModalBody } from "@sveltestrap/sveltestrap"

    interface Props {
        language?: string;
    }

    let { language = 'el' }: Props = $props();

    const words = wordsByLanguage[language]

    let isOpenCopiedToast = $state(false)

    const WordLength = 5
    const MaxTries = 6

    const d = new Date();
    const todayString = d.getUTCFullYear() + '-' +
      (d.getUTCMonth() + 1).toString().padStart(2, '0') + '-' +
      d.getUTCDate().toString().padStart(2, '0')

    const rand = Rand(todayString)
    const random: number = rand()
    const indexRandom = Math.floor(random * words.length)
    const target = words[indexRandom]
    let active = true
    let win = false
    let wordList: string[] = $state(Array(MaxTries).fill(''))
    let clueList: string[] = $state(Array(MaxTries).fill(''))
    let unknownWordList: boolean[] = $state(Array(MaxTries).fill(false))
    let clueMap: ClueMap = new ClueMap()
    let currentWord = ''
    let currentClue = ''
    let message = $state('Πληκτρολόγησε λέξη')
    let tries = 0

    const keysByLanguage = {
        'el': [
            'Ε', 'Ρ', 'Τ', 'Υ', 'Θ', 'Ι', 'Ο', 'Π',
            'Α', 'Σ', 'Δ', 'Φ', 'Γ', 'Η', 'Ξ', 'Κ', 'Λ',
            'Ζ', 'Χ', 'Ψ', 'Ω', 'Β', 'Ν', 'Μ'
        ],
        'en': [
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M'
        ],
        'hu': [
            'Ö', 'Ü', 'Ó',
            'Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ő', 'Ú',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'É', 'Á', 'Ű',
            'Í', 'Y', 'X', 'C', 'V', 'B', 'N', 'M'
        ],
        'it': [
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'È',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ò', 'À', 'Ù',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M'
        ]
    }

    const keys: string[] = keysByLanguage[language]
    
    const localeByLanguage = {
        'el': 'el-GR',
        'en': 'en-US',
        'hu': 'hu-HU',
        'it': 'it-IT',
    }

    const locale: string = localeByLanguage[language]

    function keyboardEventHandler(e: KeyboardEvent) {
        if (!active) return
        if (keys.includes(e.key.toLocaleUpperCase(locale)) && currentWord.length < WordLength) {
            currentWord = currentWord + e.key.toLocaleUpperCase(locale)
            wordList[tries] = currentWord
            if (currentWord.length === WordLength) {
                if (!words.includes(currentWord)) {
                    unknownWordList[tries] = true
                } else {
                    unknownWordList[tries] = false
                }
            }
        }
        if (e.key === 'Backspace') {
            currentWord = currentWord.slice(0, -1)
            message = 'Πληκτρολόγησε λέξη'
            wordList[tries] = currentWord
            unknownWordList[tries] = false
        }
        if (e.key === 'Enter') {
            if (currentWord.length === WordLength) {
                if (!unknownWordList[tries]) {
                    currentClue = clues(currentWord, target)
                    clueMap = clueMapUpdate(currentWord, currentClue, clueMap)
                    clueList[tries] = currentClue
                    clueList = clueList
                    tries++
                    if (currentWord === target) {
                        message = 'Κέρδισες!' + 
                            (navigator.clipboard ? ' Πάτησε εδώ για αντιγραφή στο 📋' : '')
                        active = false
                        win = true
                    } else {
                        if (tries == MaxTries) {
                            message = 'Έχασες!'
                            active = false
                        } else {
                            currentWord = ''
                            currentClue = ''
                        }
                    }
                } else {
                    message = 'Λέξη εκτός λεξικού. Σβήσε κάποιο γράμμα.'
                }

            }
            
        }
    }

    if (browser) {
      document.onkeyup = keyboardEventHandler
    }
    
    function clickHandler() {
        // navigator.clipboard only available with https
        if (win && navigator.clipboard) {
            let clipString = todayString + " Γουόρντλι " + language + " " + tries + "/6" + "\n"
            for (const x of clueList) {
                if (x === '') break;
                const colored = x.replace(/e/g, '🟩').replace(/m/g, '🟨').replace(/a/g, '⬛')
                clipString = clipString + colored + "\n"
            }
            clipString = clipString + 'https://philaris-elmasterle.netlify.app/' + language
            navigator.clipboard.writeText(clipString)
            isOpenCopiedToast = true
        }
    }

    let openModal = $state(false)
    const toggle = () => (openModal = !openModal)
</script>

<Container fluid>

    <Row class="justify-content-md-center">
        <Button onclick={toggle} onkeydown={toggle} class="center"><h1>ΓΟΥΟΡΝΤΛΙ {language} {todayString} ?</h1></Button>
        <Modal isOpen={openModal} {toggle} style="background-color: darkgreen">
            <ModalBody style="background-color: #002800">
                <h1>ΓΟΥΟΡΝΤΛΙ</h1>
                <p>
                    Ελληνικός κλώνος του <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>
                    με <a href= "https://kit.svelte.dev/">SvelteKit</a>.
                    <a href= "https://github.com/philaris/elmasterle">Κώδικας</a>.
                </p>
                <p>
                      Έχεις 6 μαντεψιές για να βρεις την πενταγράμματη λέξη της ημέρας
                    ({todayString}).
                    Πάτησε Enter (↵) για υποβολή και έλεγχο της μαντεψιάς σου.
                      Μετά από κάθε υποβολή, λαμβάνεις κάποιες ενδείξεις για τα γράμματα
                    της μαντεψιάς σου.
                      Γκρι ⬛ σημαίνει ότι το γράμμα δεν υπάρχει στην λέξη.
                      Κίτρινο 🟨 σημαίνει ότι το γράμμα υπάρχει αλλά δεν έχεις βρει την σωστή θέση.
                      Πράσινο 🟩 σημαίνει ότι έχεις βρει το γράμμα και την σωστή του θέση.
                </p>
                <p>
                    <a href="https://github.com/philaris">https://github.com/philaris</a>
                </p>
            </ModalBody>
          </Modal>
    </Row>

    
    {#each wordList as _, i}
        <ShowWord word={wordList[i]} clue={clueList[i]} unknownWord={unknownWordList[i]} />
    {/each}

    <Row class="justify-content-md-center">
          <div onclick={clickHandler} onkeydown={clickHandler} class="center">{message}</div>
    </Row>

    <Row><Keyboard {language} {keys} {clueMap} /></Row>

    <Row class="justify-content-md-center">
        <Toast isOpen={isOpenCopiedToast} autohide={true} delay={2500}
                  class="text-dark" on:close={() => {isOpenCopiedToast = false}}>
            <div class="copyinfo">Αντιγράφηκε στο πρόχειρο.</div>
        </Toast>
    </Row>

</Container>

<style>
    .center {
        text-align: center;
    }
    h1 {
        font-size: 3.5vh;
    }
    .copyinfo {
        font-size: 2.5vh;
        text-align: center;
    }
</style>
