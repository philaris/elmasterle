<script lang="ts">
	import { Col } from 'sveltestrap'
	export let letter = ' '
	export let clueLetter = ' '
</script>

<span class="letterbox {clueLetter}">
	{letter || ' '}
</span>

<style>
	.letterbox {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
		border: 1px solid gray;
		border-radius: 17%;
		text-align: center;
		line-height: 1.5em;
		font-size: 5.8vh;
		font-weight: bold;
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
