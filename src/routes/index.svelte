<script context="module" lang="ts">
    export const prerender = true;
</script>

<script lang="ts">
    import { Container, Row } from 'sveltestrap'
</script>

<svelte:head>
    <title>elmasterle</title>
</svelte:head>

<Container>
    <Row><h1> Γουόρντλι </h1></Row>
    <Row><a href="/el">el</a></Row>
    <Row><a href="/en">en</a></Row>
    <Row><a href="/hu">hu</a></Row>
    <Row><a href="/it">it</a></Row>
    <Row><a href= "https://github.com/philaris/elmasterle">Κώδικας</a></Row>
</Container>