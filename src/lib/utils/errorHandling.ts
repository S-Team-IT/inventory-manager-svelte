import { error, isHttpError, isRedirect } from '@sveltejs/kit';
import type { PostgresError } from 'postgres';

export const handleQueryErrors = (e: unknown, customPsqlHandler?: (e: PostgresError) => void) => {
	if (isHttpError(e) || isRedirect(e)) throw e;
	if (isPostgresError(e)) {
		const psqlError = e as PostgresError;

		if (psqlError.code.startsWith('0800')) error(500, 'Database connection failed');
		if (psqlError.code === '42601') throw new Error('Syntax error found in query statement');
		if (customPsqlHandler) customPsqlHandler(psqlError);
		console.error(e);
		throw new Error('Unhandled psql error', { cause: e });
	}
	throw new Error('Unhandled error', { cause: e });
};

export const isPostgresError = (e: unknown): boolean => {
	// "instanceof cannot be used here because PostgresError cannot be used a value"
	// do you genuinely think you deserve to live
	return (e as PostgresError).code !== undefined;
};
