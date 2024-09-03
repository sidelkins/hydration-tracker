<script lang="ts">
	import { onMount } from 'svelte';
    import * as constants from "$lib/constants";

	let amount: number = 0;
	let todaysConsumption: number = 0;

	async function getTodaysConsumption() {
		const response = await fetch('/api/today', {
			method: 'GET'
		});

		if (response.ok) {
			const result = await response.json();
			todaysConsumption = result.data.consumed_today;
		}
	}

	async function submitAmount() {
		const response = await fetch('/api/today', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ amount })
		});

		if (response.ok) {
			const result = await response.json();
			console.log(`Water consumption recorded with ID: ${result.id}`);
			await getTodaysConsumption();
		} else {
			console.log('Failed to record water consumption.');
		}
	}

	function setAmount(size: number) {
		amount = size;
	}

	onMount(async () => {
    	await getTodaysConsumption();
  	});
</script>

<svelte:head>
	<title>{ constants.title }</title>
	<meta name="description" content="simple-water-tracker" />
</svelte:head>

<section>
	  <h2>Record Water Consumption</h2>
	  <input type="number" bind:value={amount} placeholder="Enter amount (fl oz)" />
	  <button on:click={submitAmount}>Submit</button>

	  <!-- Buttons for common sizes -->
	  <button on:click={() => setAmount(constants.FluidOunces.waterBottle)}>16.9 fl. oz (Standard Water Bottle)</button>
	  <button on:click={() => setAmount(constants.FluidOunces.stanleyCup)}>40 fl. oz (Stanley Cup)</button>

	  <h2>Today's Water Consumption:</h2> {todaysConsumption} fl. oz
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	button {
		margin: 5px;
	}

	h1 {
		width: 100%;
	}

	h2 {
		font-weight: bold;
	}
</style>
