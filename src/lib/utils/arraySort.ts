export function localeCompareSort(a: string, b: string) {
	return a.localeCompare(b, 'en', { sensitivity: 'base', numeric: true });
}

export function numberSort(a: number, b: number) {
	return a - b;
}

