export const ArrayUtils = {
	searchArray: function <T = Record<string, string>>(
		arr: Array<T>,
		key: keyof T,
		regex: RegExp,
	) {
		const matches = [];
		let i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i][key] && (arr[i][key] as string).match(regex))
				matches.push(arr[i]);
		}
		return matches;
	},
};
