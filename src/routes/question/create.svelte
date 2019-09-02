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

    let selected_display_type = TYPES_BY_DISPLAY[0];
    let prompt = '';
    let answer = true;
    let choices = [];
    let correct_answer = undefined;
    let answer_being_edited = undefined;
    let type = '';
    let selected_type_config = {};
    let show_data_loss_on_type_change_warning = false;
    let from_type = '';
    let to_type = '';

    $: {
        // react to selected_display_type change
        if (selected_display_type) {
            on_type_changed();
        }
    }

    function on_type_changed() {
        from_type = type;
        to_type = TYPES_BY_DISPLAY[selected_display_type];

        if (!from_type) {
            continue_type_change();
        } else if (from_type !== to_type) {
            show_data_loss_on_type_change_warning
                = TYPE_CONFIGS[to_type].loses_data_when_changing(from_type,
                    choices);
            if (!show_data_loss_on_type_change_warning) {
                continue_type_change();
            } else {
                // the warning modal shows
            }
        } else {
            // the same type was reselected
            from_type = '';
            to_type = '';
        }
    }

    function continue_type_change() {
        show_data_loss_on_type_change_warning = false;
        type = to_type;
        selected_type_config = TYPE_CONFIGS[type] || {};
        choices = selected_type_config.on_changed_to_type(choices, from_type);
        answer = '';
        to_type = '';
        from_type = '';
    }

    function abort_type_change() {
        show_data_loss_on_type_change_warning = false;
        selected_display_type = selected_type_config.display;
        from_type = '';
        to_type = '';
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


{#if show_data_loss_on_type_change_warning}
<div class="modal" class:is-active={show_data_loss_on_type_change_warning}>
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Discard Answers?</p>
        </header>
        <section class="modal-card-body is-size-4">
            You have answers for this question already. If you change the type
            from "{TYPE_CONFIGS[from_type].display}" to
            "{TYPE_CONFIGS[to_type].display}" you'll lose the answers.
        </section>
        <footer class="modal-card-foot">
            <button
                class="button is-success is-medium"
                on:click={continue_type_change}
                >
                Change Type
            </button>
            <button
                class="button is-success is-medium"
                on:click={abort_type_change}
                >
                Do Nothing
            </button>
        </footer>
    </div>
</div>
{/if}

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

{@debug selected_display_type, type, to_type, from_type, choices}
