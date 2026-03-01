import { SidebarType } from '@/components/Sidebar/type.zod';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type SidebarStore = {
	sidebar: SidebarType[] | null;
	setSidebar(side: Partial<SidebarType[]> | null): void;
};

export const useSidebar = create(
	persist<SidebarStore>(
		(set, _get) => ({
			sidebar: null,
			setSidebar: (side: Partial<SidebarType[]> | null) =>
				// @ts-ignore
				set((state) => ({
					sidebar: side,
				})),
		}),
		{
			name: 'sidebar',
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export function sidebarStore() {
	return (() => useSidebar.getState())() as SidebarStore;
}
