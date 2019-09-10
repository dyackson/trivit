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
    import {
        TYPE_CONFIGS,
        VALID_TYPES,
        TYPES_BY_DISPLAY,
        get_answer_on_type_change,
    } from '@/meta';
    import AnswerConversionError from '@/AnswerConversionError';

    let selected_display_type = TYPES_BY_DISPLAY[0];
    let prompt = '';
    let answer = '';
    let converted_answer = null;
    let type = '';
    let selected_type_config = {};
    let to_type = '';

    $: show_data_loss_on_type_change_warning = converted_answer !== null;

    $: {
        // react to selected_display_type change
        if (selected_display_type) {
            on_type_changed();
        }
    }

    function on_type_changed() {
        to_type = TYPES_BY_DISPLAY[selected_display_type];

        try {
            console.log('up here')
            console.dir({type,to_type})

            answer = get_answer_on_type_change({
                from_type: type,
                to_type,
                answer,
            });

            type = to_type;
            to_type = '';
            selected_type_config = TYPE_CONFIGS[type] || {};
            console.log('down here')
            console.dir({type,to_type})
        } catch (e) {
            console.log('caught one')
            if (e instanceof AnswerConversionError) {
                converted_answer = e.converted_answer;
            } else {
                throw e;
            }
        }
    }

    function continue_type_change() {
        type = to_type;
        to_type = '';
        selected_type_config = TYPE_CONFIGS[type] || {};
        answer = converted_answer;
        converted_answer = null;
    }

    function abort_type_change() {
        to_type = '';
        selected_display_type = selected_type_config.display;
        converted_answer = null;
    }

    function add_empty_ans() {
        const empty_choice = selected_type_config.get_empty_choice();
        empty_choice.key = choice_key++;
        answer = [...answer, empty_choice];
    }

    function delete_ans(key) {
        answer = answer.filter((c) => c.key !== key);
    }

    function toggle_ans(key) {
        answer = selected_type_config.on_choice_toggled(answer, key);
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
            You have answer data for this question already. If you change the
            type from "{TYPE_CONFIGS[type].display}" to
            "{TYPE_CONFIGS[to_type].display}" you'll lose the answers.  The
            answers data will become {JSON.stringify(converted_answer)}.
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
    {#each answer as ans (ans.key)}
    <svelte:component this={selected_type_config.choice_component}
            bind:text={ans.text}
            value={ans.value}
            delete_ans={() => delete_ans(ans.key)}
            toggle_ans={() => toggle_ans(ans.key)}
            />
    {/each}
    <button class=button on:click={add_empty_ans}>Add Another Choice</button>
{/if}

{@debug selected_display_type, type, to_type, selected_type_config,
converted_answer}
