import * as z from 'zod';

export const zString = z.string().trim();

export const id = z.string().min(1).regex(/^\d/, 'Should start with a number').toLowerCase().trim();
export const serial = z.coerce.number().int().gt(0);
export const email = z.email().trim().toLowerCase();
export const password = z.string().trim().min(8, 'Min. 8 characters');
