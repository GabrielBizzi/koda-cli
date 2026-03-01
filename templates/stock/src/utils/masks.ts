// Mascaras
export const telMask = (value: string) => {
	if (!value) return;

	const cleanValue = value.replace(/\D/g, "");
	const checkRegExp =
		cleanValue.length === 10 ? /(\d{0,2})(\d{0,4})(\d{0,4})/ : /(\d{0,2})(\d{0,5})(\d{0,4})/;
	const checkedDigits = cleanValue.match(checkRegExp);
	if (!checkedDigits) return cleanValue;

	return !checkedDigits[2]
		? checkedDigits[1]
		: "(" +
		checkedDigits[1] +
		") " +
		checkedDigits[2] +
		(checkedDigits[3] ? "-" + checkedDigits[3] : "");
};

export const cnpjMask = (value: string) => {
	if (!value) return;

	const cleanValue = value.replace(/\D/g, "");
	const x = cleanValue.match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
	if (!x) return cleanValue;
	return !x[2] ? x[1] : x[1] + "." + x[2] + "." + x[3] + "/" + x[4] + (x[5] ? "-" + x[5] : "");
};

export const cpfMask = (value: string) => {
	if (!value) return;

	const cleanValue = value.replace(/\D/g, "");
	const x = cleanValue.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
	if (!x) return cleanValue;
	return !x[2] ? x[1] : x[1] + "." + x[2] + "." + x[3] + (x[4] ? "-" + x[4] : "");
};

export const cepMask = (value: string) => {
	if (!value) return;

	const cleanValue = value.replace(/\D/g, "");
	const x = cleanValue.match(/^(\d{0,5})(\d{0,3})/);
	if (!x) return cleanValue;
	return !x[2] ? x[1] : x[1] + "-" + (x[2] ? x[2] : "");
};

export const hasPhoneMask = (value: string) => {
	if (!value) return;

	const regex = /^\(\d{2}\) \d{4}-\d{4}$/;
	const hasMask = regex.test(value);

	return hasMask ? value : telMask(value);
}

export const isCPFOrCNPJ = (value: string, label: boolean = true) => {
  if (!value) return;

  const cleanValue = value.replace(/\D/g, "");

  const isCNPJ = cleanValue.length > 11;

  if (label) {
    return isCNPJ ? `CNPJ: ${cnpjMask(value)}` : `CPF: ${cpfMask(value)}`;
  } else {
    return isCNPJ ? cnpjMask(value) : cpfMask(value);
  }
};
