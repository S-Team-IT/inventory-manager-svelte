import { formatRelative } from 'date-fns';
import { capitalizeFirstLetter } from './stringTransform';

export function formatRelativeCustom(date: Date): string {
	const relativeStr = formatRelative(date, new Date());
	const noLast = relativeStr.replace('last', '');
	const noAt = noLast.replace('at', '');
	const noToday = noAt.replace('today', '');
	return capitalizeFirstLetter(noToday);
}
