<script>
    import Bool from '@/components/Bool';
    export let answer;
    export let show_answer = false;
    let guess = '';
    let response = '';

    function submit() {
        if (guess === '') {
            alert(`Select True or False`);
        } else {
            if (guess === answer) {
                response = 'Correct';
            } else {
                response = 'Wrong';
            }
            show_answer = true;
        }
    }

    function reset() {
        response = '';
        guess = '';
        show_answer = false;
    }
</script>

<div>
{#if show_answer}
    <!-- TODO: show a checkmark or X icon -->
    <p>
        {response}, it's {answer}.
    </p>
    <button on:click={reset} >
        Reset
    </button>
{:else}
    <Bool bind:value={guess}/>
    <button on:click={submit} >
        Submit
    </button>
{/if}
</div>
