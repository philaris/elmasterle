<script lang="ts">
    import Key from "$lib/Key.svelte"
    import { Row } from "@sveltestrap/sveltestrap"
	import type { ClueMap } from "./clue"
    interface Props {
        keys: string[]
        clueMap: ClueMap
    }

    let { keys, clueMap }: Props = $props()
</script>

<Row class="justify-content-md-center">
    {#each keys.slice(0, 11) as key}
        <Key keyWidth="4.1vh" {key} clueLetter={clueMap.get(key)} />
    {/each}
</Row>
<Row class="justify-content-md-center">
    {#each keys.slice(11, 23) as key}
        <Key keyWidth="4.0vh" {key} clueLetter={clueMap.get(key)} />
    {/each}
</Row>
<Row class="justify-content-md-center">
    <Key keyWidth="5.9vh" key={'↵'} />
    {#each keys.slice(23) as key}
        <Key keyWidth="4.2vh" {key} clueLetter={clueMap.get(key)} />
    {/each}
    <Key keyWidth="5.5vh" key={'⌫'} />
</Row>
