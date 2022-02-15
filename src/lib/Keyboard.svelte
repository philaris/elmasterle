<script lang="ts">
	import Keyboard_el from "$lib/Keyboard_el.svelte"
	import Keyboard_hu from "$lib/Keyboard_hu.svelte"
    export let language: string
    export let keys: string[]
    export let clueMap: Map<string, string> = new Map<string, string>()
</script>

{#if language === 'el'}
    <Keyboard_el {keys} {clueMap} />
{:else if language === 'hu'}
    <Keyboard_hu {keys} {clueMap} />
{:else}
    ERROR: Unknown language
{/if}
	
