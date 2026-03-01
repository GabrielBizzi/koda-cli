import { z } from 'zod';

export const FilialSchema = z.object({
	codigoFilial: z.number(),
	nome: z.string(),
	selecionado: z.boolean().optional().default(false),
	codigoFilialCliente: z.string().optional(),
	cnpj: z.string().optional(),
	tipoFilial: z.string().optional(),
	codigoCliente: z.number().optional(),
	codigoEmpresa: z.number().optional(),
});
