export function localeCompareSort(a: string, b: string) {
	return a.localeCompare(b, 'en', { sensitivity: 'base', numeric: true });
}

export function numberSort(a: number, b: number) {
	return a - b;
}

export function genericSort<T extends string | number>(a: T, b: T) {
	if (typeof a === 'string') {
		return localeCompareSort(a, b as string);
	}
	return numberSort(a, b as number);
}
