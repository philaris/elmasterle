<script lang="ts">
    import Rand from 'seedrandom'
	import words from "$lib/words"
    import { browser } from '$app/env'
	import type { ClueLetter, ClueMap } from '$lib/clue'
	import { clues, clueMapUpdate } from '$lib/clue'

	import ShowWord from "$lib/ShowWord.svelte"
	import Keyboard from "$lib/Keyboard.svelte"
	import { Container, Row, Toast, Modal, ModalHeader, ModalBody } from "sveltestrap"

	let isOpenCopiedToast = false

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
	let wordList: string[] = Array(MaxTries).fill('')
	let clueList: string[] = Array(MaxTries).fill('')
	let clueMap: ClueMap = new Map<string, ClueLetter>()
	let currentWord = ''
	let currentClue = ''
	let message = 'Πληκτρολόγησε λέξη'
	let tries = 0

	const keys = [
		'Ε', 'Ρ', 'Τ', 'Υ', 'Θ', 'Ι', 'Ο', 'Π',
	    'Α', 'Σ', 'Δ', 'Φ', 'Γ', 'Η', 'Ξ', 'Κ', 'Λ',
		'Ζ', 'Χ', 'Ψ', 'Ω', 'Β', 'Ν', 'Μ'
	]

	function keyboardEventHandler(e: KeyboardEvent) {
		if (!active) return
		if (keys.includes(e.key.toLocaleUpperCase('el-GR')) && currentWord.length < WordLength) {
			currentWord = currentWord + e.key.toLocaleUpperCase('el-GR')
			wordList[tries] = currentWord
		}
		if (e.key === 'Backspace') {
			currentWord = currentWord.slice(0, -1)
			message = 'Πληκτρολόγησε λέξη'
			wordList[tries] = currentWord
		}
		if (e.key === 'Enter') {
			if (currentWord.length === WordLength) {
				if (words.includes(currentWord)) {
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
			let clipString = todayString + " Γουόρντλι " + tries + "/6" + "\n"
			for (const x of clueList) {
				if (x === '') break;
				const colored = x.replace(/e/g, '🟩').replace(/m/g, '🟨').replace(/a/g, '⬛')
				clipString = clipString + colored + "\n"
			}
			clipString = clipString + 'https://philaris-elmasterle.netlify.app'
			navigator.clipboard.writeText(clipString)
			isOpenCopiedToast = true
		}
	}

	let openModal = false
	const toggle = () => (openModal = !openModal)
</script>

<Container fluid>

	<Row class="justify-content-md-center">
		<div on:click={toggle} class="center">ΓΟΥΟΡΝΤΛΙ {todayString} ?</div>
		<Modal isOpen={openModal} {toggle} style="background-color: darkgreen">
			<ModalHeader {toggle} style="background-color: darkgreen">
				<h1>ΓΟΥΟΡΝΤΛΙ</h1>
			</ModalHeader>
			<ModalBody style="background-color: #002800">
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
		<ShowWord word={wordList[i]} clue={clueList[i]} />
	{/each}

	<Row class="justify-content-md-center">
		  <div on:click={clickHandler} class="center">{message}</div>
	</Row>

    <Row><Keyboard {keys} {clueMap} /></Row>

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