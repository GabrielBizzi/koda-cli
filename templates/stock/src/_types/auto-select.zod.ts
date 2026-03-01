import { z } from 'zod';

export const GrifeProdutoSchema = z.object({
	codigo_hierarquia: z.string().optional(),
	nome: z.string().optional(),
	alias: z.string().optional(),
	nivel: z.number().optional(),
});
export type GrifeProduto = z.infer<typeof GrifeProdutoSchema>;

export const LinhaProdutoSchema = z.object({
	codigo_hierarquia: z.string().optional(),
	nome: z.string().optional(),
	alias: z.string().optional(),
	nivel: z.number().optional(),
});
export type LinhaProduto = z.infer<typeof LinhaProdutoSchema>;
export const ObjectComboSchema = z.object({
	codigo_hierarquia: z.string().optional(),
	nome: z.string().optional(),
	alias: z.string().optional(),
	nivel: z.number().optional(),
});
export type ObjectCombo = z.infer<typeof ObjectComboSchema>;
export const TipoProdutoSchema = z.object({
	codigo_hierarquia: z.string().optional(),
	nome: z.string().optional(),
	alias: z.string().optional(),
	nivel: z.number().optional(),
});
export type TipoProduto = z.infer<typeof TipoProdutoSchema>;
export const GrupoProdutoSchema = z.object({
	codigo_hierarquia: z.string().optional(),
	nome: z.string().optional(),
	alias: z.string().optional(),
	nivel: z.number().optional(),
});
export type GrupoProduto = z.infer<typeof GrupoProdutoSchema>;
export const SubGrupoProdutoSchema = z.object({
	codigo_hierarquia: z.string().optional(),
	nome: z.string().optional(),
	alias: z.string().optional(),
	nivel: z.number().optional(),
});
export type SubGrupoProduto = z.infer<typeof SubGrupoProdutoSchema>;
