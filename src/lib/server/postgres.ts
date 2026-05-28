import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from '$env/static/private';
import postgres from 'postgres';

export const sql = postgres({
	host: DB_HOST,
	port: Number(DB_PORT),
	database: DB_DATABASE,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	connection: {
		search_path: 'public'
	}
});
