import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { ZustandLogger } from '@/lib/zustand/logger';
import { SystemDetails } from '@/_types/system';

export type System = Record<string, string>;
export type SystemContext = {
	system: SystemDetails.Sistema | null;
	menus: SystemDetails.Menu[] | null;
	expanded: boolean;
	setSystem: (system: SystemDetails.Sistema) => void;
	setMenus: (menus: SystemDetails.Menu[]) => void;
	toogleSidebar: () => void;
	clear: () => void;
};

export const useSystem = create(
	persist<SystemContext>(
		ZustandLogger<SystemContext>(
			(set) => ({
				system: null,
				menus: null,
				expanded: true,
				setSystem: (system: SystemDetails.Sistema) => {
					set({ system });
				},
				setMenus: (menus: SystemDetails.Menu[]) => {
					set({ menus });
				},
				toogleSidebar: () =>
					set((prev) => ({ ...prev, expanded: !prev.expanded })),
				clear: () =>
					set({
						system: null,
						menus: null,
					}),
			}),
			'System',
		),
		{
			name: 'System',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
