<script>
    import questions from '@/routes/_questions';
    import FreeForm from '@/components/FreeForm';
    import TrueFalse from '@/components/TrueFalse';
    import MCMultiple from '@/components/MCMultiple';
    const free_form_qs = questions.filter(q => q.type === 'free_form');
    const true_false_qs = questions.filter(q => q.type === 'true_false');
</script>

<style>
    div {
        padding: 4vw;
    }
</style>

<div>
{#each questions as q}
    {#if q.type === 'free_form'}
        <FreeForm {...q} />
        <hr>
    {:else if q.type === 'true_false'}
        <TrueFalse {...q} />
        <hr>
    {:else if q.type === 'mc_multiple'}
        <MCMultiple {...q} />
        <hr>
    {/if}
{/each}
</div>


