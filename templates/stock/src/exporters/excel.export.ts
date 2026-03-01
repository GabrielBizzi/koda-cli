import { ColumnProps } from '@/_types/table';
import XLSX, { Column } from 'exceljs';
import { saveAs } from 'file-saver';

function parseData<T>(data: T, _index: number, _array: Array<T>) {
	return Object.fromEntries(
		Object.entries(data as object).map(([key, value]) => [
			key,
			typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value,
		]),
	);
}

function exportData<T>(
	rows: T[],
	columns: Partial<ColumnProps<T>>[],
	name: string = 'spreadsheet',
): void {
	const workbook = new XLSX.Workbook();
	const worksheet = workbook.addWorksheet('WorkSheet');

	worksheet.columns = columns.map((column) => {
		if (!column.visible)
			return {
				header: null,
				key: null,
			};

		return {
			header: column.label,
			key: column.name,
		};
	}) as Partial<Column>[];
	worksheet.addRows(rows.map(parseData));

	workbook.xlsx.writeBuffer().then((data) => {
		const blob = new Blob([data], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		});
		saveAs(blob, `${name}.xlsx`);
	});
}

export default exportData;
