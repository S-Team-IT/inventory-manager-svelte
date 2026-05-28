import type { RemoteQueryUpdate } from '@sveltejs/kit';

export type EnhanceParams = {
	form?: HTMLFormElement;
	data?: unknown;
	submit?: () => Promise<boolean> & {
		updates: (...updates: RemoteQueryUpdate[]) => Promise<boolean>;
	};
};


