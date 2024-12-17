<script lang="ts">
    import { Col } from '@sveltestrap/sveltestrap'
    export let letter = ' '
    export let clueLetter = ' '
    export let unknownWord = false
</script>

<span class="letterbox {clueLetter} {unknownWord ? 'unknownWord' : ''}">
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
    .unknownWord {
        color: red;
    }
</style>
