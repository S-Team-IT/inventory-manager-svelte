import { form } from '$app/server';
import { handleQueryErrors, sql } from '$lib/server/postgres';
import { email, password, zString } from '$lib/types/schemaTypes';
import { hashPassword } from '$lib/utils/hash';
import { invalid } from '@sveltejs/kit';
import z from 'zod';

export const createUser = form(
	z
		.object({ email, password, role: zString })
		.refine(({ role }) => role === 'QS' || role === 'Procurement' || role === 'Project', {
			error: 'Role does not match any existing roles.',
			path: ['role']
		}),
	async ({ email, password, role }, issue) => {
		try {
			const passwordHash = await hashPassword(password);
			const result =
				await sql`INSERT INTO users (email, password_hash, role) VALUES(${email}, ${passwordHash}, ${role})`;
			if (result.count !== 1) throw new Error('Failed to create user');
		} catch (e) {
			handleQueryErrors(e, (psqlError) => {
				if (psqlError.code === '23505') {
					switch (psqlError.constraint_name) {
						case 'users_email_key':
							invalid(issue.email('Email is already in use.'));
					}
				}
			});
		}
	}
);
