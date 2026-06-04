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

export type Item = {
	id: string;
	master: string;
	name: string;
	quantity: number;
};

export type DetailedItem = Item & {
	category: string;
	categoryID?: string;
	// supplier: string;
	// supplierID?: string;
	thumbnail: string;
	gallery: { item: string }[] | [];
	lastStocked: Date;
	minimumQuantity: number;
};

export type Transaction = {
	id: string;
	createdAt: Date;
	deliveryDate?: Date;
	supplier?: string;
	deliveryID?: string;
	expendDate?: Date;
	expender?: string;
	remarks?: string;
};

export type IndividualTransaction = Transaction & {
	itemID: string;
	master: string;
	itemName: string;
	quantity: number;
};

export type CompleteTransaction = Transaction & {
	items: Item[];
};

export type Gallery = { item: string }[];
