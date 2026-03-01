import { ChangeEvent } from "react";

export const telMask = (event: ChangeEvent<HTMLInputElement>) => {
	const cleanValue = event.target.value.replace(/\D/g, "");
	const checkRegExp =
		cleanValue.length === 10 ? /(\d{0,2})(\d{0,4})(\d{0,4})/ : /(\d{0,2})(\d{0,5})(\d{0,4})/;
	const checkedDigits = cleanValue.match(checkRegExp);
	if (!checkedDigits) return;

	event.target.value = !checkedDigits[2]
		? checkedDigits[1]
		: "(" +
		checkedDigits[1] +
		") " +
		checkedDigits[2] +
		(checkedDigits[3] ? "-" + checkedDigits[3] : "");
};

export const cnpjMask = (event: ChangeEvent<HTMLInputElement>) => {
	const cleanValue = event.target.value.replace(/\D/g, "");
	const x = cleanValue.match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
	if (!x) return;
	event.target.value = !x[2]
		? x[1]
		: x[1] + "." + x[2] + "." + x[3] + "/" + x[4] + (x[5] ? "-" + x[5] : "");
};

export const cpfMask = (event: ChangeEvent<HTMLInputElement>) => {
	const cleanValue = event.target.value.replace(/\D/g, "");
	const x = cleanValue.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
	if (!x) return;
	event.target.value = !x[2] ? x[1] : x[1] + "." + x[2] + "." + x[3] + (x[4] ? "-" + x[4] : "");
};

export const cepMask = (event: ChangeEvent<HTMLInputElement>) => {
	const cleanValue = event.target.value.replace(/\D/g, "");
	const x = cleanValue.match(/^(\d{0,5})(\d{0,3})/);
	if (!x) return;
	event.target.value = !x[2] ? x[1] : x[1] + "-" + (x[2] ? x[2] : "");
};

export const unicodeToEmoji = (text: string) => {
	const formattedText = text.replace(/[\da-fA-F]+/g, (match) => {
		const emoji = String.fromCodePoint(parseInt(match, 16));
		return emoji;
	});

	return formattedText;
}