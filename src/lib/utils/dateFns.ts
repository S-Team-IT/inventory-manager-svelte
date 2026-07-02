import { format, formatRelative, isBefore } from 'date-fns';
import { capitalizeFirstLetter } from './stringTransform';

export function formatRelativeCustom(date: Date): string {
	// Converts into relative time i.e. Yesterday at 12:55.
	// This function modifies that string further because
	// who in their right mind calls Tuesday of the current week
	// LAST Tuesday instead of THIS Tuesday
	const relativeStr = formatRelative(date, new Date());
	const noLast = relativeStr.replace('last', '');
	const noAt = noLast.replace('at', '');
	const noToday = noAt.replace('today', '');
	return capitalizeFirstLetter(noToday);
}

export function formatMonthDay(date: Date): string {
	return format(date, 'MM/dd');
}

export function formatYearMonthDay(date: Date): string {
	return format(date, 'yyyy/MM/dd');
}

export function formatYearMonthDayDash(date: Date): string {
	return format(date, 'yyyy-MM-dd');
}
