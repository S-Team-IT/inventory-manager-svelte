export function load({ url }) {
	const wasRedirected = url.searchParams.get('loggedIn') === 'true';
	return { wasRedirected };
}
