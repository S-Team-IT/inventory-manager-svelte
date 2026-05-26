import type { RemoteQueryUpdate } from '@sveltejs/kit';

export type EnhanceParams = {
	form?: HTMLFormElement;
	data?: unknown;
	submit?: () => Promise<boolean> & {
		updates: (...updates: RemoteQueryUpdate[]) => Promise<boolean>;
	};
};

export type TransactionItem = {
	id: string;
	master: string;
	name: string;
	quantity: number;
};

export type CompleteIncomingTransaction = {
	id: string;
	createdAt: Date;
	deliveryDate: Date;
	supplier: string;
	deliveryID: string;
	items: TransactionItem[];
};
