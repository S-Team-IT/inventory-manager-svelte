import { getUser } from '$lib/remote/user.remote';
import { validateSessionToken } from '$lib/server/sessions';

export async function handle({ event, resolve }) {
	const token = event.cookies.get('token');
	if (token) {
		const session = await validateSessionToken(token);
		if (session) {
			event.locals.user = await getUser(session.userID);
			event.locals.session = { id: session.id, createdAt: session.createdAt };
		}
	}
	const response = await resolve(event);
	return response;
}
