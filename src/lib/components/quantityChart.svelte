<script lang="ts">
	import { formatMonthDay } from '$lib/utils/transforms/dates';
	import Chart, { type ChartItem } from 'chart.js/auto';
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
		new Chart(document.getElementById(targetElementID) as ChartItem, {
			type: 'line',
			data: {
				labels: chartData.map((row) => formatMonthDay(row.week)),
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
