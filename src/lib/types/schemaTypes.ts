import * as z from 'zod';

export const zString = z.string().min(1, 'Please enter something.').trim();
export const zNumber = z
	.number()
	.int('Number be an integer.')
	.gte(0, 'Number must not be negative.');
export const zImgFile = z
	.file('Please submit a file.')
	.mime(
		['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'],
		'Unsupported file format.'
	); // why don't they have a wildcard bruh

// Remote form only includes the checkbox input if it's checked,
// so it has to be marked as optional & default to false to work with checkboxes
export const zBoolean = z.coerce.boolean<boolean>().optional().default(false);

export const email = z.email().trim().toLowerCase();
export const password = z.string().trim().min(8, 'Min. 8 characters');

export const master = z
	.string()
	.regex(/^\d/, 'Master Number should start with a number.')
	.toLowerCase()
	.trim();
