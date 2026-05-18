import { query } from '$app/server';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import { sql } from '$lib/server/postgres';

export const getItems = query(async () => {
	try {
		return await sql`SELECT
      id,
      name,
      category_id AS "categoryID",
      supplier_id AS "supplierID",
      thumbnail,
      photos
      FROM items`;
	} catch (e) {
		handleQueryErrors(e);
	}
});
	} catch (e) {
		handleQueryErrors(e);
	}
});
