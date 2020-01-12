<script>
    import questions from '@/fake_questions';
    import Prompt from '@/components/play/Prompt';
    import FreeForm from '@/components/play/FreeForm';
    import TrueFalse from '@/components/play/TrueFalse';
    import MCMultiple from '@/components/play/MCMultiple';
    import MCSingle from '@/components/play/MCSingle';
    import Ordered from '@/components/play/Ordered';
</script>

<style>
    div {
        padding: 4vw;
    }
</style>

<div>
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
</div>


