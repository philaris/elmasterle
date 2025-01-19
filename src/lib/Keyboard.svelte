<script lang="ts">
    import Keyboard_el from "$lib/Keyboard_el.svelte"
    import Keyboard_en from "$lib/Keyboard_en.svelte"
    import Keyboard_hu from "$lib/Keyboard_hu.svelte"
    import Keyboard_it from "$lib/Keyboard_it.svelte"
	import type { ClueMap } from "./clue"
    interface Props {
        language: string
        keys: string[]
        clueMap: ClueMap
    }

    let { language, keys, clueMap }: Props = $props()
</script>

{#if language === 'el'}
    <Keyboard_el {keys} {clueMap} />
{:else if language === 'en'}
    <Keyboard_en {keys} {clueMap} />
{:else if language === 'hu'}
    <Keyboard_hu {keys} {clueMap} />
{:else if language === 'it'}
    <Keyboard_it {keys} {clueMap} />
{:else}
    ERROR: Unknown language
{/if}
	
