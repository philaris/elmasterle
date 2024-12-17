<script lang="ts">
	import ShowLetter from "$lib/ShowLetter.svelte"
	import { Col, Row } from '@sveltestrap/sveltestrap'
	interface Props {
		word?: string;
		clue?: string;
		unknownWord?: boolean;
	}

	let { word = '', clue = '', unknownWord = false }: Props = $props();
</script>

<Row class="justify-content-md-center">
	{#each word.padEnd(5, ' ').split('') as c, i}
	  <ShowLetter letter={c} clueLetter={clue[i]} {unknownWord}/>
	{/each}
</Row>
