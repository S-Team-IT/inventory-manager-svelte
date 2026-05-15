import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from '$env/static/private';
import { isHttpError, isRedirect } from '@sveltejs/kit';
import { error } from 'console';
import type { PostgresError } from 'postgres';
import postgres from 'postgres';

export const sql = postgres({
	host: DB_HOST,
	port: Number(DB_PORT),
	database: DB_DATABASE,
	username: DB_USERNAME,
	password: DB_PASSWORD
});

export const handleQueryErrors = (e: unknown, customPsqlHandler?: (e: PostgresError) => void) => {
	if (isHttpError(e) || isRedirect(e)) throw e;
	if (isPostgresError(e)) {
		const psqlError = e as PostgresError;

		if (psqlError.code.startsWith('0800')) error(500, 'Database connection failed');
		if (psqlError.code === '42601') throw new Error('Syntax error found in query statement');
		if (customPsqlHandler) customPsqlHandler(psqlError);
		throw new Error('Unhandled psql error', { cause: e });
	}
	throw new Error('Unhandled error', { cause: e });
};

export const isPostgresError = (e: unknown): boolean => {
	// "instanceof cannot be used here because PostgresError cannot be used a value"
	// do you genuinely think you deserve to live
	return (e as PostgresError).code !== undefined;
};
