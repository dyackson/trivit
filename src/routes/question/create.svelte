<script>
    import {save_question, get_questions} from '@/db/questions';
    import Dropdown from '@/components/Dropdown';
    import Bool from '@/components/Bool';
    import Answer from '@/components/Answer';
    import {TYPE_CONFIGS, VALID_TYPES, TYPES_BY_DISPLAY} from '@/meta';

    let selected_display_type;
    let prompt = '';
    let true_false_answer = true;
    let answers = [];
    let correct_answer = undefined;
    let answer_being_edited = undefined;

    $:type = TYPES_BY_DISPLAY[selected_display_type];






</script>
<svelte:head>
	<title>Create Question</title>
</svelte:head>

<Dropdown
    label='Type'
    bind:value={selected_display_type}
    options={Object.keys(TYPES_BY_DISPLAY)}
/>
<textarea
    class=textarea
    placeholder='How many marbles would it take to ...'
    bind:value={prompt}
    ></textarea>

{#if type === 'true_false'}
    <Bool bind:value={true_false_answer} label=Answer />
{/if}
{#each answers as answer}
    <Answer/>
{/each}

{@debug selected_display_type, type, true_false_answer}
<!--
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
-->
