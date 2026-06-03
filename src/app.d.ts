// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { User, SessionClient } from "$lib/types/databaseTypes"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | undefined;
			session: SessionClient | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
