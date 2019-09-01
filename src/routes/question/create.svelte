<script context=module>
    let choice_key = 0;
</script>

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
    let previous_type = '';

    $: type = TYPES_BY_DISPLAY[selected_display_type];
    // reset answer when type changes
    $: {
        type;
        // react to type changes
        if (type) {
            update_answer_on_type_change();
            update_choics_on_type_change();
        }
    }

    function update_answer_on_type_change() {
        answer = '';
    }

    function update_choics_on_type_change() {
        choices = TYPE_CONFIGS[type].on_changed_to_type(choices);
    }

    function add_empty_choice() {
        const empty_choice = TYPE_CONFIGS[type].get_empty_choice();
        empty_choice.key = choice_key++;
        choices = [...choices, empty_choice];
    }

    function delete_choice(key) {
        choices = choices.filter((c) => c.key !== key);
    }

    function toggle_choice(key) {
        choices = TYPE_CONFIGS[type].on_choice_toggled(choices, key);
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

{:else if type === 'mc_single' || type === 'mc_multiple'}
    {#each choices as choice (choice.key)}
        <Choice
            bind:text={choice.text}
            value={choice.value}
            delete_choice={() => delete_choice(choice.key)}
            toggle_choice={() => toggle_choice(choice.key)}
            />
    {/each}
    <button class=button on:click={add_empty_choice}>Add Another Choice</button>


{:else if type === 'ordered'}
    <Text bind:value={answer} label=Answer />

{/if}
