import { form, getRequestEvent, query } from '$app/server';
import { sql } from '$lib/server/postgres';
import type { User } from '$lib/types/databaseTypes';
import { email, password, zString } from '$lib/types/schemaTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import { comparePasswordHash, hashPassword } from '$lib/utils/hash';
import { capitalizeFirstLetter } from '$lib/utils/stringTransform';
import { error, invalid } from '@sveltejs/kit';
import z from 'zod';

export const getUser = query(zString, async (id) => {
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
		.refine(({ role }) => ['QS', 'Procurement', 'Project'].includes(role), {
			error: 'Role does not match any existing roles.',
			path: ['role']
		}),
	async ({ email, name, password, role }, issue) => {
		try {
			name = capitalizeFirstLetter(name);
			const passwordHash = await hashPassword(password);
			const result =
				await sql`INSERT INTO users (email, name, password_hash, role) VALUES(${email}, ${name}, ${passwordHash}, ${role})`;
			if (result.count !== 1) {
				console.error(`UNEXPECTED ERROR CREATING USER ${email}, ${name}, ${passwordHash}, ${role}`);
				return { success: false };
			}
			return { success: true };
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

export const editPassword = form(
	z.object({ oldPassword: password, newPassword: password }),
	async ({ oldPassword, newPassword }, issue) => {
		const { locals } = getRequestEvent();
		if (!locals.user) error(403, 'Forbidden');
		const { id, passwordHash } = locals.user;
		const isValid = await comparePasswordHash(oldPassword, passwordHash);
		if (!isValid) invalid(issue.oldPassword('Current password is wrong.'));
		const newPasswordHash = await hashPassword(newPassword);

		try {
			const result =
				await sql`UPDATE users SET password_hash = ${newPasswordHash} WHERE id = ${id}`;
			if (result.count != 1) return { success: false, message: '404 Not found' };
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);
