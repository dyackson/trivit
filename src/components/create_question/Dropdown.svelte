<script>
    export let label;
    export let options = [];
    export let value = '';
</script>

<div class="field">
    <label class="label">{label}</label>
    <div class="control">
        <div class="select">
            <select bind:value>
                {#each options as option}
                    <option>{option}</option>
                {/each}
            </select>
        </div>
    </div>
</div>
