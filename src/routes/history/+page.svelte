<script lang="ts">
    import { onMount } from 'svelte';
    import Graph from "$lib/Graph.svelte";

	let isDataLoaded: boolean = false;
    let data: { id: number; timestamp: string; amount: number }[] = [];

    async function getHistory() {
		const response = await fetch('/api/history', {
			method: 'GET'
		});

		if (response.ok) {
			const result = await response.json();
            data = result.data;
			isDataLoaded = true;
		}
	}
    onMount(async () => {
    	await getHistory();
  	});
</script>

{#if isDataLoaded}
	<Graph {data} />
{/if}