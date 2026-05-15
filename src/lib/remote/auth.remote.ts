import { form } from '$app/server';
import { handleQueryErrors, sql } from '$lib/server/postgres';
import type { User } from '$lib/types/databaseTypes';
import { email, password } from '$lib/types/schemaTypes';
import { comparePasswordHash } from '$lib/utils/hash';
import { redirect } from '@sveltejs/kit';
import * as z from 'zod';

export const signIn = form(z.object({ email, password }), async ({ email, password }) => {
	try {
		const [user] = await sql<
			User[]
		>`SELECT id, email, name, password_hash AS "passwordHash", role FROM users WHERE email = ${email}`;
		if (!user || !(await comparePasswordHash(password, user.passwordHash)))
			return { success: false };
		redirect(303, '/');
	} catch (e) {
		handleQueryErrors(e);
	}
});
