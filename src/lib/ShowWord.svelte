<script lang="ts">
	import ShowLetter from "$lib/ShowLetter.svelte"
	import { Col, Row } from 'sveltestrap'
	export let word = ''
	export let clue = ''
	export let unknownWord = false
</script>

<Row class="justify-content-md-center">
	{#each word.padEnd(5, ' ').split('') as c, i}
	  <ShowLetter letter={c} clueLetter={clue[i]} {unknownWord}/>
	{/each}
</Row>