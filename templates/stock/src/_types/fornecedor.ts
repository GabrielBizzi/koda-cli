import { z } from 'zod';

const FornecedorIntegracaoSchema = z.object({
	beneficiador: z.string().optional(),
	centro_custo: z.string().optional(),
	cgc_cpf: z.string().optional(),
	clifor: z.string().optional(),
	cod_fornecedor: z.string().optional(),
	condicao_pgto: z.string().optional(),
	ctb_conta_contabil: z.string().optional(),
	data_para_transferencia: z.string().optional(),
	desconto_vencimento: z.number().optional(),
	dias_desconto_vencimento: z.number().optional(),
	fornece_mat_consumo: z.boolean().optional(),
	fornece_materiais: z.boolean().optional(),
	fornece_outros: z.boolean().optional(),
	fornece_prod_acab: z.boolean().optional(),
	fornecedor: z.string().optional(),
	inativo: z.boolean().optional(),
	indica_cqfor: z.boolean().optional(),
	indica_markdown: z.boolean().optional(),
	indica_transportadora: z.boolean().optional(),
	licenciado: z.number().optional(),
	licenciado_royalties: z.number().optional(),
	licendiado_royalties: z.number().optional(),
	lx_metodo_pagamento: z.number().optional(),
	matriz_fornecedor: z.string().optional(),
	subtipo_fornecedor: z.string().optional(),
	tipo: z.string().optional(),
	valor_minimo_pedido: z.number().optional(),
});

declare global {
	export type FornecedorIntegracao = z.infer<
		typeof FornecedorIntegracaoSchema
	>;
}

export { FornecedorIntegracaoSchema };
