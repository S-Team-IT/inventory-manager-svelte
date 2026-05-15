import { form, getRequestEvent } from '$app/server';
import { sql } from '$lib/server/postgres';
import type { Session, SessionWithToken, User } from '$lib/types/databaseTypes';
import { email, password } from '$lib/types/schemaTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import {
	comparePasswordHash,
	constantTimeEqual,
	generateSecureRandomString,
	hashSecret
} from '$lib/utils/hash';
import { redirect } from '@sveltejs/kit';
import * as z from 'zod';

const sessionExpiresInSeconds = 60 * 60 * 24 * 7; // A week

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

async function createSession(userID: string): Promise<SessionWithToken> {
	const now = new Date();

	const id = generateSecureRandomString();
	const secret = generateSecureRandomString();
	const secretHash = await hashSecret(secret);

	const token = id + '.' + secret;

	const sessionWithToken: SessionWithToken = {
		id,
		secretHash,
		createdAt: now,
		userID,
		token
	};

	try {
		await sql`INSERT INTO sessions (id, secret_hash, created_at, user_id) 
		VALUES(${id}, ${secretHash}, ${Math.floor(sessionWithToken.createdAt.getTime() / 1000)}, ${userID})`;
	} catch (e) {
		handleQueryErrors(e);
	}

	return sessionWithToken;
}

async function validateSessionToken(token: string): Promise<Session | null> {
	const tokenParts = token.split('.');
	if (tokenParts.length !== 2) {
		return null;
	}
	const sessionID = tokenParts[0];
	const sessionSecret = tokenParts[1];

	const session = await getSession(sessionID);
	if (!session) {
		return null;
	}

	const tokenSecretHash = await hashSecret(sessionSecret);
	const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
	if (!validSecret) {
		return null;
	}

	return session;
}

async function getSession(id: string): Promise<Session | null> {
	const now = new Date();

	const result = await sql`SELECT * FROM sessions WHERE id = ${id}`;

	if (result.count !== 1) return null;

	const data = result[0];
	const session: Session = {
		id: data.id,
		secretHash: data.secret_hash,
		createdAt: new Date(data.created_at * 1000),
		userID: data.user_id
	};

	// Check expiration
	if (now.getTime() - session.createdAt.getTime() >= sessionExpiresInSeconds * 1000) {
		await deleteSession(id);
		return null;
	}

	return session;
}

async function deleteSession(id: string): Promise<void> {
	await sql`DELETE FROM sessions WHERE id = ${id}`;
}

function setTokenCookie(token: string): void {
	const { cookies } = getRequestEvent();
	cookies.set('token', token, { path: '/' });
}

function getTokenCookie(): string | undefined {
	const { cookies } = getRequestEvent();
	return cookies.get('token');
}

function deleteSessionCookie(): void {
	const { cookies } = getRequestEvent();
	cookies.delete('token', { path: '/' });
}
