<script>
    let prompt = '';
    let answers = [];
    let correct_answer = undefined;
    let answer_being_edited = undefined;

    function add_answer() {
        if (answer_being_edited === undefined) {
            answer_being_edited = answers.length;
            answers = [...answers, ''];
        }
    }

    function edit_answer(i) {
        answer_being_edited = i;
    }

    function stop_editing_answer(i) {
        answer_being_edited = undefined;
        answer[i] = answer[i].trim();

        if (answer_is_empty(i) || !answer_is_unique(i)) {
            delete_answer(i);
        }
    }

    function answer_is_empty(i) {
        return !answers[i];
    }

    function answer_is_unique(i) {
        const answer_to_check = answers[i];
        if (!answer_to_check) {
            return false;
        }
        return answers.some((answer, j) => {
            return answer === answer_to_check
                && i !== j;
        })
    }

    function delete_answer(index_to_remove) {
        answers = answers
            .filter((_, i) => i !== index_to_remove);

        adjust_correct_answer(index_to_remove);

        function adjust_correct_answer() {
            if (index_to_remove === correct_answer) {
                correct_answer = undefined;
            } else if (index_to_remove < correct_answer){
                correct_answer -=1;
            }
        }
    }

</script>
<svelte:head>
	<title>Create Question</title>
</svelte:head>

<h1>Svelte Trivia</h1>
{@debug correct_answer, answer_being_edited,
answers}

<div>
    <textarea value={prompt}></textarea>
</div>
{#each answers as answer, i}
<div>
    {#if i === answer_being_edited}
        <input bind:value={answer}>
        <button on:click={() => stop_editing_answer(i)}>Save</button>
        <button on:click={() => delete_answer(i)}>Discard</button>
    {:else}
        <label>
            <input type=radio bind:group={correct_answer}
                value={i}
            />
            {answer}
        </label>
        <button on:click={() => edit_answer(i)}>Edit</button>
        <button on:click={() => delete_answer(i)}>Delete</button>
        {#if i === correct_answer} CORRECT {/if}
    {/if}
</div>
{/each}
<button on:click={add_answer}>Add Answer</button>
