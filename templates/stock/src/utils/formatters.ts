/**
 * Formata números em R$.
 *
 * @param {number} value Valor em Number
 * @return R$ X.XXX
 * @example formatToCurrency(1234) => 'R$ 1.234,00'
 *
 */
export const formatToCurrency = (value: number): string =>
	Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(value);
