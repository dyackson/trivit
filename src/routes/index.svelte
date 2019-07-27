<script>
    import axios from 'axios';
    // Make a request for a user with a given ID
    let response;
    $: responseString = response && JSON.stringify(response.data);

    async function getQuestion() {
        try {
            response = await axios.get('api/question?ID=12345')
        } catch (error) {
            console.log(error);
        }
    }
</script>
<style>
h1, figure, p {
    text-align: center;
    margin: 0 auto;
}

    h1 {
        font-size: 2.8em;
        text-transform: uppercase;
        font-weight: 700;
        margin: 0 0 0.5em 0;
        background: cadetblue;
    }

    figure {
        margin: 0 0 1em 0;
    }

    img {
        width: 100%;
        max-width: 400px;
        margin: 0 0 1em 0;
    }

    p {
        margin: 1em auto;
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }
</style>



<div>
    {responseString}
</div>
<button type=button on:click={getQuestion}>
    Get question
</button>

<svelte:head>
<title>I'll be damned</title>
</svelte:head>

<h1>Great success, huh!</h1>

<figure>
    <img alt='Borat' src='great-success.png'>
    <figcaption>HIGH FIVE!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
