<script lang="ts">
	let amount: number = 0;
	let responseMessage = '';

	async function submitAmount() {
		const response = await fetch('/api/water', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ amount })
		});

		if (response.ok) {
		const result = await response.json();
		responseMessage = `Water consumption recorded with ID: ${result.id}`;
		} else {
		responseMessage = 'Failed to record water consumption.';
		}
	}
</script>

<svelte:head>
	<title>h2o</title>
	<meta name="description" content="simple-water-tracker" />
</svelte:head>

<section>
	  <h1>Record Water Consumption</h1>
	  <input type="number" bind:value={amount} placeholder="Enter amount (ml)" />
	  <button on:click={submitAmount}>Submit</button>
	  <p>{responseMessage}</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
