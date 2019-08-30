<script>
    import {save_question, get_questions} from '@/db/questions';
    import Dropdown from '@/components/Dropdown';
    import Bool from '@/components/Bool';
    import Choice from '@/components/Choice';
    import Text from '@/components/Text';
    import Textarea from '@/components/Textarea';
    import {TYPE_CONFIGS, VALID_TYPES, TYPES_BY_DISPLAY} from '@/meta';

    let selected_display_type;
    let prompt = '';
    let answer = true;
    let choices = [];
    let correct_answer = undefined;
    let answer_being_edited = undefined;

    $: type = TYPES_BY_DISPLAY[selected_display_type];
    // reset answer when type changes
    $: answer = type && '';

    function add_empty_choice() {
        const empty_choice = TYPE_CONFIGS[type].get_empty_choice();
        choices = [...choices, empty_choice];
    }


</script>
<svelte:head>
	<title>Create Question</title>
</svelte:head>

<Dropdown
    label='Type'
    bind:value={selected_display_type}
    options={Object.keys(TYPES_BY_DISPLAY)}
/>

<Textarea
    label='Prompt (The Question)'
    bind:value={prompt} />


{#if type === 'true_false'}
    <Bool bind:value={answer} label=Answer />

{:else if type === 'free_form'}
    <Text bind:value={answer} label=Answer />

{:else if type === 'mc_single'}
    {#each choices as choice}
        <Choice bind:text={choice.text} bind:value={choice.value}/>
    {/each}
    <button class=button on:click={add_empty_choice}>Add Another Choice</button>

{:else if type === 'mc_multiple'}
    <Text bind:value={answer} label=Answer />

{:else if type === 'ordered'}
    <Text bind:value={answer} label=Answer />

{/if}

{@debug selected_display_type, type, answer, choices}
<!--
{#each  as answer, i}
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
