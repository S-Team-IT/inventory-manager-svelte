import { command, form, getRequestEvent } from '$app/server';
import { sql } from '$lib/server/postgres';
import { createSession, deleteSession } from '$lib/server/sessions';
import type { User } from '$lib/types/databaseTypes';
import { email, password, zString } from '$lib/types/schemaTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import { comparePasswordHash } from '$lib/utils/hash';
import { redirect, invalid } from '@sveltejs/kit';
import * as z from 'zod';

export const signIn = form(z.object({ email, password }), async ({ email, password }, issue) => {
	try {
		const [user] = await sql<
			User[]
		>`SELECT id, email, name, password_hash AS "passwordHash", role FROM users WHERE email = ${email}`;
		if (!user) invalid(issue.password('User not found.'));
		if (!(await comparePasswordHash(password, user.passwordHash)))
			invalid(issue.password('Invalid credentials'));

		const newSessionWithToken = await createSession(user.id);
		setTokenCookie(newSessionWithToken.token);
		// No idea why, but toasting here does not work. 
		// Instead, a param flag is passed and the toast is handled
		// at the endpoint's onMount().
		redirect(303, '/?loggedIn=true');
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const signOut = command(zString, async (id) => {
	try {
		deleteTokenCookie();
		deleteSession(id);
	} catch (e) {
		handleQueryErrors(e);
	}
});

function setTokenCookie(token: string): void {
	const { cookies } = getRequestEvent();
	cookies.set('token', token, { path: '/' });
}

function deleteTokenCookie(): void {
	const { cookies } = getRequestEvent();
	cookies.delete('token', { path: '/' });
}
