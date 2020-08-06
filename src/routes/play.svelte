<script>
    import {ENABLED_TYPES} from '@/meta';
    import questions from '@/fake_questions';
    import Prompt from '@/components/play/Prompt';
    import FreeForm from '@/components/play/FreeForm';
    import TrueFalse from '@/components/play/TrueFalse';
    import MCMultiple from '@/components/play/MCMultiple';
    import MCSingle from '@/components/play/MCSingle';
    import Ordered from '@/components/play/Ordered';

    let qs = questions.filter((q) => ENABLED_TYPES.includes(q.type));
</script>

{#each questions as q (q.prompt)}
    <Prompt text={q.prompt} />

    {#if q.type === 'free_form'}
        <FreeForm {...q} />
        <hr>
    {:else if q.type === 'mc_single'}
        <MCSingle {...q} />
        <hr>
    {:else if q.type === 'true_false'}
        <TrueFalse {...q} />
        <hr>
    {:else if q.type === 'mc_multiple'}
        <MCMultiple {...q} />
        <hr>
    {:else if q.type === 'ordered'}
        <Ordered {...q} />
        <hr>
    {/if}
{/each}
