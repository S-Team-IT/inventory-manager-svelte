import { utils, writeFile } from 'xlsx';

export function tableToCSV(table: Element, fileName: string) {
	const workbook = utils.book_new();
	const worksheet = utils.table_to_sheet(table, { raw: true });
	utils.book_append_sheet(workbook, worksheet, 'Table 1');
	writeFile(workbook, `${fileName}.xlsx`);
}
