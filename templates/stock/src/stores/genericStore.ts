import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type GenericStore<T> = {
	state: T | T[] | null;
	setState: (newState: T | T[] | null) => void;
	deleteState: (id: string) => void;
	addState: (item: T) => void;
	clearState: () => void;
};

export const useGenericStore = <T extends { id?: string }>(storeName: string) =>
	create(
		persist<GenericStore<T>>(
			(set) => ({
				state: null,
				setState: (newState: T | T[] | null) =>
					set({
						state: Array.isArray(newState)
							? newState.filter((item): item is T => !!item)
							: newState,
					}),
				deleteState: (id: string) =>
					set((state) => ({
						state: Array.isArray(state.state)
							? state.state.filter((item) => item.id !== id) ||
								null
							: state.state?.id === id
								? null
								: state.state,
					})),
				addState: (item: T) =>
					set((state) => ({
						state: Array.isArray(state.state)
							? [...state.state, item]
							: state.state
								? [state.state, item]
								: item,
					})),
				clearState: () => set({ state: null }),
			}),
			{
				name: storeName,
				storage: createJSONStorage(() => localStorage),
			},
		),
	);

export function genericStore<T extends { id?: string }>(storeName: string) {
	return (() =>
		useGenericStore<T>(storeName).getState())() as GenericStore<T>;
}
