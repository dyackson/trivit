<script context=module>
    let choice_key = 0;
</script>

<script>
    import {save_question, get_questions} from '@/db/questions';
    import Dropdown from '@/components/Dropdown';
    import Bool from '@/components/Bool';
    import Choice from '@/components/Choice';
    import OrderedChoice from '@/components/OrderedChoice';
    import Text from '@/components/Text';
    import Textarea from '@/components/Textarea';
    import {TYPE_CONFIGS, VALID_TYPES, TYPES_BY_DISPLAY} from '@/meta';

    let selected_display_type;
    let prompt = '';
    let answer = true;
    let choices = [];
    let correct_answer = undefined;
    let answer_being_edited = undefined;
    let type = '';
    let selected_type_config = {};
    let show_data_loss_on_type_change_warning = true;

    $: {
        selected_display_type;
        // react to selected_display_type change

        const from_type = type;
        const to_type = TYPES_BY_DISPLAY[selected_display_type];
        if (to_type) {
            update_answer_on_type_change();
            update_choics_on_type_change();
            selected_type_config = TYPE_CONFIGS[to_type];
        } else {
            selected_type_config = {};
        }
        type = to_type;
    }

    async function warn_if_type_change_causes_data_loss(to_type) {

    }

    function update_answer_on_type_change() {
        answer = '';
    }

    function update_choics_on_type_change() {
        const on_changed_to_type = selected_type_config.on_changed_to_type;
        if (on_changed_to_type) {
            choices = selected_type_config.on_changed_to_type(choices);
        }
    }

    function add_empty_choice() {
        const empty_choice = selected_type_config.get_empty_choice();
        empty_choice.key = choice_key++;
        choices = [...choices, empty_choice];
    }

    function delete_choice(key) {
        choices = choices.filter((c) => c.key !== key);
    }

    function toggle_choice(key) {
        choices = selected_type_config.on_choice_toggled(choices, key);
    }


</script>
<svelte:head>
	<title>Create Question</title>
</svelte:head>

<div class="modal" class:is-active={show_data_loss_on_type_change_warning}>
    <div class="modal-background"></div>
    <div class="modal-content">
        MY modal a;dklfja;dlsfkja;dlfkj
    </div>
</div>

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

{:else if selected_type_config.choice_component }
    {#each choices as choice (choice.key)}
    <svelte:component this={selected_type_config.choice_component}
            bind:text={choice.text}
            value={choice.value}
            delete_choice={() => delete_choice(choice.key)}
            toggle_choice={() => toggle_choice(choice.key)}
            />
    {/each}
    <button class=button on:click={add_empty_choice}>Add Another Choice</button>
{/if}

