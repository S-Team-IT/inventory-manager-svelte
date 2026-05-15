import { form } from '$app/server';
import { handleQueryErrors, sql } from '$lib/server/postgres';
import { email, password, role } from '$lib/types/schemaTypes';
import { hashPassword } from '$lib/utils/hash';
import z from 'zod';

export const createUser = form(
	z.object({ email, password, role }),
	async ({ email, password, role }) => {
		try {
			const passwordHash = await hashPassword(password);
			const result =
				await sql`INSERT INTO users (email, password_hash, role) VALUES(${email}, ${passwordHash}, ${role})`;
			if (result.count !== 1) throw new Error('Failed to create user');
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);
