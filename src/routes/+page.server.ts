export function load({ url }) {
	let redirectMessage: string = '';
	if (url.searchParams.get('loggedIn') === 'true') {
		redirectMessage = 'Signed in';
	} else if (url.searchParams.get('loggedOut') === 'true') {
		redirectMessage = 'Signed out';
	}

	return { redirectMessage };
}
