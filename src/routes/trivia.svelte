<script>
    import Question from '../components/Question';

    import questions from './_questions';

    let i = 0;
    $:question = questions[i];

    function show_next_question() {
        i +=1
    }
</script>
<svelte:head>
	<title>Trivia</title>
</svelte:head>

<h1>Svelte Trivia</h1>

<p>How does all this stuff work?</p>

{#if question}
<Question {...question} done={show_next_question}/>
{:else }
<p>You answered all the questions, you smart bastard!</p>
{/if}
