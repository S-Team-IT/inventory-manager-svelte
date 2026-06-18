<script lang="ts">
	import Chart from 'chart.js/auto';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	type Props = {
		chartData: { week: Date; netQuantity: number }[] | undefined;
		targetElementID: string;
	};

	const { chartData, targetElementID }: Props = $props();

	onMount(() => {
		initializeChart();
	});

	async function initializeChart() {
		if (!chartData || !targetElementID) {
			console.error('Props are missing');
			return;
		}
		// @ts-expect-error dude it throws an error that Chart doesn't accept HTMLElement
		// I can't win
		new Chart(document.getElementById(targetElementID), {
			type: 'line',
			data: {
				labels: chartData.map((row) => format(row.week, 'MM/dd')),
				datasets: [
					{
						label: 'Weekly net quantity change',
						data: chartData.map((row) => row.netQuantity)
					}
				]
			},
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {
					y: {
						ticks: { stepSize: 1 }
					}
				}
			}
		});
	}
</script>
