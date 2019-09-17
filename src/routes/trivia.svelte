<script>
    import questions from '@/routes/_questions';
    import FreeForm from '@/components/FreeForm';
    const free_form_q = questions.find(q => q.type === 'free_form');
</script>

<FreeForm {...free_form_q} />


