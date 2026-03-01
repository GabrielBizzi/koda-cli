import { z } from 'zod';

export const tMessageSchema = z.object({
	codigo_mensageria: z.number().optional(),
	sistemas: z
		.array(
			z.object({
				codigo_sistema: z.number().optional(),
				descricao_sistema: z.string().optional(),
				visualizado: z.boolean().optional(),
			}),
		)
		.optional(),
	perfis: z
		.array(
			z.object({
				codigo_perfil: z.number().optional(),
				descricao_perfil: z.string().optional(),
				visualizado: z.boolean().optional(),
			}),
		)
		.optional(),
	filiais: z
		.array(
			z.object({
				codigo_filial: z.number().optional(),
				descricao_filial: z.string().optional(),
				visualizado: z.boolean().optional(),
			}),
		)
		.optional(),
	tipo: z.number().optional(),
	titulo: z.string().optional(),
	descricao: z.string().optional(),
	confirmacao: z.boolean().optional(),
	urgencia: z.number().optional(),
	expira_em: z.string().optional(),
	criadoEm: z.string().optional(),
	visualizado: z.boolean().optional(),
});

export type TMessageInfer = z.infer<typeof tMessageSchema>;
