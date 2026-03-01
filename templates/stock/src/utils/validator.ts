/**
 *  Cria máscaras de CPF.
 *
 *  @param value 'xxxxxxxxxxx' dígitos do CPF
 *  @return {string} 'xxx.xxx.xxx-xx'
 *  @example cpfMask(12345678912) => '123.456.789-12'
 *
 */

export const cpfMask = (value: string | number): string => {
	return String(value)
		.replace(/\D/g, '')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})/, '$1-$2')
		.replace(/(-\d{2})\d+?$/, '$1');
};

/**
 *  Máscara para CNPJ
 * @param value 'xxxxxxxxxxxxxx' dígitos do CPNJ
 * @returns 'xx.xxx.xxx/xxxx-xx'
 * @example cnpjMask(12345678000123) => '12.345.678/0001-23'
 */
export const cnpjMask = (value: string | number): string => {
	return String(value)
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1$2')
		.replace(/(\d{3})(\d)/, '$1/$2')
		.replace(/(\d{4})(\d)/, '$1-$2');
};

export const validateBothCnpjAndCpf = (
	value: string | number | undefined | null,
): string | undefined => {
	if (typeof value === 'undefined' || value === null) return undefined;
	const onlyNumber =
		typeof value === 'string'
			? value.replace(/\D/g, '')
			: typeof value === 'number'
				? value.toString()
				: value;

	let masked: string = '';
	if (onlyNumber.length === 11) masked = cpfMask(onlyNumber);
	if (onlyNumber.length === 14) masked = cnpjMask(onlyNumber);
	return masked;
};

export const formatCNPJ = (value: string): string | undefined => {
	if (!value) return;
	const cleaned = value.replace(/\D/g, '');

	if (cleaned.length === 14) {
		return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12)}`;
	}

	return value;
};

export const unformatCNPJ = (value: string): string | undefined => {
	if (!value) return;
	return value.replace(/\D/g, '');
};


export const formatPhone = (value: string): string | undefined => {
	if (!value) return;
	const cleaned = value.replace(/\D/g, '');

	if (cleaned.length === 10) {
		return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
	} else if (cleaned.length === 11) {
		return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
	}

	return value;
};

export const unformatPhone = (value: string): string | undefined => {
	if (!value) return;
	return value.replace(/\D/g, '');
};
