import { form, query } from '$app/server';
import { sql } from '$lib/server/postgres';
import type { User } from '$lib/types/databaseTypes';
import { email, password, serial, zString } from '$lib/types/schemaTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import { hashPassword } from '$lib/utils/hash';
import { error, invalid } from '@sveltejs/kit';
import z from 'zod';

export const getUser = query(serial, async (id) => {
	try {
		const [user] = await sql<User[]>`
			SELECT id, email, name, password_hash AS "passwordHash", role FROM users 
			WHERE id = ${id}`;
		if (!user) error(404, 'User not found.');
		return user;
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const createUser = form(
	z
		.object({ email, name: zString, password, role: zString })
		.refine(({ role }) => role === 'QS' || role === 'Procurement' || role === 'Project', {
			error: 'Role does not match any existing roles.',
			path: ['role']
		}),
	async ({ email, name, password, role }, issue) => {
		try {
			name = name[0].toUpperCase() + name.slice(1);
			const passwordHash = await hashPassword(password);
			const result =
				await sql`INSERT INTO users (email, name, password_hash, role) VALUES(${email}, ${name}, ${passwordHash}, ${role})`;
			if (result.count !== 1) {
				console.error(`UNEXPECTED ERROR CREATING USER ${email}, ${name}, ${passwordHash}, ${role}`);
				return { success: false };
			}
		} catch (e) {
			handleQueryErrors(e, (psqlError) => {
				if (psqlError.code === '23505') {
					switch (psqlError.constraint_name) {
						case 'users_email_key':
							throw invalid(issue.email('Email is already in use.'));
						case 'users_name_key':
							throw invalid(issue.name('Name is already being used. Please add an initial.'));
					}
				}
			});
		}
	}
);
