<script lang="ts">
	import Key from "$lib/Key.svelte"
	import { Row } from "sveltestrap"
	export let keys: string[]
	export let clueMap: Map<string, string> = new Map<string, string>()
</script>

<Row class="justify-content-md-center">
{#each keys.slice(0, 8) as key}
	<Key {key} clueLetter={clueMap.get(key)} />
{/each}
</Row>
<Row class="justify-content-md-center">
	{#each keys.slice(8, 17) as key}
		<Key {key} clueLetter={clueMap.get(key)} />
	{/each}
</Row>
<Row class="justify-content-md-center">
	<Key key={'↵'} />
	{#each keys.slice(17) as key}
		<Key {key} clueLetter={clueMap.get(key)} />
	{/each}
	<Key key={'⌫'} />
</Row>
