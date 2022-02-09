<script>
	import { Styles } from 'sveltestrap'
</script>
<Styles />
<slot />

<style>
	:global(body) {
		background-color: #1d3040;
		color: #bfc2c7;
		font-size: 2vh;
	}
</style>