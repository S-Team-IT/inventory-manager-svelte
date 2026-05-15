import * as z from 'zod';

export const zString = z.string().trim();

export const id = z
	.string()
	.min(1)
	.regex(/^0-9/, 'Should start with a number')
	.toLowerCase()
	.trim();
export const serial = z.coerce.number().int().gt(0);
export const email = z.email().trim().toLowerCase();
export const password = z.string().trim().min(8, 'Min. 8 characters');
export const role = z
	.string()
	.refine((str) => str === 'QS' || str === 'Procurement' || str === 'Project', {
		error: 'Role does not match any existing roles',
		path: ['role']
	});
