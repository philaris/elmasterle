<script lang="ts">
	import Key from "$lib/Key.svelte"
	import { Row } from "sveltestrap"
	export let keys: string[]
	export let clueMap: Map<string, string> = new Map<string, string>()
</script>

<Row class="justify-content-md-center">
	<Key key={'↵'} />
    {#each keys.slice(0, 3) as key}
	    <Key keyWidth="4.0vh" {key} clueLetter={clueMap.get(key)} />
    {/each}
	<Key key={'⌫'} />
</Row>
<Row class="justify-content-md-center">
    {#each keys.slice(3, 15) as key}
	    <Key keyWidth="4.0vh" {key} clueLetter={clueMap.get(key)} />
    {/each}
</Row>
<Row class="justify-content-md-center">
    {#each keys.slice(15, 27) as key}
        <Key keyWidth="4.0vh" {key} clueLetter={clueMap.get(key)} />
    {/each}
</Row>
<Row class="justify-content-md-center">
    {#each keys.slice(27) as key}
        <Key keyWidth="4.0vh" {key} clueLetter={clueMap.get(key)} />
    {/each}
</Row>
