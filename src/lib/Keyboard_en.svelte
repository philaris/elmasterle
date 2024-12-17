<script lang="ts">
    import Key from "$lib/Key.svelte"
    import { Row } from "@sveltestrap/sveltestrap"
    interface Props {
        keys: string[];
        clueMap?: Map<string, string>;
    }

    let { keys, clueMap = new Map<string, string>() }: Props = $props();
</script>

<Row class="justify-content-md-center">
    {#each keys.slice(0, 10) as key}
        <Key keyWidth="4.7vh" {key} clueLetter={clueMap.get(key)} />
    {/each}
</Row>
<Row class="justify-content-md-center">
    {#each keys.slice(10, 19) as key}
        <Key keyWidth="4.9vh" {key} clueLetter={clueMap.get(key)} />
    {/each}
</Row>
<Row class="justify-content-md-center">
    <Key keyWidth="5.2vh" key={'↵'} />
    {#each keys.slice(19) as key}
        <Key {key} clueLetter={clueMap.get(key)} />
    {/each}
    <Key keyWidth="6.4vh" key={'⌫'} />
</Row>
