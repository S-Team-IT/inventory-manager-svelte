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
		if (!chartData) return;
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
				scales: {
					y: {
						ticks: { stepSize: 1 }
					}
				}
			}
		});
	}
</script>
