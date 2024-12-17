<script lang="ts">
	import Key from "$lib/Key.svelte"
	interface Props {
		key: string;
		clueLetter?: string;
		keyWidth?: string;
	}

	let { key, clueLetter = ' ', keyWidth = '5.0vh' }: Props = $props();

	function click(): void {
		const keyString = key === '↵' ? 'Enter' : (key === '⌫' ? 'Backspace' : key)
		document.dispatchEvent(new KeyboardEvent("keyup", {key: keyString}))
	}
	
</script>

<button class="keybox {clueLetter || ' '}"
    style="--keyWidth: {keyWidth}"
    onclick={click}>{key}</button>

<style>
	.keybox {
		display: inline-block;
		width: var(--keyWidth);
		height: 8vh;
		border: 1px solid gray;
		border-radius: 25%;
		text-align: center;
		line-height: 2.5vh;
		font-size: 2.5vh;
		font-weight: normal;
		background-color: black;
		color: #D7DADC;
	}
	.a { /* absent */
		background-color: #3A3A3C;
	}
	.m { /* misplaced */
		background-color: #B59F3B;
	}
	.e { /* exact */
		background-color: #538D4E;
	}
</style>