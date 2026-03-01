'use client';
import { SidebarType } from '@/components/Sidebar/type.zod';
import { useSidebar } from '@/stores/sidebar';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useMemo } from 'react';

interface PermissionContextType {
	exportar: boolean;
	editar: boolean;
	integrar: boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(
	undefined,
);

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { sidebar } = useSidebar();
	const path = usePathname();

	const permissions = useMemo(() => {
		const findMenuPermissions = (
			menus: SidebarType[] | null | undefined,
			pathname: string,
		): PermissionContextType => {
			for (const menu of menus || []) {
				if (menu.submenus) {
					for (const submenu of menu.submenus) {
						if (
							submenu.pagina === pathname ||
							pathname.includes(submenu.pagina as string)
						) {
							return {
								exportar: submenu.exportar ?? false,
								editar: submenu.editar ?? false,
								integrar: submenu.integrar ?? false,
							};
						}
					}
				}
			}

			return {
				exportar: true,
				editar: true,
				integrar: true,
			};
		};

		return findMenuPermissions(sidebar, path);
	}, [sidebar, path]);

	return (
		<PermissionContext.Provider value={permissions}>
			{children}
		</PermissionContext.Provider>
	);
};

export const usePermissions = () => {
	const context = useContext(PermissionContext);
	if (!context) {
		throw new Error(
			'usePermissions deve ser usado dentro de um PermissionProvider',
		);
	}
	return context;
};
