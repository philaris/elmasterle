<script lang="ts">
	import { Styles } from '@sveltestrap/sveltestrap'
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>
<Styles />
{@render children?.()}

<style>
  :global(body) {
    background-color: #1d3040 !important;
    color: #bfc2c7 !important;
    font-size: 2vh !important;
  }
</style>
