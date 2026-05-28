export type User = {
	id: string;
	email: string;
	name: string;
	passwordHash: string;
	role: string;
};

export type SessionClient = {
	id: string;
	createdAt: Date;
};

export type Session = SessionClient & {
	userID: string;
	secretHash: Uint8Array;
};

export type SessionWithToken = Session & {
	token: string;
};

export type Generic = {
	id: string;
	name: string;
};

export type Supplier = Generic;
export type Category = Generic;

export type DB_Stock = {
	transaction_id: string;
	item_id: string;
	quantity: number;
};

export type GenericItem = {
	id: string;
	master: string;
	name: string;
};

export type DetailedItem = GenericItem & {
	category: string;
	categoryID?: string;
	supplier: string;
	supplierID?: string;
	thumbnail: string;
	photos: { item: string }[] | [];
	quantity: number;
	lastStocked: Date;
};

export type ItemTransaction = GenericItem & {
	quantity: number;
};

export type IncomingTransaction = {
	id: string;
	createdAt: Date;
	deliveryDate: Date;
	supplier: string;
	deliveryID: string;
};

export type IndividualIncomingTransaction = IncomingTransaction & {
	itemID: string;
	master: string;
	itemName: string;
	quantity: number;
};

export type CompleteIncomingTransaction = IncomingTransaction & {
	items: ItemTransaction[];
};
