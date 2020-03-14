<script context=module>
    // This is an object so it can be updated by the external functions that
    // create new answer (that get displayed in an each block).
    const key_holder = {key: 0};
</script>

<script>
    import get_valid_copy_of_question from '@/get_valid_copy_of_question';
    // import {save_question, get_questions} from '@/db/questions';
    import Bool from '@/components/Bool';
    import Dropdown from '@/components/create_question/Dropdown';
    import Text from '@/components/create_question/Text';
    import Textarea from '@/components/create_question/Textarea';
    import Ans from '@/components/create_question/Ans';
    import OrderedAns from '@/components/create_question/OrderedAns';

    import {
        TYPE_CONFIGS,
        VALID_TYPES,
        TYPES_BY_DISPLAY,
        get_answer_on_type_change,
    } from '@/meta';
    import AnswerConversionError from '@/AnswerConversionError';

    let selected_display_type = TYPE_CONFIGS.free_form.display;
    let prompt = '';
    let answer = '';
    let converted_answer;
    let then_msg = '';
    let type = '';
    let selected_type_config = {};
    let to_type = '';
    let show_data_loss_warning = false;

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

            answer = get_answer_on_type_change({
                from_type: type,
                to_type,
                answer,
                key_holder,
            });

            type = to_type;
            to_type = '';
            selected_type_config = TYPE_CONFIGS[type] || {};
            console.log('down here')
        } catch (e) {
            console.log('caught one')
            if (e instanceof AnswerConversionError) {
                converted_answer = e.converted_answer;
                then_msg = e.then_msg;
                show_data_loss_warning = true;
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
        then_msg = '';
        show_data_loss_warning = false;
    }

    function abort_type_change() {
        to_type = '';
        selected_display_type = selected_type_config.display;
        converted_answer = null;
        then_msg = '';
        show_data_loss_warning = false;
    }

    function add_empty_ans() {
        const empty_ans = selected_type_config.get_empty_ans(key_holder);
        answer = [...answer, empty_ans];
    }

    function delete_ans(key) {
        answer = answer.filter((c) => c.key !== key);
    }

    function toggle(key) {
        answer = selected_type_config.on_toggle(answer, key);
    }

    function save_question() {
        const valid_copy = get_valid_copy_of_question({
            type,
            prompt,
            answer,
        });
        console.dir({valid_copy});
    }


</script>
<svelte:head>
	<title>Create Question</title>
</svelte:head>

<style>
    button.block {
        display: block;
    }
</style>


{#if show_data_loss_warning}
    <div class="modal" class:is-active={show_data_loss_warning}>
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Heads Up!</p>
            </header>
            <section class="modal-card-body is-size-4">
                If you change the type from
                <span class=has-text-weight-bold>
                    {TYPE_CONFIGS[type].display}
                </span>
                to
                <span class=has-text-weight-bold>
                    {TYPE_CONFIGS[to_type].display}
                </span>
                , {@html then_msg}
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
    <Bool bind:value={answer} />

{:else if type === 'free_form'}
    <Text bind:value={answer} label=Answer />

{:else if type === 'mc_single' || type === 'mc_multiple' }
    {#each answer as ans (ans.key)}
    <Ans
        bind:text={ans.text}
        bind:value={ans.value}
        delete_ans={() => delete_ans(ans.key)}
        toggle={() => toggle(ans.key)}
        />
    {/each}
    <button class=button on:click={add_empty_ans}>Add Another Choice</button>

{:else if type === 'ordered'}
    {#each answer as ans (ans.key)}
    <OrderedAns
        bind:text={ans.text}
        bind:value={ans.value}
        delete_ans={() => delete_ans(ans.key)}
        />
    {/each}
    <button class=button on:click={add_empty_ans}>Add Another Choice</button>
{/if}

<button class='button block' on:click={save_question}>Save Question</button>
