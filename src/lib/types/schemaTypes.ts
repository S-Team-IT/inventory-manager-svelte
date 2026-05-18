import * as z from 'zod';

export const zString = z.string().trim();

export const zNumber = z.number('Please enter a number.').int().gte(0);

export const serial = z.coerce
	.number()
	.int()
	.gt(0)
	.transform((val) => String(val));
export const email = z.email().trim().toLowerCase();
export const password = z.string().trim().min(8, 'Min. 8 characters');

export const masterNumber = z
	.string()
	.regex(/^\d/, 'Master Number should start with a number.')
	.toLowerCase()
	.trim();
