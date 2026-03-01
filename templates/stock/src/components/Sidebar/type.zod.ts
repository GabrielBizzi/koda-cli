import { z } from 'zod';

export const SidebarSubmenuSchema = z.object({
	codigoMenu: z.number().optional(),
	linguagens: z
		.array(
			z.object({
				codigo: z.string().optional(),
				descricao: z.string().optional(),
			}),
		)
		.optional(),
	pagina: z.string(),
	sequencia: z.number().optional(),
	icone: z.string().optional(),
	editar: z.boolean().optional(),
	exportar: z.boolean().optional(),
	integrar: z.boolean().optional(),
	criadoPor: z.number().optional(),
	criadoEm: z.string().optional(),
})

export const SidebarSchema = z.object({
	codigoMenu: z.number().optional(),
	linguagens: z
		.array(
			z.object({
				codigo: z.string().optional(),
				descricao: z.string().optional(),
			}),
		)
		.optional(),
	sequencia: z.number().optional(),
	submenus: z
		.array(
			SidebarSubmenuSchema
		)
		.nullable()
		.optional(),
	criadoPor: z.number().optional(),
	criadoEm: z.string().optional(),
	icone: z.string().optional(),
	pagina: z.string().optional().nullable(),
});

export type SidebarSubmenuType = z.infer<typeof SidebarSubmenuSchema>;
export type SidebarType = z.infer<typeof SidebarSchema>;
