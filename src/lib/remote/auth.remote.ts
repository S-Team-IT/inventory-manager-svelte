import { command, form, getRequestEvent } from '$app/server';
import { sql } from '$lib/server/postgres';
import { createSession, deleteSession } from '$lib/server/sessions';
import type { User } from '$lib/types/databaseTypes';
import { email, password, zString } from '$lib/types/schemaTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import { comparePasswordHash } from '$lib/utils/hash';
import { redirect } from '@sveltejs/kit';
import * as z from 'zod';

export const signIn = form(z.object({ email, password }), async ({ email, password }) => {
	try {
		const [user] = await sql<
			User[]
		>`SELECT id, email, name, password_hash AS "passwordHash", role FROM users WHERE email = ${email}`;
		if (!user || !(await comparePasswordHash(password, user.passwordHash))) {
			console.error(`UNEXPECTED ERROR SIGNING IN ${email}, ${password}`);
			return { success: false };
		}
		const newSessionWithToken = await createSession(user.id);
		setTokenCookie(newSessionWithToken.token);
		redirect(303, '/');
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

// function getTokenCookie(): string | undefined {
// 	const { cookies } = getRequestEvent();
// 	return cookies.get('token');
// }

function deleteTokenCookie(): void {
	const { cookies } = getRequestEvent();
	cookies.delete('token', { path: '/' });
}
