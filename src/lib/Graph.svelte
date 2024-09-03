<!-- src/lib/Graph.svelte -->
<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import 'chartjs-adapter-date-fns';

  Chart.register(...registerables);

  export let data: { id: number; timestamp: string; amount: number }[] = [];

  let chart: Chart | null = null;
  let groupByDate = true; // Default to grouping by date

  // Function to update the chart
  const updateChart = () => {
    if (chart) {
      chart.destroy();
    }

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: groupByDate
          ? Array.from(new Set(data.map(item => item.timestamp.split('T')[0])))
          : data.map(item => new Date(item.timestamp)),
        datasets: [{
          label: 'Water Consumption (fl oz)',
          data: groupByDate
            ? Array.from(new Set(data.map(item => item.timestamp.split('T')[0]))).map(date =>
                data
                  .filter(item => item.timestamp.split('T')[0] === date)
                  .reduce((sum, item) => sum + item.amount, 0)
              )
            : data.map(item => item.amount),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
        }],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: groupByDate ? 'category' : 'time',
            title: {
              display: true,
              text: groupByDate ? 'Date' : 'Timestamp',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Amount (fl oz)',
            },
          },
        },
      },
    });
  };

  onMount(updateChart);

  // Update the chart when groupByDate changes
  afterUpdate(updateChart);
</script>

<div>
  <label>
    <input type="radio" bind:group={groupByDate} value={true} /> Group by Date
  </label>
  <label>
    <input type="radio" bind:group={groupByDate} value={false} /> View by Timestamp
  </label>
</div>

<canvas id="myChart"></canvas>

<style>
  canvas {
    max-width: 100%;
  }
</style>
