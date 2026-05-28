export function truncateString(str: string, maxLength: number): string {
	if (str.length <= maxLength) return str;
	return str.slice(0, maxLength - 3) + '...';
}

export function capitalizeFirstLetter(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
}
