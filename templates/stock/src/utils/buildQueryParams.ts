export const buildQueryParams = (
	params: Record<string, string | number | (string | number)[] | undefined>,
) => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined || value === '') return;

		if (Array.isArray(value)) {
			value.forEach((v) => searchParams.append(key, String(v)));
		} else {
			searchParams.append(key, String(value));
		}
	});
	return searchParams.toString();
};
