import { getSuppliers } from '$lib/remote/supplier.remote';

export async function load() {
	const suppliers = await getSuppliers();
	if (!suppliers) throw new Error('getSuppliers returned undefined');

	return {
		suppliers
	};
}
